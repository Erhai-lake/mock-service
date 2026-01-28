import type {CategoryRegistry} from "../../../registries"
import registerSentence from "./Sentence"
import registerSentences from "./Sentences"
import registerParagraph from "./Paragraph"
import registerParagraphs from "./Paragraphs"
import registerWord from "./Word"
import registerWords from "./Words"
import registerSlug from "./Slug"

export default function loremCategory(categoryRegistry: CategoryRegistry) {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "lorem",
		title: "category.lorem.title",
		description: "category.lorem.description"
	})

	registerSentence(CATEGORY)
	registerSentences(CATEGORY)
	registerParagraph(CATEGORY)
	registerParagraphs(CATEGORY)
	registerWord(CATEGORY)
	registerWords(CATEGORY)
	registerSlug(CATEGORY)
}
