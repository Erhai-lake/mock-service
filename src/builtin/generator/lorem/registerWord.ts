import {WORD_EN} from "../constants/wordEN"
import {WORD_ZH} from "../constants/wordZH"

interface params {
	language: "zh" | "en"
}

const PARAMS: params = {
	language: "zh"
}

export const registerWord = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "word",
		title: "generator.lorem.word.title",
		description: "generator.lorem.word.description",
		params: [
			{
				id: "language",
				title: "generator.lorem.word.params.language.title",
				description: "generator.lorem.word.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(language: string = PARAMS.language): string {
			const WORD = language === "zh" ? WORD_ZH : WORD_EN
			return WORD[Math.floor(Math.random() * WORD.length)]
		}
	})
}
