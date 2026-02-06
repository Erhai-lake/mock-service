import CryptoJS from "crypto-js"

interface params {
	algorithm: "SHA1" | "SHA224" | "SHA256" | "SHA384" | "SHA512"
}

const PARAMS: params = {
	algorithm: "SHA256"
}

export const registerSha = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "sha",
		title: "processors.encodingDecoding.sha.title",
		description: "processors.encodingDecoding.sha.description",
		params: [
			{
				id: "algorithm",
				title: "processors.encodingDecoding.sha.params.algorithm.title",
				description: "processors.encodingDecoding.sha.params.algorithm.description",
				type: "select",
				options: [
					{key: "SHA1", label: "SHA-1"},
					{key: "SHA224", label: "SHA-224"},
					{key: "SHA256", label: "SHA-256"},
					{key: "SHA384", label: "SHA-384"},
					{key: "SHA512", label: "SHA-512"}
				],
				default: PARAMS.algorithm
			}
		],
		apply(value: string, algorithm: string = PARAMS.algorithm): string {
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
