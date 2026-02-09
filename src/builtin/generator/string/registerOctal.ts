import {clampNumber} from "../../public/clampNumber"

interface params {
	prefix: string
	min: number
	max: number
}

const LIMITS = {
	min: {default: 21, min: 1, step: 1},
	max: {default: 21, min: 1, step: 1}
}

const PARAMS: params = {
	prefix: "0o",
	min: LIMITS.min.default,
	max: LIMITS.max.default
}

export const registerOctal = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "octal",
		title: "generator.string.octal.title",
		description: "generator.string.octal.description",
		params: [
			{
				id: "prefix",
				title: "generator.string.octal.params.prefix.title",
				description: "generator.string.octal.params.prefix.description",
				type: "string",
				default: PARAMS.prefix
			},
			{
				id: "min",
				title: "generator.string.octal.params.min.title",
				description: "generator.string.octal.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.string.octal.params.max.title",
				description: "generator.string.octal.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {prefix, min, max} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const FINAL_LENGTH = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			let bits = ""
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.floor(Math.random() * 8).toString(8)
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
