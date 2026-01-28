import {WORD_EN} from "../constants/WordEN"

export default function registerSlug(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "slug",
		title: "category.lorem.slug.title",
		description: "category.lorem.slug.description",
		params: [
			{
				id: "min",
				title: "category.lorem.slug.params.min.title",
				description: "category.lorem.slug.params.min.description",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "category.lorem.slug.params.max.title",
				description: "category.lorem.slug.params.max.description",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 3, max: 3}): string {
			const {min = 3, max = 3} = params
			const COUNT = Math.floor(Math.random() * (max - min + 1)) + min
			const BLOCKS: string[] = []
			for (let i = 0; i < COUNT; i++) {
				BLOCKS.push(WORD_EN[Math.floor(Math.random() * WORD_EN.length)])
			}
			return BLOCKS.join("-").toLowerCase()
		}
	})
}
