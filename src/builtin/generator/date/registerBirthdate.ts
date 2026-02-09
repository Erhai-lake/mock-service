import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

interface params {
	min: number
	max: number
	refDate: string
	representation: "date" | "time" | "complete"
}

const PARAMS: params = {
	min: 18,
	max: 80,
	refDate: String(DateTime.now()),
	representation: "complete"
}

export const registerBirthdate = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "birthdate",
		title: "generator.date.birthdate.title",
		description: "generator.date.birthdate.description",
		params: [
			{
				id: "min",
				title: "generator.date.birthdate.params.min.title",
				description: "generator.date.birthdate.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: 0,
				max: 150,
				step: 1
			},
			{
				id: "max",
				title: "generator.date.birthdate.params.max.title",
				description: "generator.date.birthdate.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: 0,
				max: 150,
				step: 1
			},
			{
				id: "refDate",
				title: "generator.date.birthdate.params.refDate.title",
				description: "generator.date.birthdate.params.refDate.description",
				type: "string",
				default: PARAMS.refDate
			},
			{
				id: "representation",
				title: "generator.date.birthdate.params.representation.title",
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
		processors: ["string", "encodingDecoding", "date"],
		generate(params: Partial<params> = {}): string {
			const {min, max, refDate, representation} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			const REF_DATETIME = parseToDateTime(refDate).date
			const BASE = refDate ? DateTime.fromISO(String(REF_DATETIME)) : DateTime.now()
			const SAFE_BASE = BASE.isValid ? BASE : DateTime.now()
			const AGE = Math.floor(Math.random() * (max - min + 1)) + min
			const END = SAFE_BASE.minus({years: AGE})
			const START = END.minus({years: 1})
			const RANDOM_MILLIS = START.toMillis() + Math.random() * (END.toMillis() - START.toMillis())
			const BIRTH = DateTime.fromMillis(RANDOM_MILLIS)
			if (representation === "date") return BIRTH.toISODate() ?? ""
			if (representation === "time") return BIRTH.toFormat("HH:mm:ss")
			return BIRTH.toFormat("yyyy-MM-dd HH:mm:ss")
		}
	})
}
