import type {CategoryRegistry} from "../../../registries"
import registerFullName from "./FullName"
import registerLastName from "./LastName"
import registerFirstName from "./FirstName"
import registerFullNameEn from "./FullNameEn"
import registerSex from "./Sex"

export default function loremCategory(categoryRegistry: CategoryRegistry) {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "person",
		title: "category.person.title",
		description: "category.person.description"
	})

	registerFullName(CATEGORY)
	registerLastName(CATEGORY)
	registerFirstName(CATEGORY)
	registerFullNameEn(CATEGORY)
	registerSex(CATEGORY)
}
