interface params {
	min: number
	max: number
}

const PARAMS: params = {
	min: 21,
	max: 21
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
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.string.symbol.params.max.title",
				description: "generator.string.symbol.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
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
