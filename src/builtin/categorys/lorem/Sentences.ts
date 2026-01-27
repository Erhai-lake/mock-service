import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

export default function registerSentences(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "sentences",
		title: "生成多个以句号结尾的句子",
		description: "生成多个由随机词语组成的句子, 以句号结尾",
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
				id: "sentenceMin",
				title: "最小单词数",
				description: "每个句子的最小词语数",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "sentenceMax",
				title: "最大单词数",
				description: "每个句子的最大词语数",
				type: "number",
				default: 10,
				min: 1,
				step: 1
			},
			{
				id: "min",
				title: "最小句子数",
				description: "要生成的最小句子数",
				type: "number",
				default: 2,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大句子数",
				description: "要生成的最大句子数",
				type: "number",
				default: 6,
				min: 1,
				step: 1
			},
			{
				id: "separator",
				title: "分隔符",
				description: "要生成的句子之间的分隔符",
				type: "string",
				default: ""
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh", sentenceMin: 3, sentenceMax: 10, min: 2, max: 6, separator: ""}): string {
			const {language = "zh", sentenceMin = 3, sentenceMax = 10, min = 2, max = 6, separator = ""} = params
			const SENTENCE_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const SENTENCES: string[] = []
			for (let s = 0; s < SENTENCE_COUNT; s++) {
				const WORD_COUNT = Math.floor(Math.random() * (sentenceMax - sentenceMin + 1)) + sentenceMin
				const BLOCK_COUNT = Math.max(1, Math.floor(WORD_COUNT / 2))
				const BLOCKS: string[] = []
				for (let i = 0; i < BLOCK_COUNT; i++) {
					const TEMPLATE = pick(WORD_TEMPLATES)
					BLOCKS.push(TEMPLATE())
				}
				if (language === "en" && BLOCKS.length > 0) BLOCKS[0] = BLOCKS[0][0].toUpperCase() + BLOCKS[0].slice(1)
				const sentence =
					BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
				SENTENCES.push(sentence)
			}
			return SENTENCES.join(separator)
		}
	})
}

const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]