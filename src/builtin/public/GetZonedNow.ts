import {getTimezoneOffset} from "../categorys/constants/Timezones"
import {GetUtcNow} from "./GetUtcNow"

/**
 * 获取当前时间的指定时区时间
 */
export const GetZonedNow = (timezone: string): Date => {
	const OFFSET = getTimezoneOffset(timezone) ?? 0
	const UTC_TIME = GetUtcNow()
	return new Date(UTC_TIME + OFFSET * 60 * 60_000)
}