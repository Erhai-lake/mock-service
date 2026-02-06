import type {generatorCategoryRegistry} from "../../../registries"
import {registerInt} from "./registerInt"
import {registerPositiveInt} from "./registerPositiveInt"
import {registerNegativeInt} from "./registerNegativeInt"
import {registerBigInt} from "./registerBigInt"
import {registerFloat} from "./registerFloat"
import {registerBinary} from "./registerBinary"
import {registerOctal} from "./registerOctal"
import {registerHexadecimal} from "./registerHexadecimal"

export const generatorNumberCategory = (categoryRegistry: generatorCategoryRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "number",
		title: "generator.number.title",
		description: "generator.number.description"
	})

	registerInt(CATEGORY)
	registerPositiveInt(CATEGORY)
	registerNegativeInt(CATEGORY)
	registerBigInt(CATEGORY)
	registerFloat(CATEGORY)
	registerBinary(CATEGORY)
	registerOctal(CATEGORY)
	registerHexadecimal(CATEGORY)
}
