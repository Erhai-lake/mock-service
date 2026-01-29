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
					return String(CryptoJS.SHA1(value))
				case "SHA224":
					return String(CryptoJS.SHA224(value))
				case "SHA256":
					return String(CryptoJS.SHA256(value))
				case "SHA384":
					return String(CryptoJS.SHA384(value))
				case "SHA512":
					return String(CryptoJS.SHA512(value))
				default:
					return String(CryptoJS.SHA256(value))
			}
		}
	})
}
