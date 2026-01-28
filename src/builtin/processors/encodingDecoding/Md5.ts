import CryptoJS from "crypto-js"

export default function registerMd5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "md5",
		title: "processors.encodingDecoding.md5.title",
		description: "processors.encodingDecoding.md5.description",
		apply(value: string): string {
			return CryptoJS.MD5(String(value)).toString()
		}
	})
}
