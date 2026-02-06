import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const PARAMS: params = {
	amount: 1,
	increase: "add"
}

export const registerAdjustMilliseconds = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustMilliseconds",
		title: "processors.date.adjustMilliseconds.title",
		description: "processors.date.adjustMilliseconds.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustMilliseconds.params.amount.title",
				description: "processors.date.adjustMilliseconds.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 1000,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustMilliseconds.params.increase.title",
				description: "processors.date.adjustMilliseconds.params.increase.description",
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
			return adjustDateTime({value, amount, unit: "milliseconds", increase: increase === "add"})
		}
	})
}
