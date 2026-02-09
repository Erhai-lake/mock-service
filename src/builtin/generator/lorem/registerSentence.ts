import {clampNumber} from "../../public/clampNumber"
import {wordsPick} from "../../public/wordsPick"
import {EN_TEMPLATES} from "../constants/wordsEN"
import {ZH_TEMPLATES} from "../constants/wordsZH"

interface params {
	language: "zh" | "en"
	min: number
	max: number
}

const LIMITS = {
	min: {default: 3, min: 1, step: 1},
	max: {default: 10, min: 1, step: 1}
}

const PARAMS: params = {
	language: "zh",
	min: LIMITS.min.default,
	max: LIMITS.max.default
}

export const registerSentence = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "sentence",
		title: "generator.lorem.sentence.title",
		description: "generator.lorem.sentence.description",
		params: [
			{
				id: "language",
				title: "generator.lorem.sentence.params.language.title",
				description: "generator.lorem.sentence.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "min",
				title: "generator.lorem.sentence.params.min.title",
				description: "generator.lorem.sentence.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.lorem.sentence.params.max.title",
				description: "generator.lorem.sentence.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {language, min, max} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const WORD_COUNT = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const BLOCK_COUNT = Math.max(1, Math.floor(WORD_COUNT / 2))
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const BLOCKS: string[] = []
			for (let i = 0; i < BLOCK_COUNT; i++) {
				const TEMPLATE = wordsPick(WORD_TEMPLATES)
				BLOCKS.push(TEMPLATE())
			}
			if (language === "en") BLOCKS[0] = BLOCKS[0][0].toUpperCase() + BLOCKS[0].slice(1)
			return BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
		}
	})
}
