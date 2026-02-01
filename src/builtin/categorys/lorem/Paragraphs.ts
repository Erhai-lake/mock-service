import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

export default function registerParagraphs(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "paragraphs",
		title: "category.lorem.paragraphs.title",
		description: "category.lorem.paragraphs.description",
		params: [
			{
				id: "language",
				title: "category.lorem.paragraphs.params.language.title",
				description: "category.lorem.paragraphs.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: "zh"
			},
			{
				id: "min",
				title: "category.lorem.paragraphs.params.min.title",
				description: "category.lorem.paragraphs.params.min.description",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.paragraphs.params.max.title",
				description: "category.lorem.paragraphs.params.max.description",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "newlines",
				title: "category.lorem.paragraphs.params.newlines.title",
				description: "category.lorem.paragraphs.params.newlines.description",
				type: "number",
				default: 2,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh", min: 3, max: 3, newlines: 2}): string {
			const {language = "zh", min = 3, max = 3, newlines = 2} = params
			if (max < min) throw new Error("max must be greater than or equal to min")
			const PARAGRAPH_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const PARAGRAPHS: string[] = []
			for (let p = 0; p < PARAGRAPH_COUNT; p++) {
				const sentenceCount = Math.floor(Math.random() * 5) + 2
				const SENTENCES: string[] = []
				for (let s = 0; s < sentenceCount; s++) {
					const SENTENCE_BLOCKS: string[] = []
					const BLOCK_COUNT = Math.floor(Math.random() * 4) + 2
					for (let i = 0; i < BLOCK_COUNT; i++) {
						const TEMPLATE = pick(WORD_TEMPLATES)
						SENTENCE_BLOCKS.push(TEMPLATE())
					}
					if (language === "en" && SENTENCE_BLOCKS.length > 0) SENTENCE_BLOCKS[0] = SENTENCE_BLOCKS[0][0].toUpperCase() + SENTENCE_BLOCKS[0].slice(1)
					const SENTENCE = SENTENCE_BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
					SENTENCES.push(SENTENCE)
				}
				PARAGRAPHS.push(SENTENCES.join(" "))
			}
			return PARAGRAPHS.join("\n".repeat(newlines))
		}
	})
}

const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]