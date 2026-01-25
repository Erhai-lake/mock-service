export default function registerAlpha(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "alpha",
		title: "字母字符串",
		description: "生成一个由字母组成的字符串",
		params: [
			{
				id: "min",
				title: "最小长度",
				description: "要生成的字母字符串的最小长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大长度",
				description: "要生成的字母字符串的最大长度, 如果超出, 则会截取到最大长度",
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
				id: "exclude",
				title: "排除字符",
				description: "一个或多个要排除的字符, 用英文逗号分隔, 会同时排除大小写",
				type: "string",
				default: ""
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 21, max: 21, casing: "mixed", exclude: ""}): string {
			const {min = 21, max = 21, casing = "mixed", exclude = ""} = params
			// 随机确定最终长度
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			// 字母表
			const LETTERS = "abcdefghijklmnopqrstuvwxyz"
			let pool = ""
			// 根据 casing 处理字母表
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
			if (!pool) return "生成字母字符串失败: 字符池为空, 请检查设置"
			// 随机生成字符串
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				result += pool[Math.floor(Math.random() * pool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
