import CryptoJS from "crypto-js"

export default function registerMd5(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "md5",
		title: "MD5",
		description: "对字符串进行 MD5 编码",
		apply(value: string): string {
			return CryptoJS.MD5(String(value)).toString()
		}
	})
}
