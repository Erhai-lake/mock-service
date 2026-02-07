import {
	generator,
	generatorInfo,
	mockService,
	processor,
	processorCategory,
	processorCategoryInfo,
	processorGroup,
	processorInfo
} from "../index"
import {stripToInfo} from "../tools/stripToInfo"
import {normalizeCallParams} from "../tools/template/normalizeCallParams"
import mockTranslate from "../tools/mockTranslate"

export class processorEngine {
	constructor(private service: mockService) {}

	getAllProcessorCategory(): processorCategory[] {
		const CATEGORY: processorCategory[] = this.service.internal.processorRegistry.getAllCategories()
		return CATEGORY.map((generator: processorCategory) => {
			return mockTranslate.processorCategory(generator, this.service.internal.i18nRegistry)
		})
	}

	getProcessorCategory(processorCategoryId: string): processorCategory {
		const CATEGORY: processorCategory = this.service.internal.processorRegistry.getCategory(processorCategoryId)
		return mockTranslate.processorCategory(CATEGORY, this.service.internal.i18nRegistry)
	}

	getAllProcessors(processorCategoryId: string): processor[] {
		const CATEGORY: processorCategory = this.getProcessorCategory(processorCategoryId)
		const ALL_PROCESSORS: processor[] = CATEGORY.processors.getAllProcessors()
		return ALL_PROCESSORS.map((processor: processor) => {
			return mockTranslate.processor(processor, this.service.internal.i18nRegistry)
		})
	}

	getProcessor(processorCategoryId: string, processorId: string): processor {
		const CATEGORY: processorCategory = this.getProcessorCategory(processorCategoryId)
		const PROCESSOR: processor = CATEGORY.processors.getProcessor(processorId)
		return mockTranslate.processor(PROCESSOR, this.service.internal.i18nRegistry)
	}

	getGeneratorAllProcessor(generatorCategoryId: string, generatorId: string): processor[] {
		const GENERATOR: generator = this.service.getGenerator(generatorCategoryId, generatorId)
		const ALL_PROCESSORS: processor[] = GENERATOR.getAllProcessors()
		return ALL_PROCESSORS.map((processor: processor) => {
			return mockTranslate.processor(processor, this.service.internal.i18nRegistry)
		})
	}

	getGeneratorProcessor(generatorCategoryId: string, generatorId: string, processorId: string): processor {
		const GENERATOR: generator = this.service.getGenerator(generatorCategoryId, generatorId)
		const PROCESSOR: processor = GENERATOR.getProcessor(processorId)
		return mockTranslate.processor(PROCESSOR, this.service.internal.i18nRegistry)
	}

	getAllProcessorCategoryInfo(): processorCategoryInfo[] {
		const CATEGORY: processorCategory[] = this.getAllProcessorCategory()
		return CATEGORY.map((category: processorCategory) => {
			return stripToInfo(category, ["processors"])
		})
	}

	getProcessorCategoryInfo(processorCategoryId: string): processorCategoryInfo {
		const CATEGORY: processorCategory = this.getProcessorCategory(processorCategoryId)
		return stripToInfo(CATEGORY, ["processors"])
	}

	getAllProcessorsInfo(processorCategoryId: string): processorInfo[] {
		const ALL_PROCESSORS: processor[] = this.getAllProcessors(processorCategoryId)
		return ALL_PROCESSORS.map((processor: processor) => {
			return stripToInfo(processor, ["apply"])
		})
	}

	getProcessorInfo(processorCategoryId: string, processorId: string): processorInfo {
		const PROCESSOR: processor = this.getProcessor(processorCategoryId, processorId)
		return stripToInfo(PROCESSOR, ["apply"])
	}

	getGeneratorAllProcessorInfo(generatorCategoryId: string, generatorId: string): processorInfo[] {
		const ALL_PROCESSORS: processor[] = this.getGeneratorAllProcessor(generatorCategoryId, generatorId)
		return ALL_PROCESSORS.map((processor: processor) => {
			return stripToInfo(processor, ["apply"])
		})
	}

	getGeneratorProcessorInfo(generatorCategoryId: string, generatorId: string, processorId: string): processorInfo {
		const PROCESSOR: processor = this.getGeneratorProcessor(generatorCategoryId, generatorId, processorId)
		return stripToInfo(PROCESSOR, ["apply"])
	}

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

	getGeneratorProcessorGroups(generatorCategoryId: string, generatorId: string): processorGroup[] {
		const CATEGORY: generatorInfo = this.service.getGeneratorInfo(generatorCategoryId, generatorId)
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

	applyProcessor(processorCategoryId: string, processorId: string, value: any, params?: any): any {
		const PROCESSOR = this.getProcessor(processorCategoryId, processorId)
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