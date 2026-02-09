import {clampNumber} from "../../public/clampNumber"
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

const LIMITS = {
	sentenceMin: {default: 3, min: 1, step: 1},
	sentenceMax: {default: 10, min: 1, step: 1},
	min: {default: 3, min: 1, step: 1},
	max: {default: 10, min: 1, step: 1}
}

const PARAMS: params = {
	language: "zh",
	sentenceMin: LIMITS.sentenceMin.default,
	sentenceMax: LIMITS.sentenceMax.default,
	min: LIMITS.min.default,
	max: LIMITS.max.default,
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
				min: LIMITS.sentenceMin.min,
				step: LIMITS.sentenceMin.step
			},
			{
				id: "sentenceMax",
				title: "generator.lorem.sentences.params.sentenceMax.title",
				description: "generator.lorem.sentences.params.sentenceMax.description",
				type: "number",
				default: PARAMS.sentenceMax,
				min: LIMITS.sentenceMax.min,
				step: LIMITS.sentenceMax.step
			},
			{
				id: "min",
				title: "generator.lorem.sentences.params.min.title",
				description: "generator.lorem.sentences.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.lorem.sentences.params.max.title",
				description: "generator.lorem.sentences.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
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
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const FINAL_SENTENCE_MIN = clampNumber(sentenceMin, LIMITS.sentenceMin.min, undefined, LIMITS.sentenceMin.step)
			const FINAL_SENTENCE_MAX = clampNumber(sentenceMax, LIMITS.sentenceMax.min, undefined, LIMITS.sentenceMax.step)
			const SENTENCE_COUNT = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const SENTENCES: string[] = []
			for (let s = 0; s < SENTENCE_COUNT; s++) {
				const WORD_COUNT = Math.floor(Math.random() * (FINAL_SENTENCE_MAX - FINAL_SENTENCE_MIN + 1)) + FINAL_SENTENCE_MIN
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
