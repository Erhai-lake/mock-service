import {generator, generatorCategory, mockService, mockTranslate, processor, processorCategory,} from "../index"

export class getOriginalEngine {
	constructor(private service: mockService) {
	}

	getAllGeneratorCategory(): generatorCategory[] {
		const ALL_CATEGORY: generatorCategory[] = this.service.internal.generatorRegistry.getAllCategories()
		return ALL_CATEGORY.map((generator: generatorCategory) => {
			return mockTranslate.generatorCategory(generator, this.service.internal.i18nRegistry)
		})
	}

	getGeneratorCategory(generatorCategoryId: string): generatorCategory {
		const CATEGORY: generatorCategory = this.service.internal.generatorRegistry.getCategory(generatorCategoryId)
		return mockTranslate.generatorCategory(CATEGORY, this.service.internal.i18nRegistry)
	}

	getAllGenerators(generatorCategoryId: string): generator[] {
		const CATEGORY: generatorCategory = this.getGeneratorCategory(generatorCategoryId)
		const GENERATORS: generator[] = CATEGORY.generators.getAllGenerator()
		return GENERATORS.map((generator: generator) => {
			return mockTranslate.generator(generator, this.service.internal.i18nRegistry)
		})
	}

	getGenerator(generatorCategoryId: string, generatorId: string): generator {
		const CATEGORY: generatorCategory = this.getGeneratorCategory(generatorCategoryId)
		const GENERATOR: generator = CATEGORY.generators.getGenerator(generatorId)
		return mockTranslate.generator(GENERATOR, this.service.internal.i18nRegistry)
	}

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
}