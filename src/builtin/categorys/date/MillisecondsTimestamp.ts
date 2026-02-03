import {TIMEZONE_OPTIONS} from "../constants/Timezones"
import {DateTime} from "luxon"

interface Params {
	timezone: string
}

const PARAMS: Params = {
	timezone: "Asia/Shanghai",
}

export default function registerMillisecondsTimestamp(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "millisecondsTimestamp",
		title: "category.date.millisecondsTimestamp.title",
		description: "category.date.millisecondsTimestamp.description",
		params: [
			{
				id: "timezone",
				title: "category.date.millisecondsTimestamp.params.timezone.title",
				description: "category.date.millisecondsTimestamp.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(timezone: string = PARAMS.timezone): string {
			const MILLIS = DateTime.now().setZone(timezone).toMillis()
			return String(MILLIS)
		}
	})
}
