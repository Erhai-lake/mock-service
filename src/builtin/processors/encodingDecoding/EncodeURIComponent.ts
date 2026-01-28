export default function registerEncodeURIComponent(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "encodeURIComponent",
		title: "processors.encodingDecoding.encodeURIComponent.title",
		description: "processors.encodingDecoding.encodeURIComponent.description",
		apply(value: string): string {
			return encodeURIComponent(String(value))
		}
	})
}
