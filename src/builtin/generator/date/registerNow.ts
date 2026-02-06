import {TIMEZONE_OPTIONS} from "../constants/timezones"
import {DateTime} from "luxon"

interface params {
	timezone: string
}

const PARAMS: params = {
	timezone: "Asia/Shanghai",
}

export const registerNow = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "now",
		title: "generator.date.now.title",
		description: "generator.date.now.description",
		params: [
			{
				id: "timezone",
				title: "generator.date.now.params.timezone.title",
				description: "generator.date.now.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(timezone: string = PARAMS.timezone): string {
			return DateTime.now().setZone(timezone).toFormat("yyyy-MM-dd HH:mm:ss")
		}
	})
}
