export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "lower",
		title: "所有字母转换为小写",
		description: "将输入的字符串转换为小写",
		apply(value: string): string {
			return String(value).toLowerCase()
		}
	})
}
