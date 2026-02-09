import {clampNumber} from "../../public/clampNumber"
import {wordsPick} from "../../public/wordsPick"
import {EN_TEMPLATES} from "../constants/wordsEN"
import {ZH_TEMPLATES} from "../constants/wordsZH"

interface params {
	language: "zh" | "en"
	min: number
	max: number
	newlines: number
}

const LIMITS = {
	min: {default: 3, min: 1, step: 1},
	max: {default: 3, min: 1, step: 1},
	newlines: {default: 2, min: 1, step: 1}
}

const PARAMS: params = {
	language: "zh",
	min: LIMITS.min.default,
	max: LIMITS.max.default,
	newlines: LIMITS.newlines.default
}

export const registerParagraphs = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "paragraphs",
		title: "generator.lorem.paragraphs.title",
		description: "generator.lorem.paragraphs.description",
		params: [
			{
				id: "language",
				title: "generator.lorem.paragraphs.params.language.title",
				description: "generator.lorem.paragraphs.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "min",
				title: "generator.lorem.paragraphs.params.min.title",
				description: "generator.lorem.paragraphs.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.lorem.paragraphs.params.max.title",
				description: "generator.lorem.paragraphs.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
			},
			{
				id: "newlines",
				title: "generator.lorem.paragraphs.params.newlines.title",
				description: "generator.lorem.paragraphs.params.newlines.description",
				type: "number",
				default: PARAMS.newlines,
				min: LIMITS.newlines.min,
				step: LIMITS.newlines.step
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {language, min, max, newlines} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const FINAL_NEWLINES = clampNumber(newlines, LIMITS.newlines.min, undefined, LIMITS.newlines.step)
			const PARAGRAPH_COUNT = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const PARAGRAPHS: string[] = []
			for (let p = 0; p < PARAGRAPH_COUNT; p++) {
				const sentenceCount = Math.floor(Math.random() * 5) + 2
				const SENTENCES: string[] = []
				for (let s = 0; s < sentenceCount; s++) {
					const SENTENCE_BLOCKS: string[] = []
					const BLOCK_COUNT = Math.floor(Math.random() * 4) + 2
					for (let i = 0; i < BLOCK_COUNT; i++) {
						const TEMPLATE = wordsPick(WORD_TEMPLATES)
						SENTENCE_BLOCKS.push(TEMPLATE())
					}
					if (language === "en" && SENTENCE_BLOCKS.length > 0) SENTENCE_BLOCKS[0] = SENTENCE_BLOCKS[0][0].toUpperCase() + SENTENCE_BLOCKS[0].slice(1)
					const SENTENCE = SENTENCE_BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
					SENTENCES.push(SENTENCE)
				}
				PARAGRAPHS.push(SENTENCES.join(" "))
			}
			return PARAGRAPHS.join("\n".repeat(FINAL_NEWLINES))
		}
	})
}