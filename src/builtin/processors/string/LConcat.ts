export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "lconcat",
		title: "字符串左拼接",
		description: "将输入的字符串在左侧与另一个字符串拼接在一起",
		params: [
			{
				id: "startString",
				title: "拼接字符串",
				description: "拼接的字符串",
				type: "string",
				default: ""
			}
		],
		apply(value: string, startString = ""): string {
			return startString.concat(String(value))
		}
	})
}
