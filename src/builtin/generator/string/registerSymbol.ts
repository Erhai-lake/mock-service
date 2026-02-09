import {clampNumber} from "../../public/clampNumber"

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

export const registerSymbol = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "symbol",
		title: "generator.string.symbol.title",
		description: "generator.string.symbol.description",
		params: [
			{
				id: "min",
				title: "generator.string.symbol.params.min.title",
				description: "generator.string.symbol.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.string.symbol.params.max.title",
				description: "generator.string.symbol.params.max.description",
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
			const FINAL_LENGTH = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>/?`~\"\\"
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				const RANDOM_INDEX = Math.floor(Math.random() * SYMBOLS.length)
				result += SYMBOLS[RANDOM_INDEX]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
