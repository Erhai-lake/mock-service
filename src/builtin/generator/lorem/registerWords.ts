import {clampNumber} from "../../public/clampNumber"
import {WORD_EN} from "../constants/wordEN"
import {WORD_ZH} from "../constants/wordZH"

interface params {
	language: "zh" | "en"
	min: number
	max: number
	separator: string
}

const LIMITS = {
	min: {default: 3, min: 1, step: 1},
	max: {default: 3, min: 1, step: 1}
}

const PARAMS: params = {
	language: "zh",
	min: LIMITS.min.default,
	max: LIMITS.max.default,
	separator: ""
}

export const registerWords = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "words",
		title: "generator.lorem.words.title",
		description: "generator.lorem.words.description",
		params: [
			{
				id: "language",
				title: "generator.lorem.words.params.language.title",
				description: "generator.lorem.words.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "min",
				title: "generator.lorem.words.params.min.title",
				description: "generator.lorem.words.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.lorem.words.params.max.title",
				description: "generator.lorem.words.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
			},
			{
				id: "separator",
				title: "generator.lorem.words.params.separator.title",
				description: "generator.lorem.words.params.separator.description",
				type: "string",
				default: PARAMS.separator
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {language, min, max, separator} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const WORD = language === "zh" ? WORD_ZH : WORD_EN
			const COUNT = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const BLOCKS: string[] = []
			for (let i = 0; i < COUNT; i++) {
				BLOCKS.push(WORD[Math.floor(Math.random() * WORD.length)])
			}
			return BLOCKS.join(separator)
		}
	})
}
