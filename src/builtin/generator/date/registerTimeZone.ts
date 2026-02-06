import {TIMEZONE_OPTIONS} from "../constants/timezones"

export const registerTimeZone = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "timeZone",
		title: "generator.date.timeZone.title",
		description: "generator.date.timeZone.description",
		processors: ["string", "encodingDecoding"],
		generate(): string {
			return TIMEZONE_OPTIONS[Math.floor(Math.random() * TIMEZONE_OPTIONS.length)].key
		}
	})
}
