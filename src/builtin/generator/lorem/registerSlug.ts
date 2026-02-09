import {WORD_EN} from "../constants/wordEN"

interface params {
	min: number
	max: number
}

const PARAMS: params = {
	min: 3,
	max: 3
}

export const registerSlug = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "slug",
		title: "generator.lorem.slug.title",
		description: "generator.lorem.slug.description",
		params: [
			{
				id: "min",
				title: "generator.lorem.slug.params.min.title",
				description: "generator.lorem.slug.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.lorem.slug.params.max.title",
				description: "generator.lorem.slug.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			const COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const BLOCKS: string[] = []
			for (let i = 0; i < COUNT; i++) {
				BLOCKS.push(WORD_EN[Math.floor(Math.random() * WORD_EN.length)])
			}
			return BLOCKS.join("-").toLowerCase()
		}
	})
}
