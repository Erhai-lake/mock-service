export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "substr",
		title: "字符串截取",
		description: "从输入字符串中截取指定范围的子字符串",
		params: [
			{
				id: "start",
				title: "截取开始位置",
				description: "截取的开始位置",
				type: "number",
				default: 0,
				min: 0,
				step: 1
			},
			{
				id: "length",
				title: "截取长度",
				description: "截取的长度",
				type: "number",
				default: 10,
				min: 0,
				step: 1
			}

		],
		apply(value: string, params = {start: 0, length: 10}): string {
			const {start = 0, length = 10} = params
			return String(value).substring(start, start + length)
		}
	})
}
