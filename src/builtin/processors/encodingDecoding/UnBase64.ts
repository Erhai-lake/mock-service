export default function registerUnBase64(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "unbase64",
		title: "processors.encodingDecoding.unbase64.title",
		description: "processors.encodingDecoding.unbase64.description",
		apply(value: string): string {
			return atob(String(value))
		}
	})
}
