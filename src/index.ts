import {createCategoryRegistry, createProcessorCategoryRegistry, createI18nRegistry} from "./registries"
import type {generatorCategory} from "./registries/generatorCategoryRegistry"
import type {generator} from "./registries/generatorRegistry"
import type {processorCategory} from "./registries/processorCategoryRegistry"
import type {processor} from "./registries/processorRegistry"

import {generatorVarCategory} from "./builtin/generator/var"
import {generatorStringCategory} from "./builtin/generator/string"
import {generatorLoremCategory} from "./builtin/generator/lorem"
import {generatorNumberCategory} from "./builtin/generator/number"
import {generatorDateCategory} from "./builtin/generator/date"
import {generatorPersonCategory} from "./builtin/generator/person"

import {processorStringCategory} from "./builtin/processors/string"
import {processorEncodingDecodingCategory} from "./builtin/processors/encodingDecoding"
import {processorDateCategory} from "./builtin/processors/date"

import {i18nZhCN} from "./builtin/i18n/registerZhCN"
import {i18nEnUS} from "./builtin/i18n/registerEnUS"

import {
	i18nEngine,
	translateEngine,
	getOriginalEngine,
	getInfoEngine,
	generatorEngine,
	generatorProcessorEngine,
	templateEngine
} from "./logic"

export type {generatorCategoryRegistry, processorCategoryRegistry, i18nRegistry} from "./registries"

export type {generatorCategory, generator, processorCategory, processor}
export type generatorCategoryInfo = Omit<generatorCategory, "generators">
export type generatorInfo = Omit<generator, "processors" | "generate" | "registerProcessor" | "getProcessor" | "getAllProcessors">
export type processorCategoryInfo = Omit<processorCategory, "processors">
export type processorInfo = Omit<processor, "apply">

export interface generatorGroup {
	id: string
	title: string
	description: string
	generators: generatorInfo[]
}

export interface processorGroup {
	id: string
	title: string
	description: string
	processor: processorInfo[]
}

export interface generateTemplateConfig {
	category: string
	generator?: string
	params?: Record<string, any>
	processors?: processorCallConfig[]
}

export interface processorCallConfig {
	id: string
	params?: Record<string, any>
}

export interface mockServiceOptions {
	generatorRegisters?: Function[]
	processorRegisters?: Function[],
	i18nRegisters?: Function[]
}

export class mockService {
	// 注册器
	private generatorRegistry = createCategoryRegistry()
	private processorRegistry = createProcessorCategoryRegistry()
	private i18nRegistry = createI18nRegistry()
	private variables = new Map<string, any>()
	private throwError = true
	// logic
	private i18nEngine = new i18nEngine(this)
	private translateEngine = new translateEngine(this)
	private getOriginalEngine = new getOriginalEngine(this)
	private getInfoEngine = new getInfoEngine(this)
	private generatorEngine = new generatorEngine(this)
	private generatorProcessorEngine = new generatorProcessorEngine(this)
	private templateEngine = new templateEngine(this)
	// 内置
	private readonly BUILTIN_GENERATORS = [
		generatorVarCategory, generatorStringCategory, generatorLoremCategory,
		generatorNumberCategory, generatorDateCategory, generatorPersonCategory
	]
	private readonly BUILTIN_PROCESSORS = [
		processorStringCategory, processorEncodingDecodingCategory, processorDateCategory
	]
	private readonly BUILTIN_I18N = [i18nZhCN, i18nEnUS]
	// 插件
	private generatorPlugins: Function[] = []
	private processorPlugins: Function[] = []
	private i18nPlugin: Function[] = []

	public get internal() {
		return {
			generatorRegistry: this.generatorRegistry,
			processorRegistry: this.processorRegistry,
			i18nRegistry: this.i18nRegistry,
			variables: this.variables,
			throwError: this.throwError,
			resolveGeneratorProcessors: (generator: any) => this._resolveGeneratorProcessors(generator)
		}
	}

	constructor(options: mockServiceOptions = {}) {
		this.reload(options)
	}

	/**
	 * 重新加载 Mock Service
	 * 会清空所有注册表并根据当前存储的插件列表重新初始化
	 */
	reload(options: mockServiceOptions = {}) {
		const PREV_LOCALE = this.i18nRegistry?.getLocale()
		const PREV_FALLBACK = this.i18nRegistry?.getFallbackLocale()
		if (options) {
			const {generatorRegisters, processorRegisters, i18nRegisters} = options
			if (generatorRegisters !== undefined) this.generatorPlugins = [...generatorRegisters]
			if (processorRegisters !== undefined) this.processorPlugins = [...processorRegisters]
			if (i18nRegisters !== undefined) this.i18nPlugin = [...i18nRegisters]
		}
		this.generatorRegistry = createCategoryRegistry()
		this.processorRegistry = createProcessorCategoryRegistry()
		this.i18nRegistry = createI18nRegistry()
		this.clearVar()
		this._applyAll()
		if (PREV_LOCALE) this.i18nRegistry.setLocale(PREV_LOCALE)
		if (PREV_FALLBACK) this.i18nRegistry.setFallbackLocale(PREV_FALLBACK)
	}

