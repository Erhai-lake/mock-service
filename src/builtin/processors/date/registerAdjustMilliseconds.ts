import {clampNumber} from "../../public/clampNumber"
import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const LIMITS = {
	amount: {default: 1, min: 1, max: 1000, step: 1}
}

const PARAMS: params = {
	amount: LIMITS.amount.default,
	increase: "add"
}

export const registerAdjustMilliseconds = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustMilliseconds",
		title: "processors.date.adjustMilliseconds.title",
		description: "processors.date.adjustMilliseconds.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustMilliseconds.params.amount.title",
				description: "processors.date.adjustMilliseconds.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: LIMITS.amount.min,
				max: LIMITS.amount.max,
				step: LIMITS.amount.step
			},
			{
				id: "increase",
				title: "processors.date.adjustMilliseconds.params.increase.title",
				description: "processors.date.adjustMilliseconds.params.increase.description",
				type: "select",
				options: [
					{key: "add", label: "add"},
					{key: "subtract", label: "subtract"}
				],
				default: PARAMS.increase,
			}
		],
		apply(value: string, params: Partial<params> = {}): string {
			const {amount, increase} = {...PARAMS, ...params}
			const FINAL_AMOUNT = clampNumber(amount, LIMITS.amount.min, LIMITS.amount.max, LIMITS.amount.step)
			return adjustDateTime({value, amount: FINAL_AMOUNT, unit: "milliseconds", increase: increase === "add"})
		}
	})
}
