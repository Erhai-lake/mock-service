import {clampNumber} from "../../public/clampNumber"
import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

interface params {
	min: number
	max: number
	refDate: string
	representation: "date" | "time" | "complete"
}

const LIMITS = {
	min: {default: 18, min: 0, max: 150, step: 1},
	max: {default: 80, min: 1, max: 150, step: 1}
}

const PARAMS: params = {
	min: LIMITS.min.default,
	max: LIMITS.max.default,
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
				min: LIMITS.min.min,
				max: LIMITS.min.max,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.date.birthdate.params.max.title",
				description: "generator.date.birthdate.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				max: LIMITS.max.max,
				step: LIMITS.max.step
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
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, LIMITS.min.max, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, LIMITS.max.max, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			const REF_DATETIME = parseToDateTime(refDate).date
			const BASE = refDate ? DateTime.fromISO(String(REF_DATETIME)) : DateTime.now()
			const SAFE_BASE = BASE.isValid ? BASE : DateTime.now()
			const AGE = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
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
