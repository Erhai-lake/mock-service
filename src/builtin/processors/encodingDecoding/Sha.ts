import CryptoJS from "crypto-js"

export default function registerSha(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "sha",
		title: "SHA",
		description: "对字符串进行 SHA 编码",
		params: [
			{
				id: "algorithm",
				title: "算法",
				description: "SHA 算法",
				type: "select",
				default: "SHA256",
				options: ["SHA1", "SHA224", "SHA256", "SHA384", "SHA512"]
			}
		],
		apply(value: string, algorithm = "SHA256"): string {
			switch (algorithm) {
				case "SHA1":
					return CryptoJS.SHA1(String(value)).toString()
				case "SHA224":
					return CryptoJS.SHA224(String(value)).toString()
				case "SHA256":
					return CryptoJS.SHA256(String(value)).toString()
				case "SHA384":
					return CryptoJS.SHA384(String(value)).toString()
				case "SHA512":
					return CryptoJS.SHA512(String(value)).toString()
				default:
					return CryptoJS.SHA256(String(value)).toString()
			}
		}
	})
}
