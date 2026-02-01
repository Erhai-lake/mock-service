interface Params {
	min: number
	max: number
	multipleOf: number
}

const PARAMS: Params = {
	min: 1,
	max: Number.MAX_SAFE_INTEGER,
	multipleOf: 1
}

export default function PositiveInt(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "positiveInt",
		title: "category.number.positiveInt.title",
		description: "category.number.positiveInt.description",
		params: [
			{
				id: "min",
				title: "category.number.positiveInt.params.min.title",
				description: "category.number.positiveInt.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "max",
				title: "category.number.positiveInt.params.max.title",
				description: "category.number.positiveInt.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "multipleOf",
				title: "category.number.positiveInt.params.multipleOf.title",
				description: "category.number.positiveInt.params.multipleOf.description",
				type: "number",
				default: PARAMS.multipleOf,
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): number {
			const {min, max, multipleOf} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			return Math.floor(RANDOM_INT / multipleOf) * multipleOf
		}
	})
}
