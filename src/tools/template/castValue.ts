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