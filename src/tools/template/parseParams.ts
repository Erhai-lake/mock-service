import {castValue} from "./castValue"

/**
 * 解析参数字符串为对象
 */
export const parseParams = (paramStr?: string) => {
	if (!paramStr) return {}
	if (!paramStr.includes("=")) return castValue(paramStr.trim())
	const ACC: Record<string, any> = {}
	let buffer = ""
	let key: string | null = null
	let inQuotes = false
	let quoteChar: string | null = null
	for (let i = 0; i < paramStr.length; i++) {
		const CHAR = paramStr[i]
		if (inQuotes) {
			if (CHAR === quoteChar) inQuotes = false
			buffer += CHAR
			continue
		}
		if (CHAR === '"' || CHAR === "'") {
			inQuotes = true
			quoteChar = CHAR
			buffer += CHAR
			continue
		}
		if (CHAR === "=" && key === null) {
			key = buffer.trim()
			buffer = ""
			continue
		}
		if (CHAR === ",") {
			if (key !== null) {
				ACC[key] = castValue(buffer.trim())
				key = null
				buffer = ""
			} else {
				buffer += CHAR
			}
			continue
		}
		buffer += CHAR
	}
	if (key !== null) {
		ACC[key] = castValue(buffer.trim())
	}
	return ACC
}