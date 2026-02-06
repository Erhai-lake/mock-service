import {generatorCategory, generator, processorCategory, processor} from "../index"
import type {i18nRegistry} from "../registries"

class mockTranslate {

	generatorCategory = (category: generatorCategory, i18nRegistry: i18nRegistry) => ({
		...category,
		title: i18nRegistry.t(category.title),
		description: i18nRegistry.t(category.description)
	})

	generator = (generator: generator, i18nRegistry: i18nRegistry) => ({
		...generator,
		title: i18nRegistry.t(generator.title),
		description: i18nRegistry.t(generator.description),
		params: generator.params?.map((param) => ({
			...param,
			title: i18nRegistry.t(param.title),
			description: i18nRegistry.t(param.description)
		}))
	})

	processorCategory = (category: processorCategory, i18nRegistry: i18nRegistry) => ({
		...category,
		title: i18nRegistry.t(category.title),
		description: i18nRegistry.t(category.description)
	})

	processor = (processor: processor, i18nRegistry: i18nRegistry) => ({
		...processor,
		title: i18nRegistry.t(processor.title),
		description: i18nRegistry.t(processor.description),
		params: processor.params?.map((param) => ({
			...param,
			title: i18nRegistry.t(param.title),
			description: i18nRegistry.t(param.description)
		}))
	})
}

export default new mockTranslate()