export const registerEncodeURIComponent = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "encodeURIComponent",
		title: "processors.encodingDecoding.encodeURIComponent.title",
		description: "processors.encodingDecoding.encodeURIComponent.description",
		apply(value: string): string {
			return encodeURIComponent(String(value))
		}
	})
}
