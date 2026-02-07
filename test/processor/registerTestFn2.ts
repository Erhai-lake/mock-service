interface params {
	a: string
}

const PARAMS: params = {
	a: "测试测试"
}

export const registerTestFn2 = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "testFn2",
		title: "processor.testProc.testFn2.title",
		description: "processor.testProc.testFn2.description",
		params: [
			{
				id: "a",
				title: "processor.testProc.testFn2.params.a.title",
				description: "processor.testProc.testFn2.params.a.description",
				type: "string",
				default: PARAMS.a
			}
		],
		apply(value: string, a = PARAMS.a): string {
			return value + "|" + a + "|" + value
		}
	})
}
