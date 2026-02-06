interface params {
	endString: string
}

const PARAMS: params = {
	endString: ""
}

export const registerConcat = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "concat",
		title: "processors.string.concat.title",
		description: "processors.string.concat.description",
		params: [
			{
				id: "endString",
				title: "processors.string.concat.params.endString.title",
				description: "processors.string.concat.params.endString.description",
				type: "string",
				default: PARAMS.endString
			}
		],
		apply(value: string, endString: string = PARAMS.endString): string {
			return String(value).concat(endString)
		}
	})
}
