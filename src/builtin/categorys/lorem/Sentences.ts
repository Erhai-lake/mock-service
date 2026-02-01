import {WordsPick} from "../../public/WordsPick"
import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

interface Params {
	language: "zh" | "en"
	sentenceMin: number
	sentenceMax: number
	min: number
	max: number
	separator: string
}

const PARAMS: Params = {
	language: "zh",
	sentenceMin: 3,
	sentenceMax: 10,
	min: 2,
	max: 6,
	separator: ""
}

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
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "sentenceMin",
				title: "category.lorem.sentences.params.sentenceMin.title",
				description: "category.lorem.sentences.params.sentenceMin.description",
				type: "number",
				default: PARAMS.sentenceMin,
				min: 1,
				step: 1
			},
			{
				id: "sentenceMax",
				title: "category.lorem.sentences.params.sentenceMax.title",
				description: "category.lorem.sentences.params.sentenceMax.description",
				type: "number",
				default: PARAMS.sentenceMax,
				min: 1,
				step: 1
			},
			{
				id: "min",
				title: "category.lorem.sentences.params.min.title",
				description: "category.lorem.sentences.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.sentences.params.max.title",
				description: "category.lorem.sentences.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			},
			{
				id: "separator",
				title: "category.lorem.sentences.params.separator.title",
				description: "category.lorem.sentences.params.separator.description",
				type: "string",
				default: PARAMS.separator
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {language, sentenceMin, sentenceMax, min, max, separator} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const SENTENCE_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const SENTENCES: string[] = []
			for (let s = 0; s < SENTENCE_COUNT; s++) {
				const WORD_COUNT = Math.floor(Math.random() * (sentenceMax - sentenceMin + 1)) + sentenceMin
				const BLOCK_COUNT = Math.max(1, Math.floor(WORD_COUNT / 2))
				const BLOCKS: string[] = []
				for (let i = 0; i < BLOCK_COUNT; i++) {
					const TEMPLATE = WordsPick(WORD_TEMPLATES)
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
