import {clampNumber} from "../../public/clampNumber"

interface params {
	min: number
	max: number
	fractionDigits: number
	multipleOf: number
}

const LIMITS = {
	min: {default: 0.0, min: -1e12, max: 1e12, step: 0.1},
	max: {default: 1.0, min: -1e12, max: 1e12, step: 0.1},
	fractionDigits: {default: 20, min: 0, max: 20, step: 1},
	multipleOf: {default: 0, min: 0, max: 1e12, step: 0.1}
}

const PARAMS: params = {
	min: LIMITS.min.default,
	max: LIMITS.max.default,
	fractionDigits: LIMITS.fractionDigits.default,
	multipleOf: LIMITS.multipleOf.default
}

export const registerFloat = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "float",
		title: "generator.number.float.title",
		description: "generator.number.float.description",
		params: [
			{
				id: "min",
				title: "generator.number.float.params.min.title",
				description: "generator.number.float.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				max: LIMITS.min.max,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.number.float.params.max.title",
				description: "generator.number.float.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				max: LIMITS.max.max,
				step: LIMITS.max.step
			},
			{
				id: "fractionDigits",
				title: "generator.number.float.params.fractionDigits.title",
				description: "generator.number.float.params.fractionDigits.description",
				type: "number",
				default: PARAMS.fractionDigits,
				min: LIMITS.fractionDigits.min,
				max: LIMITS.fractionDigits.max,
				step: LIMITS.fractionDigits.step
			},
			{
				id: "multipleOf",
				title: "generator.number.float.params.multipleOf.title",
				description: "generator.number.float.params.multipleOf.description",
				type: "number",
				default: PARAMS.multipleOf,
				min: LIMITS.multipleOf.min,
				max: LIMITS.multipleOf.max,
				step: LIMITS.multipleOf.step
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): number {
			const {min, max, fractionDigits, multipleOf} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const FINAL_FRACTION_DIGITS = clampNumber(fractionDigits, LIMITS.fractionDigits.min, undefined, LIMITS.fractionDigits.step)
			const FINAL_MULTIPLE_OF = clampNumber(multipleOf, LIMITS.multipleOf.min, undefined, LIMITS.multipleOf.step)
			let value = Math.random() * (FINAL_MAX - FINAL_MIN) + FINAL_MIN
			if (FINAL_MULTIPLE_OF > 0) {
				const DECIMAL_PLACES = String(FINAL_MULTIPLE_OF).includes(".") ? String(FINAL_MULTIPLE_OF).split(".")[1].length : 0
				if (FINAL_FRACTION_DIGITS < DECIMAL_PLACES) throw new Error("error.fractionDigitsIsLessThanMultipleOf")
				value = Math.round(value / FINAL_MULTIPLE_OF) * FINAL_MULTIPLE_OF
			}
			return Number(value.toFixed(FINAL_FRACTION_DIGITS))
		}
	})
}
