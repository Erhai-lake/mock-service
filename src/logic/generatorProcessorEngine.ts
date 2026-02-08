import {generator, mockService} from "../index"
import {normalizeCallParams} from "../tools/template/normalizeCallParams"

export class generatorProcessorEngine {
	constructor(private service: mockService) {
	}

	generateData(generatorCategoryId: string, generatorId: string, params?: any): any {
		const GENERATOR: generator = this.service.getGenerator(generatorCategoryId, generatorId)
		const FINAL_PARAMS = normalizeCallParams(GENERATOR.params, params)
		return FINAL_PARAMS === undefined ? GENERATOR.generate() : GENERATOR.generate(FINAL_PARAMS)
	}

	applyProcessor(processorCategoryId: string, processorId: string, value: any, params?: any): any {
		const PROCESSOR = this.service.getProcessor(processorCategoryId, processorId)
		const FINAL_PARAMS = normalizeCallParams(PROCESSOR.params, params)
		return FINAL_PARAMS === undefined ? PROCESSOR.apply(value) : PROCESSOR.apply(value, FINAL_PARAMS)
	}

	applyProcessor2(generatorCategoryId: string, generatorId: string, processorId: string, value: any, params?: any): any {
		const GENERATOR = this.service.getGenerator(generatorCategoryId, generatorId)
		const PROCESSOR = GENERATOR.getProcessor(processorId)
		const FINAL_PARAMS = normalizeCallParams(PROCESSOR.params, params)
		return FINAL_PARAMS === undefined ? PROCESSOR.apply(value) : PROCESSOR.apply(value, FINAL_PARAMS)
	}
}