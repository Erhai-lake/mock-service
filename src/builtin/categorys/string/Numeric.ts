export default function registerNumeric(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "numeric",
		title: "数字字符串",
		description: "生成一个由数字组成的字符串",
		params: [
			{
				id: "min",
				title: "最小长度",
				description: "要生成的数字字符串的最小长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大长度",
				description: "要生成的数字字符串的最大长度, 如果超出, 则会截取到最大长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
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
				description: "一个或多个要排除的数字字符, 用英文逗号分隔",
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
					currentPool = currentPool.replace("0", "");
					if (!currentPool) return "生成数字字符串失败: 首位无可用数字";
				}
				// 随机选一个字符
				result += currentPool[Math.floor(Math.random() * currentPool.length)]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
