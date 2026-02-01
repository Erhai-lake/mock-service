import {FormatDateTime} from "../../public/FormatDateTime"

interface Params {
	min: number
	max: number
	refDate: string
	representation: "date" | "time" | "complete"
}

const PARAMS: Params = {
	min: 18,
	max: 80,
	refDate: "",
	representation: "complete"
}

export default function registerBirthdate(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "birthdate",
		title: "category.date.birthdate.title",
		description: "category.date.birthdate.description",
		params: [
			{
				id: "min",
				title: "category.date.birthdate.params.min.title",
				description: "category.date.birthdate.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 0,
				max: 150,
				step: 1
			},
			{
				id: "max",
				title: "category.date.birthdate.params.max.title",
				description: "category.date.birthdate.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 0,
				max: 150,
				step: 1
			},
			{
				id: "refDate",
				title: "category.date.birthdate.params.refDate.title",
				description: "category.date.birthdate.params.refDate.description",
				type: "string",
				default: PARAMS.refDate
			},
			{
				id: "representation",
				title: "category.date.birthdate.params.representation.title",
				description: "category.date.birthdate.params.representation.description",
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
		generate(params: Partial<Params> = {}): string {
			const {min, max, refDate, representation} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			const BASE = refDate ? new Date(refDate) : new Date()
			const SAFE_BASE = isNaN(BASE.getTime()) ? new Date() : BASE
			const AGE = Math.floor(Math.random() * (max - min + 1)) + min
			const END = new Date(SAFE_BASE)
			END.setFullYear(END.getFullYear() - AGE)
			const START = new Date(END)
			START.setFullYear(START.getFullYear() - 1)
			const RANDOM_TIME = START.getTime() + Math.random() * (END.getTime() - START.getTime())
			const DATE = new Date(RANDOM_TIME)
			const FULL = FormatDateTime(DATE)
			if (representation === "date") return FULL.split(" ")[0]
			if (representation === "time") return FULL.split(" ")[1]
			return FULL
		}
	})
}
