/**
 * 时区表来着
 * https://github.com/dmfilipenko/timezones.json
 * 版本: 1.7.1
 */
import timezones from "./timezones.json"
import {DateTime} from "luxon"

/**
 * 把分钟 offset 转成 +08:00 / -05:30
 */
const formatOffset = (offsetMinutes: number) => {
	const SIGN = offsetMinutes >= 0 ? "+" : "-"
	const ABS = Math.abs(offsetMinutes)
	const HOURS = String(Math.floor(ABS / 60)).padStart(2, "0")
	const MINUTES = String(ABS % 60).padStart(2, "0")
	return `${SIGN}${HOURS}:${MINUTES}`
}

/**
 * 时区标签缓存
 */
const TIMEZONE_LABEL_CACHE = new Map()

for (const zone of timezones) {
	const DATE = DateTime.now().setZone(zone);
	if (!DATE.isValid) continue
	const OFFSET = formatOffset(DATE.offset)
	TIMEZONE_LABEL_CACHE.set(zone, `(${OFFSET}) ${zone}`)
}

/**
 * 选择器用的时区列表
 */
export const TIMEZONE_OPTIONS = timezones.map(zone => ({
	key: zone,
	label: TIMEZONE_LABEL_CACHE.get(zone) ?? zone
}))