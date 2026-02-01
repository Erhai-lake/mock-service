import {WordsPick} from "../../public/WordsPick"
import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

interface Params {
	language: string
	min: number
	max: number
}

const PARAMS: Params = {
	language: "zh",
	min: 3,
	max: 10
}

export default function registerSentence(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "sentence",
		title: "category.lorem.sentence.title",
		description: "category.lorem.sentence.description",
		params: [
			{
				id: "language",
				title: "category.lorem.sentence.params.language.title",
				description: "category.lorem.sentence.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "min",
				title: "category.lorem.sentence.params.min.title",
				description: "category.lorem.sentence.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.sentence.params.max.title",
				description: "category.lorem.sentence.params.max.description",
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
			const WORD_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const BLOCK_COUNT = Math.max(1, Math.floor(WORD_COUNT / 2))
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const BLOCKS: string[] = []
			for (let i = 0; i < BLOCK_COUNT; i++) {
				const TEMPLATE = WordsPick(WORD_TEMPLATES)
				BLOCKS.push(TEMPLATE())
			}
			if (language === "en") BLOCKS[0] = BLOCKS[0][0].toUpperCase() + BLOCKS[0].slice(1)
			return BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
		}
	})
}
