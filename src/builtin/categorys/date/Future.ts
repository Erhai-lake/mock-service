import {FormatDateTime} from "../../public/FormatDateTime"
import {GetRandomFutureDate} from "../../public/GetRandomFutureDate"

interface Params {
	refDate: string
	scope: number
	representation: "date" | "time" | "complete"
}

const PARAMS: Params = {
	refDate: "",
	scope: 3,
	representation: "complete"
}

export default function registerFuture(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "future",
		title: "category.date.future.title",
		description: "category.date.future.description",
		params: [
			{
				id: "refDate",
				title: "category.date.future.params.refDate.title",
				description: "category.date.future.params.refDate.description",
				type: "string",
				default: PARAMS.refDate
			},
			{
				id: "scope",
				title: "category.date.future.params.scope.title",
				description: "category.date.future.params.scope.description",
				type: "number",
				default: 3,
				min: 0,
				max: 36,
				step: 1
			},
			{
				id: "representation",
				title: "category.date.future.params.representation.title",
				description: "category.date.future.params.representation.description",
				type: "select",
				options: [
					{key: "date", label: "date"},
					{key: "time", label: "time"},
					{key: "complete", label: "complete"}
				],
				default: PARAMS.representation
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params>): string {
			const {refDate, scope, representation} = {...PARAMS, ...params}
			const DATE = GetRandomFutureDate(refDate, scope)
			const FULL = FormatDateTime(DATE)
			if (representation === "date") return FULL.split(" ")[0]
			if (representation === "time") return FULL.split(" ")[1]
			return FULL
		}
	})
}
