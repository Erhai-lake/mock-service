export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "number",
		title: "字符串转换为数字",
		description: "将输入的字符串转换为数字",
		apply(value: string): number {
			return Number(value)
		}
	})
}
