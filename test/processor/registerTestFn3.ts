interface params {
	min: number
	max: number
}

const PARAMS: params = {
	min: Number.MIN_SAFE_INTEGER,
	max: Number.MAX_SAFE_INTEGER
}

export const registerTestFn3 = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "testFn3",
		title: "processor.testProc.testFn3.title",
		description: "processor.testProc.testFn3.description",
		params: [
			{
				id: "min",
				title: "processor.testProc.testFn3.params.min.title",
				description: "processor.testProc.testFn3.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "max",
				title: "processor.testProc.testFn3.params.max.title",
				description: "processor.testProc.testFn3.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		apply(value: string, params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("max must be greater than or equal to min")
			return value + "|" + Math.floor(Math.random() * (max - min + 1) + min) + "|" + value
		}
	})
}
