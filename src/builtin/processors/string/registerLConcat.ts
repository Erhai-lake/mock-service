interface params {
	startString: string
}

const PARAMS: params = {
	startString: ""
}

export const registerLConcat = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "lconcat",
		title: "processors.string.lconcat.title",
		description: "processors.string.lconcat.description",
		params: [
			{
				id: "startString",
				title: "processors.string.lconcat.params.startString.title",
				description: "processors.string.lconcat.params.startString.description",
				type: "string",
				default: PARAMS.startString
			}
		],
		apply(value: string, params: Partial<params>): string {
			const {startString} = {...PARAMS, ...params}
			return startString.concat(String(value))
		}
	})
}
