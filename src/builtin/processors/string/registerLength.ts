export const registerLength = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "length",
		title: "processors.string.length.title",
		description: "processors.string.length.description",
		apply(value: string): number {
			return String(value).length
		}
	})
}
