export default function registerFromCharacters(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "fromCharacters",
		title: "category.string.fromCharacters.title",
		description: "category.string.fromCharacters.description",
		params: [
			{
				id: "characters",
				title: "category.string.fromCharacters.params.characters.title",
				description: "category.string.fromCharacters.params.characters.description",
				type: "string",
				default: "a,b,c,abc,1,2,3,4,5,6,123,456"
			},
			{
				id: "min",
				title: "category.string.fromCharacters.params.min.title",
				description: "category.string.fromCharacters.params.min.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.fromCharacters.params.max.title",
				description: "category.string.fromCharacters.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {characters: "a,b,c,abc,1,2,3,4,5,6,123,456", min: 21, max: 21}): string {
			const {characters = "a,b,c,abc,1,2,3,4,5,6,123,456", min = 21, max = 21} = params
			if (max < min) throw new Error("max must be greater than or equal to min")
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			const POOL = characters.split(",").map(s => s.trim()).filter(Boolean)
			if (POOL.length) throw new Error("pool is empty")
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				const INDEX = Math.floor(Math.random() * POOL.length)
				result += POOL[INDEX]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
