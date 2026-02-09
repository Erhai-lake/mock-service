import {generator, generatorCategory, mockService, processor, processorCategory,} from "../index"

export class getOriginalEngine {
	constructor(private service: mockService) {
	}

	getAllGeneratorCategory(): generatorCategory[] {
		const ALL_CATEGORY: generatorCategory[] = this.service.internal.generatorRegistry.getAllCategories()
		return ALL_CATEGORY.map((generator: generatorCategory) => {
			return this.service.translateGeneratorCategory(generator)
		})
	}

	getGeneratorCategory(generatorCategoryId: string): generatorCategory {
		const CATEGORY: generatorCategory = this.service.internal.generatorRegistry.getCategory(generatorCategoryId)
		return this.service.translateGeneratorCategory(CATEGORY)
	}

	getAllGenerators(generatorCategoryId: string): generator[] {
		const CATEGORY: generatorCategory = this.getGeneratorCategory(generatorCategoryId)
		const GENERATORS: generator[] = CATEGORY.generators.getAllGenerator()
		return GENERATORS.map((generator: generator) => {
			return this.service.translateGenerator(generator)
		})
	}

	getGenerator(generatorCategoryId: string, generatorId: string): generator {
		const CATEGORY: generatorCategory = this.getGeneratorCategory(generatorCategoryId)
		const GENERATOR: generator = CATEGORY.generators.getGenerator(generatorId)
		return this.service.translateGenerator(GENERATOR)
	}

	getAllProcessorCategory(): processorCategory[] {
		const CATEGORY: processorCategory[] = this.service.internal.processorRegistry.getAllCategories()
		return CATEGORY.map((generator: processorCategory) => {
			return this.service.translateProcessorCategory(generator)
		})
	}

	getProcessorCategory(processorCategoryId: string): processorCategory {
		const CATEGORY: processorCategory = this.service.internal.processorRegistry.getCategory(processorCategoryId)
		return this.service.translateProcessorCategory(CATEGORY)
	}

	getAllProcessors(processorCategoryId: string): processor[] {
		const CATEGORY: processorCategory = this.getProcessorCategory(processorCategoryId)
		const ALL_PROCESSORS: processor[] = CATEGORY.processors.getAllProcessors()
		return ALL_PROCESSORS.map((processor: processor) => {
			return this.service.translateProcessor(processor)
		})
	}

	getProcessor(processorCategoryId: string, processorId: string): processor {
		const CATEGORY: processorCategory = this.getProcessorCategory(processorCategoryId)
		const PROCESSOR: processor = CATEGORY.processors.getProcessor(processorId)
		return this.service.translateProcessor(PROCESSOR)
	}

	getGeneratorAllProcessor(generatorCategoryId: string, generatorId: string): processor[] {
		const GENERATOR: generator = this.service.getGenerator(generatorCategoryId, generatorId)
		const ALL_PROCESSORS: processor[] = GENERATOR.getAllProcessors()
		return ALL_PROCESSORS.map((processor: processor) => {
			return this.service.translateProcessor(processor)
		})
	}

	getGeneratorProcessor(generatorCategoryId: string, generatorId: string, processorId: string): processor {
		const GENERATOR: generator = this.service.getGenerator(generatorCategoryId, generatorId)
		const PROCESSOR: processor = GENERATOR.getProcessor(processorId)
		return this.service.translateProcessor(PROCESSOR)
	}
}