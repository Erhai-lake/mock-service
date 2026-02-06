import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

export const registerStartOfDay = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "startOfDay",
		title: "processors.date.startOfDay.title",
		description: "processors.date.startOfDay.description",
		apply(value: string): string {
			const PARSED = parseToDateTime(value, DateTime.now())
			const START = PARSED.date.startOf("day")
			const FMT = PARSED.originalFormat
			// 时间戳
			if (PARSED.format === "timestamp-seconds") {
				return String(Math.floor(START.toSeconds()))
			}
			if (PARSED.format === "timestamp-millis") {
				return String(START.toMillis())
			}
			// ISO
			if (PARSED.format === "iso") {
				const HAS_MS = /\.\d{3}/.test(value)
				const HAS_OFFSET = /([+-]\d{2}:\d{2}|Z)$/.test(value)
				return START.toISO({suppressMilliseconds: !HAS_MS, includeOffset: HAS_OFFSET}) ?? ""
			}
			// format
			if (!FMT) return START.toISO({includeOffset: false}) ?? ""
			// 纯日期: 本来就是一天起点,直接返回日期
			if (/^(yyyy[-/]?MM[-/]?dd|yyyyMMdd)$/.test(FMT)) {
				return FMT === "yyyyMMdd" ? START.toFormat("yyyyMMdd") : START.toFormat(FMT)
			}
			// 纯时间: 强制 00:00:00 / 00:00
			if (/^(HH:mm(:ss)?|HHmm(ss)?)$/.test(FMT)) return START.toFormat(FMT)
			// 带 T 的完整日期时间
			if (FMT.includes("T")) return START.toFormat(FMT)
			// 保底
			return START.toFormat(FMT)
		}
	})
}
