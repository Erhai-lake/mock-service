export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "length",
		title: "数据长度",
		description: "获取输入字符串的长度",
		apply(value: string): number {
			return String(value).length
		}
	})
}
