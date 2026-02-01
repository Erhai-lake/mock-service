import {TIMEZONE_OPTIONS, getTimezoneOffset} from "../constants/Timezones"
import {GetUtcNow} from "../../public/GetUtcNow"
import {GetZonedNow} from "../../public/GetZonedNow"
import {FormatUtcParts} from "../../public/FormatUtcParts"

interface Params {
	timezone: string
	excludeMilliseconds: boolean
	formattingStyle: "basic" | "extended"
	representation: "date" | "time" | "complete"
	timezoneSuffix: "none" | "z" | "offset"
}

const PARAMS: Params = {
	timezone: "Asia/Shanghai",
	excludeMilliseconds: false,
	formattingStyle: "extended",
	representation: "complete",
	timezoneSuffix: "offset"
}

export default function registerIsoTimestamp(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "isoTimestamp",
		title: "category.date.isoTimestamp.title",
		description: "category.date.isoTimestamp.description",
		params: [
			{
				id: "timezone",
				title: "category.date.isoTimestamp.params.timezone.title",
				description: "category.date.isoTimestamp.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			},
			{
				id: "excludeMilliseconds",
				title: "category.date.isoTimestamp.params.excludeMilliseconds.title",
				description: "category.date.isoTimestamp.params.excludeMilliseconds.description",
				type: "boolean",
				default: PARAMS.excludeMilliseconds
			},
			{
				id: "formattingStyle",
				title: "category.date.isoTimestamp.params.formattingStyle.title",
				description: "category.date.isoTimestamp.params.formattingStyle.description",
				type: "select",
				options: [
					{key: "basic", label: "basic"},
					{key: "extended", label: "extended"}
				],
				default: PARAMS.formattingStyle
			},
			{
				id: "representation",
				title: "category.date.isoTimestamp.params.representation.title",
				description: "category.date.isoTimestamp.params.representation.description",
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
				title: "category.date.isoTimestamp.params.timezoneSuffix.title",
				description: "category.date.isoTimestamp.params.timezoneSuffix.description",
				type: "select",
				options: [
					{key: "none", label: "none"},
					{key: "z", label: "z"},
					{key: "offset", label: "offset"}
				],
				default: PARAMS.timezoneSuffix
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params>): string {
			const {
				timezone,
				excludeMilliseconds,
				formattingStyle,
				representation,
				timezoneSuffix
			} = {...PARAMS, ...params}
			const OFFSET = getTimezoneOffset(timezone) ?? 0
			let suffix = ""
			if (timezoneSuffix === "z") {
				suffix = "Z"
			} else if (timezoneSuffix === "offset") {
				const SIGN = OFFSET >= 0 ? "+" : "-"
				const ABS = Math.abs(OFFSET)
				const HOUR = String(Math.floor(ABS)).padStart(2, "0")
				const MINUTE = String(Math.round((ABS % 1) * 60)).padStart(2, "0")
				suffix = `${SIGN}${HOUR}:${MINUTE}`
			}
			const BASE_TIME = timezoneSuffix === "z" ? new Date(GetUtcNow()) : GetZonedNow(timezone)
			const {YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, MILLISECOND} = FormatUtcParts(BASE_TIME)
			const DATE = formattingStyle === "basic" ? `${YEAR}${MONTH}${DAY}` : `${YEAR}-${MONTH}-${DAY}`
			const TIME = formattingStyle === "basic" ? `${HOUR}${MINUTE}${SECOND}` : `${HOUR}:${MINUTE}:${SECOND}`
			const MS = excludeMilliseconds ? "" : `.${MILLISECOND}`
			if (representation === "date") return DATE
			if (representation === "time") return `${TIME}${MS}`
			return `${DATE}T${TIME}${MS}${suffix}`
		}
	})
}
