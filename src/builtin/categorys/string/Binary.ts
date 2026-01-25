export default function registerBinary(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "binary",
		title: "随机一个二进制字符串",
		description: "返回一个随机的二进制字符串",
		params: [
			{
				id: "prefix",
				title: "前缀",
				description: "生成的二进制字符串的前缀",
				type: "string",
				default: "0b"
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
				description: "要生成的字符串的最大长度, 如果超出, 则会截取到最大长度(前缀不计算在内)",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {prefix: "0b", min: 21, max: 21}): string {
			const {prefix = "0b", min = 21, max = 21} = params
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			let bits = ""
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.random() < 0.5 ? "0" : "1"
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
