import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const PARAMS: params = {
	amount: 1,
	increase: "add"
}

export const registerAdjustYears = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustYears",
		title: "processors.date.adjustYears.title",
		description: "processors.date.adjustYears.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustYears.params.amount.title",
				description: "processors.date.adjustYears.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 100,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustYears.params.increase.title",
				description: "processors.date.adjustYears.params.increase.description",
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
			return adjustDateTime({value, amount, unit: "years", increase: increase === "add"})
		}
	})
}
