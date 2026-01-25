export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "concat",
		title: "字符串右拼接",
		description: "将输入的字符串在右侧与另一个字符串拼接在一起",
		params: [
			{
				id: "endString",
				title: "拼接字符串",
				description: "拼接的字符串",
				type: "string",
				default: ""
			}
		],
		apply(value: string, endString = ""): string {
			return String(value).concat(endString)
		}
	})
}
