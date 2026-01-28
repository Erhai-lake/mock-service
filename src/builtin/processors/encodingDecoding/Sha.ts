import CryptoJS from "crypto-js"

export default function registerSha(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "sha",
		title: "processors.encodingDecoding.sha.title",
		description: "processors.encodingDecoding.sha.description",
		params: [
			{
				id: "algorithm",
				title: "processors.encodingDecoding.sha.params.algorithm.title",
				description: "processors.encodingDecoding.sha.params.algorithm.description",
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
