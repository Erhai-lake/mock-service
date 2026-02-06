import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

interface params {
	from: string
	to: string
}

const PARAMS: params = {
	from: String(DateTime.now()),
	to: String(DateTime.now()),
}

export const registerBetween = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "between",
		title: "generator.date.between.title",
		description: "generator.date.between.description",
		params: [
			{
				id: "from",
				title: "generator.date.between.params.from.title",
				description: "generator.date.between.params.from.description",
				type: "string",
				default: PARAMS.from
			},
			{
				id: "to",
				title: "generator.date.between.params.to.title",
				description: "generator.date.between.params.to.description",
				type: "string",
				default: PARAMS.to
			}
		],
		processors: ["string", "encodingDecoding", "date"],
		generate(params: Partial<params> = {}): string {
			const {from, to} = {...PARAMS, ...params}
			const FROM_DATE = parseToDateTime(from || DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")).date.toMillis()
			const TO_DATE = parseToDateTime(to || DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")).date.toMillis()
			const MIN = Math.min(FROM_DATE, TO_DATE)
			const MAX = Math.max(FROM_DATE, TO_DATE)
			const RANDOM_MS = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
			const RESULT_DATE = DateTime.fromMillis(RANDOM_MS)
			return RESULT_DATE.toFormat("yyyy-MM-dd HH:mm:ss")
		}
	})
}
