export default function registerNumeric(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "numeric",
		title: "category.string.numeric.title",
		description: "category.string.numeric.description",
		params: [
			{
				id: "min",
				title: "category.string.numeric.params.min.title",
				description: "category.string.numeric.params.min.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.numeric.params.max.title",
				description: "category.string.numeric.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "allowLeadingZero",
				title: "category.string.numeric.params.allowLeadingZero.title",
				description: "category.string.numeric.params.allowLeadingZero.description",
				type: "boolean",
				default: true
			},
			{
				id: "exclude",
				title: "category.string.numeric.params.exclude.title",
				description: "category.string.numeric.params.exclude.description",
				type: "string",
				default: ""
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 21, max: 21, allowLeadingZero: true, exclude: ""}): string {
			const {min = 21, max = 21, allowLeadingZero = true, exclude = ""} = params
			// 随机确定最终长度
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			// 数字池
			let pool = "0123456789"
			// 处理排除字符
			if (exclude) {
				const EXCLUDE_SET = new Set(
					exclude
						.split(",")
						.map(ch => ch.trim())
						.filter(Boolean)
				)
				pool = pool.split("").filter(ch => !EXCLUDE_SET.has(ch)).join("")
			}
			if (!pool) return "生成数字字符串失败: 字符池为空, 请检查设置"
			// 随机生成字符串
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				let currentPool = pool
				// 如果不允许首位为0, 且当前是第一个字符, 则移除0
				if (!allowLeadingZero && i === 0) {
					currentPool = currentPool.replace("0", "")
					if (!currentPool) return "生成数字字符串失败: 首位无可用数字"
				}
				// 随机选一个字符
				result += currentPool[Math.floor(Math.random() * currentPool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
