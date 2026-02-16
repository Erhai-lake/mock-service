import {DateTime} from "luxon"
import {clampNumber} from "../../public/clampNumber"
import {ID_CARD_CODE} from "../constants/idCardCode"

interface params {
	min: number
	max: number
}

const LIMITS = {
	min: {default: 18, min: 0, max: 150, step: 1},
	max: {default: 80, min: 1, max: 150, step: 1}
}

const PARAMS: params = {
	min: LIMITS.min.default,
	max: LIMITS.max.default
}

const getCheckCode = (body: string): string => {
	const WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
	const CODES = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]
	let sum = 0
	for (let i = 0; i < 17; i++) {
		sum += parseInt(body[i]) * WEIGHTS[i]
	}
	return CODES[sum % 11]
}

export const registerIdCard = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "idCard",
		title: "generator.person.idCard.title",
		description: "generator.person.idCard.description",
		params: [
			{
				id: "min",
				title: "generator.person.idCard.params.min.title",
				description: "generator.person.idCard.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: LIMITS.min.min,
				max: LIMITS.min.max,
				step: LIMITS.min.step
			},
			{
				id: "max",
				title: "generator.person.idCard.params.max.title",
				description: "generator.person.idCard.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: LIMITS.max.min,
				max: LIMITS.max.max,
				step: LIMITS.max.step
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			const FINAL_MIN = clampNumber(min, LIMITS.min.min, LIMITS.min.max, LIMITS.min.step)
			const FINAL_MAX = clampNumber(max, LIMITS.max.min, LIMITS.max.max, LIMITS.max.step)
			if (FINAL_MAX < FINAL_MIN) throw new Error("error.maxIsLessThanMin")
			// 年龄
			const RANDOM_AGE = Math.floor(Math.random() * (FINAL_MAX - FINAL_MIN + 1)) + FINAL_MIN
			const NOW = DateTime.now()
			const RANDOM_DAYS = Math.floor(Math.random() * 365)
			const BIRTHDAY = NOW.minus({years: RANDOM_AGE}).minus({days: RANDOM_DAYS})
			const DATE_STRING = BIRTHDAY.toFormat("yyyyMMdd")
			// 序列码
			const SEQUENCE_CODE = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
			// 拼接
			const ID_BODY = ID_CARD_CODE() + DATE_STRING + SEQUENCE_CODE
			const CHECK_CODE = getCheckCode(ID_BODY)
			return ID_BODY + CHECK_CODE
		}
	})
}
