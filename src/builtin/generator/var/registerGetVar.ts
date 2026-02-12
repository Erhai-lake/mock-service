interface params {
	key: string
}

const PARAMS: params = {
	key: ""
}

export const registerGetVar = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "getVar",
		title: "generator.var.getVar.title",
		description: "generator.var.getVar.description",
		params: [
			{
				id: "key",
				title: "generator.var.getVar.params.key.title",
				description: "generator.var.getVar.params.key.description",
				type: "string",
				default: PARAMS.key
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(params: Partial<params> = {}, context: any): string {
			const {key} = {...PARAMS, ...params}
			if (!key) return ""
			return context.getVar(key)
		}
	})
}
