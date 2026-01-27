import {WORD_EN} from "../constants/WordEN"
import {WORD_ZH} from "../constants/WordZH"

export default function registerWord(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "word",
		title: "生成一个单词",
		description: "生成一个随机单词",
		params: [
			{
				id: "language",
				title: "语言",
				description: "要生成的句子的语言",
				type: "select",
				default: "zh",
				options: ["zh", "en"]
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
