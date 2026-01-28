export default function registerBinary(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "binary",
		title: "category.string.binary.title",
		description: "category.string.binary.description",
		params: [
			{
				id: "prefix",
				title: "category.string.binary.params.prefix.title",
				description: "category.string.binary.params.prefix.description",
				type: "string",
				default: "0b"
			},
			{
				id: "min",
				title: "category.string.binary.params.min.title",
				description: "category.string.binary.params.min.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.binary.params.max.title",
				description: "category.string.binary.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {prefix: "0b", min: 21, max: 21}): string {
			const {prefix = "0b", min = 21, max = 21} = params
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			let bits = ""
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.random() < 0.5 ? "0" : "1"
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
