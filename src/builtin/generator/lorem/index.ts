import type {generatorCategoryRegistry} from "../../../registries"
import {registerSentence} from "./registerSentence"
import {registerSentences} from "./registerSentences"
import {registerParagraph} from "./registerParagraph"
import {registerParagraphs} from "./registerParagraphs"
import {registerWord} from "./registerWord"
import {registerWords} from "./registerWords"
import {registerSlug} from "./registerSlug"

export const generatorLoremCategory = (categoryRegistry: generatorCategoryRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "lorem",
		title: "generator.lorem.title",
		description: "generator.lorem.description"
	})

	registerSentence(CATEGORY)
	registerSentences(CATEGORY)
	registerParagraph(CATEGORY)
	registerParagraphs(CATEGORY)
	registerWord(CATEGORY)
	registerWords(CATEGORY)
	registerSlug(CATEGORY)
}
