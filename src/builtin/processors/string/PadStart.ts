export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "padStart",
		title: "字符串左填充",
		description: "将输入的字符串在左侧填充指定的字符串, 直到达到指定的长度",
		params: [
			{
				id: "maxLength",
				title: "最大长度",
				description: "填充后的字符串最大长度",
				type: "number",
				default: 0,
				min: 0,
				step: 1
			},
			{
				id: "fillString",
				title: "填充字符串",
				description: "用于填充的字符串",
				type: "string",
				default: ""
			}
		],
		apply(value: string, params = {maxLength: 0, fillString: ""}): string {
			const {maxLength = 0, fillString = ""} = params
			return String(value).padStart(maxLength, fillString)
		}
	})
}
