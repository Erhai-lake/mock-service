import {ParseToDateTime} from "../../public/ParseToDateTime"
import {DateTime} from "luxon"

export default function registerTimestamp(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "timestamp",
		title: "processors.date.timestamp.title",
		description: "processors.date.timestamp.description",
		apply(value: string): string {
			const DATE = ParseToDateTime(value, DateTime.now()).date
			return String(Math.floor(DATE.toSeconds()))
		}
	})
}
