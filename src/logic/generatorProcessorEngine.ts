import {generator, mockService} from "../index"
import {normalizeCallParams} from "../tools/template/normalizeCallParams"

export class generatorProcessorEngine {
	constructor(private service: mockService) {
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
			return FINAL_PARAMS === undefined ? GENERATOR.generate() : GENERATOR.generate(FINAL_PARAMS)
		} catch (error) {
			return this.handleError(error, `${generatorCategoryId}.${generatorId}:${JSON.stringify(params)}`)
		}
	}

	applyProcessor(processorCategoryId: string, processorId: string, value: any, params?: any): any {
		try {
			const PROCESSOR = this.service.getProcessor(processorCategoryId, processorId)
			const FINAL_PARAMS = normalizeCallParams(PROCESSOR.params, params)
			return FINAL_PARAMS === undefined ? PROCESSOR.apply(value) : PROCESSOR.apply(value, FINAL_PARAMS)
		} catch (error) {
			return this.handleError(error, `${processorCategoryId}.${processorId}:${value}:${JSON.stringify(params)}`)
		}
	}

	applyProcessor2(generatorCategoryId: string, generatorId: string, processorId: string, value: any, params?: any): any {
		try {
			const GENERATOR = this.service.getGenerator(generatorCategoryId, generatorId)
			const PROCESSOR = GENERATOR.getProcessor(processorId)
			const FINAL_PARAMS = normalizeCallParams(PROCESSOR.params, params)
			return FINAL_PARAMS === undefined ? PROCESSOR.apply(value) : PROCESSOR.apply(value, FINAL_PARAMS)
		} catch (error) {
			return this.handleError(error, `${generatorCategoryId}.${generatorId}.${processorId}:${value}:${JSON.stringify(params)}`)
		}
	}
}