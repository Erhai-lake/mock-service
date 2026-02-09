import {clampNumber} from "../../public/clampNumber"

interface params {
	min: number
	max: number
	multipleOf: number
}

const LIMITS = {
	min: {default: Number.MIN_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER, max: -1, step: 1},
	max: {default: -1, min: Number.MIN_SAFE_INTEGER, max: -1, step: 1},
	multipleOf: {default: 0, min: 1, max: Number.MAX_SAFE_INTEGER, step: 1}
}

const PARAMS: params = {
	min: LIMITS.min.default,
	max: LIMITS.max.default,
	multipleOf: LIMITS.multipleOf.default
}

export const registerNegativeInt = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "negativeInt",
		title: "generator.number.negativeInt.title",
		description: "generator.number.negativeInt.description",
		params: [
			{
				id: "min",
				title: "generator.number.negativeInt.params.min.title",
				description: "generator.number.negativeInt.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				max: LIMITS.min.max,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.number.negativeInt.params.max.title",
				description: "generator.number.negativeInt.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				max: LIMITS.max.max,
				step: LIMITS.max.step
			},
			{
				id: "multipleOf",
				title: "generator.number.negativeInt.params.multipleOf.title",
				description: "generator.number.negativeInt.params.multipleOf.description",
				type: "number",
				default: PARAMS.multipleOf,
				min: LIMITS.multipleOf.min,
				max: LIMITS.multipleOf.max,
				step: LIMITS.multipleOf.step
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): number {
			const {min, max, multipleOf} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, LIMITS.min.max, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, LIMITS.max.max, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const FINAL_MULTIPLE_OF = clampNumber(multipleOf, LIMITS.multipleOf.min, LIMITS.multipleOf.max, LIMITS.multipleOf.step)
			const RANDOM_INT = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			if (FINAL_MULTIPLE_OF > 0) return Math.floor(RANDOM_INT / FINAL_MULTIPLE_OF) * FINAL_MULTIPLE_OF
			return RANDOM_INT
		}
	})
}
