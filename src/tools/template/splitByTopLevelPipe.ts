/**
 * 只在顶层拆分 |
 */
export const splitByTopLevelPipe = (string = "") => {
	const RESULT: string[] = []
	let buffer = ""
	let inQuotes = false
	let quoteChar: string | null = null
	let parenDepth = 0
	let templateDepth = 0
	for (let i = 0; i < string.length; i++) {
		const C = string[i]
		const NEXT = string[i + 1]
		if (!inQuotes && C === "{" && NEXT === "{") {
			templateDepth++
			buffer += C
			continue
		}
		if (!inQuotes && C === "}" && NEXT === "}") {
			templateDepth--
			buffer += C
			continue
		}
		if ((C === '"' || C === "'") && templateDepth === 0) {
			if (inQuotes && C === quoteChar) {
				inQuotes = false
				quoteChar = null
			} else if (!inQuotes) {
				inQuotes = true
				quoteChar = C
			}
			buffer += C
			continue
		}
		if (!inQuotes && templateDepth === 0) {
			if (C === "(") parenDepth++
			if (C === ")") parenDepth--
		}
		if (C === "|" && !inQuotes && parenDepth === 0 && templateDepth === 0) {
			RESULT.push(buffer)
			buffer = ""
			continue
		}
		buffer += C
	}
	if (buffer) RESULT.push(buffer)
	return RESULT
}