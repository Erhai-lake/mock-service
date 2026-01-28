export default function registerHexadecimal(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "hexadecimal",
		title: "category.string.hexadecimal.title",
		description: "category.string.hexadecimal.description",
		params: [
			{
				id: "prefix",
				title: "category.string.hexadecimal.params.prefix.title",
				description: "category.string.hexadecimal.params.prefix.description",
				type: "string",
				default: "0x"
			},
			{
				id: "casing",
				title: "category.string.hexadecimal.params.casing.title",
				description: "category.string.hexadecimal.params.casing.description",
				type: "select",
				default: "mixed",
				options: ["upper", "lower", "mixed"]
			},
			{
				id: "min",
				title: "category.string.hexadecimal.params.min.title",
				description: "category.string.hexadecimal.params.min.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.hexadecimal.params.max.title",
				description: "category.string.hexadecimal.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {prefix: "0x", casing: "mixed", min: 21, max: 21}): string {
			const {prefix = "0x", casing = "mixed", min = 21, max = 21} = params
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			let bits = ""
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.floor(Math.random() * 16).toString(16)
			switch (casing) {
				case "upper":
					bits = bits.toUpperCase()
					break
				case "lower":
					bits = bits.toLowerCase()
					break
				case "mixed":
					bits = bits + bits.toUpperCase()
					break
				default:
					bits = bits + bits.toUpperCase()
					break
			}
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
