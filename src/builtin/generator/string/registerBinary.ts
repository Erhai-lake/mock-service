interface params {
	prefix: string
	min: number
	max: number
}

const PARAMS: params = {
	prefix: "0b",
	min: 21,
	max: 21
}

export const registerBinary = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "binary",
		title: "generator.string.binary.title",
		description: "generator.string.binary.description",
		params: [
			{
				id: "prefix",
				title: "generator.string.binary.params.prefix.title",
				description: "generator.string.binary.params.prefix.description",
				type: "string",
				default: PARAMS.prefix
			},
			{
				id: "min",
				title: "generator.string.binary.params.min.title",
				description: "generator.string.binary.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.string.binary.params.max.title",
				description: "generator.string.binary.params.max.description",
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
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.random() < 0.5 ? "0" : "1"
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
