import type {processorCategoryRegistry} from "../../../registries"
import {registerMd5} from "./registerMd5"
import {registerSha} from "./registerSha"
import {registerBase64} from "./registerBase64"
import {registerUnBase64} from "./registerUnBase64"
import {registerEncodeURIComponent} from "./registerEncodeURIComponent"
import {registerDecodeURIComponent} from "./registerDecodeURIComponent"

export const processorEncodingDecodingCategory = (processorRegistry: processorCategoryRegistry) => {
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
