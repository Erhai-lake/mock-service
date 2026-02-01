import {FormatDateTime} from "../../public/FormatDateTime"
import {GetRandomDateAround} from "../../public/GetRandomDateAround"

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

export default function registerAnytime(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "anytime",
		title: "category.date.anytime.title",
		description: "category.date.anytime.description",
		params: [
			{
				id: "refDate",
				title: "category.date.anytime.params.refDate.title",
				description: "category.date.anytime.params.refDate.description",
				type: "string",
				default: PARAMS.refDate
			},
			{
				id: "scope",
				title: "category.date.anytime.params.scope.title",
				description: "category.date.anytime.params.scope.description",
				type: "number",
				default: 3,
				min: 0,
				max: 36,
				step: 1
			},
			{
				id: "representation",
				title: "category.date.isoTimestamp.params.representation.title",
				description: "category.date.isoTimestamp.params.representation.description",
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
			const DATE = GetRandomDateAround(refDate, scope)
			const FULL = FormatDateTime(DATE)
			if (representation === "date") return FULL.split(" ")[0]
			if (representation === "time") return FULL.split(" ")[1]
			return FULL
		}
	})
}
