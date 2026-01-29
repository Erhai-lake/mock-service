import {EN_TEMPLATES} from "../constants/WordsEN"
import {ZH_TEMPLATES} from "../constants/WordsZH"

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
				default: "zh",
				options: ["zh", "en"]
			},
			{
				id: "min",
				title: "category.lorem.sentence.params.min.title",
				description: "category.lorem.sentence.params.min.description",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.sentence.params.max.title",
				description: "category.lorem.sentence.params.max.description",
				type: "number",
				default: 10,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {language: "zh", min: 3, max: 10}): string {
			const {language = "zh", min = 3, max = 10} = params
			if (max < min) throw new Error("max must be greater than or equal to min")
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