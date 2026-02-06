import {adjustDateTime} from "../../public/adjustDateTime"

interface params {
	amount: number
	increase: string
}

const PARAMS: params = {
	amount: 1,
	increase: "add"
}

export const registerAdjustISOWeekYears = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "adjustISOWeekYears",
		title: "processors.date.adjustISOWeekYears.title",
		description: "processors.date.adjustISOWeekYears.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustISOWeekYears.params.amount.title",
				description: "processors.date.adjustISOWeekYears.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 24,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustISOWeekYears.params.increase.title",
				description: "processors.date.adjustISOWeekYears.params.increase.description",
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
			return adjustDateTime({value, amount, unit: "isoWeekYears", increase: increase === "add"})
		}
	})
}
