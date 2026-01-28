export default function registerAlphanumeric(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "alphanumeric",
		title: "category.string.alphanumeric.title",
		description: "category.string.alphanumeric.description",
		params: [
			{
				id: "min",
				title: "category.string.alphanumeric.params.min.title",
				description: "category.string.alphanumeric.params.min.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.alphanumeric.params.max.title",
				description: "category.string.alphanumeric.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "casing",
				title: "category.string.alphanumeric.params.casing.title",
				description: "category.string.alphanumeric.params.casing.description",
				type: "select",
				default: "mixed",
				options: ["upper", "lower", "mixed"]
			},
			{
				id: "allowLeadingZero",
				title: "category.string.alphanumeric.params.allowLeadingZero.title",
				description: "category.string.alphanumeric.params.allowLeadingZero.description",
				type: "boolean",
				default: true
			},
			{
				id: "exclude",
				title: "category.string.alphanumeric.params.exclude.title",
				description: "category.string.alphanumeric.params.exclude.description",
				type: "string",
				default: ""
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 21, max: 21, casing: "mixed", allowLeadingZero: true, exclude: ""}): string {
			const {min = 21, max = 21, casing = "mixed", allowLeadingZero = true, exclude = ""} = params
			// 随机确定最终长度
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			// 字母表
			const LETTERS = "abcdefghijklmnopqrstuvwxyz"
			// 数字表
			const NUMBERS = "0123456789"
			let pool = ""
			// 根据 casing 处理字母表
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
