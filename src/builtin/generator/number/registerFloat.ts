interface params {
	min: number
	max: number
	fractionDigits: number
	multipleOf: number
}

const PARAMS: params = {
	min: 0.0,
	max: 1.0,
	fractionDigits: 20,
	multipleOf: 0
}

export const registerFloat = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "float",
		title: "generator.number.float.title",
		description: "generator.number.float.description",
		params: [
			{
				id: "min",
				title: "generator.number.float.params.min.title",
				description: "generator.number.float.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: -1e12,
				max: 1e12,
				step: 0.1
			},
			{
				id: "max",
				title: "generator.number.float.params.max.title",
				description: "generator.number.float.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: -1e12,
				max: 1e12,
				step: 0.1
			},
			{
				id: "fractionDigits",
				title: "generator.number.float.params.fractionDigits.title",
				description: "generator.number.float.params.fractionDigits.description",
				type: "number",
				default: PARAMS.fractionDigits,
				min: 0,
				max: 20,
				step: 1
			},
			{
				id: "multipleOf",
				title: "generator.number.float.params.multipleOf.title",
				description: "generator.number.float.params.multipleOf.description",
				type: "number",
				default: PARAMS.multipleOf,
				min: 0,
				max: 1e12,
				step: 0.1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): number {
			const {min, max, fractionDigits, multipleOf} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			let value = Math.random() * (max - min) + min
			if (multipleOf > 0) {
				const DECIMAL_PLACES = String(multipleOf).includes(".") ? String(multipleOf).split(".")[1].length : 0
				if (fractionDigits < DECIMAL_PLACES) throw new Error("error.fractionDigitsIsLessThanMultipleOf")
				value = Math.round(value / multipleOf) * multipleOf
			}
			return Number(value.toFixed(fractionDigits))
		}
	})
}
