export default function registerBase64(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "base64",
		title: "processors.encodingDecoding.base64.title",
		description: "processors.encodingDecoding.base64.description",
		apply(value: string): string {
			return btoa(String(value))
		}
	})
}
