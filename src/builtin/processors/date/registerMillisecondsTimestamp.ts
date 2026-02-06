import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

export const registerMillisecondsTimestamp = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "millisecondsTimestamp",
		title: "processors.date.millisecondsTimestamp.title",
		description: "processors.date.millisecondsTimestamp.description",
		apply(value: string): string {
			const DATE = parseToDateTime(value, DateTime.now()).date
			return String(Math.floor(DATE.toMillis()))
		}
	})
}
