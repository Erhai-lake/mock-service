interface Params {
	language: "zh" | "en"
}

const PARAMS: Params = {
	language: "zh"
}

export default function registerSex(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "sex",
		title: "category.person.sex.title",
		description: "category.person.sex.description",
		params: [
			{
				id: "language",
				title: "category.person.sex.params.language.title",
				description: "category.person.sex.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(language: string = PARAMS.language): string {
			const SEX = language === "zh" ? ["男", "女"] : ["male", "female"]
			return SEX[Math.floor(Math.random() * SEX.length)]
		}
	})
}
