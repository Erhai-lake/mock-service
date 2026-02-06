import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const PARAMS: params = {
	amount: 1,
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
				min: 1,
				max: 12,
				step: 1
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
			return adjustDateTime({value, amount, unit: "months", increase: increase === "add"})
		}
	})
}
