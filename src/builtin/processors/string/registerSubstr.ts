import {clampNumber} from "../../public/clampNumber"

interface params {
	start: number
	length: number
}

const LIMITS = {
	start: {default: 0, min: 0, step: 1},
	length: {default: 10, min: 0, step: 1}
}

const PARAMS: params = {
	start: LIMITS.start.default,
	length: LIMITS.length.default
}

export const registerSubstr = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "substr",
		title: "processors.string.substr.title",
		description: "processors.string.substr.description",
		params: [
			{
				id: "start",
				title: "processors.string.substr.params.start.title",
				description: "processors.string.substr.params.start.description",
				type: "number",
				default: PARAMS.start,
				min: LIMITS.start.min,
				step: LIMITS.start.step
			},
			{
				id: "length",
				title: "processors.string.substr.params.length.title",
				description: "processors.string.substr.params.length.description",
				type: "number",
				default: PARAMS.length,
				min: LIMITS.length.min,
				step: LIMITS.length.step
			}

		],
		apply(value: string, params: Partial<params> = {}): string {
			const {start = 0, length = 10} = {...PARAMS, ...params}
			const FINAL_START = clampNumber(start, LIMITS.start.min, undefined, LIMITS.start.step)
			const FINAL_LENGTH = clampNumber(length, LIMITS.length.min, undefined, LIMITS.length.step)
			return String(value).substring(FINAL_START, FINAL_START + FINAL_LENGTH)
		}
	})
}
