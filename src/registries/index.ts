import {CategoryRegistry} from "./CategoryRegistry"
import {ProcessorCategoryRegistry} from "./ProcessorCategoryRegistry"

export type {CategoryRegistry, ProcessorCategoryRegistry}

export function createCategoryRegistry() {
	return new CategoryRegistry()
}

export function createProcessorCategoryRegistry() {
	return new ProcessorCategoryRegistry()
}
