import {TIMEZONE_OPTIONS} from "../constants/Timezones"
import {ParseToDateTime} from "../../public/ParseToDateTime"
import {DateTime} from "luxon"

interface Params {
	timezone: string
	refDate: string
	scope: number
	representation: "date" | "time" | "complete"
	direction: "around" | "future" | "past"
}

const PARAMS: Params = {
	timezone: "Asia/Shanghai",
	refDate: String(DateTime.now()),
	scope: 3,
	representation: "complete",
	direction: "around"
}

export default function registerAnytime(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "anytime",
		title: "category.date.anytime.title",
		description: "category.date.anytime.description",
		params: [
			{
				id: "timezone",
				title: "category.date.anytime.params.timezone.title",
				description: "category.date.anytime.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			},
			{
				id: "refDate",
				title: "category.date.anytime.params.refDate.title",
				description: "category.date.anytime.params.refDate.description",
				type: "string",
				default: PARAMS.refDate
			},
			{
				id: "scope",
				title: "category.date.anytime.params.scope.title",
				description: "category.date.anytime.params.scope.description",
				type: "number",
				default: PARAMS.scope,
				min: 0,
				max: 36,
				step: 1
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
				id: "direction",
				title: "category.date.anytime.params.direction.title",
				description: "category.date.anytime.params.direction.description",
				type: "select",
				options: [
					{key: "around", label: "around"},
					{key: "future", label: "future"},
					{key: "past", label: "past"}
				],
				default: PARAMS.direction
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(params: Partial<Params>): string {
			const {timezone, refDate, scope, representation, direction} = {...PARAMS, ...params}
			const REF_DATETIME = ParseToDateTime(refDate).date
			let base = refDate ? DateTime.fromISO(String(REF_DATETIME), {zone: timezone}) : DateTime.now().setZone(timezone)
			if (!base.isValid) base = DateTime.now().setZone(timezone)
			let start: DateTime
			let end: DateTime
			switch (direction) {
				case "past":
					start = base.minus({months: scope})
					end = base
					break
				case "future":
					start = base
					end = base.plus({months: scope})
					break
				default:
					start = base.minus({months: scope})
					end = base.plus({months: scope})
			}
			const RANDOM_MILLIS = start.toMillis() + Math.random() * (end.toMillis() - start.toMillis())
			const DATE = DateTime.fromMillis(RANDOM_MILLIS, {zone: timezone})
			if (representation === "date") return String(DATE.toISODate())
			if (representation === "time") return String(DATE.toFormat("HH:mm:ss"))
			return String(DATE.toFormat("yyyy-MM-dd HH:mm:ss"))
		}
	})
}
