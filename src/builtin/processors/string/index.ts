import type {CategoryRegistry, ProcessorCategoryRegistry} from "../../../registries"
import registerLower from "./Lower"
import registerUpper from "./Upper"
import registerLength from "./Length"
import registerSubstr from "./Substr"
import registerConcat from "./Concat"
import registerLConcat from "./LConcat"
import registerNumber from "./Number"
import registerPadStart from "./PadStart"
import registerPadEnd from "./PadEnd"

export default function encodingDecoding(categoryRegistry: CategoryRegistry, processorRegistry: ProcessorCategoryRegistry) {
	const CATEGORY = processorRegistry.registerCategory({
		id: "string",
		title: "字符串相关",
		description: "字符串相关的处理器"
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
