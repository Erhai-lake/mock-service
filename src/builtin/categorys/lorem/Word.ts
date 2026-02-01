import {WORD_EN} from "../constants/WordEN"
import {WORD_ZH} from "../constants/WordZH"

export default function registerWord(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "word",
		title: "category.lorem.word.title",
		description: "category.lorem.word.description",
		params: [
			{
				id: "language",
				title: "category.lorem.word.params.language.title",
				description: "category.lorem.word.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: "zh"
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh"}): string {
			const {language = "zh"} = params
			const WORD = language === "zh" ? WORD_ZH : WORD_EN
			return WORD[Math.floor(Math.random() * WORD.length)]
		}
	})
}
