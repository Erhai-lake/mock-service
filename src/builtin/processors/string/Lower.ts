export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "lower",
		title: "processors.string.lower.title",
		description: "processors.string.lower.description",
		apply(value: string): string {
			return String(value).toLowerCase()
		}
	})
}
