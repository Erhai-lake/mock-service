import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
	holidaysList: string
}

const PARAMS: params = {
	amount: 1,
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
				min: 1,
				max: 365,
				step: 1
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
			return adjustDateTime({
				value,
				amount,
				unit: "days",
				increase: increase === "add",
				holiday: true,
				holidaysList
			})
		}
	})
}
