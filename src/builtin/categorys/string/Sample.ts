export default function registerSample(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "sample",
		title: "示例字符串",
		description: "生成一个由字母, 数字, 符号组成的字符串",
		params: [
			{
				id: "min",
				title: "最小长度",
				description: "要生成的字母和数字字符串的最小长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大长度",
				description: "要生成的字母和数字字符串的最大长度, 如果超出, 则会截取到最大长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "casing",
				title: "大小写",
				description: "字母大小写",
				type: "select",
				default: "mixed",
				options: ["upper", "lower", "mixed"]
			},
			{
				id: "allowLeadingZero",
				title: "允许前导零",
				description: "是否允许生成的数字字符串以零开头",
				type: "boolean",
				default: true
			},
			{
				id: "exclude",
				title: "排除字符",
				description: "一个或多个要排除的字符, 用英文逗号分隔, 会同时排除大小写",
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
			if (!pool) return "生成字符串失败: 字符池为空, 请检查设置"
			// 随机生成字符串
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				let currentPool = pool
				// 如果不允许首位为0, 且当前是第一个字符, 则移除0
				if (!allowLeadingZero && i === 0) {
					currentPool = currentPool.replace("0", "");
					if (!currentPool) return "生成字符串失败: 首位无可用字符";
				}
				// 随机选一个字符
				result += currentPool[Math.floor(Math.random() * currentPool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
