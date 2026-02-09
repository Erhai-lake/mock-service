interface params {
	min: number
	max: number
}

const PARAMS: params = {
	min: Number.MIN_SAFE_INTEGER,
	max: Number.MAX_SAFE_INTEGER
}

export const registerTestFn3 = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "testFn3",
		title: "generator.testGen.testFn3.title",
		description: "generator.testGen.testFn3.description",
		params: [
			{
				id: "min",
				title: "generator.testGen.testFn3.params.min.title",
				description: "generator.testGen.testFn3.params.min.description",
				type: "number",
				default: PARAMS.min,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "max",
				title: "category.testGen.testFn3.params.max.title",
				description: "category.testGen.testFn3.params.max.description",
				type: "number",
				default: PARAMS.max,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding", "testProc"],
		generate(params: Partial<params> = {}): string {
			const {min, max} = {...PARAMS, ...params}
			if (max < min) throw new Error("error.maxIsLessThanMin")
			return String(Math.floor(Math.random() * (max - min + 1) + min))
		}
	})
}
