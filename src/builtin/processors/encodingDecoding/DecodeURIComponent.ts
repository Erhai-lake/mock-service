export default function registerDecodeURIComponent(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "decodeURIComponent",
		title: "processors.encodingDecoding.decodeURIComponent.title",
		description: "processors.encodingDecoding.decodeURIComponent.description",
		apply(value: string): string {
			return decodeURIComponent(String(value))
		}
	})
}
