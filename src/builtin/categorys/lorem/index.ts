import type { CategoryRegistry, ProcessorCategoryRegistry } from "../../../registries"
import registerSentence from "./Sentence"
import registerSentences from "./Sentences"
import registerParagraph from "./Paragraph"
import registerParagraphs from "./Paragraphs"
import registerWord from "./Word"
import registerWords from "./Words"
import registerSlug from "./Slug"

export default function loremCategory(categoryRegistry: CategoryRegistry, processorRegistry: ProcessorCategoryRegistry) {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "lorem",
		title: "单词 / 句子 / 段落 等",
		description: "Lorem Ipsum 相关的方法"
	})

	registerSentence(CATEGORY)
	registerSentences(CATEGORY)
	registerParagraph(CATEGORY)
	registerParagraphs(CATEGORY)
	registerWord(CATEGORY)
	registerWords(CATEGORY)
	registerSlug(CATEGORY)
}
