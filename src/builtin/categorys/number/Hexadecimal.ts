interface Params {
	min: number
	max: number
}

const PARAMS: Params = {
	min: 0,
	max: 15
}

export default function registerHexadecimal(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "hexadecimal",
		title: "category.number.hexadecimal.title",
		description: "category.number.hexadecimal.description",
		params: [
			{
				id: "min",
				title: "category.number.hexadecimal.params.min.title",
				description: "category.number.hexadecimal.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.number.hexadecimal.params.max.title",
				description: "category.number.hexadecimal.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			return RANDOM_INT.toString(16)
		}
	})
}
