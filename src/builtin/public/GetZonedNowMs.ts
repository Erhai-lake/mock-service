import {getTimezoneOffset} from "../categorys/constants/Timezones"

export const GetZonedNowMs = (timezone: string): number => {
	const OFFSET = getTimezoneOffset(timezone) ?? 0
	const NOW = new Date()
	const UTC_TIME = NOW.getTime() + NOW.getTimezoneOffset() * 60_000
	return UTC_TIME + OFFSET * 60 * 60_000
}
