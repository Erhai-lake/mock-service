export default function registerHexadecimal(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "hexadecimal",
		title: "随机一个十六进制字符串",
		description: "返回一个随机的十六进制字符串.",
		params: [
			{
				id: "prefix",
				title: "前缀",
				description: "生成的十六进制字符串的前缀.",
				type: "string",
				default: "0x"
			},
			{
				id: "casing",
				title: "大小写",
				description: "字母大小写.",
				type: "select",
				default: "mixed",
				options: ["upper", "lower", "mixed"]
			},
			{
				id: "min",
				title: "最小长度",
				description: "要生成的字符串的最小长度.",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			},
			{
				id: "max",
				title: "最大长度",
				description: "要生成的字符串的最大长度, 如果超出, 则会截取到最大长度(前缀不计算在内).",
				type: "number",
				default: 21,
				min: 1,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {prefix: "0x", casing: "mixed", min: 21, max: 21}): string {
			const {prefix = "0x", casing = "mixed", min = 21, max = 21} = params
			const FINAL_LENGTH = Math.floor(Math.random() * (max - min + 1)) + min
			let bits = ""
			for (let i = 0; i < FINAL_LENGTH; i++) bits += Math.floor(Math.random() * 16).toString(16)
			switch (casing) {
				case "upper":
					bits = bits.toUpperCase()
					break
				case "lower":
					bits = bits.toLowerCase()
					break
				case "mixed":
					bits = bits + bits.toUpperCase()
					break
				default:
					bits = bits + bits.toUpperCase()
					break
			}
			return prefix + bits.slice(0, FINAL_LENGTH)
		}
	})
}
