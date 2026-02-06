export const registerLower = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "lower",
		title: "processors.string.lower.title",
		description: "processors.string.lower.description",
		apply(value: string): string {
			return String(value).toLowerCase()
		}
	})
}
