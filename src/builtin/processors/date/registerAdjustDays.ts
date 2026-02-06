import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const PARAMS: params = {
	amount: 1,
	increase: "add"
}

export const registerAdjustDays = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustDays",
		title: "processors.date.adjustDays.title",
		description: "processors.date.adjustDays.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustDays.params.amount.title",
				description: "processors.date.adjustDays.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 365,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustDays.params.increase.title",
				description: "processors.date.adjustDays.params.increase.description",
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
			return adjustDateTime({value, amount, unit: "days", increase: increase === "add"})
		}
	})
}
