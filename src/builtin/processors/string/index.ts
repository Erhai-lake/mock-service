import type {processorCategoryRegistry} from "../../../registries"
import {registerLower} from "./registerLower"
import {registerUpper} from "./registerUpper"
import {registerLength} from "./registerLength"
import {registerSubstr} from "./registerSubstr"
import {registerConcat} from "./registerConcat"
import {registerLConcat} from "./registerLConcat"
import {registerNumber} from "./registerNumber"
import {registerPadStart} from "./registerPadStart"
import {registerPadEnd} from "./registerPadEnd"

export const processorStringCategory = (processorRegistry: processorCategoryRegistry) => {
	const CATEGORY = processorRegistry.registerCategory({
		id: "string",
		title: "processors.string.title",
		description: "processors.string.description"
	})

	registerLower(CATEGORY)
	registerUpper(CATEGORY)
	registerLength(CATEGORY)
	registerSubstr(CATEGORY)
	registerConcat(CATEGORY)
	registerLConcat(CATEGORY)
	registerNumber(CATEGORY)
	registerPadStart(CATEGORY)
	registerPadEnd(CATEGORY)
}
