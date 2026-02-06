import {createCategoryRegistry, createProcessorCategoryRegistry, createI18nRegistry} from "./registries"
import type {generatorCategory} from "./registries/generatorCategoryRegistry"
import type {generator} from "./registries/generatorRegistry"
import type {processorCategory} from "./registries/processorCategoryRegistry"
import type {processor} from "./registries/processorRegistry"

import mockTranslate from "./tools/mockTranslate"
import {stripToInfo} from "./tools/stripToInfo"
import {buildParamsString} from "./tools/template/buildParamsString"
import {splitByTopLevelPipe} from "./tools/template/splitByTopLevelPipe"
import {parseParams} from "./tools/template/parseParams"
import {normalizeCallParams} from "./tools/template/normalizeCallParams"
import {resolveParamValue} from "./tools/template/resolveParamValue"

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

export type {generatorCategoryRegistry, processorCategoryRegistry, i18nRegistry} from "./registries"
export {mockTranslate}

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

class mockService {
	// 生成器注册器
	private generatorRegistry = createCategoryRegistry()
	// 处理器注册器
	private processorRegistry = createProcessorCategoryRegistry()
	// 语言注册器
	private i18nRegistry = createI18nRegistry()
	// 自定义插件
	private generatorPlugins: Function[] = []
	private processorPlugins: Function[] = []
	private i18nPlugin: Function[] = []

	constructor(options: mockServiceOptions = {}) {
		const {generatorRegisters = [], processorRegisters = [], i18nRegisters = []} = options
		this.generatorPlugins.push(...generatorRegisters)
		this.processorPlugins.push(...processorRegisters)
		this.i18nPlugin.push(...i18nRegisters)
		this._applyPlugins()
	}

