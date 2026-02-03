import {TIMEZONE_OPTIONS} from "../../categorys/constants/Timezones"
import {ParseToDateTime} from "../../public/ParseToDateTime"
import {DateTime} from "luxon"

interface Params {
	timezone: string
}

const PARAMS: Params = {
	timezone: "Asia/Shanghai"
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function registerFormatRFC7231(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
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
			const DATE = ParseToDateTime(value, DateTime.now(), timezone).date
			const WEEKDAY = WEEKDAYS[DATE.weekday % 7]
			const DAY = String(DATE.day).padStart(2, "0")
			const MONTH = MONTHS[DATE.month - 1]
			const YEAR = DATE.year
			const HOUR = String(DATE.hour).padStart(2, "0")
			const MINUTE = String(DATE.minute).padStart(2, "0")
			const SECOND = String(DATE.second).padStart(2, "0")
			return `${WEEKDAY}, ${DAY} ${MONTH} ${YEAR} ${HOUR}:${MINUTE}:${SECOND} GMT`
		}
	})
}
