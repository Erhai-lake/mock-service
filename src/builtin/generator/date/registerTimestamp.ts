import {TIMEZONE_OPTIONS} from "../constants/timezones"
import {DateTime} from "luxon"

interface params {
	timezone: string
}

const PARAMS: params = {
	timezone: "Asia/Shanghai",
}

export const registerTimestamp = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "timestamp",
		title: "generator.date.timestamp.title",
		description: "generator.date.timestamp.description",
		params: [
			{
				id: "timezone",
				title: "generator.date.timestamp.params.timezone.title",
				description: "generator.date.timestamp.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(timezone: string = PARAMS.timezone): string {
			const SECONDS = DateTime.now().setZone(timezone).toSeconds()
			return String(Math.floor(SECONDS))
		}
	})
}
