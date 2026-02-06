import type {generatorCategoryRegistry} from "../../../registries"
import {registerUUID} from "./registerUUID"
import {registerNanoId} from "./registerNanoId"
import {registerAlpha} from "./registerAlpha"
import {registerNumeric} from "./registerNumeric"
import {registerAlphanumeric} from "./registerAlphanumeric"
import {registerSymbol} from "./registerSymbol"
import {registerSample} from "./registerSample"
import {registerCharacters} from "./registerCharacters"
import {registerBinary} from "./registerBinary"
import {registerOctal} from "./registerOctal"
import {registerHexadecimal} from "./registerHexadecimal"

export const generatorStringCategory = (categoryRegistry: generatorCategoryRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "string",
		title: "generator.string.title",
		description: "generator.string.description"
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
