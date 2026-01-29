export default function registerBinary(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "binary",
		title: "category.number.binary.title",
		description: "category.number.binary.description",
		params: [
			{
				id: "min",
				title: "category.number.binary.params.min.title",
				description: "category.number.binary.params.min.description",
				type: "number",
				default: 0,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.number.binary.params.max.title",
				description: "category.number.binary.params.max.description",
				type: "number",
				default: 5,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 0, max: 5}): string {
			const {min = 0, max = 5} = params
			if (max < min) throw new Error("max must be greater than or equal to min")
			const RANDOM_INT = Math.floor(Math.random() * (max - min + 1)) + min
			return RANDOM_INT.toString(2)
		}
	})
}
