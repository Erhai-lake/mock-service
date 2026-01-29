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
				default: Number.MIN_SAFE_INTEGER,
				min: Number.MIN_SAFE_INTEGER,
				max: -1,
				step: 1
			},
			{
				id: "max",
				title: "category.number.negativeInt.params.max.title",
				description: "category.number.negativeInt.params.max.description",
				type: "number",
				default: -1,
				min: Number.MIN_SAFE_INTEGER,
				max: -1,
				step: 1
			},
			{
				id: "multipleOf",
				title: "category.number.negativeInt.params.multipleOf.title",
				description: "category.number.negativeInt.params.multipleOf.description",
				type: "number",
				default: 0,
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: Number.MIN_SAFE_INTEGER, max: 0, multipleOf: 0}): number {
			const {min = Number.MIN_SAFE_INTEGER, max = 0, multipleOf = 0} = params
			if (max < min) throw new Error("max must be greater than or equal to min")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			if (multipleOf > 0) return Math.floor(RANDOM_INT / multipleOf) * multipleOf
			return RANDOM_INT
		}
	})
}
