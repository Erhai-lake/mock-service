import {generatorCategory, generator, processorCategory, processor, mockService} from "../index"

export class translateEngine {

	constructor(private service: mockService) {
	}

	translateGeneratorCategory = (generatorCategory: generatorCategory) => ({
		...generatorCategory,
		title: this.service.internal.i18nRegistry.translate(generatorCategory.title),
		description: this.service.internal.i18nRegistry.translate(generatorCategory.description)
	})

	translateGenerator = (generator: generator) => ({
		...generator,
		title: this.service.internal.i18nRegistry.translate(generator.title),
		description: this.service.internal.i18nRegistry.translate(generator.description),
		params: generator.params?.map((param) => ({
			...param,
			title: this.service.internal.i18nRegistry.translate(param.title),
			description: this.service.internal.i18nRegistry.translate(param.description)
		}))
	})

	translateProcessorCategory = (processorCategory: processorCategory) => ({
		...processorCategory,
		title: this.service.internal.i18nRegistry.translate(processorCategory.title),
		description: this.service.internal.i18nRegistry.translate(processorCategory.description)
	})

	translateProcessor = (processor: processor) => ({
		...processor,
		title: this.service.internal.i18nRegistry.translate(processor.title),
		description: this.service.internal.i18nRegistry.translate(processor.description),
		params: processor.params?.map((param) => ({
			...param,
			title: this.service.internal.i18nRegistry.translate(param.title),
			description: this.service.internal.i18nRegistry.translate(param.description)
		}))
	})
}