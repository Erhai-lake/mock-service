import {AdjustDateTime} from "../../public/AdjustDateTime"

interface Params {
	amount: number
	increase: string
}

const PARAMS: Params = {
	amount: 1,
	increase: "add"
}

export default function registerAdjustQuarters(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "adjustQuarters",
		title: "processors.date.adjustQuarters.title",
		description: "processors.date.adjustQuarters.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustQuarters.params.amount.title",
				description: "processors.date.adjustQuarters.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 4,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustQuarters.params.increase.title",
				description: "processors.date.adjustQuarters.params.increase.description",
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
			return AdjustDateTime({value, amount, unit: "quarters", increase: increase === "add"})
		}
	})
}
