export default function registerUUID(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "uuid",
		title: "category.string.uuid.title",
		description: "category.string.uuid.description",
		processors: ["string", "encodingDecoding"],
		generate(): string {
			return crypto.randomUUID()
		}
	})
}
