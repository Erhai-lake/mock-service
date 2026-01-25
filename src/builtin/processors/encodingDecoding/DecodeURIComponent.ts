export default function registerDecodeURIComponent(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "decodeURIComponent",
		title: "URI 解码",
		description: "对 URI 编码的字符串进行解码",
		apply(value: string): string {
			return decodeURIComponent(String(value))
		}
	})
}
