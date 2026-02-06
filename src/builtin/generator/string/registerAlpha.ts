import {excludePools} from "../../public/excludePools"

interface params {
	min: number
	max: number
	casing: "upper" | "lower" | "mixed"
	exclude: string
}

const PARAMS: params = {
	min: 21,
	max: 21,
	casing: "mixed",
	exclude: ""
}

export const registerAlpha = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "alpha",
		title: "generator.string.alpha.title",
		description: "generator.string.alpha.description",
		params: [
			{
				id: "min",
				title: "generator.string.alpha.params.min.title",
				description: "generator.string.alpha.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.string.alpha.params.max.title",
				description: "generator.string.alpha.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			},
			{
				id: "casing",
				title: "generator.string.alpha.params.casing.title",
				description: "generator.string.alpha.params.casing.description",
				type: "select",
				options: [
					{key: "upper", label: "upper"},
					{key: "lower", label: "lower"},
					{key: "mixed", label: "mixed"}
				],
				default: PARAMS.casing
			},
			{
				id: "exclude",
				title: "generator.string.alpha.params.exclude.title",
				description: "generator.string.alpha.params.exclude.description",
				type: "string",
				default: PARAMS.exclude
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max, casing, exclude} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			const LETTERS = "abcdefghijklmnopqrstuvwxyz"
			let pool = ""
			switch (casing) {
				case "upper":
					pool = LETTERS.toUpperCase()
					break
				case "lower":
					pool = LETTERS
					break
				case "mixed":
					pool = LETTERS + LETTERS.toUpperCase()
					break
				default:
					pool = LETTERS + LETTERS.toUpperCase()
					break
			}
			pool = excludePools(pool, exclude)
			if (!pool) throw new Error("pool is empty")
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				result += pool[Math.floor(Math.random() * pool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
