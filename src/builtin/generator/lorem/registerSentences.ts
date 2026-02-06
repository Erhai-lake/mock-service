import {wordsPick} from "../../public/wordsPick"
import {EN_TEMPLATES} from "../constants/wordsEN"
import {ZH_TEMPLATES} from "../constants/wordsZH"

interface params {
	language: "zh" | "en"
	sentenceMin: number
	sentenceMax: number
	min: number
	max: number
	separator: string
}

const PARAMS: params = {
	language: "zh",
	sentenceMin: 3,
	sentenceMax: 10,
	min: 2,
	max: 6,
	separator: ""
}

export const registerSentences = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "sentences",
		title: "generator.lorem.sentences.title",
		description: "generator.lorem.sentences.description",
		params: [
			{
				id: "language",
				title: "generator.lorem.sentences.params.language.title",
				description: "generator.lorem.sentences.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "sentenceMin",
				title: "generator.lorem.sentences.params.sentenceMin.title",
				description: "generator.lorem.sentences.params.sentenceMin.description",
				type: "number",
				default: PARAMS.sentenceMin,
				min: 1,
				step: 1
			},
			{
				id: "sentenceMax",
				title: "generator.lorem.sentences.params.sentenceMax.title",
				description: "generator.lorem.sentences.params.sentenceMax.description",
				type: "number",
				default: PARAMS.sentenceMax,
				min: 1,
				step: 1
			},
			{
				id: "min",
				title: "generator.lorem.sentences.params.min.title",
				description: "generator.lorem.sentences.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.lorem.sentences.params.max.title",
				description: "generator.lorem.sentences.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			},
			{
				id: "separator",
				title: "generator.lorem.sentences.params.separator.title",
				description: "generator.lorem.sentences.params.separator.description",
				type: "string",
				default: PARAMS.separator
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
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
					const TEMPLATE = wordsPick(WORD_TEMPLATES)
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
