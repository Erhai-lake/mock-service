import {TIMEZONE_OPTIONS} from "../constants/Timezones"
import {GetZonedNowMs} from "../../public/GetZonedNowMs"

interface Params {
	timezone: string
}

const PARAMS: Params = {
	timezone: "Asia/Shanghai",
}

export default function registerTimestamp(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "timestamp",
		title: "category.date.timestamp.title",
		description: "category.date.timestamp.description",
		params: [
			{
				id: "timezone",
				title: "category.date.timestamp.params.timezone.title",
				description: "category.date.timestamp.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params>): string {
			const {timezone} = {...PARAMS, ...params}
			return Math.floor(GetZonedNowMs(timezone) / 1000).toString()
		}
	})
}
