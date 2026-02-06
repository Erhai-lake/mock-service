import {nanoid} from "nanoid"

interface params {
	min: number
	max: number
}

const PARAMS: params = {
	min: 21,
	max: 21
}

export const registerNanoId = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "nanoid",
		title: "generator.string.nanoId.title",
		description: "generator.string.nanoId.description",
		params: [
			{
				id: "min",
				title: "generator.string.nanoId.params.min.title",
				description: "generator.string.nanoId.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "generator.string.nanoId.params.max.title",
				description: "generator.string.nanoId.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			return nanoid(Math.floor(Math.random() * (max - min + 1)) + min)
		}
	})
}
