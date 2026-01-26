import {createCategoryRegistry, createProcessorCategoryRegistry} from "./registries"
import {buildParamsString, normalizeCallParams, parseParams, resolveParamValue, splitByTopLevelPipe} from "./Tools"
import stringCategory from "./builtin/categorys/string"
import registerStringProcessors from "./builtin/processors/string"
import registerEncodingProcessors from "./builtin/processors/encodingDecoding"
import {MethodProcessor} from "./registries/MethodRegistry"

export interface ProcessorCallConfig {
	id: string
	params?: Record<string, any>
}

export interface GenerateTemplateConfig {
	category: string
	method?: string
	params?: Record<string, any>
	processors?: ProcessorCallConfig[]
}

export interface MockServiceOptions {
	categoryRegisters?: Function[]
	processorRegisters?: Function[]
}

export interface ProcessorGroup {
	id: string
	title: string
	description: string
	methods: MethodProcessor[]
}

class MockService {
	private categoryRegistry = createCategoryRegistry()
	private processorRegistry = createProcessorCategoryRegistry()
	private plugins: Function[] = []

	constructor(options: MockServiceOptions = {}) {
		const {categoryRegisters = [], processorRegisters = []} = options
		// 内置
		stringCategory(this.categoryRegistry, this.processorRegistry)
		registerStringProcessors(this.categoryRegistry, this.processorRegistry)
		registerEncodingProcessors(this.categoryRegistry, this.processorRegistry)
		// 自定义
		this.plugins.push(...categoryRegisters, ...processorRegisters)
		// 应用
		this._applyPlugins()
	}

	/**
	 * 应用所有插件
	 */
	private _applyPlugins() {
		for (const plugin of this.plugins) {
			plugin?.(this.categoryRegistry, this.processorRegistry)
		}
		this._resolveAllMethodProcessors()
	}

	/**
	 * 使用插件
	 */
	usePlugin(pluginFn: Function) {
		this.plugins.push(pluginFn)
		pluginFn(this.categoryRegistry, this.processorRegistry)
		this._resolveAllMethodProcessors()
		return this
	}

	/**
	 * 解析所有方法的处理器
	 */
	private _resolveAllMethodProcessors() {
		for (const CATEGORY of this.categoryRegistry.getAllCategories()) {
			for (const METHOD of CATEGORY.methods.getAllMethods()) {
				this._resolveMethodProcessors(METHOD)
			}
		}
	}

	/**
	 * 解析指定方法的处理器
	 */
	private _resolveMethodProcessors(method: any) {
		if (!Array.isArray(method.processorIds)) return
		for (const CATEGORY_ID of method.processorIds) {
			const PROCESSOR_CATEGORY = this.getProcessorCategory(CATEGORY_ID)
			if (!PROCESSOR_CATEGORY) continue
			for (const PROCESSOR of PROCESSOR_CATEGORY.methods.getAllProcessors()) {
				method.registerProcessor(PROCESSOR)
			}
		}
	}

	/**
	 * 获取所有分类
	 */
	getAllCategory() {
		return this.categoryRegistry.getAllCategories()
	}

	/**
	 * 获取指定分类
	 */
	getCategory(id: string) {
		return this.categoryRegistry.getCategory(id)
	}

	/**
	 * 获取指定分类下的所有方法
	 */
	getAllMethods(categoryId: string) {
		return this.getCategory(categoryId)?.methods.getAllMethods() ?? []
	}

	/**
	 * 获取指定分类下的指定方法
	 */
	getMethod(categoryId: string, methodId: string) {
		return this.getCategory(categoryId)?.methods.getMethod(methodId) ?? null
	}

	/**
	 * 获取所有处理器分类
	 */
	getAllProcessorCategory() {
		return this.processorRegistry.getAllCategories()
	}

	/**
	 * 获取指定处理器分类
	 */
	getProcessorCategory(categoryId: string) {
		return this.processorRegistry.getCategory(categoryId)
	}

	/**
	 * 获取指定分类下的指定方法的所有处理器
	 */
	getMethodsAllProcessor(categoryId: string, methodId: string) {
		const METHOD = this.getMethod(categoryId, methodId)
		if (!METHOD) return []
		return METHOD.getAllProcessors() ?? []
	}

	/**
	 * 获取指定分类下的指定方法的指定处理器
	 */
	getMethodsProcessor(categoryId: string, methodId: string, processorId: string) {
		const METHOD = this.getMethod(categoryId, methodId)
		if (!METHOD) return null
		return METHOD.getProcessor(processorId) ?? null
	}

	/**
	 * 获取某个方法可用的处理器(按分类分组)
	 */
	getMethodProcessorGroups(categoryId: string, methodId: string): ProcessorGroup[] {
		const METHOD = this.getMethod(categoryId, methodId)
		if (!METHOD) return []
		const RESULT: ProcessorGroup[] = []
		for (const PROCESSOR_CATEGORY of this.processorRegistry.getAllCategories()) {
			const processors: MethodProcessor[] = []
			for (const PROCESSOR of PROCESSOR_CATEGORY.methods.getAllProcessors()) {
				if (METHOD.getProcessor(PROCESSOR.id)) {
					processors.push({
						id: PROCESSOR.id,
						title: PROCESSOR.title,
						description: PROCESSOR.description,
						params: PROCESSOR.params
					})
				}
			}
			if (processors.length) {
				RESULT.push({
					id: PROCESSOR_CATEGORY.id,
					title: PROCESSOR_CATEGORY.title,
					description: PROCESSOR_CATEGORY.description,
					methods: processors
				})
			}
		}
		return RESULT
	}

