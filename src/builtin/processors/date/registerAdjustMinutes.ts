import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const PARAMS: params = {
	amount: 1,
	increase: "add"
}

export const registerAdjustMinutes = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustMinutes",
		title: "processors.date.adjustMinutes.title",
		description: "processors.date.adjustMinutes.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustQuarters.params.amount.title",
				description: "processors.date.adjustMinutes.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 60,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustMinutes.params.increase.title",
				description: "processors.date.adjustMinutes.params.increase.description",
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
			return adjustDateTime({value, amount, unit: "minutes", increase: increase === "add"})
		}
	})
}
