interface Params {
	prefix: string
	min: number
	max: number
}

const PARAMS: Params = {
	prefix: "0o",
	min: 21,
	max: 21
}

export default function registerOctal(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "octal",
		title: "category.string.octal.title",
		description: "category.string.octal.description",
		params: [
			{
				id: "prefix",
				title: "category.string.octal.params.prefix.title",
				description: "category.string.octal.params.prefix.description",
				type: "string",
				default: PARAMS.prefix
			},
			{
				id: "min",
				title: "category.string.octal.params.min.title",
				description: "category.string.octal.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.octal.params.max.title",
				description: "category.string.octal.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {prefix, min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			let bits = ""
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.floor(Math.random() * 8).toString(8)
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