	/**
	 * 应用所有插件
	 */
	private _applyPlugins() {
		for (const plugin of this.generatorPlugins) {
			plugin?.(this.generatorRegistry)
		}
		for (const plugin of this.processorPlugins) {
			plugin?.(this.processorRegistry)
		}
		for (const plugin of this.i18nPlugin) {
			plugin?.(this.i18nRegistry)
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
		for (const CATEGORY_ID of generator.processorIds) {
			const RAW_CATEGORY = this.processorRegistry.getCategory(CATEGORY_ID)
			if (!RAW_CATEGORY) continue
			for (const PROCESSOR of RAW_CATEGORY.processors.getAllProcessors()) {
				generator.registerProcessor(PROCESSOR)
			}
		}
	}

	/**
	 * 设置语言
	 */
	setLocale(locale: string, fallbackLocale: string) {
		this.i18nRegistry.setLocale(locale)
		if (fallbackLocale) this.i18nRegistry.setFallbackLocale(fallbackLocale)
	}

	/**
	 * 设置回退语言
	 */
	setFallbackLocale(fallbackLocale: string) {
		this.i18nRegistry.setFallbackLocale(fallbackLocale)
	}

	/**
	 * 获取当前语言
	 */
	getLocale(): string {
		return this.i18nRegistry.getLocale()
	}

	/**
	 * 调用内部翻译
	 */
	translate(key: string): string {
		return this.i18nRegistry.t(key)
	}

	/**
	 * 获取翻译表
	 */
	getTranslateTable() {
		return this.i18nRegistry
	}

	/**
	 * 获取所有分类
	 */
	getAllGeneratorCategory(): generatorCategory[] {
		const ALL_CATEGORY: generatorCategory[] = this.generatorRegistry.getAllCategories()
		return ALL_CATEGORY.map((generator: generatorCategory) => {
			return mockTranslate.generatorCategory(generator, this.i18nRegistry)
		})
	}

	/**
	 * 获取某生成器分类
	 */
	getGeneratorCategory(generatorId: string): generatorCategory {
		const CATEGORY: generatorCategory = this.generatorRegistry.getCategory(generatorId)
		return mockTranslate.generatorCategory(CATEGORY, this.i18nRegistry)
	}

	/**
	 * 获取某生成器分类下的所有生成器
	 */
	getAllGenerators(generatorId: string): generator[] {
		const CATEGORY: generatorCategory = this.getGeneratorCategory(generatorId)
		const GENERATORS: generator[] = CATEGORY.generators.getAllGenerator()
		return GENERATORS.map((generator: generator) => {
			return mockTranslate.generator(generator, this.i18nRegistry)
		})
	}

	/**
	 * 获取某生成器
	 */
	getGenerator(categoryId: string, generatorId: string): generator {
		const CATEGORY: generatorCategory = this.getGeneratorCategory(categoryId)
		const GENERATOR: generator = CATEGORY.generators.getGenerator(generatorId)
		return mockTranslate.generator(GENERATOR, this.i18nRegistry)
	}

	/**
	 * 获取所有处理器分类
	 */
	getAllProcessorCategory(): processorCategory[] {
		const CATEGORY: processorCategory[] = this.processorRegistry.getAllCategories()
		return CATEGORY.map((generator: processorCategory) => {
			return mockTranslate.processorCategory(generator, this.i18nRegistry)
		})
	}

	/**
	 * 获取某处理器分类
	 */
	getProcessorCategory(generatorId: string): processorCategory {
		const CATEGORY: processorCategory = this.processorRegistry.getCategory(generatorId)
		return mockTranslate.processorCategory(CATEGORY, this.i18nRegistry)
	}

	/**
	 * 获取某处理器分类下的所有处理器
	 */
	getAllProcessors(categoryId: string): processor[] {
		const CATEGORY: processorCategory = this.getProcessorCategory(categoryId)
		const ALL_PROCESSORS: processor[] = CATEGORY.processors.getAllProcessors()
		return ALL_PROCESSORS.map((processor: processor) => {
			return mockTranslate.processor(processor, this.i18nRegistry)
		})
	}

	/**
	 * 获某处理器
	 */
	getProcessor(categoryId: string, processorId: string): processor {
		const CATEGORY: processorCategory = this.getProcessorCategory(categoryId)
		const PROCESSOR: processor = CATEGORY.processors.getProcessor(processorId)
		return mockTranslate.processor(PROCESSOR, this.i18nRegistry)
	}

	/**
	 * 获取某生成器下的所有处理器
	 */
	getGeneratorAllProcessor(categoryId: string, generatorId: string): processor[] {
		const GENERATOR: generator = this.getGenerator(categoryId, generatorId)
		const ALL_PROCESSORS: processor[] = GENERATOR.getAllProcessors()
		return ALL_PROCESSORS.map((processor: processor) => {
			return mockTranslate.processor(processor, this.i18nRegistry)
		})
	}

	/**
	 * 获取某生成器下的某处理器
	 */
	getGeneratorProcessor(categoryId: string, generatorId: string, processorId: string): processor {
		const GENERATOR: generator = this.getGenerator(categoryId, generatorId)
		const PROCESSOR: processor = GENERATOR.getProcessor(processorId)
		return mockTranslate.processor(PROCESSOR, this.i18nRegistry)
	}

	/**
	 * 获取所有生成器分类信息
	 */
	getAllGeneratorCategoryInfo(): generatorCategoryInfo[] {
		const ALL_CATEGORY: generatorCategory[] = this.getAllGeneratorCategory()
		return ALL_CATEGORY.map((category: generatorCategory) => {
			return stripToInfo(category, ["generators"])
		})
	}

	/**
	 * 获取某生成器分类信息
	 */
	getGeneratorCategoryInfo(categoryId: string): generatorCategoryInfo {
		const CATEGORY: generatorCategory = this.getGeneratorCategory(categoryId)
		return stripToInfo(CATEGORY, ["generators"])
	}

	/**
	 * 获取某生成器分类下的所有生成器信息
	 */
	getAllGeneratorsInfo(categoryId: string): generatorInfo[] {
		const GENERATORS: generator[] = this.getAllGenerators(categoryId)
		return GENERATORS.map((generator: generator) => {
			return stripToInfo(generator, ["generate", "processors", "registerProcessor", "getProcessor", "getAllProcessors"])
		})
	}

	/**
	 * 获取某生成器信息
	 */
	getGeneratorInfo(categoryId: string, generatorId: string): generatorInfo {
		const GENERATOR: generator = this.getGenerator(categoryId, generatorId)
		return stripToInfo(GENERATOR, ["generate", "processors", "registerProcessor", "getProcessor", "getAllProcessors"])
	}

	/**
	 * 获取生成器信息组
	 */
	getGeneratorGroups(): generatorGroup[] {
		const ALL_CATEGORY: generatorCategoryInfo[] = this.getAllGeneratorCategoryInfo()
		const RESULT: generatorGroup[] = []
		for (const CATEGORY of ALL_CATEGORY) {
			const GENERATORS: generatorInfo[] = this.getAllGeneratorsInfo(CATEGORY.id)
			if (GENERATORS.length) {
				RESULT.push({
					id: CATEGORY.id,
					title: CATEGORY.title,
					description: CATEGORY.description,
					generators: GENERATORS
				})
			}
		}
		return RESULT
	}

	/**
	 * 获取所有处理器分类信息
	 */
	getAllProcessorCategoryInfo(): processorCategoryInfo[] {
		const CATEGORY: processorCategory[] = this.getAllProcessorCategory()
		return CATEGORY.map((category: processorCategory) => {
			return stripToInfo(category, ["processors"])
		})
	}

	/**
	 * 获取某处理器分类信息
	 */
	getProcessorCategoryInfo(categoryId: string): processorCategoryInfo {
		const CATEGORY: processorCategory = this.getProcessorCategory(categoryId)
		return stripToInfo(CATEGORY, ["processors"])
	}

	/**
	 * 获取某处理器分类下的所有处理器信息
	 */
	getAllProcessorsInfo(categoryId: string): processorInfo[] {
		const ALL_PROCESSORS: processor[] = this.getAllProcessors(categoryId)
		return ALL_PROCESSORS.map((processor: processor) => {
			return stripToInfo(processor, ["apply"])
		})
	}

	/**
	 * 获某处理器信息
	 */
	getProcessorInfo(categoryId: string, processorId: string): processorInfo {
		const PROCESSOR: processor = this.getProcessor(categoryId, processorId)
		return stripToInfo(PROCESSOR, ["apply"])
	}

	/**
	 * 获取某生成器下的所有处理器信息
	 */
	getGeneratorAllProcessorInfo(categoryId: string, generatorId: string): processorInfo[] {
		const ALL_PROCESSORS: processor[] = this.getGeneratorAllProcessor(categoryId, generatorId)
		return ALL_PROCESSORS.map((processor: processor) => {
			return stripToInfo(processor, ["apply"])
		})
	}

	/**
	 * 获取某生成器下的某处理器信息
	 */
	getGeneratorProcessorInfo(categoryId: string, generatorId: string, processorId: string): processorInfo {
		const PROCESSOR: processor = this.getGeneratorProcessor(categoryId, generatorId, processorId)
		return stripToInfo(PROCESSOR, ["apply"])
	}

	/**
	 * 获取处理器信息组
	 */
	getProcessorGroups(): processorGroup[] {
		const ALL_CATEGORY: processorCategoryInfo[] = this.getAllProcessorCategoryInfo()
		const RESULT: processorGroup[] = []
		for (const CATEGORY of ALL_CATEGORY) {
			const PROCESSORS: processorInfo[] = this.getAllProcessorsInfo(CATEGORY.id)
			if (PROCESSORS.length) {
				RESULT.push({
					id: CATEGORY.id,
					title: CATEGORY.title,
					description: CATEGORY.description,
					processor: PROCESSORS
				})
			}
		}
		return RESULT
	}

	/**
	 * 获取某生成器的处理器信息组
	 */
	getGeneratorProcessorGroups(categoryId: string, generatorId: string): processorGroup[] {
		const CATEGORY: generatorInfo = this.getGeneratorInfo(categoryId, generatorId)
		const RESULT: processorGroup[] = []
		CATEGORY?.processorIds?.forEach(processorId => {
			const PROCESSOR: processorCategoryInfo = this.getProcessorCategoryInfo(processorId)
			RESULT.push({
				id: PROCESSOR.id,
				title: PROCESSOR.title,
				description: PROCESSOR.description,
				processor: this.getAllProcessorsInfo(PROCESSOR.id)
			})
		})
		return RESULT
	}

	/**
	 * 调用生成器生成
	 */
	generateData(categoryId: string, generatorId: string, params?: any): any {
		const GENERATOR: generator = this.getGenerator(categoryId, generatorId)
		const FINAL_PARAMS = normalizeCallParams(GENERATOR.params, params)
		return FINAL_PARAMS === undefined ? GENERATOR.generate() : GENERATOR.generate(FINAL_PARAMS)
	}

	/**
	 * 应用处理器
	 */
	applyProcessor(categoryId: string, processorId: string, value: any, params?: any): any {
		const PROCESSOR = this.getProcessor(categoryId, processorId)
		const FINAL_PARAMS = normalizeCallParams(PROCESSOR.params, params)
		return FINAL_PARAMS === undefined ? PROCESSOR.apply(value) : PROCESSOR.apply(value, FINAL_PARAMS)
	}

	/**
	 * 应用处理器
	 * 使用生成器允许的处理器, 防止异常调用
	 */
	applyProcessor2(categoryId: string, generatorId: string, processorId: string, value: any, params?: any): any {
		const GENERATOR = this.getGenerator(categoryId, generatorId)
		const PROCESSOR = GENERATOR.getProcessor(processorId)
		const FINAL_PARAMS = normalizeCallParams(PROCESSOR.params, params)
		return FINAL_PARAMS === undefined ? PROCESSOR.apply(value) : PROCESSOR.apply(value, FINAL_PARAMS)
	}

	/**
	 * 生成模板
	 */
	generateTemplate(config: generateTemplateConfig): string {
		const {category, generator, params = {}, processors = []} = config
		if (!category) return "{{}}"
		let template = `{{$${category}}}`
		if (!generator) return template
		template = `{{$${category}.${generator}`
		const GENERATOR = this.getGeneratorInfo(category, generator)
		if (GENERATOR?.params && Object.keys(params).length > 0) {
			template += buildParamsString(GENERATOR.params, params)
		}
		for (const P of processors) {
			if (!P?.id) continue
			template += `|${P.id}`
			const PROCESSOR = this.getGeneratorProcessorInfo(category, generator, P.id)
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
	templateGenerateData(template: any): any {
		if (typeof template !== "string") return template
		if (!template.startsWith("{{")) return template
		const CONTENT = template.trim().replace(/^\{\{\$/, "").replace(/}}$/, "")
		const PARTS = splitByTopLevelPipe(CONTENT)
		const MAIN = PARTS.shift()
		if (!MAIN) return template
		const MAIN_MATCH = MAIN.match(/^(\w+)\.(\w+)(?:\((.*)\))?$/)
		if (!MAIN_MATCH) throw new Error(`Invalid template: ${template}`)
		const [, CATEGORY_ID, GENERATOR_ID, MAIN_PARAMS_STR] = MAIN_MATCH
		const RESOLVED_MAIN_PARAMS_STR = this.resolveTemplate(MAIN_PARAMS_STR)
		const MAIN_PARAMS = parseParams(RESOLVED_MAIN_PARAMS_STR)
		let value = this.generateData(CATEGORY_ID, GENERATOR_ID, MAIN_PARAMS)
		// 应用处理器
		for (const P of PARTS) {
			const MATCH = P.match(/^(\w+)(?:\((.*)\))?$/)
			if (!MATCH) continue
			const [, PROCESSOR_ID, PARAM_STR] = MATCH
			const RAW_PARAMS = parseParams(PARAM_STR)
			const RESOLVED_PARAMS = Array.isArray(RAW_PARAMS) ? RAW_PARAMS.map(value => resolveParamValue(value, this)) : resolveParamValue(RAW_PARAMS, this)
			value = this.applyProcessor2(CATEGORY_ID, GENERATOR_ID, PROCESSOR_ID, value, RESOLVED_PARAMS)
		}
		return value
	}

	/**
	 * 解析模板字符串中的所有模板
	 */
	resolveTemplate(string: string): any {
		const TEMPLATES: string[] = this.extractTemplates(string)
		if (!TEMPLATES.length) return string
		let result: string = string
		for (const TEMPLATE of TEMPLATES) result = result.replace(TEMPLATE, String(this.templateGenerateData(TEMPLATE)))
		return result
	}
}


export const createMockService = (options: mockServiceOptions = {}) => {
	const {generatorRegisters = [], processorRegisters = [], i18nRegisters = []} = options
	return new mockService({
		generatorRegisters: [
			generatorStringCategory, generatorLoremCategory, generatorNumberCategory, generatorDateCategory,
			generatorPersonCategory, ...generatorRegisters
		],
		processorRegisters: [
			processorStringCategory, processorEncodingDecodingCategory, processorDateCategory,
			...processorRegisters
		],
		i18nRegisters: [i18nZhCN, i18nEnUS, ...i18nRegisters]
	})
}

export default createMockService()