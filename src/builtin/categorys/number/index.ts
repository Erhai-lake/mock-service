import type {CategoryRegistry} from "../../../registries"
import registerInt from "./Int"
import registerPositiveInt from "./PositiveInt"
import registerNegativeInt from "./NegativeInt"
import registerBigInt from "./BigInt"
import registerFloat from "./Float"
import registerBinary from "./Binary"
import registerOctal from "./Octal"
import registerHexadecimal from "./Hexadecimal"

export default function numberCategory(categoryRegistry: CategoryRegistry) {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "number",
		title: "category.number.title",
		description: "category.number.description"
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
