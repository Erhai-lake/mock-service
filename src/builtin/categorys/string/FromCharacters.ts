export default function registerFromCharacters(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "fromCharacters",
		title: "随机字符字符串",
		description: "生成一个由指定字符组成的字符串",
		params: [
			{
				id: "characters",
				title: "字符",
				description: "要生成的字符串的字符, 使用英文逗号分隔, 如果一个字符里有多个字符, 则会视为一个字符",
				type: "string",
				default: "a,b,c,abc,1,2,3,4,5,6,123,456"
			},
			{
				id: "min",
				title: "最小长度",
				description: "要生成的字符串的最小长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大长度",
				description: "要生成的字符串的最大长度, 如果超出, 则会截取到最大长度",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {characters: "a,b,c,abc,1,2,3,4,5,6,123,456", min: 21, max: 21}): string {
			const {characters = "a,b,c,abc,1,2,3,4,5,6,123,456", min = 21, max = 21} = params
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			// 字符池
			const POOL = characters.split(",").map(s => s.trim()).filter(Boolean)
			if (POOL.length === 0) return "生成字符串失败: 字符池为空, 请检查设置"
			let result = ""
			for (let i = 0; i < FINAL_LENGTH; i++) {
				const INDEX = Math.floor(Math.random() * POOL.length)
				result += POOL[INDEX]
			}
			return result.slice(0, FINAL_LENGTH)
		}
	})
}
