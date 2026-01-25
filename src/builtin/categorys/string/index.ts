import type { CategoryRegistry, ProcessorCategoryRegistry } from "../../../registries"
import registerUUID from "./UuId"
import registerNanoId from "./NanoId"
import registerAlpha from "./Alpha"
import registerNumeric from "./Numeric"
import registerAlphanumeric from "./Alphanumeric"
import registerSymbol from "./Symbol"
import registerSample from "./Sample"
import registerFromCharacters from "./FromCharacters"
import registerBinary from "./Binary"
import registerOctal from "./Octal"
import registerHexadecimal from "./Hexadecimal"

export default function stringCategory(categoryRegistry: CategoryRegistry, processorRegistry: ProcessorCategoryRegistry) {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "string",
		title: "字符串 / UUID 等",
		description: "字符串相关的方法"
	})

	registerUUID(CATEGORY)
	registerNanoId(CATEGORY)
	registerAlpha(CATEGORY)
	registerNumeric(CATEGORY)
	registerAlphanumeric(CATEGORY)
	registerSymbol(CATEGORY)
	registerSample(CATEGORY)
	registerFromCharacters(CATEGORY)
	registerBinary(CATEGORY)
	registerOctal(CATEGORY)
	registerHexadecimal(CATEGORY)
}
