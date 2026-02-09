import {clampNumber} from "../../public/clampNumber"

interface params {
	maxLength: number
	fillString: string
}

const LIMITS = {
	maxLength: {default: 0, min: 0, step: 1}
}

const PARAMS: params = {
	maxLength: LIMITS.maxLength.default,
	fillString: ""
}

export const registerPadEnd = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "padEnd",
		title: "processors.string.padEnd.title",
		description: "processors.string.padEnd.description",
		params: [
			{
				id: "maxLength",
				title: "processors.string.padEnd.params.maxLength.title",
				description: "processors.string.padEnd.params.maxLength.description",
				type: "number",
				default: PARAMS.maxLength,
				min: LIMITS.maxLength.min,
				step: LIMITS.maxLength.step
			},
			{
				id: "fillString",
				title: "processors.string.padEnd.params.fillString.title",
				description: "processors.string.padEnd.params.fillString.description",
				type: "string",
				default: PARAMS.fillString
			}
		],
		apply(value: string, params: Partial<params> = {}): string {
			const {maxLength = 0, fillString = ""} = {...PARAMS, ...params}
			const FINAL_MAX_LENGTH = clampNumber(maxLength, LIMITS.maxLength.min, undefined, LIMITS.maxLength.step)
			return String(value).padEnd(FINAL_MAX_LENGTH, fillString)
		}
	})
}
