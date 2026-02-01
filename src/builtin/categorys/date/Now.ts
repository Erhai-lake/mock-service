import {TIMEZONE_OPTIONS} from "../constants/Timezones"
import {FormatDateTime} from "../../public/FormatDateTime"
import {GetZonedNow} from "../../public/GetZonedNow"

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
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params>): string {
			const {timezone} = {...PARAMS, ...params}
			return FormatDateTime(GetZonedNow(timezone))
		}
	})
}
