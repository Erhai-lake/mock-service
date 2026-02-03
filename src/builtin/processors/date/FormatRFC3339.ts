import {TIMEZONE_OPTIONS} from "../../categorys/constants/Timezones"
import {ParseToDateTime} from "../../public/ParseToDateTime"
import {DateTime} from "luxon"

interface Params {
	timezone: string
	excludeMilliseconds: boolean
	timezoneSuffix: "z" | "offset"
}

const PARAMS: Params = {
	timezone: "Asia/Shanghai",
	excludeMilliseconds: false,
	timezoneSuffix: "offset"
}

export default function registerFormatRFC3339(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "formatRFC3339",
		title: "processors.date.formatRFC3339.title",
		description: "processors.date.formatRFC3339.description",
		params: [
			{
				id: "timezone",
				title: "processors.date.formatRFC3339.params.timezone.title",
				description: "processors.date.formatRFC3339.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			},
			{
				id: "excludeMilliseconds",
				title: "processors.date.formatRFC3339.params.excludeMilliseconds.title",
				description: "processors.date.formatRFC3339.params.excludeMilliseconds.description",
				type: "boolean",
				default: PARAMS.excludeMilliseconds
			},
			{
				id: "timezoneSuffix",
				title: "processors.date.formatRFC3339.params.timezoneSuffix.title",
				description: "processors.date.formatRFC3339.params.timezoneSuffix.description",
				type: "select",
				options: [
					{key: "z", label: "z"},
					{key: "offset", label: "offset"}
				],
				default: PARAMS.timezoneSuffix
			}
		],
		apply(value: string, params: Partial<Params> = {}): string {
			const {timezone, excludeMilliseconds, timezoneSuffix} = {...PARAMS, ...params}
			let date = ParseToDateTime(value, DateTime.now(), timezone).date
			if (timezoneSuffix === "z") date = date.toUTC()
			const ISO = date.toISO({
				suppressMilliseconds: excludeMilliseconds,
				includeOffset: true
			})
			return ISO ?? ""
		}
	})
}
