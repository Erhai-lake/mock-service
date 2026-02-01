interface Params {
	min: number
	max: number
	multipleOf: number
}

const PARAMS: Params = {
	min: Number.MIN_SAFE_INTEGER,
	max: -1,
	multipleOf: 0
}

export default function NegativeInt(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "negativeInt",
		title: "category.number.negativeInt.title",
		description: "category.number.negativeInt.description",
		params: [
			{
				id: "min",
				title: "category.number.negativeInt.params.min.title",
				description: "category.number.negativeInt.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: Number.MIN_SAFE_INTEGER,
				max: -1,
				step: 1
			},
			{
				id: "max",
				title: "category.number.negativeInt.params.max.title",
				description: "category.number.negativeInt.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: Number.MIN_SAFE_INTEGER,
				max: -1,
				step: 1
			},
			{
				id: "multipleOf",
				title: "category.number.negativeInt.params.multipleOf.title",
				description: "category.number.negativeInt.params.multipleOf.description",
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
			if (multipleOf > 0) return Math.floor(RANDOM_INT / multipleOf) * multipleOf
			return RANDOM_INT
		}
	})
}
