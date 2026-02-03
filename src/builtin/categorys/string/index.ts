import type {CategoryRegistry} from "../../../registries"
import registerUUID from "./UuId"
import registerNanoId from "./NanoId"
import registerAlpha from "./Alpha"
import registerNumeric from "./Numeric"
import registerAlphanumeric from "./Alphanumeric"
import registerSymbol from "./Symbol"
import registerSample from "./Sample"
import registerCharacters from "./Characters"
import registerBinary from "./Binary"
import registerOctal from "./Octal"
import registerHexadecimal from "./Hexadecimal"

export default function stringCategory(categoryRegistry: CategoryRegistry) {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "string",
		title: "category.string.title",
		description: "category.string.description"
	})

	registerUUID(CATEGORY)
	registerNanoId(CATEGORY)
	registerAlpha(CATEGORY)
	registerNumeric(CATEGORY)
	registerAlphanumeric(CATEGORY)
	registerSymbol(CATEGORY)
	registerSample(CATEGORY)
	registerCharacters(CATEGORY)
	registerBinary(CATEGORY)
	registerOctal(CATEGORY)
	registerHexadecimal(CATEGORY)
}
