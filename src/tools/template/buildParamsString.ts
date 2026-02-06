import {stringifyValue} from "./stringifyValue"

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