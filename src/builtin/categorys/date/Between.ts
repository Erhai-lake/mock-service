import {ParseToDateTime} from "../../public/ParseToDateTime"
import {DateTime} from "luxon"

interface Params {
	from: string
	to: string
}

const PARAMS: Params = {
	from: String(DateTime.now()),
	to: String(DateTime.now()),
}

export default function registerBetween(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "between",
		title: "category.date.between.title",
		description: "category.date.between.description",
		params: [
			{
				id: "from",
				title: "category.date.between.params.from.title",
				description: "category.date.between.params.from.description",
				type: "string",
				default: PARAMS.from
			},
			{
				id: "to",
				title: "category.date.between.params.to.title",
				description: "category.date.between.params.to.description",
				type: "string",
				default: PARAMS.to
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(params: Partial<Params>): string {
			const {from, to} = {...PARAMS, ...params}
			const FROM_DATE = ParseToDateTime(from || DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")).date.toMillis()
			const TO_DATE = ParseToDateTime(to || DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")).date.toMillis()
			const MIN = Math.min(FROM_DATE, TO_DATE)
			const MAX = Math.max(FROM_DATE, TO_DATE)
			const RANDOM_MS = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
			const RESULT_DATE = DateTime.fromMillis(RANDOM_MS)
			return RESULT_DATE.toFormat("yyyy-MM-dd HH:mm:ss")
		}
	})
}
