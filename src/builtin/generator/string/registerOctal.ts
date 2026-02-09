interface params {
	prefix: string
	min: number
	max: number
}

const PARAMS: params = {
	prefix: "0o",
	min: 21,
	max: 21
}

export const registerOctal = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "octal",
		title: "generator.string.octal.title",
		description: "generator.string.octal.description",
		params: [
			{
				id: "prefix",
				title: "generator.string.octal.params.prefix.title",
				description: "generator.string.octal.params.prefix.description",
				type: "string",
				default: PARAMS.prefix
			},
			{
				id: "min",
				title: "generator.string.octal.params.min.title",
				description: "generator.string.octal.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.string.octal.params.max.title",
				description: "generator.string.octal.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {prefix, min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			let bits = ""
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.floor(Math.random() * 8).toString(8)
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
