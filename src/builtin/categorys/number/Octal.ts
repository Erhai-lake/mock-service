interface Params {
	min: number
	max: number
}

const PARAMS: Params = {
	min: 0,
	max: 7
}

export default function registerOctal(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "octal",
		title: "category.number.octal.title",
		description: "category.number.octal.description",
		params: [
			{
				id: "min",
				title: "category.number.octal.params.min.title",
				description: "category.number.octal.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.number.octal.params.max.title",
				description: "category.number.octal.params.max.description",
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
			return RANDOM_INT.toString(8)
		}
	})
}
