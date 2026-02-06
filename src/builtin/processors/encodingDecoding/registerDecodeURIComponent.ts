export const registerDecodeURIComponent = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "decodeURIComponent",
		title: "processors.encodingDecoding.decodeURIComponent.title",
		description: "processors.encodingDecoding.decodeURIComponent.description",
		apply(value: string): string {
			return decodeURIComponent(String(value))
		}
	})
}
