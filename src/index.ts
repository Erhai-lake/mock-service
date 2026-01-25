import {CATEGORY_REGISTRY, PROCESSOR_CATEGORY_REGISTRY} from "./registries"
import {buildParamsString, normalizeCallParams, parseParams, resolveParamValue, splitByTopLevelPipe} from "./Tools"
import stringCategory from "./builtin/categorys/string"
import registerStringProcessors from "./builtin/processors/string"
import registerEncodingProcessors from "./builtin/processors/encodingDecoding"

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

class MockService {
	private categoryRegistry = CATEGORY_REGISTRY
	private processorRegistry = PROCESSOR_CATEGORY_REGISTRY
	private _pluginQueue: Array<{ register: Function; priority: number }> = []

	constructor({categoryRegisters = [], processorRegisters = []}: {
		categoryRegisters?: Function[];
		processorRegisters?: Function[]
	} = {}) {
		this._applyRegisters([
			{
				register: () => stringCategory(this.categoryRegistry, this.processorRegistry),
				priority: 0
			},
			{
				register: () => registerStringProcessors(this.categoryRegistry, this.processorRegistry),
				priority: 0
			},
			{
				register: () => registerEncodingProcessors(this.categoryRegistry, this.processorRegistry), priority: 0
			}
		])
		for (const FN of [...categoryRegisters, ...processorRegisters]) {
			this._pluginQueue.push({
				register: FN,
				priority: (FN as any).priority ?? 1
			})
		}
		this._rebuildFromPlugins()
	}

	/**
	 * 应用注册函数
	 */
	private _applyRegisters(registers: Array<{ register: Function; priority: number }>) {
		registers.sort((a, b) => a.priority - b.priority)
		for (const {register} of registers) register?.(this.categoryRegistry, this.processorRegistry)
	}

	/**
	 * 解析所有方法的处理器
	 */
	private _resolveAllMethodProcessors() {
		for (const CATEGORY of this.categoryRegistry.getAllCategories()) {
			for (const METHOD of CATEGORY.methods.getAllMethods()) this._resolveMethodProcessors(METHOD)
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
			for (const PROCESSOR of PROCESSOR_CATEGORY.methods.getAllProcessors()) method.registerProcessor(PROCESSOR)
		}
	}

	/**
	 * 从插件队列中重建分类和处理器
	 */
	private _rebuildFromPlugins() {
		this._pluginQueue
			.sort((a, b) => a.priority - b.priority)
			.forEach(({register}) =>
				register(this.categoryRegistry, this.processorRegistry)
			)
		this._resolveAllMethodProcessors()
	}


	/**
	 * 使用插件
	 */
	usePlugin(pluginFn: Function) {
		const RESULT: any = pluginFn(this.categoryRegistry, this.processorRegistry)
		const PRIORITY = RESULT?.priority ?? 1
		this._pluginQueue.push({register: pluginFn, priority: PRIORITY})
		this._applyRegisters([{register: pluginFn, priority: PRIORITY}])
		return this
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
		const CATEGORY = this.getCategory(categoryId)
		return CATEGORY ? CATEGORY.methods.getAllMethods() : []
	}

	/**
	 * 获取指定分类下的指定方法
	 */
	getMethod(categoryId: string, methodId: string) {
		const CATEGORY = this.getCategory(categoryId)
		return CATEGORY?.methods.getMethod(methodId) ?? null
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
	getProcessorCategory(id: string) {
		return this.processorRegistry.getCategory(id)
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

export default MockService