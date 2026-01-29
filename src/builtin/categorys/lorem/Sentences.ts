import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

export default function registerSentences(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "sentences",
		title: "category.lorem.sentences.title",
		description: "category.lorem.sentences.description",
		params: [
			{
				id: "language",
				title: "category.lorem.sentences.params.language.title",
				description: "category.lorem.sentences.params.language.description",
				type: "select",
				default: "zh",
				options: ["zh", "en"]
			},
			{
				id: "sentenceMin",
				title: "category.lorem.sentences.params.sentenceMin.title",
				description: "category.lorem.sentences.params.sentenceMin.description",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "sentenceMax",
				title: "category.lorem.sentences.params.sentenceMax.title",
				description: "category.lorem.sentences.params.sentenceMax.description",
				type: "number",
				default: 10,
				min: 1,
				step: 1
			},
			{
				id: "min",
				title: "category.lorem.sentences.params.min.title",
				description: "category.lorem.sentences.params.min.description",
				type: "number",
				default: 2,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.sentences.params.max.title",
				description: "category.lorem.sentences.params.max.description",
				type: "number",
				default: 6,
				min: 1,
				step: 1
			},
			{
				id: "separator",
				title: "category.lorem.sentences.params.separator.title",
				description: "category.lorem.sentences.params.separator.description",
				type: "string",
				default: ""
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh", sentenceMin: 3, sentenceMax: 10, min: 2, max: 6, separator: ""}): string {
			const {language = "zh", sentenceMin = 3, sentenceMax = 10, min = 2, max = 6, separator = ""} = params
			if (max < min) return "max must be greater than or equal to min"
			const SENTENCE_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const SENTENCES: string[] = []
			for (let s = 0; s < SENTENCE_COUNT; s++) {
				const WORD_COUNT = Math.floor(Math.random() * (sentenceMax - sentenceMin + 1)) + sentenceMin
				const BLOCK_COUNT = Math.max(1, Math.floor(WORD_COUNT / 2))
				const BLOCKS: string[] = []
				for (let i = 0; i < BLOCK_COUNT; i++) {
					const TEMPLATE = pick(WORD_TEMPLATES)
					BLOCKS.push(TEMPLATE())
				}
				if (language === "en" && BLOCKS.length > 0) BLOCKS[0] = BLOCKS[0][0].toUpperCase() + BLOCKS[0].slice(1)
				const sentence =
					BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
				SENTENCES.push(sentence)
			}
			return SENTENCES.join(separator)
		}
	})
}

const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]