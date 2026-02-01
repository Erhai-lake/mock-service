interface Params {
	min: number
	max: number
	casing: "upper" | "lower" | "mixed"
	exclude: string
}

const PARAMS: Params = {
	min: 21,
	max: 21,
	casing: "mixed",
	exclude: ""
}

export default function registerAlpha(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "alpha",
		title: "category.string.alpha.title",
		description: "category.string.alpha.description",
		params: [
			{
				id: "min",
				title: "category.string.alpha.params.min.title",
				description: "category.string.alpha.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.alpha.params.max.title",
				description: "category.string.alpha.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			},
			{
				id: "casing",
				title: "category.string.alpha.params.casing.title",
				description: "category.string.alpha.params.casing.description",
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
				title: "category.string.alpha.params.exclude.title",
				description: "category.string.alpha.params.exclude.description",
				type: "string",
				default: PARAMS.exclude
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
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
			if (exclude) {
				const EXCLUDE_SET = new Set(
					exclude
						.split(",")
						.map(ch => ch.trim())
						.filter(Boolean)
						.map(ch => [ch.toLowerCase(), ch.toUpperCase()])
						.flat()
				)
				pool = pool.split("").filter(ch => !EXCLUDE_SET.has(ch)).join("")
			}
			if (!pool) throw new Error("pool is empty")
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				result += pool[Math.floor(Math.random() * pool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
