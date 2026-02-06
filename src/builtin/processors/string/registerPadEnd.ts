interface params {
	maxLength: number
	fillString: string
}

const PARAMS: params = {
	maxLength: 0,
	fillString: ""
}

export const registerPadEnd = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "padEnd",
		title: "processors.string.padEnd.title",
		description: "processors.string.padEnd.description",
		params: [
			{
				id: "maxLength",
				title: "processors.string.padEnd.params.maxLength.title",
				description: "processors.string.padEnd.params.maxLength.description",
				type: "number",
				default: PARAMS.maxLength,
				min: 0,
				step: 1
			},
			{
				id: "fillString",
				title: "processors.string.padEnd.params.fillString.title",
				description: "processors.string.padEnd.params.fillString.description",
				type: "string",
				default: PARAMS.fillString
			}
		],
		apply(value: string, params: Partial<params> = {}): string {
			const {maxLength = 0, fillString = ""} = {...PARAMS, ...params}
			return String(value).padEnd(maxLength, fillString)
		}
	})
}
