import CryptoJS from "crypto-js"

export const registerMd5 = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "md5",
		title: "processors.encodingDecoding.md5.title",
		description: "processors.encodingDecoding.md5.description",
		apply(value: string): string {
			return String(CryptoJS.MD5(value))
		}
	})
}
