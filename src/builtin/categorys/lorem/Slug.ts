import {WORD_EN} from "../constants/WordEN"

export default function registerSlug(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "slug",
		title: "生成 slugified 文本",
		description: "生成一个由多个单词组成的 slugified 文本",
		params: [
			{
				id: "min",
				title: "最小单词数",
				description: "要生成的最小单词数",
				type: "number",
				default: 3,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大单词数",
				description: "要生成的最大单词数",
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
