import type {ProcessorCategoryRegistry} from "../../../registries"
import registerMd5 from "./Md5"
import registerSha from "./Sha"
import registerBase64 from "./Base64"
import registerUnBase64 from "./UnBase64"
import registerEncodeURIComponent from "./EncodeURIComponent"
import registerDecodeURIComponent from "./DecodeURIComponent"

export default function encodingDecoding(processorRegistry: ProcessorCategoryRegistry) {
	const CATEGORY = processorRegistry.registerCategory({
		id: "encodingDecoding",
		title: "processors.encodingDecoding.title",
		description: "processors.encodingDecoding.description"
	})
	registerMd5(CATEGORY)
	registerSha(CATEGORY)
	registerBase64(CATEGORY)
	registerUnBase64(CATEGORY)
	registerEncodeURIComponent(CATEGORY)
	registerDecodeURIComponent(CATEGORY)
}
