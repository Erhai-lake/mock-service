interface params {
	key: string
	value: string
	isReturn: boolean
}

const PARAMS: params = {
	key: "",
	value: "",
	isReturn: false
}

export const registerSetVar = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "setVar",
		title: "generator.var.setVar.title",
		description: "generator.var.setVar.description",
		params: [
			{
				id: "key",
				title: "generator.var.setVar.params.key.title",
				description: "generator.var.setVar.params.key.description",
				type: "string",
				default: PARAMS.key
			},
			{
				id: "value",
				title: "generator.var.setVar.params.value.title",
				description: "generator.var.setVar.params.value.description",
				type: "string",
				default: PARAMS.value
			},
			{
				id: "isReturn",
				title: "generator.var.setVar.params.isReturn.title",
				description: "generator.var.setVar.params.isReturn.description",
				type: "boolean",
				default: PARAMS.isReturn
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(params: Partial<params> = {}, context: any): string {
			const {key, value, isReturn} = {...PARAMS, ...params}
			if (!key || !value) return ""
			const RESULT = context.setVar(key, value)
			return isReturn ? RESULT : ""
		}
	})
}
