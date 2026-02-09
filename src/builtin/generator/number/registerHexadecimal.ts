interface params {
	min: number
	max: number
}

const PARAMS: params = {
	min: 0,
	max: 15
}

export const registerHexadecimal = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "hexadecimal",
		title: "generator.number.hexadecimal.title",
		description: "generator.number.hexadecimal.description",
		params: [
			{
				id: "min",
				title: "generator.number.hexadecimal.params.min.title",
				description: "generator.number.hexadecimal.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.number.hexadecimal.params.max.title",
				description: "generator.number.hexadecimal.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			return RANDOM_INT.toString(16)
		}
	})
}
