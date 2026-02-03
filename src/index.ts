import {createCategoryRegistry, createProcessorCategoryRegistry, createI18nRegistry} from "./registries"
import {buildParamsString, normalizeCallParams, parseParams, resolveParamValue, splitByTopLevelPipe} from "./Tools"
import {MethodProcessor} from "./registries/MethodRegistry"
import {Category} from "./registries/CategoryRegistry"
import {Method} from "./registries/MethodRegistry"
import {ProcessorCategory} from "./registries/ProcessorCategoryRegistry"
import {Locale} from "./registries/I18nRegistry"
import stringCategory from "./builtin/categorys/string"
import loremCategory from "./builtin/categorys/lorem"
import numberCategory from "./builtin/categorys/number"
import dateCategory from "./builtin/categorys/date"
import registerStringProcessors from "./builtin/processors/string"
import registerEncodingProcessors from "./builtin/processors/encodingDecoding"
import registerDateProcessors from "./builtin/processors/date"
import registerZhCN from "./builtin/i18n/zh-CN"
import registerEnUS from "./builtin/i18n/en-US"

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
	processorRegisters?: Function[],
	i18nRegisters?: Function[]
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
	private i18nRegistry = createI18nRegistry()
	private categoryPlugins: Function[] = []
	private processorPlugins: Function[] = []
	private i18nPlugin: Function[] = []

	constructor(options: MockServiceOptions = {}) {
		const {categoryRegisters = [], processorRegisters = [], i18nRegisters = []} = options
		// 内置方法
		stringCategory(this.categoryRegistry)
		loremCategory(this.categoryRegistry)
		numberCategory(this.categoryRegistry)
		dateCategory(this.categoryRegistry)
		// 内置处理器
		registerStringProcessors(this.processorRegistry)
		registerEncodingProcessors(this.processorRegistry)
		registerDateProcessors(this.processorRegistry)
		// 内置语言
		registerZhCN(this.i18nRegistry)
		registerEnUS(this.i18nRegistry)
		// 自定义
		this.categoryPlugins.push(...categoryRegisters)
		this.processorPlugins.push(...processorRegisters)
		this.i18nPlugin.push(...i18nRegisters)
		// 应用插件
		this._applyPlugins()
	}

	/**
	 * 应用所有插件
	 */
	private _applyPlugins() {
		for (const plugin of this.categoryPlugins) {
			plugin?.(this.categoryRegistry)
		}
		for (const plugin of this.processorPlugins) {
			plugin?.(this.processorRegistry)
		}
		for (const plugin of this.i18nPlugin) {
			plugin?.(this.i18nRegistry)
		}
		this._resolveAllMethodProcessors()
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
			const RAW_CATEGORY = this.processorRegistry.getCategory(CATEGORY_ID)
			if (!RAW_CATEGORY) continue
			for (const PROCESSOR of RAW_CATEGORY.methods.getAllProcessors()) {
				method.registerProcessor(PROCESSOR)
			}
		}
	}

	/**
	 * 翻译分类
	 */
	private _translateCategory(category: Category) {
		return {
			...category,
			title: this.i18nRegistry.t(category.title),
			description: this.i18nRegistry.t(category.description),
			methods: category.methods
		}
	}

	/**
	 * 获取所有分类
	 */
	getAllCategory() {
		return this.categoryRegistry
			.getAllCategories()
			.map((category) => this._translateCategory(category))
	}

	/**
	 * 获取指定分类
	 */
	getCategory(id: string) {
		const CATEGORY = this.categoryRegistry.getCategory(id)
		return CATEGORY ? this._translateCategory(CATEGORY) : null
	}

	/**
	 * 翻译方法
	 */
	private _translateMethod(method: Method) {
		return {
			...method,
			title: this.i18nRegistry.t(method.title),
			description: this.i18nRegistry.t(method.description),
			params: method.params?.map((param) => ({
				...param,
				title: this.i18nRegistry.t(param.title),
				description: this.i18nRegistry.t(param.description)
			}))
		}
	}

	/**
	 * 获取指定分类下的所有方法
	 */
	getAllMethods(categoryId: string) {
		return this.getCategory(categoryId)
			?.methods.getAllMethods()
			?.map((method) => this._translateMethod(method)) ?? []
	}

	/**
	 * 获取指定分类下的指定方法
	 */
	getMethod(categoryId: string, methodId: string) {
		const CATEGORY = this.getCategory(categoryId)
		if (!CATEGORY) return null
		const METHOD = CATEGORY.methods.getMethod(methodId)
		return METHOD ? this._translateMethod(METHOD) : null
	}

	/**
	 * 翻译处理器分类
	 */
	private _translateProcessorCategory(category: ProcessorCategory) {
		return {
			...category,
			title: this.i18nRegistry.t(category.title),
			description: this.i18nRegistry.t(category.description),
			methods: category.methods
		}
	}

	/**
	 * 获取所有处理器分类
	 */
	getAllProcessorCategory() {
		return this.processorRegistry
			.getAllCategories()
			.map((category) => this._translateProcessorCategory(category))
	}

	/**
	 * 获取指定处理器分类
	 */
	getProcessorCategory(categoryId: string) {
		const CATEGORY = this.processorRegistry.getCategory(categoryId)
		return CATEGORY ? this._translateProcessorCategory(CATEGORY) : null
	}

	/**
	 * 翻译处理器方法
	 */
	private _translateProcessorMethod(method: MethodProcessor) {
		return {
			...method,
			title: this.i18nRegistry.t(method.title),
			description: this.i18nRegistry.t(method.description),
			params: method.params?.map((param: { title: string | undefined; description: string | undefined }) => ({
				...param,
				title: this.i18nRegistry.t(param.title),
				description: this.i18nRegistry.t(param.description)
			}))
		}
	}

	/**
	 * 获取指定分类下的指定方法的所有处理器
	 */
	getMethodsAllProcessor(categoryId: string, methodId: string) {
		const METHOD = this.getMethod(categoryId, methodId)
		if (!METHOD) return []
		return METHOD
			.getAllProcessors()
			?.map((processor) => this._translateProcessorMethod(processor)) ?? []
	}

	/**
	 * 获取指定分类下的指定方法的指定处理器
	 */
	getMethodsProcessor(categoryId: string, methodId: string, processorId: string) {
		const METHOD = this.getMethod(categoryId, methodId)
		if (!METHOD) return null
		return this._translateProcessorMethod(<MethodProcessor>METHOD.getProcessor(processorId) ?? null)
	}

	/**
	 * 获取某个方法可用的处理器(按分类分组)
	 */
	getMethodProcessorGroups(categoryId: string, methodId: string): ProcessorGroup[] {
		const METHOD = this.getMethod(categoryId, methodId)
		if (!METHOD) return []
		const RESULT: ProcessorGroup[] = []
		for (const RAW_CATEGORY of this.processorRegistry.getAllCategories()) {
			const CATEGORY = this._translateProcessorCategory(RAW_CATEGORY)
			const METHODS: MethodProcessor[] = []
			for (const RAW_PROCESSOR of RAW_CATEGORY.methods.getAllProcessors()) {
				if (METHOD.getProcessor(RAW_PROCESSOR.id)) {
					METHODS.push(this._translateProcessorMethod(RAW_PROCESSOR))
				}
			}
			if (METHODS.length) {
				RESULT.push({
					id: CATEGORY.id,
					title: CATEGORY.title,
					description: CATEGORY.description,
					methods: METHODS
				})
			}
		}
		return RESULT
	}

	/**
	 * 设置语言
	 */
	setLocale(locale: Locale, fallbackLocale: Locale) {
		this.i18nRegistry.setLocale(locale)
		if (fallbackLocale) this.i18nRegistry.setFallbackLocale(fallbackLocale)
	}

	/**
	 * 设置回退语言
	 */
	setFallbackLocale(fallbackLocale: Locale) {
		this.i18nRegistry.setFallbackLocale(fallbackLocale)
	}

	/**
	 * 获取当前语言
	 */
	getLocale(): Locale {
		return this.i18nRegistry.getLocale()
	}

	/**
	 * 调用内部翻译
	 */
	translate(key: string): string {
		return this.i18nRegistry.t(key)
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