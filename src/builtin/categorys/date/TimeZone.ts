import {TIMEZONE_OPTIONS} from "../constants/Timezones"

export default function registerTimeZone(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "timeZone",
		title: "category.date.timeZone.title",
		description: "category.date.timeZone.description",
		processors: ["string", "encodingDecoding"],
		generate(): string {
			return TIMEZONE_OPTIONS[Math.floor(Math.random() * TIMEZONE_OPTIONS.length)].key
		}
	})
}
