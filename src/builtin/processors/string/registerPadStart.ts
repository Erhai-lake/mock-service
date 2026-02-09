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

export const registerPadStart = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "padStart",
		title: "processors.string.padStart.title",
		description: "processors.string.padStart.description",
		params: [
			{
				id: "maxLength",
				title: "processors.string.padStart.params.maxLength.title",
				description: "processors.string.padStart.params.maxLength.description",
				type: "number",
				default: PARAMS.maxLength,
				min: LIMITS.maxLength.min,
				step: LIMITS.maxLength.step
			},
			{
				id: "fillString",
				title: "processors.string.padStart.params.fillString.title",
				description: "processors.string.padStart.params.fillString.description",
				type: "string",
				default: PARAMS.fillString
			}
		],
		apply(value: string, params: Partial<params> = {}): string {
			const {maxLength = 0, fillString = ""} = {...PARAMS, ...params}
			const FINAL_MAX_LENGTH = clampNumber(maxLength, LIMITS.maxLength.min, undefined, LIMITS.maxLength.step)
			return String(value).padStart(FINAL_MAX_LENGTH, fillString)
		}
	})
}
