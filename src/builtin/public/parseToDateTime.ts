// noinspection SpellCheckingInspection

import {DateTime} from "luxon"

interface parsedDate {
	date: DateTime
	format: "timestamp-seconds" | "timestamp-millis" | "iso" | "format"
	originalFormat?: string
}

/**
 * 时间格式
 */
const DATE_TIME_FORMATS = [
	"yyyy-MM-dd HH:mm:ss.SSS",
	"yyyy-MM-dd HH:mm:ss",
	"yyyy/MM/dd HH:mm:ss.SSS",
	"yyyy/MM/dd HH:mm:ss",
	"yyyy-MM-dd HH:mm",
	"yyyy/MM/dd HH:mm",
	"yyyy-MM-dd",
	"yyyy/MM/dd",
	"yyyyMMddHHmmss",
	"yyyyMMdd",
	"HH:mm:ss.SSS",
	"HH:mm:ss",
	"HH:mm"
]

/**
 * 我! 秦始皇, 我要大一统!
 */
export const parseToDateTime = (value: string, ref: DateTime = DateTime.now(), timezone = "Asia/Shanghai"): parsedDate => {
	if (/^\d+$/.test(value)) {
		// 毫秒级时间戳
		if (value.length === 13) {
			return {
				date: DateTime.fromMillis(Number(value), {zone: timezone}),
				format: "timestamp-millis"
			}
		}
		// 秒级时间戳
		if (value.length === 10) {
			return {
				date: DateTime.fromSeconds(Number(value), {zone: timezone}),
				format: "timestamp-seconds"
			}
		}
		// yyyyMMddHHmmss
		if (value.length === 14) {
			const DATE = DateTime.fromFormat(value, "yyyyMMddHHmmss", {zone: timezone})
			if (DATE.isValid) return {date: DATE, format: "format", originalFormat: "yyyyMMddHHmmss"}
		}
		// yyyyMMddHHmmssSSS
		if (value.length === 17) {
			const DATE = DateTime.fromFormat(value, "yyyyMMddHHmmssSSS", {zone: timezone})
			if (DATE.isValid) return {date: DATE, format: "format", originalFormat: "yyyyMMddHHmmssSSS"}
		}
	}
	const HTTP = DateTime.fromHTTP(value, {zone: "utc"})
	if (HTTP.isValid) {
		return {
			date: timezone ? HTTP.setZone(timezone) : HTTP,
			format: "format",
			originalFormat: "RFC7231"
		}
	}
	// 各种时间格式
	for (const FORMAT of DATE_TIME_FORMATS) {
		const DATE = DateTime.fromFormat(value, FORMAT, {zone: timezone})
		if (DATE.isValid) {
			if (FORMAT.startsWith("H")) {
				return {
					date: DATE.set({year: ref.year, month: ref.month, day: ref.day}).setZone(timezone),
					format: "format",
					originalFormat: FORMAT
				}
			}
			return {date: DATE, format: "format", originalFormat: FORMAT}
		}
	}
	// ISO(extended / basic / offset / Z)
	let iso = DateTime.fromISO(value, {setZone: true})
	if (iso.isValid) return {date: timezone ? iso.setZone(timezone) : iso, format: "iso"}
	throw new Error(`Unsupported date format: ${value}`)
}
