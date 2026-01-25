import {nanoid} from "nanoid"

export default function registerNanoId(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "nanoid",
		title: "随机 Nano ID",
		description: "生成一个随机且尽量唯一的 Nano ID",
		params: [
			{
				id: "min",
				title: "最小长度",
				description: "Nano ID 最小长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大长度",
				description: "Nano ID 最大长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: 21, max: 21}): string {
			const {min = 21, max = 21} = params
			return nanoid(Math.floor(Math.random() * (max - min + 1)) + min)
		}
	})
}
