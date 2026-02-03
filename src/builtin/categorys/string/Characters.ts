interface Params {
	characters: string
	min: number
	max: number
}

const PARAMS: Params = {
	characters: "a,b,c,abc,1,2,3,4,5,6,123,456",
	min: 21,
	max: 21
}

export default function registerCharacters(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "characters",
		title: "category.string.characters.title",
		description: "category.string.characters.description",
		params: [
			{
				id: "characters",
				title: "category.string.characters.params.characters.title",
				description: "category.string.characters.params.characters.description",
				type: "string",
				default: PARAMS.characters
			},
			{
				id: "min",
				title: "category.string.characters.params.min.title",
				description: "category.string.characters.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.characters.params.max.title",
				description: "category.string.characters.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {characters, min, max} = {...PARAMS, ...params}
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
