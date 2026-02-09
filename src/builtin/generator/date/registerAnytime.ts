import {clampNumber} from "../../public/clampNumber"
import {TIMEZONE_OPTIONS} from "../constants/timezones"
import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

interface params {
	timezone: string
	refDate: string
	scope: number
	representation: "date" | "time" | "complete"
	direction: "around" | "future" | "past"
}

const LIMITS = {
	scope: {default: 3, min: 0, max: 36, step: 1},
}

const PARAMS: params = {
	timezone: "Asia/Shanghai",
	refDate: String(DateTime.now()),
	scope: LIMITS.scope.default,
	representation: "complete",
	direction: "around"
}

export const registerAnytime = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "anytime",
		title: "generator.date.anytime.title",
		description: "generator.date.anytime.description",
		params: [
			{
				id: "timezone",
				title: "generator.date.anytime.params.timezone.title",
				description: "generator.date.anytime.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			},
			{
				id: "refDate",
				title: "generator.date.anytime.params.refDate.title",
				description: "generator.date.anytime.params.refDate.description",
				type: "string",
				default: PARAMS.refDate
			},
			{
				id: "scope",
				title: "generator.date.anytime.params.scope.title",
				description: "generator.date.anytime.params.scope.description",
				type: "number",
				default: PARAMS.scope,
				min: LIMITS.scope.min,
				max: LIMITS.scope.max,
				step: LIMITS.scope.step
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
				id: "direction",
				title: "generator.date.anytime.params.direction.title",
				description: "generator.date.anytime.params.direction.description",
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
		generate(params: Partial<params> = {}): string {
			const {timezone, refDate, scope, representation, direction} = {...PARAMS, ...params}
			const FINAL_SCOPE = clampNumber(scope, LIMITS.scope.min, LIMITS.scope.max, LIMITS.scope.step)
			const REF_DATETIME = parseToDateTime(refDate).date
			let base = refDate ? DateTime.fromISO(String(REF_DATETIME), {zone: timezone}) : DateTime.now().setZone(timezone)
			if (!base.isValid) base = DateTime.now().setZone(timezone)
			let start: DateTime
			let end: DateTime
			switch (direction) {
				case "past":
					start = base.minus({months: FINAL_SCOPE})
					end = base
					break
				case "future":
					start = base
					end = base.plus({months: FINAL_SCOPE})
					break
				default:
					start = base.minus({months: FINAL_SCOPE})
					end = base.plus({months: FINAL_SCOPE})
			}
			const RANDOM_MILLIS = start.toMillis() + Math.random() * (end.toMillis() - start.toMillis())
			const DATE = DateTime.fromMillis(RANDOM_MILLIS, {zone: timezone})
			if (representation === "date") return String(DATE.toISODate())
			if (representation === "time") return String(DATE.toFormat("HH:mm:ss"))
			return String(DATE.toFormat("yyyy-MM-dd HH:mm:ss"))
		}
	})
}
