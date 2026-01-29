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
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.sample.params.max.title",
				description: "category.string.sample.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "casing",
				title: "category.string.sample.params.casing.title",
				description: "category.string.sample.params.casing.description",
				type: "select",
				default: "mixed",
				options: ["upper", "lower", "mixed"]
			},
			{
				id: "allowLeadingZero",
				title: "category.string.sample.params.allowLeadingZero.title",
				description: "category.string.sample.params.allowLeadingZero.description",
				type: "boolean",
				default: true
			},
			{
				id: "exclude",
				title: "category.string.sample.params.exclude.title",
				description: "category.string.sample.params.exclude.description",
				type: "string",
				default: ""
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 21, max: 21, casing: "mixed", allowLeadingZero: true, exclude: ""}): string {
			const {min = 21, max = 21, casing = "mixed", allowLeadingZero = true, exclude = ""} = params
			if (max < min) return "max must be greater than or equal to min"
			// 随机确定最终长度
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			// 字母表
			const LETTERS = "abcdefghijklmnopqrstuvwxyz"
			// 数字表
			const NUMBERS = "0123456789"
			// 符号表
			const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>/?`~\"\\"
			let pool = ""
			// 根据 casing 处理字母表
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
			// 处理排除字符
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
			if (!pool) return "pool is empty"
			// 随机生成字符串
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				let currentPool = pool
				// 如果不允许首位为0, 且当前是第一个字符, 则移除0
				if (!allowLeadingZero && i === 0) {
					currentPool = currentPool.replace("0", "")
					if (!currentPool) return "pool is empty after exclude"
				}
				// 随机选一个字符
				result += currentPool[Math.floor(Math.random() * currentPool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
