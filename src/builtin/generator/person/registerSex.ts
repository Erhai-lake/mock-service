interface params {
	language: "zh" | "en"
}

const PARAMS: params = {
	language: "zh"
}

export const registerSex = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "sex",
		title: "generator.person.sex.title",
		description: "generator.person.sex.description",
		params: [
			{
				id: "language",
				title: "generator.person.sex.params.language.title",
				description: "generator.person.sex.params.language.description",
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
