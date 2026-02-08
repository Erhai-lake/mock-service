import {
	generator,
	generatorCategory,
	generatorCategoryInfo,
	generatorGroup,
	generatorInfo,
	mockService,
	processor,
	processorCategory,
	processorCategoryInfo,
	processorGroup,
	processorInfo
} from "../index"
import {stripToInfo} from "../tools/stripToInfo"

export class getInfoEngine {
	constructor(private service: mockService) {
	}

	getAllGeneratorCategoryInfo(): generatorCategoryInfo[] {
		const ALL_CATEGORY: generatorCategory[] = this.service.getAllGeneratorCategory()
		return ALL_CATEGORY.map((category: generatorCategory) => {
			return stripToInfo(category, ["generators"])
		})
	}

	getGeneratorCategoryInfo(generatorCategoryId: string): generatorCategoryInfo {
		const CATEGORY: generatorCategory = this.service.getGeneratorCategory(generatorCategoryId)
		return stripToInfo(CATEGORY, ["generators"])
	}

	getAllGeneratorsInfo(generatorCategoryId: string): generatorInfo[] {
		const GENERATORS: generator[] = this.service.getAllGenerators(generatorCategoryId)
		return GENERATORS.map((generator: generator) => {
			return stripToInfo(generator, ["generate", "processors", "registerProcessor", "getProcessor", "getAllProcessors"])
		})
	}

	getGeneratorInfo(generatorCategoryId: string, generatorId: string): generatorInfo {
		const GENERATOR: generator = this.service.getGenerator(generatorCategoryId, generatorId)
		return stripToInfo(GENERATOR, ["generate", "processors", "registerProcessor", "getProcessor", "getAllProcessors"])
	}

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

	getAllProcessorCategoryInfo(): processorCategoryInfo[] {
		const CATEGORY: processorCategory[] = this.service.getAllProcessorCategory()
		return CATEGORY.map((category: processorCategory) => {
			return stripToInfo(category, ["processors"])
		})
	}

	getProcessorCategoryInfo(processorCategoryId: string): processorCategoryInfo {
		const CATEGORY: processorCategory = this.service.getProcessorCategory(processorCategoryId)
		return stripToInfo(CATEGORY, ["processors"])
	}

	getAllProcessorsInfo(processorCategoryId: string): processorInfo[] {
		const ALL_PROCESSORS: processor[] = this.service.getAllProcessors(processorCategoryId)
		return ALL_PROCESSORS.map((processor: processor) => {
			return stripToInfo(processor, ["apply"])
		})
	}

	getProcessorInfo(processorCategoryId: string, processorId: string): processorInfo {
		const PROCESSOR: processor = this.service.getProcessor(processorCategoryId, processorId)
		return stripToInfo(PROCESSOR, ["apply"])
	}

	getGeneratorAllProcessorInfo(generatorCategoryId: string, generatorId: string): processorInfo[] {
		const ALL_PROCESSORS: processor[] = this.service.getGeneratorAllProcessor(generatorCategoryId, generatorId)
		return ALL_PROCESSORS.map((processor: processor) => {
			return stripToInfo(processor, ["apply"])
		})
	}

	getGeneratorProcessorInfo(generatorCategoryId: string, generatorId: string, processorId: string): processorInfo {
		const PROCESSOR: processor = this.service.getGeneratorProcessor(generatorCategoryId, generatorId, processorId)
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
}