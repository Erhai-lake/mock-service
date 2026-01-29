export default function registerSymbol(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "symbol",
		title: "category.string.symbol.title",
		description: "category.string.symbol.description",
		params: [
			{
				id: "min",
				title: "category.string.symbol.params.min.title",
				description: "category.string.symbol.params.min.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.symbol.params.max.title",
				description: "category.string.symbol.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 21, max: 21}): string {
			const {min = 21, max = 21} = params
			if (max < min) return "max must be greater than or equal to min"
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			// 定义可用符号集合
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
