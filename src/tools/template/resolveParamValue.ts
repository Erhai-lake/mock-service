/**
 * 深度解析参数值, 递归解析所有模板
 */
export const resolveParamValue = (value: string | string[], mockService: { resolveTemplate: (arg0: string) => any }) => {
	if (typeof value !== "string") return value
	if (!value.includes("{{")) return value
	return mockService.resolveTemplate(value)
}