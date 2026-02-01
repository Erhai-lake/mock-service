import {ExcludePools} from "../../public/ExcludePools"

interface Params {
	min: number
	max: number
	casing: "upper" | "lower" | "mixed"
	allowLeadingZero: boolean
	exclude: string
}

const PARAMS: Params = {
	min: 21,
	max: 21,
	casing: "mixed",
	allowLeadingZero: true,
	exclude: ""
}

export default function registerSample(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "sample",
		title: "category.string.sample.title",
		description: "category.string.sample.description",
		params: [
			{
				id: "min",
				title: "category.string.sample.params.min.title",
				description: "category.string.sample.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.sample.params.max.title",
				description: "category.string.sample.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			},
			{
				id: "casing",
				title: "category.string.sample.params.casing.title",
				description: "category.string.sample.params.casing.description",
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
				title: "category.string.sample.params.allowLeadingZero.title",
				description: "category.string.sample.params.allowLeadingZero.description",
				type: "boolean",
				default: PARAMS.allowLeadingZero
			},
			{
				id: "exclude",
				title: "category.string.sample.params.exclude.title",
				description: "category.string.sample.params.exclude.description",
				type: "string",
				default: PARAMS.exclude
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
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
			pool = ExcludePools(pool, exclude)
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
