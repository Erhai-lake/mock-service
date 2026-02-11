export const registerClearVar = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "clearVar",
		title: "generator.var.clearVar.title",
		description: "generator.var.clearVar.description",
		processors: ["string", "encodingDecoding", "date"],
		generate(_params: any, context: any): string {
			return context.clearVar()
		}
	})
}
