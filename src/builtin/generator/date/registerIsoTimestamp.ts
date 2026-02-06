import {TIMEZONE_OPTIONS} from "../constants/timezones"
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

export const registerIsoTimestamp = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "isoTimestamp",
		title: "generator.date.isoTimestamp.title",
		description: "generator.date.isoTimestamp.description",
		params: [
			{
				id: "timezone",
				title: "generator.date.isoTimestamp.params.timezone.title",
				description: "generator.date.isoTimestamp.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			},
			{
				id: "excludeMilliseconds",
				title: "generator.date.isoTimestamp.params.excludeMilliseconds.title",
				description: "generator.date.isoTimestamp.params.excludeMilliseconds.description",
				type: "boolean",
				default: PARAMS.excludeMilliseconds
			},
			{
				id: "representation",
				title: "generator.date.isoTimestamp.params.representation.title",
				description: "generator.date.isoTimestamp.params.representation.description",
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
				title: "generator.date.isoTimestamp.params.timezoneSuffix.title",
				description: "generator.date.isoTimestamp.params.timezoneSuffix.description",
				type: "select",
				options: [
					{key: "none", label: "none"},
					{key: "z", label: "z"},
					{key: "offset", label: "offset"}
				],
				default: PARAMS.timezoneSuffix
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(params: Partial<params> = {}): string {
			const {timezone, excludeMilliseconds, representation, timezoneSuffix} = {...PARAMS, ...params}
			let date = DateTime.now().setZone(timezone)
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
