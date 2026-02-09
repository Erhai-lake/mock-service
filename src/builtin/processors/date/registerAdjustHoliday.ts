import {clampNumber} from "../../public/clampNumber"
import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
	holidaysList: string
}

const LIMITS = {
	amount: {default: 1, min: 1, max: 365, step: 1}
}

const PARAMS: params = {
	amount: LIMITS.amount.default,
	increase: "add",
	holidaysList: "6,7"
}

export const registerAdjustHoliday = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustHoliday",
		title: "processors.date.adjustHoliday.title",
		description: "processors.date.adjustHoliday.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustHoliday.params.amount.title",
				description: "processors.date.adjustHoliday.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: LIMITS.amount.min,
				max: LIMITS.amount.max,
				step: LIMITS.amount.step
			},
			{
				id: "increase",
				title: "processors.date.adjustHoliday.params.increase.title",
				description: "processors.date.adjustHoliday.params.increase.description",
				type: "select",
				options: [
					{key: "add", label: "add"},
					{key: "subtract", label: "subtract"}
				],
				default: PARAMS.increase,
			},
			{
				id: "holidaysList",
				title: "processors.date.adjustHoliday.params.holidaysList.title",
				description: "processors.date.adjustHoliday.params.holidaysList.description",
				type: "string",
				default: PARAMS.holidaysList,
			}
		],
		apply(value: string, params: Partial<params> = {}): string {
			const {amount, increase, holidaysList} = {...PARAMS, ...params}
			const FINAL_AMOUNT = clampNumber(amount, LIMITS.amount.min, LIMITS.amount.max, LIMITS.amount.step)
			return adjustDateTime({
				value,
				amount: FINAL_AMOUNT,
				unit: "days",
				increase: increase === "add",
				holiday: true,
				holidaysList
			})
		}
	})
}