	/**
	 * 应用所有
	 */
	private _applyAll() {
		const I18N = [...this.BUILTIN_I18N, ...this.i18nPlugin]
		I18N.forEach(p => p?.(this.i18nRegistry))
		try {
			const GENERATORS = [...this.BUILTIN_GENERATORS, ...this.generatorPlugins]
			GENERATORS.forEach(p => p?.(this.generatorRegistry))
		} catch (error) {
			return this.handleError(error, "generatorRegistry")
		}
		try {
			const PROCESSORS = [...this.BUILTIN_PROCESSORS, ...this.processorPlugins]
			PROCESSORS.forEach(p => p?.(this.processorRegistry))
		} catch (error) {
			return this.handleError(error, "processorRegistry")
		}
		this._resolveAllGeneratorProcessors()
	}

	/**
	 * 解析所有生成器的处理器
	 */
	private _resolveAllGeneratorProcessors() {
		for (const CATEGORY of this.generatorRegistry.getAllCategories()) {
			for (const GENERATOR of CATEGORY.generators.getAllGenerator()) {
				this._resolveGeneratorProcessors(GENERATOR)
			}
		}
	}

	/**
	 * 解析指定生成器的处理器
	 */
	private _resolveGeneratorProcessors(generator: any) {
		if (!Array.isArray(generator.processorIds)) return
		generator.clearProcessors()
		for (const CATEGORY_ID of generator.processorIds) {
			const RAW_CATEGORY = this.processorRegistry.getCategory(CATEGORY_ID)
			if (!RAW_CATEGORY) continue
			for (const PROCESSOR of RAW_CATEGORY.processors.getAllProcessors()) {
				generator.registerProcessor(PROCESSOR)
			}
		}
	}

	/**
	 * 处理错误
	 */
	private handleError(error: any, fallbackValue: string): never | string {
		const RAW_MESSAGE = error instanceof Error ? error.message : String(error)
		let finalMessage: string
		if (RAW_MESSAGE.includes("|")) {
			const [KEY, PARAMS_STR] = RAW_MESSAGE.split("|")
			try {
				const PARAMS = JSON.parse(PARAMS_STR)
				finalMessage = this.translate(KEY, PARAMS)
			} catch {
				finalMessage = this.translate(RAW_MESSAGE)
			}
		} else {
			finalMessage = this.translate(RAW_MESSAGE)
		}
		if (this.throwError) {
			throw new Error(finalMessage)
		} else {
			console.error(finalMessage)
			return fallbackValue
		}
	}

	/**
	 * 切换错误输出
	 */
	switchErrorOutput(throwError: boolean) {
		this.throwError = throwError
	}

	/**
	 * 为某生成器分类下的所有生成器, 批量添加处理器分类
	 */
	addProcessorCategoryToGeneratorCategory(generatorCategoryId: string, processorCategoryId: string) {
		return this.generatorEngine.addProcessorCategoryToGeneratorCategory(generatorCategoryId, processorCategoryId)
	}

	/**
	 * 为某生成器分类下的所有生成器, 批量移除处理器分类
	 */
	removeProcessorCategoryFromGeneratorCategory(generatorCategoryId: string, processorCategoryId: string) {
		return this.generatorEngine.removeProcessorCategoryFromGeneratorCategory(generatorCategoryId, processorCategoryId)
	}

	/**
	 * 为指定的生成器添加处理器分类
	 */
	addProcessorCategoryToGenerator(generatorCategoryId: string, generatorId: string, processorCategoryId: string) {
		return this.generatorEngine.addProcessorCategoryToGenerator(generatorCategoryId, generatorId, processorCategoryId)
	}

	/**
	 * 为指定的生成器移除处理器分类
	 */
	removeProcessorCategoryFromGenerator(generatorCategoryId: string, generatorId: string, processorCategoryId: string) {
		return this.generatorEngine.removeProcessorCategoryFromGenerator(generatorCategoryId, generatorId, processorCategoryId)
	}

	/**
	 * 设置语言
	 */
	setLocale(locale: string, fallbackLocale: string) {
		this.i18nEngine.setLocale(locale, fallbackLocale)
	}

