/**
 * 时区表来着
 * https://github.com/dmfilipenko/timezones.json
 * 版本: 1.7.1
 */
import timezones from "./timezones.json"

/**
 * 格式化时区偏移量为字符串
 */
const formatOffset = (offset: number): string => {
	const SIGN = offset >= 0 ? "+" : "-"
	const ABS = Math.abs(offset)
	const HOURS = String(Math.floor(ABS)).padStart(2, "0")
	const MINUTES = String(Math.round((ABS % 1) * 60)).padStart(2, "0")
	return `UTC${SIGN}${HOURS}:${MINUTES}`
}

/**
 * 选择器用的时区列表
 */
export const TIMEZONE_OPTIONS = timezones.flatMap(zone => {
	const OFFSET_LABEL = `(${formatOffset(zone.offset)})`
	return zone.utc.map(utc => ({
		key: utc,
		label: `${OFFSET_LABEL} ${utc}`
	}))
})

/**
 * 时区偏移量映射表
 */
const UTC_OFFSET_MAP: Record<string, number> = timezones.reduce(
	(map, zone) => {
		zone.utc.forEach(utc => {
			map[utc] = zone.offset
		})
		return map
	},
	{} as Record<string, number>
)

/**
 * 获取时区偏移量
 */
export function getTimezoneOffset(utc: string): number | undefined {
	return UTC_OFFSET_MAP[utc]
}