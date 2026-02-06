import {MONTHS_ABBREVIATED_EN} from "../../generator/constants/monthsEN"
import {WEEKDAYS_ABBREVIATED_EN} from "../../generator/constants/weekdaysEN"
import {TIMEZONE_OPTIONS} from "../../generator/constants/timezones"
import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

interface params {
	timezone: string
}

const PARAMS: params = {
	timezone: "Asia/Shanghai"
}

export const registerFormatRFC7231 = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "formatRFC7231",
		title: "processors.date.formatRFC7231.title",
		description: "processors.date.formatRFC7231.description",
		params: [
			{
				id: "timezone",
				title: "processors.date.formatRFC7231.params.timezone.title",
				description: "processors.date.formatRFC7231.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			}
		],
		apply(value: string, timezone: string = PARAMS.timezone): string {
			const DATE = parseToDateTime(value, DateTime.now(), timezone).date
			const WEEKDAY = WEEKDAYS_ABBREVIATED_EN[DATE.weekday % 7]
			const DAY = String(DATE.day).padStart(2, "0")
			const MONTH = MONTHS_ABBREVIATED_EN[DATE.month - 1]
			const YEAR = DATE.year
			const HOUR = String(DATE.hour).padStart(2, "0")
			const MINUTE = String(DATE.minute).padStart(2, "0")
			const SECOND = String(DATE.second).padStart(2, "0")
			return `${WEEKDAY}, ${DAY} ${MONTH} ${YEAR} ${HOUR}:${MINUTE}:${SECOND} GMT`
		}
	})
}
