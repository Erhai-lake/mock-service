export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "length",
		title: "processors.string.length.title",
		description: "processors.string.length.description",
		apply(value: string): number {
			return String(value).length
		}
	})
}
