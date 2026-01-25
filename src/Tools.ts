/**
 * 字符串化值, 用于模板渲染
 */
export const stringifyValue = (value: any, type?: string) => {
	if (value === undefined || value === null) return value
	switch (type) {
		case "string":
			return `"${value}"`
		case "number":
		case "boolean":
			return value
		default:
			return `"${value}"`
	}
}

/**
 * 根据参数定义和实际参数, 生成 (a=1,b=2) 形式字符串
 */
export const buildParamsString = (schemaParams: any[] = [], actualParams: Record<string, any> = {}) => {
	if (!schemaParams || Object.keys(actualParams).length === 0) return ""
	const DEFAULTS: Record<string, any> = {}
	schemaParams.forEach(p => {
		DEFAULTS[p.id] = p.default
	})
	const DIFF = Object.entries(actualParams).filter(([key, value]) => value !== DEFAULTS[key])
	if (DIFF.length === 0) return ""
	if (schemaParams.length === 1) {
		const PARAM = schemaParams[0]
		const VALUE = stringifyValue(DIFF[0][1], PARAM.type)
		return `(${VALUE})`
	}
	return (
		"(" +
		DIFF.map(([key, value]) => {
			const SCHEMA = schemaParams.find(p => p.id === key)
			const FINAL_VALUE = stringifyValue(value, SCHEMA?.type)
			return `${key}=${FINAL_VALUE}`
		}).join(",") +
		")"
	)
}

/**
 * 归一化调用参数
 */
export const normalizeCallParams = (schemaParams: any[] = [], parsedParams: any) => {
	if (
		parsedParams === undefined || (parsedParams && typeof parsedParams === "object" && Object.keys(parsedParams).length === 0)) {
		return undefined
	}
	if (schemaParams.length === 1 && typeof parsedParams !== "object") return parsedParams
	return parsedParams
}

/**
 * 深度解析参数值, 递归解析所有模板
 */
export const resolveParamValue = (value: string | string[], mockService: { resolveTemplate: (arg0: string) => any }) => {
	if (typeof value !== "string") return value
	if (!value.includes("{{")) return value
	return mockService.resolveTemplate(value)
}

/**
 * 转换值为正确的类型
 */
export const castValue = (raw: any) => {
	if (raw === undefined || raw === null) return raw
	const VALUE = raw.trim()
	if ((VALUE.startsWith('"') && VALUE.endsWith('"')) || (VALUE.startsWith("'") && VALUE.endsWith("'"))) {
		return VALUE.slice(1, -1)
	}
	if (VALUE === "true") return true
	if (VALUE === "false") return false
	if (/^-?\d+(\.\d+)?$/.test(VALUE)) return Number(VALUE)
	return VALUE
}

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