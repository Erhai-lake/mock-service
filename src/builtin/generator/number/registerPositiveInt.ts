interface params {
	min: number
	max: number
	multipleOf: number
}

const PARAMS: params = {
	min: 1,
	max: Number.MAX_SAFE_INTEGER,
	multipleOf: 1
}

export const registerPositiveInt = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "positiveInt",
		title: "generator.number.positiveInt.title",
		description: "generator.number.positiveInt.description",
		params: [
			{
				id: "min",
				title: "generator.number.positiveInt.params.min.title",
				description: "generator.number.positiveInt.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "max",
				title: "generator.number.positiveInt.params.max.title",
				description: "generator.number.positiveInt.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "multipleOf",
				title: "generator.number.positiveInt.params.multipleOf.title",
				description: "generator.number.positiveInt.params.multipleOf.description",
				type: "number",
				default: PARAMS.multipleOf,
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): number {
			const {min, max, multipleOf} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			return Math.floor(RANDOM_INT / multipleOf) * multipleOf
		}
	})
}
