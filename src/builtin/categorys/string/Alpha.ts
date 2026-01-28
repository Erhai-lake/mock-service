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
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.alpha.params.max.title",
				description: "category.string.alpha.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "casing",
				title: "category.string.alpha.params.casing.title",
				description: "category.string.alpha.params.casing.description",
				type: "select",
				default: "mixed",
				options: ["upper", "lower", "mixed"]
			},
			{
				id: "exclude",
				title: "category.string.alpha.params.exclude.title",
				description: "category.string.alpha.params.exclude.description",
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
