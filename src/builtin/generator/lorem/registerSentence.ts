import {wordsPick} from "../../public/wordsPick"
import {EN_TEMPLATES} from "../constants/wordsEN"
import {ZH_TEMPLATES} from "../constants/wordsZH"

interface params {
	language: "zh" | "en"
	min: number
	max: number
}

const PARAMS: params = {
	language: "zh",
	min: 3,
	max: 10
}

export const registerSentence = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "sentence",
		title: "generator.lorem.sentence.title",
		description: "generator.lorem.sentence.description",
		params: [
			{
				id: "language",
				title: "generator.lorem.sentence.params.language.title",
				description: "generator.lorem.sentence.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "min",
				title: "generator.lorem.sentence.params.min.title",
				description: "generator.lorem.sentence.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.lorem.sentence.params.max.title",
				description: "generator.lorem.sentence.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {language, min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const WORD_COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const BLOCK_COUNT = Math.max(1, Math.floor(WORD_COUNT / 2))
			const WORD_TEMPLATES = language === "zh" ? ZH_TEMPLATES : EN_TEMPLATES
			const BLOCKS: string[] = []
			for (let i = 0; i < BLOCK_COUNT; i++) {
				const TEMPLATE = wordsPick(WORD_TEMPLATES)
				BLOCKS.push(TEMPLATE())
			}
			if (language === "en") BLOCKS[0] = BLOCKS[0][0].toUpperCase() + BLOCKS[0].slice(1)
			return BLOCKS.join(language === "zh" ? "，" : ", ") + (language === "zh" ? "。" : ".")
		}
	})
}
