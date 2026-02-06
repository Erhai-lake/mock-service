import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const PARAMS: params = {
	amount: 1,
	increase: "add"
}

export const registerAdjustHours = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustHours",
		title: "processors.date.adjustHours.title",
		description: "processors.date.adjustHours.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustHours.params.amount.title",
				description: "processors.date.adjustHours.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 24,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustHours.params.increase.title",
				description: "processors.date.adjustHours.params.increase.description",
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
			return adjustDateTime({value, amount, unit: "hours", increase: increase === "add"})
		}
	})
}
