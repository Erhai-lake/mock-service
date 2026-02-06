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