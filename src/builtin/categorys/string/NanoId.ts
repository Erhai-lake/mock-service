import {nanoid} from "nanoid"

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
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.string.nanoId.params.max.title",
				description: "category.string.nanoId.params.max.description",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 21, max: 21}): string {
			const {min = 21, max = 21} = params
			if (max < min) throw new Error("max must be greater than or equal to min")
			return nanoid(Math.floor(Math.random() * (max - min + 1)) + min)
		}
	})
}
