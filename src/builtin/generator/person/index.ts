import type {generatorCategoryRegistry} from "../../../registries"
import {registerFullName} from "./registerFullName"
import {registerLastName} from "./registerLastName"
import {registerFirstName} from "./registerFirstName"
import {registerFullNameEn} from "./registerFullNameEn"
import {registerSex} from "./registerSex"

export const generatorPersonCategory = (categoryRegistry: generatorCategoryRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "person",
		title: "generator.person.title",
		description: "generator.person.description"
	})

	registerFullName(CATEGORY)
	registerLastName(CATEGORY)
	registerFirstName(CATEGORY)
	registerFullNameEn(CATEGORY)
	registerSex(CATEGORY)
}
