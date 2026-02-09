import {clampNumber} from "../../public/clampNumber"
import {nanoid} from "nanoid"

interface params {
	min: number
	max: number
}

const LIMITS = {
	min: {default: 21, min: 1, step: 1},
	max: {default: 21, min: 1, step: 1}
}

const PARAMS: params = {
	min: LIMITS.min.default,
	max: LIMITS.max.default
}

export const registerNanoId = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "nanoid",
		title: "generator.string.nanoId.title",
		description: "generator.string.nanoId.description",
		params: [
			{
				id: "min",
				title: "generator.string.nanoId.params.min.title",
				description: "generator.string.nanoId.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.string.nanoId.params.max.title",
				description: "generator.string.nanoId.params.max.description",
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
			const LENGTH = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			return nanoid(LENGTH)
		}
	})
}
