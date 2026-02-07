export const registerTestFn1 = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "testFn1",
		title: "generator.testGen.testFn1.title",
		description: "generator.testGen.testFn1.description",
		processors: ["string", "encodingDecoding", "date", "testProc"],
		generate(): string {
			return String(Date.now())
		}
	})
}
