export default function registerEncodeURIComponent(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "encodeURIComponent",
		title: "URI 编码",
		description: "对字符串进行 URI 编码",
		apply(value: string): string {
			return encodeURIComponent(String(value))
		}
	})
}
