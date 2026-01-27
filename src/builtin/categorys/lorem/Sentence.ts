import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

export default function registerSentence(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "sentence",
		title: "生成以句号结尾的句子",
		description: "生成一个由随机词语组成的句子, 以句号结尾",
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
				description: "要生成的最小词语数",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大单词数",
				description: "要生成的最大词语数",
				type: "number",
				default: 10,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh", min: 3, max: 10}): string {
			const {language = "zh", min = 3, max = 10} = params
			const WORD_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const BLOCK_COUNT = Math.max(1, Math.floor(WORD_COUNT / 2))
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const BLOCKS: string[] = []
			for (let i = 0; i < BLOCK_COUNT; i++) {
				const TEMPLATE = pick(WORD_TEMPLATES)
				BLOCKS.push(TEMPLATE())
			}
			if (language === "en") BLOCKS[0] = BLOCKS[0][0].toUpperCase() + BLOCKS[0].slice(1)
			return BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
		}
	})
}

const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]