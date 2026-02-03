import {TIMEZONE_OPTIONS} from "../constants/Timezones"
import {DateTime} from "luxon"

interface Params {
	timezone: string
}

const PARAMS: Params = {
	timezone: "Asia/Shanghai",
}

export default function registerNow(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "now",
		title: "category.date.now.title",
		description: "category.date.now.description",
		params: [
			{
				id: "timezone",
				title: "category.date.now.params.timezone.title",
				description: "category.date.now.params.timezone.description",
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
