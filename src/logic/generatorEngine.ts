import {mockService} from "../index"

export class generatorEngine {
	constructor(private service: mockService) {
	}

	addProcessorCategoryToGeneratorCategory(generatorCategoryId: string, processorCategoryId: string) {
		const CATEGORY = this.service.getGeneratorCategory(generatorCategoryId)
		CATEGORY.generators.addProcessorIdToAll(processorCategoryId)
		for (const GENERATOR of CATEGORY.generators.getAllGenerator()) {
			GENERATOR.clearProcessors()
			this.service.internal.resolveGeneratorProcessors(GENERATOR)
		}
	}

	removeProcessorCategoryFromGeneratorCategory(generatorCategoryId: string, processorCategoryId: string) {
		const CATEGORY = this.service.getGeneratorCategory(generatorCategoryId)
		CATEGORY.generators.removeProcessorIdFromAll(processorCategoryId)
		for (const GENERATOR of CATEGORY.generators.getAllGenerator()) {
			this.service.internal.resolveGeneratorProcessors(GENERATOR)
		}
	}

	addProcessorCategoryToGenerator(generatorCategoryId: string, generatorId: string, processorCategoryId: string) {
		const GENERATOR = this.service.getGenerator(generatorCategoryId, generatorId)
		if (!GENERATOR.processorIds) GENERATOR.processorIds = []
		if (!GENERATOR.processorIds.includes(processorCategoryId)) {
			GENERATOR.processorIds.push(processorCategoryId)
			this.service.internal.resolveGeneratorProcessors(GENERATOR)
		}
	}

	removeProcessorCategoryFromGenerator(generatorCategoryId: string, generatorId: string, processorCategoryId: string) {
		const GENERATOR = this.service.getGenerator(generatorCategoryId, generatorId)
		if (GENERATOR.processorIds) {
			GENERATOR.processorIds = GENERATOR.processorIds.filter(id => id !== processorCategoryId)
			GENERATOR.clearProcessors()
			this.service.internal.resolveGeneratorProcessors(GENERATOR)
		}
	}
}