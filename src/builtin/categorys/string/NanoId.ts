import {nanoid} from "nanoid"

interface Params {
	min: number
	max: number
}

const PARAMS: Params = {
	min: 21,
	max: 21
}

export default function registerNanoId(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "nanoid",
		title: "category.string.nanoId.title",
		description: "category.string.nanoId.description",
		params: [
			{
				id: "min",
				title: "category.string.nanoId.params.min.title",
				description: "category.string.nanoId.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.nanoId.params.max.title",
				description: "category.string.nanoId.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			return nanoid(Math.floor(Math.random() * (max - min + 1)) + min)
		}
	})
}
