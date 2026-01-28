export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "number",
		title: "processors.string.number.title",
		description: "processors.string.number.description",
		apply(value: string): number {
			return Number(value)
		}
	})
}
