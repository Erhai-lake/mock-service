export default function registerInt(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "int",
		title: "category.number.int.title",
		description: "category.number.int.description",
		params: [
			{
				id: "min",
				title: "category.number.int.params.min.title",
				description: "category.number.int.params.min.description",
				type: "number",
				default: Number.MIN_SAFE_INTEGER,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "max",
				title: "category.number.int.params.max.title",
				description: "category.number.int.params.max.description",
				type: "number",
				default: Number.MAX_SAFE_INTEGER,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "multipleOf",
				title: "category.number.int.params.multipleOf.title",
				description: "category.number.int.params.multipleOf.description",
				type: "number",
				default: 1,
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER, multipleOf: 1}): number {
			const {min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, multipleOf = 1} = params
			if (max < min) throw new Error("max must be greater than or equal to min")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			return Math.floor(RANDOM_INT / multipleOf) * multipleOf
		}
	})
}
