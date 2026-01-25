export default function registerUUID(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "uuid",
		title: "UUID",
		description: "生成一个随机且唯一的 UUID v4",
		processors: ["string", "encodingDecoding"],
		generate(): string {
			return crypto.randomUUID()
		}
	})
}