	/**
	 * 生成模板字符串
	 */
	generateTemplate(config: GenerateTemplateConfig): string {
		const {category, method, params = {}, processors = []} = config
		if (!category) return "{{}}"
		let template = `{{$${category}}}`
		if (!method) return template
		template = `{{$${category}.${method}`
		const METHOD = this.getMethod(category, method)
		// 主参数
		if (METHOD?.params && Object.keys(params).length > 0) {
			template += buildParamsString(METHOD.params, params)
		}
		// 处理器
		for (const P of processors) {
			if (!P?.id) continue
			template += `|${P.id}`
			const PROCESSOR = METHOD?.getProcessor(P.id)
			if (PROCESSOR?.params) {
				template += buildParamsString(PROCESSOR.params, P.params)
			}
		}
		return template + "}}"
	}

	/**
	 * 从字符串中提取所有模板
	 */
	extractTemplates(string = ""): string[] {
		const RESULT: string[] = []
		let i = 0
		while (i < string.length) {
			if (string[i] === "{" && string[i + 1] === "{") {
				let depth = 1
				const START = i
				i += 2
				while (i < string.length && depth > 0) {
					if (string[i] === "{" && string[i + 1] === "{") {
						depth++
						i += 2
					} else if (string[i] === "}" && string[i + 1] === "}") {
						depth--
						i += 2
					} else {
						i++
					}
				}
				RESULT.push(string.slice(START, i))
			} else {
				i++
			}
		}
		return RESULT
	}

	/**
	 * 生成数据
	 */
	generateData(template: any): any {
		if (typeof template !== "string") return template
		if (!template.startsWith("{{")) return template
		const CONTENT = template
			.trim()
			.replace(/^\{\{\$/, "")
			.replace(/}}$/, "")
		const PARTS = splitByTopLevelPipe(CONTENT)
		const MAIN = PARTS.shift()
		if (!MAIN) return template
		const MAIN_MATCH = MAIN.match(/^(\w+)\.(\w+)(?:\((.*)\))?$/)
		if (!MAIN_MATCH) throw new Error(`Invalid template: ${template}`)
		const [, CATEGORY_ID, METHOD_ID, MAIN_PARAMS_STR] = MAIN_MATCH
		const METHOD = this.getMethod(CATEGORY_ID, METHOD_ID)
		if (!METHOD || typeof METHOD.generate !== "function") {
			throw new Error(`未找到生成器: ${CATEGORY_ID}.${METHOD_ID}`)
		}
		const RESOLVED_MAIN_PARAMS_STR = this.resolveTemplate(MAIN_PARAMS_STR)
		const MAIN_PARAMS = parseParams(RESOLVED_MAIN_PARAMS_STR)
		const FINAL_PARAMS = normalizeCallParams(METHOD.params, MAIN_PARAMS)
		let value = FINAL_PARAMS === undefined ? METHOD.generate() : METHOD.generate(FINAL_PARAMS)
		// 应用处理器
		for (const P of PARTS) {
			const MATCH = P.match(/^(\w+)(?:\((.*)\))?$/)
			if (!MATCH) continue
			const [, PROCESSOR_ID, PARAM_STR] = MATCH
			const PROCESSOR = METHOD.getProcessor(PROCESSOR_ID)
			if (!PROCESSOR) continue
			const RAW_PARAMS = parseParams(PARAM_STR)
			const RESOLVED_PARAMS = Array.isArray(RAW_PARAMS) ? RAW_PARAMS.map(v => resolveParamValue(v, this)) : resolveParamValue(RAW_PARAMS, this)
			const FINAL_PARAMS = normalizeCallParams(PROCESSOR.params, RESOLVED_PARAMS)
			value = FINAL_PARAMS === undefined ? PROCESSOR.apply(value) : PROCESSOR.apply(value, FINAL_PARAMS)
		}
		return value
	}

	/**
	 * 解析模板字符串中的所有模板
	 */
	resolveTemplate(str: string): any {
		const TEMPLATES: string[] = this.extractTemplates(str)
		if (!TEMPLATES.length) return str
		let result: string = str
		for (const T of TEMPLATES) result = result.replace(T, String(this.generateData(T)))
		return result
	}
}

// 高级
export function createMockService(options?: MockServiceOptions) {
	return new MockService(options)
}

export const defaultMockService = new MockService()

export default defaultMockService

export type {Category} from "./registries/CategoryRegistry"
export type {Method} from "./registries/MethodRegistry"
export type {Processor} from "./registries/ProcessorRegistry"
export type {CategoryRegistry} from "./registries/CategoryRegistry"
export type {ProcessorCategoryRegistry} from "./registries/ProcessorCategoryRegistry"