interface params {
	min: number
	max: number
	allowLeadingZero: boolean
	exclude: string
}

const PARAMS: params = {
	min: 21,
	max: 21,
	allowLeadingZero: true,
	exclude: ""
}

export const registerNumeric = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "numeric",
		title: "generator.string.numeric.title",
		description: "generator.string.numeric.description",
		params: [
			{
				id: "min",
				title: "generator.string.numeric.params.min.title",
				description: "generator.string.numeric.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.string.numeric.params.max.title",
				description: "generator.string.numeric.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			},
			{
				id: "allowLeadingZero",
				title: "generator.string.numeric.params.allowLeadingZero.title",
				description: "generator.string.numeric.params.allowLeadingZero.description",
				type: "boolean",
				default: PARAMS.allowLeadingZero
			},
			{
				id: "exclude",
				title: "generator.string.numeric.params.exclude.title",
				description: "generator.string.numeric.params.exclude.description",
				type: "string",
				default: PARAMS.exclude
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max, allowLeadingZero, exclude} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			let pool = "0123456789"
			if (exclude) {
				const EXCLUDE_SET = new Set(
					exclude
						.split(",")
						.map(ch => ch.trim())
						.filter(Boolean)
				)
				pool = pool.split("").filter(ch => !EXCLUDE_SET.has(ch)).join("")
			}
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
