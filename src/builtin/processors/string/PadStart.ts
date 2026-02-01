interface Params {
	maxLength: number
	fillString: string
}

const PARAMS: Params = {
	maxLength: 0,
	fillString: ""
}

export default function registerMD5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "padStart",
		title: "processors.string.padStart.title",
		description: "processors.string.padStart.description",
		params: [
			{
				id: "maxLength",
				title: "processors.string.padStart.params.maxLength.title",
				description: "processors.string.padStart.params.maxLength.description",
				type: "number",
				default: PARAMS.maxLength,
				min: 0,
				step: 1
			},
			{
				id: "fillString",
				title: "processors.string.padStart.params.fillString.title",
				description: "processors.string.padStart.params.fillString.description",
				type: "string",
				default: PARAMS.fillString
			}
		],
		apply(value: string, params: Partial<Params> = {}): string {
			const {maxLength = 0, fillString = ""} = {...PARAMS, ...params}
			return String(value).padStart(maxLength, fillString)
		}
	})
}
