import {excludePools} from "../../public/excludePools"

interface params {
	min: number
	max: number
	casing: "upper" | "lower" | "mixed"
	allowLeadingZero: boolean
	exclude: string
}

const PARAMS: params = {
	min: 21,
	max: 21,
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
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.string.sample.params.max.title",
				description: "generator.string.sample.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
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
			if (max < min) throw new Error("max must be greater than or equal to min")
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
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
			if (!pool) throw new Error("pool is empty")
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				let currentPool = pool
				if (!allowLeadingZero && i === 0) {
					currentPool = currentPool.replace("0", "")
					if (!currentPool) throw new Error("pool is empty after exclude")
				}
				result += currentPool[Math.floor(Math.random() * currentPool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