	/**
	 * 单独设置回退语言
	 */
	setFallbackLocale(fallbackLocale: string) {
		this.i18nEngine.setFallbackLocale(fallbackLocale)
	}

	/**
	 * 获取当前语言
	 */
	getLocale(): string {
		return this.i18nEngine.getLocale()
	}

	/**
	 * 获取当前回退语言
	 */
	getFallbackLocale(): string {
		return this.i18nEngine.getFallbackLocale()
	}

	/**
	 * 调用内部翻译
	 */
	translate(key: string, params?: Record<string, any>): string {
		return this.i18nEngine.translate(key, params)
	}

	/**
	 * 翻译生成器分类
	 */
	translateGeneratorCategory(category: generatorCategory): generatorCategory {
		return this.translateEngine.translateGeneratorCategory(category)
	}

	/**
	 * 翻译生成器
	 */
	translateGenerator(generator: generator): generator {
		return this.translateEngine.translateGenerator(generator)
	}

	/**
	 * 翻译处理器分类
	 */
	translateProcessorCategory(category: processorCategory): processorCategory {
		return this.translateEngine.translateProcessorCategory(category)
	}

	/**
	 * 翻译处理器
	 */
	translateProcessor(processor: processor): processor {
		return this.translateEngine.translateProcessor(processor)
	}

	/**
	 * 写入变量
	 */
	setVar(key: string, value: any, isReturn: boolean = false): any {
		this.variables.set(key, value)
		return isReturn ? value : ""
	}

	/**
	 * 批量写入变量
	 */
	setVars(vars: Record<string, any>) {
		if (!vars || typeof vars !== "object") return
		for (const KEY in vars) {
			if (Object.prototype.hasOwnProperty.call(vars, KEY)) {
				this.variables.set(KEY, vars[KEY])
			}
		}
	}

	/**
	 * 读取变量
	 */
	getVar(key: string): any {
		return this.variables.get(key)
	}

	/**
	 * 读取所有变量
	 */
	getVars(): Record<string, any> {
		return Object.fromEntries(this.variables)
	}

	/**
	 * 清空变量
	 */
	clearVar() {
		this.variables.clear()
	}

	/**
	 * 获取所有分类
	 */
	getAllGeneratorCategory(): generatorCategory[] {
		return this.getOriginalEngine.getAllGeneratorCategory()
	}

	/**
	 * 获取某生成器分类
	 */
	getGeneratorCategory(generatorCategoryId: string): generatorCategory {
		return this.getOriginalEngine.getGeneratorCategory(generatorCategoryId)
	}

	/**
	 * 获取某生成器分类下的所有生成器
	 */
	getAllGenerators(generatorCategoryId: string): generator[] {
		return this.getOriginalEngine.getAllGenerators(generatorCategoryId)
	}

	/**
	 * 获取某生成器
	 */
	getGenerator(generatorCategoryId: string, generatorId: string): generator {
		return this.getOriginalEngine.getGenerator(generatorCategoryId, generatorId)
	}

	/**
	 * 获取所有处理器分类
	 */
	getAllProcessorCategory(): processorCategory[] {
		return this.getOriginalEngine.getAllProcessorCategory()
	}

	/**
	 * 获取某处理器分类
	 */
	getProcessorCategory(processorCategoryId: string): processorCategory {
		return this.getOriginalEngine.getProcessorCategory(processorCategoryId)
	}

	/**
	 * 获取某处理器分类下的所有处理器
	 */
	getAllProcessors(processorCategoryId: string): processor[] {
		return this.getOriginalEngine.getAllProcessors(processorCategoryId)
	}

	/**
	 * 获某处理器
	 */
	getProcessor(processorCategoryId: string, processorId: string): processor {
		return this.getOriginalEngine.getProcessor(processorCategoryId, processorId)
	}

	/**
	 * 获取某生成器下的所有处理器
	 */
	getGeneratorAllProcessor(generatorCategoryId: string, generatorId: string): processor[] {
		return this.getOriginalEngine.getGeneratorAllProcessor(generatorCategoryId, generatorId)
	}

	/**
	 * 获取某生成器下的某处理器
	 */
	getGeneratorProcessor(generatorCategoryId: string, generatorId: string, processorId: string): processor {
		return this.getOriginalEngine.getGeneratorProcessor(generatorCategoryId, generatorId, processorId)
	}

	/**
	 * 获取所有生成器分类信息
	 */
	getAllGeneratorCategoryInfo(): generatorCategoryInfo[] {
		return this.getInfoEngine.getAllGeneratorCategoryInfo()
	}

