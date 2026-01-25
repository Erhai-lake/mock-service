export default function registerBase64(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "base64",
		title: "Base64 编码",
		description: "对字符串进行 Base64 编码",
		apply(value: string): string {
			return btoa(String(value))
		}
	})
}
