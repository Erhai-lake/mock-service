import type {ProcessorCategoryRegistry} from "../../../registries"
import registerLower from "./Lower"
import registerUpper from "./Upper"
import registerLength from "./Length"
import registerSubstr from "./Substr"
import registerConcat from "./Concat"
import registerLConcat from "./LConcat"
import registerNumber from "./Number"
import registerPadStart from "./PadStart"
import registerPadEnd from "./PadEnd"

export default function encodingDecoding(processorRegistry: ProcessorCategoryRegistry) {
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
