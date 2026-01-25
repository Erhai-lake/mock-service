export default function registerUnBase64(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "unbase64",
		title: "Base64 解码",
		description: "对 Base64 编码的字符串进行解码",
		apply(value: string): string {
			return atob(String(value))
		}
	})
}
