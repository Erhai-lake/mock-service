import {clampNumber} from "../../public/clampNumber"
import {WORD_EN} from "../constants/wordEN"

interface params {
	min: number
	max: number
}

const LIMITS = {
	min: {default: 3, min: 1, step: 1},
	max: {default: 3, min: 1, step: 1}
}

const PARAMS: params = {
	min: LIMITS.min.default,
	max: LIMITS.max.default
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
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.lorem.slug.params.max.title",
				description: "generator.lorem.slug.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const COUNT = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const BLOCKS: string[] = []
			for (let i = 0; i < COUNT; i++) {
				BLOCKS.push(WORD_EN[Math.floor(Math.random() * WORD_EN.length)])
			}
			return BLOCKS.join("-").toLowerCase()
		}
	})
}
