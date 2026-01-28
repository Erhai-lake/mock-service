export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "substr",
		title: "processors.string.substr.title",
		description: "processors.string.substr.description",
		params: [
			{
				id: "start",
				title: "processors.string.substr.params.start.title",
				description: "processors.string.substr.params.start.description",
				type: "number",
				default: 0,
				min: 0,
				step: 1
			},
			{
				id: "length",
				title: "processors.string.substr.params.length.title",
				description: "processors.string.substr.params.length.description",
				type: "number",
				default: 10,
				min: 0,
				step: 1
			}

		],
		apply(value: string, params = {start: 0, length: 10}): string {
			const {start = 0, length = 10} = params
			return String(value).substring(start, start + length)
		}
	})
}
