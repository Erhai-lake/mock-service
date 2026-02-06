import {TIMEZONE_OPTIONS} from "../../generator/constants/timezones"
import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

interface params {
	timezone: string
	excludeMilliseconds: boolean
	representation: "date" | "time" | "complete"
	timezoneSuffix: "none" | "z" | "offset"
}

const PARAMS: params = {
	timezone: "Asia/Shanghai",
	excludeMilliseconds: false,
	representation: "complete",
	timezoneSuffix: "offset"
}

export const registerFormatISO8601 = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "formatISO8601",
		title: "processors.date.formatISO8601.title",
		description: "processors.date.formatISO8601.description",
		params: [
			{
				id: "timezone",
				title: "processors.date.formatISO8601.params.timezone.title",
				description: "processors.date.formatISO8601.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			},
			{
				id: "excludeMilliseconds",
				title: "processors.date.formatISO8601.params.excludeMilliseconds.title",
				description: "processors.date.formatISO8601.params.excludeMilliseconds.description",
				type: "boolean",
				default: PARAMS.excludeMilliseconds
			},
			{
				id: "representation",
				title: "processors.date.formatISO8601.params.representation.title",
				description: "processors.date.formatISO8601.params.representation.description",
				type: "select",
				options: [
					{key: "date", label: "date"},
					{key: "time", label: "time"},
					{key: "complete", label: "complete"}
				],
				default: PARAMS.representation
			},
			{
				id: "timezoneSuffix",
				title: "processors.date.formatISO8601.params.timezoneSuffix.title",
				description: "processors.date.formatISO8601.params.timezoneSuffix.description",
				type: "select",
				options: [
					{key: "none", label: "none"},
					{key: "z", label: "z"},
					{key: "offset", label: "offset"}
				],
				default: PARAMS.timezoneSuffix
			}
		],
		apply(value: string, params: Partial<params> = {}): string {
			const {timezone, excludeMilliseconds, representation, timezoneSuffix} = {...PARAMS, ...params}
			let date = parseToDateTime(value, DateTime.now(), timezone).date
			if (excludeMilliseconds) date = date.set({millisecond: 0})
			if (representation === "date") return String(date.toISODate())
			if (representation === "time") {
				let t = date
				if (timezoneSuffix === "z") t = t.toUTC()
				const TIME = t.toISOTime({
					suppressMilliseconds: excludeMilliseconds,
					includeOffset: timezoneSuffix !== "none"
				})
				if (!TIME) return ""
				if (timezoneSuffix === "none") return TIME.replace(/Z|[+-]\d{2}:\d{2}$/, "")
				return TIME
			}
			if (timezoneSuffix === "z") date = date.toUTC()
			const ISO = date.toISO({
				includeOffset: timezoneSuffix !== "none",
				suppressMilliseconds: excludeMilliseconds
			})
			if (!ISO) return ""
			if (timezoneSuffix === "none") return ISO?.replace(/Z|[+-]\d{2}:\d{2}$/, "")
			return ISO
		}
	})
}
