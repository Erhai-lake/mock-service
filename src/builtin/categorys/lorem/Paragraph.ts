import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

interface Params {
	language: string
	min: number
	max: number
}

const PARAMS: Params = {
	language: "zh",
	min: 2,
	max: 6
}

export default function registerParagraph(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "paragraph",
		title: "category.lorem.paragraph.title",
		description: "category.lorem.paragraph.description",
		params: [
			{
				id: "language",
				title: "category.lorem.paragraph.params.language.title",
				description: "category.lorem.paragraph.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "min",
				title: "category.lorem.paragraph.params.min.title",
				description: "category.lorem.paragraph.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.paragraph.params.max.title",
				description: "category.lorem.paragraph.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {language, min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
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