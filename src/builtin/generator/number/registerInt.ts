interface params {
	min: number
	max: number
	multipleOf: number
}

const PARAMS: params = {
	min: Number.MIN_SAFE_INTEGER,
	max: Number.MAX_SAFE_INTEGER,
	multipleOf: 1
}

export const registerInt = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "int",
		title: "generator.number.int.title",
		description: "generator.number.int.description",
		params: [
			{
				id: "min",
				title: "generator.number.int.params.min.title",
				description: "generator.number.int.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "max",
				title: "generator.number.int.params.max.title",
				description: "generator.number.int.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "multipleOf",
				title: "generator.number.int.params.multipleOf.title",
				description: "generator.number.int.params.multipleOf.description",
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
			if (max < min) throw new Error("error.maxIsLessThanMin")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			return Math.floor(RANDOM_INT / multipleOf) * multipleOf
		}
	})
}
