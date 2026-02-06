import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
	workdaysList: string
}

const PARAMS: params = {
	amount: 1,
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
				min: 1,
				max: 365,
				step: 1
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
			return adjustDateTime({
				value,
				amount,
				unit: "days",
				increase: increase === "add",
				workday: true,
				workdaysList
			})
		}
	})
}
