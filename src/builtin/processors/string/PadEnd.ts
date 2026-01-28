export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "padEnd",
		title: "processors.string.padEnd.title",
		description: "processors.string.padEnd.description",
		params: [
			{
				id: "maxLength",
				title: "processors.string.padEnd.params.maxLength.title",
				description: "processors.string.padEnd.params.maxLength.description",
				type: "number",
				default: 0,
				min: 0,
				step: 1
			},
			{
				id: "fillString",
				title: "processors.string.padEnd.params.fillString.title",
				description: "processors.string.padEnd.params.fillString.description",
				type: "string",
				default: ""
			}
		],
		apply(value: string, params = {maxLength: 0, fillString: ""}): string {
			const {maxLength = 0, fillString = ""} = params
			return String(value).padEnd(maxLength, fillString)
		}
	})
}
