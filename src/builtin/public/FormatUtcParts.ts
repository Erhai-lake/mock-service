/**
 * 格式化日期时间为 UTC 时间部分
 */
export const FormatUtcParts = (date: Date) => {
	return {
		YEAR: date.getUTCFullYear(),
		MONTH: String(date.getUTCMonth() + 1).padStart(2, "0"),
		DAY: String(date.getUTCDate()).padStart(2, "0"),
		HOUR: String(date.getUTCHours()).padStart(2, "0"),
		MINUTE: String(date.getUTCMinutes()).padStart(2, "0"),
		SECOND: String(date.getUTCSeconds()).padStart(2, "0"),
		MILLISECOND: String(date.getUTCMilliseconds()).padStart(3, "0")
	}
}
