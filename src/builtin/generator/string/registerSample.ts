import {clampNumber} from "../../public/clampNumber"
import {excludePools} from "../../public/excludePools"

interface params {
	min: number
	max: number
	casing: "upper" | "lower" | "mixed"
	allowLeadingZero: boolean
	exclude: string
}

const LIMITS = {
	min: {default: 21, min: 1, step: 1},
	max: {default: 21, min: 1, step: 1}
}

const PARAMS: params = {
	min: LIMITS.min.default,
	max: LIMITS.max.default,
	casing: "mixed",
	allowLeadingZero: true,
	exclude: ""
}

export const registerSample = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "sample",
		title: "generator.string.sample.title",
		description: "generator.string.sample.description",
		params: [
			{
				id: "min",
				title: "generator.string.sample.params.min.title",
				description: "generator.string.sample.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.string.sample.params.max.title",
				description: "generator.string.sample.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
			},
			{
				id: "casing",
				title: "generator.string.sample.params.casing.title",
				description: "generator.string.sample.params.casing.description",
				type: "select",
				options: [
					{key: "upper", label: "upper"},
					{key: "lower", label: "lower"},
					{key: "mixed", label: "mixed"}
				],
				default: PARAMS.casing
			},
			{
				id: "allowLeadingZero",
				title: "generator.string.sample.params.allowLeadingZero.title",
				description: "generator.string.sample.params.allowLeadingZero.description",
				type: "boolean",
				default: PARAMS.allowLeadingZero
			},
			{
				id: "exclude",
				title: "generator.string.sample.params.exclude.title",
				description: "generator.string.sample.params.exclude.description",
				type: "string",
				default: PARAMS.exclude
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max, casing, allowLeadingZero, exclude} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const FINAL_LENGTH = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const LETTERS = "abcdefghijklmnopqrstuvwxyz"
			const NUMBERS = "0123456789"
			const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>/?`~\"\\"
			let pool = ""
			switch (casing) {
				case "upper":
					pool = LETTERS.toUpperCase() + NUMBERS + SYMBOLS
					break
				case "lower":
					pool = LETTERS + NUMBERS + SYMBOLS
					break
				case "mixed":
					pool = LETTERS + LETTERS.toUpperCase() + NUMBERS + SYMBOLS
					break
				default:
					pool = LETTERS + LETTERS.toUpperCase() + NUMBERS + SYMBOLS
					break
			}
			pool = excludePools(pool, exclude)
			if (!pool) throw new Error("error.poolIsEmpty")
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				let currentPool = pool
				if (!allowLeadingZero && i === 0) {
					currentPool = currentPool.replace("0", "")
					if (!currentPool) throw new Error("error.poolIsEmptyAfterExclude")
				}
				result += currentPool[Math.floor(Math.random() * currentPool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
