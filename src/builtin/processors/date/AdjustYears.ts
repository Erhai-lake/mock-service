import {AdjustDateTime} from "../../public/AdjustDateTime"

interface Params {
	amount: number
	increase: string
}

const PARAMS: Params = {
	amount: 1,
	increase: "add"
}

export default function registerAdjustYears(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
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
		apply(value: string, params: Partial<Params> = {}): string {
			const {amount, increase} = {...PARAMS, ...params}
			return AdjustDateTime({value, amount, unit: "years", increase: increase === "add"})
		}
	})
}
