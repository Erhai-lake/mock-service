import {WORD_EN} from "../constants/WordEN"
import {WORD_ZH} from "../constants/WordZH"

interface Params {
	language: string
	min: number
	max: number
	separator: string
}

const PARAMS: Params = {
	language: "zh",
	min: 3,
	max: 3,
	separator: ""
}

export default function registerWords(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "words",
		title: "category.lorem.words.title",
		description: "category.lorem.words.description",
		params: [
			{
				id: "language",
				title: "category.lorem.words.params.language.title",
				description: "category.lorem.words.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "min",
				title: "category.lorem.words.params.min.title",
				description: "category.lorem.words.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.words.params.max.title",
				description: "category.lorem.words.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			},
			{
				id: "separator",
				title: "category.lorem.words.params.separator.title",
				description: "category.lorem.words.params.separator.description",
				type: "string",
				default: PARAMS.separator
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {language, min, max, separator} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const WORD = language === "zh" ? WORD_ZH : WORD_EN
			const COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const BLOCKS: string[] = []
			for (let i = 0; i < COUNT; i++) {
				BLOCKS.push(WORD[Math.floor(Math.random() * WORD.length)])
			}
			return BLOCKS.join(separator)
		}
	})
}
