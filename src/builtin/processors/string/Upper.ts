export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "upper",
		title: "processors.string.upper.title",
		description: "processors.string.upper.description",
		apply(value: string): string {
			return String(value).toUpperCase()
		}
	})
}
