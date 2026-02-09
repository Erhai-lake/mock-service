import {clampNumber} from "../../public/clampNumber"

interface params {
	characters: string
	min: number
	max: number
}

const LIMITS = {
	min: {default: 21, min: 1, step: 1},
	max: {default: 21, min: 1, step: 1}
}

const PARAMS: params = {
	characters: "a,b,c,abc,1,2,3,4,5,6,123,456",
	min: LIMITS.min.default,
	max: LIMITS.max.default
}

export const registerCharacters = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "characters",
		title: "generator.string.characters.title",
		description: "generator.string.characters.description",
		params: [
			{
				id: "characters",
				title: "generator.string.characters.params.characters.title",
				description: "generator.string.characters.params.characters.description",
				type: "string",
				default: PARAMS.characters
			},
			{
				id: "min",
				title: "generator.string.characters.params.min.title",
				description: "generator.string.characters.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.string.characters.params.max.title",
				description: "generator.string.characters.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				step: LIMITS.max.step
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {characters, min, max} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, undefined, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, undefined, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const FINAL_LENGTH = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const POOL = characters.split(",").map(s => s.trim()).filter(Boolean)
			if (POOL.length) throw new Error("error.poolIsEmpty")
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				const INDEX = Math.floor(Math.random() * POOL.length)
				result += POOL[INDEX]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
