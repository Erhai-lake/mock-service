import {WORD_EN} from "../constants/WordEN"
import {WORD_ZH} from "../constants/WordZH"

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
				default: "zh",
				options: ["zh", "en"]
			},
			{
				id: "min",
				title: "category.lorem.words.params.min.title",
				description: "category.lorem.words.params.min.description",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.words.params.max.title",
				description: "category.lorem.words.params.max.description",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "separator",
				title: "category.lorem.words.params.separator.title",
				description: "category.lorem.words.params.separator.description",
				type: "string",
				default: ""
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh", min: 3, max: 3, separator: ""}): string {
			const {language = "zh", min = 3, max = 3, separator = ""} = params
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
