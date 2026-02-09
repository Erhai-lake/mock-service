import {clampNumber} from "../../public/clampNumber"
import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
	workdaysList: string
}

const LIMITS = {
	amount: {default: 1, min: 1, max: 365, step: 1}
}

const PARAMS: params = {
	amount: LIMITS.amount.default,
	increase: "add",
	workdaysList: "1,2,3,4,5"
}

export const registerAdjustWorkday = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustWorkday",
		title: "processors.date.adjustWorkday.title",
		description: "processors.date.adjustWorkday.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustWorkday.params.amount.title",
				description: "processors.date.adjustWorkday.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: LIMITS.amount.min,
				max: LIMITS.amount.max,
				step: LIMITS.amount.step
			},
			{
				id: "increase",
				title: "processors.date.adjustWorkday.params.increase.title",
				description: "processors.date.adjustWorkday.params.increase.description",
				type: "select",
				options: [
					{key: "add", label: "add"},
					{key: "subtract", label: "subtract"}
				],
				default: PARAMS.increase,
			},
			{
				id: "workdaysList",
				title: "processors.date.adjustWorkday.params.workdaysList.title",
				description: "processors.date.adjustWorkday.params.workdaysList.description",
				type: "string",
				default: PARAMS.workdaysList,
			}
		],
		apply(value: string, params: Partial<params> = {}): string {
			const {amount, increase, workdaysList} = {...PARAMS, ...params}
			const FINAL_AMOUNT = clampNumber(amount, LIMITS.amount.min, LIMITS.amount.max, LIMITS.amount.step)
			return adjustDateTime({
				value,
				amount: FINAL_AMOUNT,
				unit: "days",
				increase: increase === "add",
				workday: true,
				workdaysList
			})
		}
	})
}
