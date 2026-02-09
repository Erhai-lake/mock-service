interface params {
	prefix: string
	casing: "upper" | "lower" | "mixed"
	min: number
	max: number
}

const PARAMS: params = {
	prefix: "0x",
	casing: "mixed",
	min: 21,
	max: 21
}

export const registerHexadecimal = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "hexadecimal",
		title: "generator.string.hexadecimal.title",
		description: "generator.string.hexadecimal.description",
		params: [
			{
				id: "prefix",
				title: "generator.string.hexadecimal.params.prefix.title",
				description: "generator.string.hexadecimal.params.prefix.description",
				type: "string",
				default: PARAMS.prefix
			},
			{
				id: "casing",
				title: "generator.string.hexadecimal.params.casing.title",
				description: "generator.string.hexadecimal.params.casing.description",
				type: "select",
				options: [
					{key: "upper", label: "upper"},
					{key: "lower", label: "lower"},
					{key: "mixed", label: "mixed"}
				],
				default: PARAMS.casing
			},
			{
				id: "min",
				title: "generator.string.hexadecimal.params.min.title",
				description: "generator.string.hexadecimal.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.string.hexadecimal.params.max.title",
				description: "generator.string.hexadecimal.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {prefix, casing, min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			let bits = ""
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.floor(Math.random() * 16).toString(16)
			switch (casing) {
				case "upper":
					bits = bits.toUpperCase()
					break
				case "lower":
					bits = bits.toLowerCase()
					break
				case "mixed":
					bits = bits + bits.toUpperCase()
					break
				default:
					bits = bits + bits.toUpperCase()
					break
			}
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
