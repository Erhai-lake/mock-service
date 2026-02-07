interface params {
	a: string
}

const PARAMS: params = {
	a: "测试测试"
}

export const registerTestFn2 = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "testFn2",
		title: "generator.testGen.testFn2.title",
		description: "generator.testGen.testFn2.description",
		params: [
			{
				id: "a",
				title: "generator.testGen.testFn2.params.a.title",
				description: "generator.testGen.testFn2.params.a.description",
				type: "string",
				default: PARAMS.a
			}
		],
		processors: ["string", "encodingDecoding", "testProc"],
		generate(a = PARAMS.a): string {
			return a + a
		}
	})
}
