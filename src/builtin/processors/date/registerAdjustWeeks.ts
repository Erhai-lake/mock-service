import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const PARAMS: params = {
	amount: 1,
	increase: "add"
}

export const registerAdjustWeeks = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustWeeks",
		title: "processors.date.adjustWeeks.title",
		description: "processors.date.adjustWeeks.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustWeeks.params.amount.title",
				description: "processors.date.adjustWeeks.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 52,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustWeeks.params.increase.title",
				description: "processors.date.adjustWeeks.params.increase.description",
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
			return adjustDateTime({value, amount, unit: "weeks", increase: increase === "add"})
		}
	})
}
