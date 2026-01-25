import { CategoryRegistry } from "./CategoryRegistry"
import { ProcessorCategoryRegistry } from "./ProcessorCategoryRegistry"

export { CategoryRegistry, ProcessorCategoryRegistry }

export const CATEGORY_REGISTRY = new CategoryRegistry()
export const PROCESSOR_CATEGORY_REGISTRY = new ProcessorCategoryRegistry()
