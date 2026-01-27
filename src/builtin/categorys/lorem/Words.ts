import {WORD_EN} from "../constants/WordEN"
import {WORD_ZH} from "../constants/WordZH"

export default function registerWords(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "words",
		title: "生成多个单词",
		description: "生成多个随机单词",
		params: [
			{
				id: "language",
				title: "语言",
				description: "要生成的句子的语言",
				type: "select",
				default: "zh",
				options: ["zh", "en"]
			},
			{
				id: "min",
				title: "最小单词数",
				description: "要生成的最小单词数",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大单词数",
				description: "要生成的最大单词数",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "separator",
				title: "分隔符",
				description: "要生成的单词之间的分隔符",
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
