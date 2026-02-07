import {generator, generatorCategory, generatorCategoryInfo, generatorGroup, generatorInfo, mockService} from "../index"
import {stripToInfo} from "../tools/stripToInfo"
import {normalizeCallParams} from "../tools/template/normalizeCallParams"
import mockTranslate from "../tools/mockTranslate"

export class generatorEngine {
	constructor(private service: mockService) {}

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

	getAllGeneratorCategoryInfo(): generatorCategoryInfo[] {
		const ALL_CATEGORY: generatorCategory[] = this.getAllGeneratorCategory()
		return ALL_CATEGORY.map((category: generatorCategory) => {
			return stripToInfo(category, ["generators"])
		})
	}

	getGeneratorCategoryInfo(generatorCategoryId: string): generatorCategoryInfo {
		const CATEGORY: generatorCategory = this.getGeneratorCategory(generatorCategoryId)
		return stripToInfo(CATEGORY, ["generators"])
	}

	getAllGeneratorsInfo(generatorCategoryId: string): generatorInfo[] {
		const GENERATORS: generator[] = this.getAllGenerators(generatorCategoryId)
		return GENERATORS.map((generator: generator) => {
			return stripToInfo(generator, ["generate", "processors", "registerProcessor", "getProcessor", "getAllProcessors"])
		})
	}

	getGeneratorInfo(generatorCategoryId: string, generatorId: string): generatorInfo {
		const GENERATOR: generator = this.getGenerator(generatorCategoryId, generatorId)
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

	generateData(generatorCategoryId: string, generatorId: string, params?: any): any {
		const GENERATOR: generator = this.getGenerator(generatorCategoryId, generatorId)
		const FINAL_PARAMS = normalizeCallParams(GENERATOR.params, params)
		return FINAL_PARAMS === undefined ? GENERATOR.generate() : GENERATOR.generate(FINAL_PARAMS)
	}
}