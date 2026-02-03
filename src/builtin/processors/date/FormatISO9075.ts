import {TIMEZONE_OPTIONS} from "../../categorys/constants/Timezones"
import {ParseToDateTime} from "../../public/ParseToDateTime"
import {DateTime} from "luxon"

interface Params {
	timezone: string
	excludeMilliseconds: boolean
}

const PARAMS: Params = {
	timezone: "Asia/Shanghai",
	excludeMilliseconds: false
}

export default function registerFormatISO9075(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "formatISO9075",
		title: "processors.date.formatISO9075.title",
		description: "processors.date.formatISO9075.description",
		params: [
			{
				id: "timezone",
				title: "processors.date.formatISO9075.params.timezone.title",
				description: "processors.date.formatISO9075.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			},
			{
				id: "excludeMilliseconds",
				title: "processors.date.formatISO9075.params.excludeMilliseconds.title",
				description: "processors.date.formatISO9075.params.excludeMilliseconds.description",
				type: "boolean",
				default: PARAMS.excludeMilliseconds
			}
		],
		apply(value: string, params: Partial<Params> = {}): string {
			const {timezone, excludeMilliseconds} = {...PARAMS, ...params}
			const DATE = ParseToDateTime(value, DateTime.now(), timezone).date
			if (excludeMilliseconds) return DATE.toFormat("yyyy-MM-dd HH:mm:ss")
			return DATE.toFormat("yyyy-MM-dd HH:mm:ss.SSS")
		}
	})
}
