import {generator, mockService} from "../index"
import {normalizeCallParams} from "../tools/template/normalizeCallParams"

export class generatorProcessorEngine {
	constructor(private service: mockService) {
	}

	private _createContext() {
		return {
			getVar: (KEY: string) => this.service.getVar(KEY),
			setVar: (KEY: string, VALUE: any, IS_RETURN: boolean = false) => this.service.setVar(KEY, VALUE, IS_RETURN),
			setVars: (VARS: Record<string, any>) => this.service.setVars(VARS),
			clearVar: () => this.service.clearVar()
		}
	}

	private handleError(error: any, fallbackValue: string): never | string {
		const RAW_MESSAGE = error instanceof Error ? error.message : String(error)
		let finalMessage: string
		if (RAW_MESSAGE.includes("|")) {
			const [KEY, PARAMS_STR] = RAW_MESSAGE.split("|")
			try {
				const PARAMS = JSON.parse(PARAMS_STR)
				finalMessage = this.service.translate(KEY, PARAMS)
			} catch {
				finalMessage = this.service.translate(RAW_MESSAGE)
			}
		} else {
			finalMessage = this.service.translate(RAW_MESSAGE)
		}
		if (this.service.internal.throwError) {
			throw new Error(finalMessage)
		} else {
			console.error(finalMessage)
			return fallbackValue
		}
	}

	generateData(generatorCategoryId: string, generatorId: string, params?: any): any {
		try {
			const GENERATOR: generator = this.service.getGenerator(generatorCategoryId, generatorId)
			const FINAL_PARAMS = normalizeCallParams(GENERATOR.params, params)
			const CONTEXT = this._createContext()
			return FINAL_PARAMS === undefined ? GENERATOR.generate({}, CONTEXT) : GENERATOR.generate(FINAL_PARAMS, CONTEXT)
		} catch (error) {
			return this.handleError(error, `${generatorCategoryId}.${generatorId}:${JSON.stringify(params)}`)
		}
	}

	applyGlobalProcessor(processorId: string, value: any, params?: any): any {
		let targetProcessor: any = null
		const CATEGORIES = this.service.getAllProcessorCategory()
		for (const ITEM of CATEGORIES) {
			try {
				const PROCESSOR = ITEM.processors.getProcessor(processorId)
				if (PROCESSOR) {
					targetProcessor = PROCESSOR
					break
				}
			} catch {
			}
		}
		if (!targetProcessor) {
			const ERR_KEY = `error.processorNotFound|${JSON.stringify({id: processorId})}`
			return this.handleError(ERR_KEY, `global.${processorId}:${value}:${JSON.stringify(params)}`)
		}
		try {
			const FINAL_PARAMS = normalizeCallParams(targetProcessor.params, params)
			const CONTEXT = this._createContext()
			return FINAL_PARAMS === undefined ? targetProcessor.apply(value, {}, CONTEXT) : targetProcessor.apply(value, FINAL_PARAMS, CONTEXT)
		} catch (error) {
			return this.handleError(error, `global.${processorId}:${value}:${JSON.stringify(params)}`)
		}
	}

	applyProcessor(generatorCategoryId: string, generatorId: string, processorId: string, value: any, params?: any): any {
		try {
			const GENERATOR = this.service.getGenerator(generatorCategoryId, generatorId)
			const PROCESSOR = GENERATOR.getProcessor(processorId)
			const FINAL_PARAMS = normalizeCallParams(PROCESSOR.params, params)
			const CONTEXT = this._createContext()
			return FINAL_PARAMS === undefined ? PROCESSOR.apply(value, {}, CONTEXT) : PROCESSOR.apply(value, FINAL_PARAMS, CONTEXT)
		} catch (error) {
			return this.handleError(error, `${generatorCategoryId}.${generatorId}.${processorId}:${value}:${JSON.stringify(params)}`)
		}
	}

	customExpression(expression: string): any {
		const CONTEXT = this._createContext()
		let finalCode = expression.trim()
		try {
			// 单行且不是变量声明, 没有 return, 则补上 return
			if (!finalCode.includes("return")) {
				if (!/^(const|let|var|if|for|while|function|class)\s/.test(finalCode)) {
					finalCode = `return ${finalCode}`
				}
			}
			const RUNNER = new Function("context", finalCode)
			return RUNNER(CONTEXT)
		} catch (error) {
			console.error("[Expression Error]:", error)
			return `expression_error: ${expression}`
		}
	}
}