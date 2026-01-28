export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "concat",
		title: "processors.string.concat.title",
		description: "processors.string.concat.description",
		params: [
			{
				id: "endString",
				title: "processors.string.concat.params.endString.title",
				description: "processors.string.concat.params.endString.description",
				type: "string",
				default: ""
			}
		],
		apply(value: string, endString = ""): string {
			return String(value).concat(endString)
		}
	})
}
