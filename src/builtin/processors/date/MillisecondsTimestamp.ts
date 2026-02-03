import {ParseToDateTime} from "../../public/ParseToDateTime"
import {DateTime} from "luxon"

export default function registerMillisecondsTimestamp(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "millisecondsTimestamp",
		title: "processors.date.millisecondsTimestamp.title",
		description: "processors.date.millisecondsTimestamp.description",
		apply(value: string): string {
			const DATE = ParseToDateTime(value, DateTime.now()).date
			return String(Math.floor(DATE.toMillis()))
		}
	})
}
