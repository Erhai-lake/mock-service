import {TIMEZONE_OPTIONS} from "../../generator/constants/timezones"
import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

interface params {
	timezone: string
	excludeMilliseconds: boolean
	timezoneSuffix: "z" | "offset"
}

const PARAMS: params = {
	timezone: "Asia/Shanghai",
	excludeMilliseconds: false,
	timezoneSuffix: "offset"
}

export const registerFormatRFC3339 = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
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
		apply(value: string, params: Partial<params> = {}): string {
			const {timezone, excludeMilliseconds, timezoneSuffix} = {...PARAMS, ...params}
			let date = parseToDateTime(value, DateTime.now(), timezone).date
			if (timezoneSuffix === "z") date = date.toUTC()
			const ISO = date.toISO({
				suppressMilliseconds: excludeMilliseconds,
				includeOffset: true
			})
			return ISO ?? ""
		}
	})
}
