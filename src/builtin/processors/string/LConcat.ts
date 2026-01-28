export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "lconcat",
		title: "processors.string.lconcat.title",
		description: "processors.string.lconcat.description",
		params: [
			{
				id: "startString",
				title: "processors.string.lconcat.params.startString.title",
				description: "processors.string.lconcat.params.startString.description",
				type: "string",
				default: ""
			}
		],
		apply(value: string, startString = ""): string {
			return startString.concat(String(value))
		}
	})
}
