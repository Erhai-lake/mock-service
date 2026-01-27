import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

export default function registerParagraphs(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "paragraphs",
		title: "生成多个段落",
		description: "生成多个由多个句子组成的段落",
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
				title: "最小段落数",
				description: "要生成的最小段落数",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大段落数",
				description: "要生成的最大段落数",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "newlines",
				title: "换行符数量",
				description: "每个段落之间的换行符数量",
				type: "number",
				default: 2,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh", min: 3, max: 3, newlines: 2}): string {
			const {language = "zh", min = 3, max = 3, newlines = 2} = params
			const PARAGRAPH_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const PARAGRAPHS: string[] = []
			for (let p = 0; p < PARAGRAPH_COUNT; p++) {
				const sentenceCount = Math.floor(Math.random() * 5) + 2
				const SENTENCES: string[] = []
				for (let s = 0; s < sentenceCount; s++) {
					const SENTENCE_BLOCKS: string[] = []
					const BLOCK_COUNT = Math.floor(Math.random() * 4) + 2 // 每句 2-5 块
					for (let i = 0; i < BLOCK_COUNT; i++) {
						const TEMPLATE = pick(WORD_TEMPLATES)
						SENTENCE_BLOCKS.push(TEMPLATE())
					}
					if (language === "en" && SENTENCE_BLOCKS.length > 0) SENTENCE_BLOCKS[0] = SENTENCE_BLOCKS[0][0].toUpperCase() + SENTENCE_BLOCKS[0].slice(1)
					const SENTENCE = SENTENCE_BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
					SENTENCES.push(SENTENCE)
				}
				PARAGRAPHS.push(SENTENCES.join(" "))
			}
			return PARAGRAPHS.join("\n".repeat(newlines))
		}
	})
}

const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]