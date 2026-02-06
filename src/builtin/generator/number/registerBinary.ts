interface params {
	min: number
	max: number
}

const PARAMS: params = {
	min: 0,
	max: 5
}

export const registerBinary = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "binary",
		title: "generator.number.binary.title",
		description: "generator.number.binary.description",
		params: [
			{
				id: "min",
				title: "generator.number.binary.params.min.title",
				description: "generator.number.binary.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.number.binary.params.max.title",
				description: "generator.number.binary.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			return RANDOM_INT.toString(2)
		}
	})
}
