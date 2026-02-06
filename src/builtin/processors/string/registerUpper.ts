export const registerUpper = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "upper",
		title: "processors.string.upper.title",
		description: "processors.string.upper.description",
		apply(value: string): string {
			return String(value).toUpperCase()
		}
	})
}
