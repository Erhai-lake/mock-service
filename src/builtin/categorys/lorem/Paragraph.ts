import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

export default function registerParagraph(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "paragraph",
		title: "生成一个段落",
		description: "生成一个由多个句子组成的段落",
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
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh", min: 2, max: 6}): string {
			const {language = "zh", min = 2, max = 6} = params
			const SENTENCE_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const PARAGRAPH: string[] = []
			for (let s = 0; s < SENTENCE_COUNT; s++) {
				const SENTENCE_BLOCKS: string[] = []
				const BLOCK_COUNT = Math.floor(Math.random() * 4) + 2
				for (let i = 0; i < BLOCK_COUNT; i++) {
					const TEMPLATE = pick(WORD_TEMPLATES)
					SENTENCE_BLOCKS.push(TEMPLATE())
				}
				if (language === "en" && SENTENCE_BLOCKS.length > 0) SENTENCE_BLOCKS[0] = SENTENCE_BLOCKS[0][0].toUpperCase() + SENTENCE_BLOCKS[0].slice(1)
				const SENTENCE = SENTENCE_BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
				PARAGRAPH.push(SENTENCE)
			}
			return PARAGRAPH.join("")
		}
	})
}

const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]