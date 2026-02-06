import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

export const registerTimestamp = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "timestamp",
		title: "processors.date.timestamp.title",
		description: "processors.date.timestamp.description",
		apply(value: string): string {
			const DATE = parseToDateTime(value, DateTime.now()).date
			return String(Math.floor(DATE.toSeconds()))
		}
	})
}
