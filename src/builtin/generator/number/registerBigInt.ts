interface params {
	min: string
	max: string
}

const PARAMS: params = {
	min: "0",
	max: "999999999999999"
}

export const registerBigInt = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "bigInt",
		title: "generator.number.bigInt.title",
		description: "generator.number.bigInt.description",
		params: [
			{
				id: "min",
				title: "generator.number.bigInt.params.min.title",
				description: "generator.number.bigInt.params.min.description",
				type: "string",
				default: PARAMS.min
			},
			{
				id: "max",
				title: "generator.number.bigInt.params.max.title",
				description: "generator.number.bigInt.params.max.description",
				type: "string",
				default: PARAMS.max
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): bigint {
			const {min, max} = {...PARAMS, ...params}
			const MIN_BIGINT = BigInt(min)
			const MAX_BIGINT = BigInt(max)
			if (MAX_BIGINT < MIN_BIGINT) throw new Error("max must be greater than or equal to min")
			const RANGE = MAX_BIGINT - MIN_BIGINT + 1n
			const randBigInt = () => {
				const BITS_NEEDED = RANGE.toString(2).length
				let result = 0n
				let bytes = Math.ceil(BITS_NEEDED / 53)
				for (let i = 0; i < bytes; i++) {
					const R = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
					result = (result << 53n) + R
				}
				return result % RANGE
			}
			return MIN_BIGINT + randBigInt()
		}
	})
}
