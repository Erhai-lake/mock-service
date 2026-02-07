import type {generatorCategoryRegistry, generatorCategory} from "../../dist/index"
// import type {generatorCategoryRegistry, generatorCategory} from "@erhai_lake/mock-service"
import {registerTestFn1} from "./registerTestFn1"
import {registerTestFn2} from "./registerTestFn2"
import {registerTestFn3} from "./registerTestFn3"

export const generatorTestCategory = (categoryRegistry: generatorCategoryRegistry) => {
	const CATEGORY: generatorCategory = categoryRegistry.registerCategory({
		id: "testGen",
		title: "generator.testGen.title",
		description: "generator.testGen.description"
	})

	registerTestFn1(CATEGORY)
	registerTestFn2(CATEGORY)
	registerTestFn3(CATEGORY)
}