	/**
	 * 获取某生成器分类信息
	 */
	getGeneratorCategoryInfo(generatorCategoryId: string): generatorCategoryInfo {
		return this.getInfoEngine.getGeneratorCategoryInfo(generatorCategoryId)
	}

	/**
	 * 获取某生成器分类下的所有生成器信息
	 */
	getAllGeneratorsInfo(generatorCategoryId: string): generatorInfo[] {
		return this.getInfoEngine.getAllGeneratorsInfo(generatorCategoryId)
	}

	/**
	 * 获取某生成器信息
	 */
	getGeneratorInfo(generatorCategoryId: string, generatorId: string): generatorInfo {
		return this.getInfoEngine.getGeneratorInfo(generatorCategoryId, generatorId)
	}

	/**
	 * 获取生成器信息组
	 */
	getGeneratorGroups(): generatorGroup[] {
		return this.getInfoEngine.getGeneratorGroups()
	}

	/**
	 * 获取所有处理器分类信息
	 */
	getAllProcessorCategoryInfo(): processorCategoryInfo[] {
		return this.getInfoEngine.getAllProcessorCategoryInfo()
	}

	/**
	 * 获取某处理器分类信息
	 */
	getProcessorCategoryInfo(processorCategoryId: string): processorCategoryInfo {
		return this.getInfoEngine.getProcessorCategoryInfo(processorCategoryId)
	}

	/**
	 * 获取某处理器分类下的所有处理器信息
	 */
	getAllProcessorsInfo(processorCategoryId: string): processorInfo[] {
		return this.getInfoEngine.getAllProcessorsInfo(processorCategoryId)
	}

	/**
	 * 获某处理器信息
	 */
	getProcessorInfo(processorCategoryId: string, processorId: string): processorInfo {
		return this.getInfoEngine.getProcessorInfo(processorCategoryId, processorId)
	}

	/**
	 * 获取某生成器下的所有处理器信息
	 */
	getGeneratorAllProcessorInfo(generatorCategoryId: string, generatorId: string): processorInfo[] {
		return this.getInfoEngine.getGeneratorAllProcessorInfo(generatorCategoryId, generatorId)
	}

	/**
	 * 获取某生成器下的某处理器信息
	 */
	getGeneratorProcessorInfo(generatorCategoryId: string, generatorId: string, processorId: string): processorInfo {
		return this.getInfoEngine.getGeneratorProcessorInfo(generatorCategoryId, generatorId, processorId)
	}

	/**
	 * 获取处理器信息组
	 */
	getProcessorGroups(): processorGroup[] {
		return this.getInfoEngine.getProcessorGroups()
	}

	/**
	 * 获取某生成器的处理器信息组
	 */
	getGeneratorProcessorGroups(generatorCategoryId: string, generatorId: string): processorGroup[] {
		return this.getInfoEngine.getGeneratorProcessorGroups(generatorCategoryId, generatorId)
	}

	/**
	 * 调用生成器生成
	 */
	generateData(generatorCategoryId: string, generatorId: string, params?: any): any {
		return this.generatorProcessorEngine.generateData(generatorCategoryId, generatorId, params)
	}

	/**
	 * 应用全局处理器
	 */
	applyGlobalProcessor(processorId: string, value: any, params?: any): any {
		return this.generatorProcessorEngine.applyGlobalProcessor(processorId, value, params)
	}

	/**
	 * 应用处理器
	 * 使用生成器允许的处理器, 防止异常调用
	 */
	applyProcessor(generatorCategoryId: string, generatorId: string, processorId: string, value: any, params?: any): any {
		return this.generatorProcessorEngine.applyProcessor(generatorCategoryId, generatorId, processorId, value, params)
	}

	/**
	 * 生成模板
	 */
	generateTemplate(config: generateTemplateConfig): string {
		return this.templateEngine.generateTemplate(config)
	}

	/**
	 * 从字符串中提取所有模板
	 */
	extractTemplates(string = ""): string[] {
		return this.templateEngine.extractTemplates(string)
	}

	/**
	 * 生成数据
	 */
	templateGenerateData(template: any): any {
		return this.templateEngine.templateGenerateData(template)
	}

	/**
	 * 解析模板字符串中的所有模板
	 */
	resolveTemplate(string: string): any {
		return this.templateEngine.resolveTemplate(string)
	}

	/**
	 * 递归解析对象或数组中的所有模板
	 */
	objectResolve(input: any, currentDepth = 0): any {
		return this.templateEngine.objectResolve(input, currentDepth)
	}
}

export const createMockService = (options: mockServiceOptions = {}) => {
	return new mockService(options)
}

export default createMockService()