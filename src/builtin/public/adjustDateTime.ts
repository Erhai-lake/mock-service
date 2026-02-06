import {parseToDateTime} from "./parseToDateTime"
import {DateTime} from "luxon"

// 时间单位(毫秒级/秒级/分钟级/小时级/天级/周级/月级/季度级/年级)
type unit =
	| "milliseconds"
	| "seconds"
	| "minutes"
	| "hours"
	| "days"
	| "weeks"
	| "months"
	| "quarters"
	| "years"
	| "isoWeekYears"

interface params {
	value: string
	amount: number
	unit: unit
	increase: boolean
	workday: boolean
	holiday: boolean
	workdaysList: string
	holidaysList: string
}

const PARAMS: params = {
	value: "",
	amount: 1,
	unit: "days",
	increase: true,
	workday: false,
	holiday: false,
	workdaysList: "1,2,3,4,5",
	holidaysList: "6,7"
}

/**
 * 通用日期调整方法
 */
export const adjustDateTime = (params: Partial<params> = {}): string => {
	const {value, amount, unit, increase, workday, holiday, workdaysList, holidaysList} = {...PARAMS, ...params}
	let parsed = parseToDateTime(value, DateTime.now())
	let next = parsed.date
	const SAFE_AMOUNT = Math.abs(amount)
	const DELTA = increase ? SAFE_AMOUNT : -SAFE_AMOUNT
	if (unit !== "days") {
		// 处理常规单位
		switch (unit) {
			case "milliseconds":
				next = next.plus({milliseconds: DELTA})
				break
			case "seconds":
				next = next.plus({seconds: DELTA})
				break
			case "minutes":
				next = next.plus({minutes: DELTA})
				break
			case "hours":
				next = next.plus({hours: DELTA})
				break
			case "weeks":
				next = next.plus({weeks: DELTA})
				break
			case "months":
				next = next.plus({months: DELTA})
				break
			case "quarters":
				next = next.plus({months: DELTA * 3})
				break
			case "years":
				next = next.plus({years: DELTA})
				break
			case "isoWeekYears":
				const WEEK_NUMBER = next.weekNumber
				const WEEKDAY = next.weekday as import("luxon").WeekdayNumbers
				next = next.set({
					weekYear: next.weekYear + (increase ? SAFE_AMOUNT : -SAFE_AMOUNT),
					weekNumber: WEEK_NUMBER,
					weekday: WEEKDAY
				})
				break
		}
	} else {
		// 处理工作日/休息日逻辑
		if ((workday || holiday) && unit === "days") {
			const STEP = DELTA > 0 ? 1 : -1
			let remaining = SAFE_AMOUNT
			const WORKDAYS = new Set((workdaysList?.trim() ? workdaysList : PARAMS.workdaysList).split(",").map(Number))
			const HOLIDAYS = new Set((holidaysList?.trim() ? holidaysList : PARAMS.holidaysList).split(",").map(Number))
			while (remaining > 0) {
				next = next.plus({days: STEP})
				const WEEKDAY = next.weekday
				let isHit = false
				if (workday && WORKDAYS.has(WEEKDAY)) {
					isHit = true
				} else if (holiday && HOLIDAYS.has(WEEKDAY)) {
					isHit = true
				}
				if (isHit) remaining--
			}
		} else {
			next = next.plus({days: DELTA})
		}
	}
	const FMT = parsed.originalFormat
	// 时间戳
	if (parsed.format === "timestamp-seconds") return String(Math.floor(next.toSeconds()))
	if (parsed.format === "timestamp-millis") return String(next.toMillis())
	// ISO
	if (parsed.format === "iso") {
		const HAS_MS = /\.\d{3}/.test(value)
		const HAS_OFFSET = /([+-]\d{2}:\d{2}|Z)$/.test(value)
		return next.toISO({suppressMilliseconds: !HAS_MS, includeOffset: HAS_OFFSET}) ?? ""
	}
	// format 类型
	if (!FMT) return next.toISO({includeOffset: false}) ?? ""
	// 纯日期
	if (/^(yyyy[-/]?MM[-/]?dd|yyyyMMdd)$/.test(FMT)) {
		if (FMT === "yyyyMMdd") return next.toFormat("yyyyMMdd")
		return next.toFormat(FMT)
	}
	// 纯时间
	if (/^(HH:mm(:ss)?|HHmm(ss)?)$/.test(FMT)) return next.toFormat(FMT)
	// 带 T 的完整日期时间
	if (FMT.includes("T")) return next.toFormat(FMT)
	// 默认保底
	return next.toFormat(FMT)
}
