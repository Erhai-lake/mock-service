export const registerTestFn1 = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "testFn1",
		title: "processor.testProc.testFn1.title",
		description: "processor.testProc.testFn1.description",
		apply(value: string): string {
			return value + "|Test|" + value
		}
	})
}
