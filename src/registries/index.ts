import {generatorCategoryRegistry} from "./generatorCategoryRegistry"
import {processorCategoryRegistry} from "./processorCategoryRegistry"
import {i18nRegistry} from "./i18nRegistry"

export type {generatorCategoryRegistry, processorCategoryRegistry, i18nRegistry}

export const createCategoryRegistry = () => {
	return new generatorCategoryRegistry()
}

export const createProcessorCategoryRegistry = () => {
	return new processorCategoryRegistry()
}

export const createI18nRegistry = () => {
	return new i18nRegistry()
}
