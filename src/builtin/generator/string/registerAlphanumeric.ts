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

export const registerAlphanumeric = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "alphanumeric",
		title: "generator.string.alphanumeric.title",
		description: "generator.string.alphanumeric.description",
		params: [
			{
				id: "min",
				title: "generator.string.alphanumeric.params.min.title",
				description: "generator.string.alphanumeric.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.string.alphanumeric.params.max.title",
				description: "generator.string.alphanumeric.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
			},
			{
				id: "casing",
				title: "generator.string.alphanumeric.params.casing.title",
				description: "generator.string.alphanumeric.params.casing.description",
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
				title: "generator.string.alphanumeric.params.allowLeadingZero.title",
				description: "generator.string.alphanumeric.params.allowLeadingZero.description",
				type: "boolean",
				default: PARAMS.allowLeadingZero
			},
			{
				id: "exclude",
				title: "generator.string.alphanumeric.params.exclude.title",
				description: "generator.string.alphanumeric.params.exclude.description",
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
			let pool = ""
			switch (casing) {
				case "upper":
					pool = LETTERS.toUpperCase() + NUMBERS
					break
				case "lower":
					pool = LETTERS + NUMBERS
					break
				case "mixed":
					pool = LETTERS + LETTERS.toUpperCase() + NUMBERS
					break
				default:
					pool = LETTERS + LETTERS.toUpperCase() + NUMBERS
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
