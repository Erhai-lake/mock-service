interface Params {
	min: number
	max: number
	fractionDigits: number
	multipleOf: number
}

const PARAMS: Params = {
	min: 0.0,
	max: 1.0,
	fractionDigits: 20,
	multipleOf: 0
}

export default function registerFloat(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "float",
		title: "category.number.float.title",
		description: "category.number.float.description",
		params: [
			{
				id: "min",
				title: "category.number.float.params.min.title",
				description: "category.number.float.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: -1e12,
				max: 1e12,
				step: 0.1
			},
			{
				id: "max",
				title: "category.number.float.params.max.title",
				description: "category.number.float.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: -1e12,
				max: 1e12,
				step: 0.1
			},
			{
				id: "fractionDigits",
				title: "category.number.float.params.fractionDigits.title",
				description: "category.number.float.params.fractionDigits.description",
				type: "number",
				default: PARAMS.fractionDigits,
				min: 0,
				max: 20,
				step: 1
			},
			{
				id: "multipleOf",
				title: "category.number.float.params.multipleOf.title",
				description: "category.number.float.params.multipleOf.description",
				type: "number",
				default: PARAMS.multipleOf,
				min: 0,
				max: 1e12,
				step: 0.1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): number {
			const {min, max, fractionDigits, multipleOf} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			let value = Math.random() * (max - min) + min
			if (multipleOf > 0) {
				const DECIMAL_PLACES = String(multipleOf).includes(".") ? String(multipleOf).split(".")[1].length : 0
				if (fractionDigits < DECIMAL_PLACES) throw new Error("fractionDigits must be >= decimal digits of multipleOf")
				value = Math.round(value / multipleOf) * multipleOf
			}
			return Number(value.toFixed(fractionDigits))
		}
	})
}
