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