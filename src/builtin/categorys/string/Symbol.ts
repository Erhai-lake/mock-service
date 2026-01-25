export default function registerSymbol(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "symbol",
		title: "随机符号字符串",
		description: "生成一个由符号组成的字符串",
		params: [
			{
				id: "min",
				title: "最小长度",
				description: "要生成的符号字符串的最小长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大长度",
				description: "要生成的符号字符串的最大长度, 如果超出, 则会截取到最大长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 21, max: 21}): string {
			const {min = 21, max = 21} = params
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
