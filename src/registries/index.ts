import {CategoryRegistry} from "./CategoryRegistry"
import {ProcessorCategoryRegistry} from "./ProcessorCategoryRegistry"
import {I18nRegistry} from "./I18nRegistry"

export type {CategoryRegistry, ProcessorCategoryRegistry, I18nRegistry}

export function createCategoryRegistry() {
	return new CategoryRegistry()
}

export function createProcessorCategoryRegistry() {
	return new ProcessorCategoryRegistry()
}

export function createI18nRegistry() {
	return new I18nRegistry()
}
