export const registerBase64 = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "base64",
		title: "processors.encodingDecoding.base64.title",
		description: "processors.encodingDecoding.base64.description",
		apply(value: string): string {
			return btoa(String(value))
		}
	})
}
