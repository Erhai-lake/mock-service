import {clampNumber} from "../../public/clampNumber"
import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const LIMITS = {
	amount: {default: 1, min: 1, max: 12, step: 1}
}

const PARAMS: params = {
	amount: LIMITS.amount.default,
	increase: "add"
}

export const registerAdjustMonths = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustMonths",
		title: "processors.date.adjustMonths.title",
		description: "processors.date.adjustMonths.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustMonths.params.amount.title",
				description: "processors.date.adjustMonths.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: LIMITS.amount.min,
				max: LIMITS.amount.max,
				step: LIMITS.amount.step
			},
			{
				id: "increase",
				title: "processors.date.adjustMonths.params.increase.title",
				description: "processors.date.adjustMonths.params.increase.description",
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
			return adjustDateTime({value, amount: FINAL_AMOUNT, unit: "months", increase: increase === "add"})
		}
	})
}
