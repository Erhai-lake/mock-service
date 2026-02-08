import type {generateTemplateConfig, mockService} from "../index"
import {buildParamsString} from "../tools/template/buildParamsString"
import {splitByTopLevelPipe} from "../tools/template/splitByTopLevelPipe"
import {parseParams} from "../tools/template/parseParams"
import {resolveParamValue} from "../tools/template/resolveParamValue"

export class templateEngine {
	constructor(private service: mockService) {
	}

	generateTemplate(config: generateTemplateConfig): string {
		const {category, generator, params = {}, processors = []} = config
		if (!category) return "{{}}"
		let template = `{{$${category}}}`
		if (!generator) return template
		template = `{{$${category}.${generator}`
		const GENERATOR = this.service.getGeneratorInfo(category, generator)
		if (GENERATOR?.params && Object.keys(params).length > 0) {
			template += buildParamsString(GENERATOR.params, params)
		}
		for (const P of processors) {
			if (!P?.id) continue
			template += `|${P.id}`
			const PROCESSOR = this.service.getGeneratorProcessorInfo(category, generator, P.id)
			if (PROCESSOR?.params) {
				template += buildParamsString(PROCESSOR.params, P.params)
			}
		}
		return template + "}}"
	}

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
		let value = this.service.generateData(CATEGORY_ID, GENERATOR_ID, MAIN_PARAMS)
		// 应用处理器
		for (const P of PARTS) {
			const MATCH = P.match(/^(\w+)(?:\((.*)\))?$/)
			if (!MATCH) continue
			const [, PROCESSOR_ID, PARAM_STR] = MATCH
			const RAW_PARAMS = parseParams(PARAM_STR)
			const RESOLVED_PARAMS = Array.isArray(RAW_PARAMS) ? RAW_PARAMS.map(value => resolveParamValue(value, this)) : resolveParamValue(RAW_PARAMS, this)
			value = this.service.applyProcessor2(CATEGORY_ID, GENERATOR_ID, PROCESSOR_ID, value, RESOLVED_PARAMS)
		}
		return value
	}

	resolveTemplate(string: string): any {
		const TEMPLATES: string[] = this.extractTemplates(string)
		if (!TEMPLATES.length) return string
		let result: string = string
		for (const TEMPLATE of TEMPLATES) result = result.replace(TEMPLATE, String(this.templateGenerateData(TEMPLATE)))
		return result
	}

	objectResolve(input: any, maxDepth = 10): any {
		if (maxDepth < 0) {
			return input
		}
		// 处理数组
		if (Array.isArray(input)) {
			return input.map(item => this.objectResolve(item, maxDepth - 1))
		}
		// 处理对象
		if (input !== null && typeof input === "object") {
			const NEW_OBJ: any = {}
			for (const KEY in input) {
				if (Object.prototype.hasOwnProperty.call(input, KEY)) {
					const SHOULD_RESOLVE = maxDepth > 0
					const RESOLVED_KEY = SHOULD_RESOLVE ? this.resolveTemplate(String(KEY)) : KEY
					NEW_OBJ[RESOLVED_KEY] = this.objectResolve(input[KEY], maxDepth - 1)
				}
			}
			return NEW_OBJ
		}
		// 处理字符串
		if (typeof input === "string") return this.resolveTemplate(input)
		return input
	}
}