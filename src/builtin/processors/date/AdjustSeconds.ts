import {AdjustDateTime} from "../../public/AdjustDateTime"

interface Params {
	amount: number
	increase: string
}

const PARAMS: Params = {
	amount: 1,
	increase: "add"
}

export default function registerAdjustSeconds(CATEGORY: any): void {
	CATEGORY.methods.registerProcessor({
		id: "adjustSeconds",
		title: "processors.date.adjustSeconds.title",
		description: "processors.date.adjustSeconds.description",
		params: [
			{
				id: "amount",
				title: "processors.date.adjustSeconds.params.amount.title",
				description: "processors.date.adjustSeconds.params.amount.description",
				type: "number",
				default: PARAMS.amount,
				min: 1,
				max: 60,
				step: 1
			},
			{
				id: "increase",
				title: "processors.date.adjustSeconds.params.increase.title",
				description: "processors.date.adjustSeconds.params.increase.description",
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
			return AdjustDateTime({value, amount, unit: "seconds", increase: increase === "add"})
		}
	})
}
