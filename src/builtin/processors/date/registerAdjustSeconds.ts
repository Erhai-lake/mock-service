import {clampNumber} from "../../public/clampNumber"
import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const LIMITS = {
	amount: {default: 1, min: 1, max: 60, step: 1}
}

const PARAMS: params = {
	amount: LIMITS.amount.default,
	increase: "add"
}

export const registerAdjustSeconds = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustSeconds",
		title: "processors.date.adjustSeconds.title",
		description: "processors.date.adjustSeconds.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustSeconds.params.amount.title",
				description: "processors.date.adjustSeconds.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: LIMITS.amount.min,
				max: LIMITS.amount.max,
				step: LIMITS.amount.step
			},
			{
				id: "increase",
				title: "processors.date.adjustSeconds.params.increase.title",
				description: "processors.date.adjustSeconds.params.increase.description",
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
			return adjustDateTime({value, amount: FINAL_AMOUNT, unit: "seconds", increase: increase === "add"})
		}
	})
}
