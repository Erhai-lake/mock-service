import {TIMEZONE_OPTIONS} from "../constants/timezones"
import {DateTime} from "luxon"

interface params {
	timezone: string
}

const PARAMS: params = {
	timezone: "Asia/Shanghai",
}

export const registerMillisecondsTimestamp = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "millisecondsTimestamp",
		title: "generator.date.millisecondsTimestamp.title",
		description: "generator.date.millisecondsTimestamp.description",
		params: [
			{
				id: "timezone",
				title: "generator.date.millisecondsTimestamp.params.timezone.title",
				description: "generator.date.millisecondsTimestamp.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(params: Partial<params> = {}): string {
			const {timezone} = {...PARAMS, ...params}
			const MILLIS = DateTime.now().setZone(timezone).toMillis()
			return String(MILLIS)
		}
	})
}
