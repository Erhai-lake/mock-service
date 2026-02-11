import type {generatorCategoryRegistry} from "../../../registries"
import {registerGetVar} from "./registerGetVar"
import {registerSetVar} from "./registerSetVar"
import {registerClearVar} from "./registerClearVar"

export const generatorVarCategory = (categoryRegistry: generatorCategoryRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "var",
		title: "generator.var.title",
		description: "generator.var.description"
	})

	registerGetVar(CATEGORY)
	registerSetVar(CATEGORY)
	registerClearVar(CATEGORY)
}
