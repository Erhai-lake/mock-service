export const registerNumber = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "number",
		title: "processors.string.number.title",
		description: "processors.string.number.description",
		apply(value: string): number {
			return Number(value)
		}
	})
}
