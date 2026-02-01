/**
 * 格式化日期时间为字符串
 */
export const FormatDateTime = (date: Date): string => {
	const YEAR = date.getFullYear()
	const MONTH = String(date.getMonth() + 1).padStart(2, "0")
	const DAY = String(date.getDate()).padStart(2, "0")
	const HOUR = String(date.getHours()).padStart(2, "0")
	const MINUTE = String(date.getMinutes()).padStart(2, "0")
	const SECOND = String(date.getSeconds()).padStart(2, "0")
	return `${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}:${SECOND}`
}
