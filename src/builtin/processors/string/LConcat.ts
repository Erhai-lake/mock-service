interface Params {
	startString: string
}

const PARAMS: Params = {
	startString: ""
}

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
				default: PARAMS.startString
			}
		],
		apply(value: string, startString: string = PARAMS.startString): string {
			return startString.concat(String(value))
		}
	})
}
