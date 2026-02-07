import type {processorCategoryRegistry, processorCategory} from "../../dist/index"
import {registerTestFn1} from "./registerTestFn1"
import {registerTestFn2} from "./registerTestFn2"
import {registerTestFn3} from "./registerTestFn3"

export const processorTestCategory = (processorRegistry: processorCategoryRegistry) => {
	const CATEGORY: processorCategory = processorRegistry.registerCategory({
		id: "testProc",
		title: "processor.testProc.title",
		description: "processor.testProc.description"
	})

	registerTestFn1(CATEGORY)
	registerTestFn2(CATEGORY)
	registerTestFn3(CATEGORY)
}
