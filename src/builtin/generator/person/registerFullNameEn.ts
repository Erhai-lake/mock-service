import {MALE_NAME_EN, FEMALE_NAME_EN} from "../constants/nameEN"

interface params {
	sex: "male" | "female"
}

const PARAMS: params = {
	sex: "male"
}

export const registerFullNameEn = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "fullNameEn",
		title: "generator.person.fullNameEn.title",
		description: "generator.person.fullNameEn.description",
		params: [
			{
				id: "sex",
				title: "generator.person.fullNameEn.params.sex.title",
				description: "generator.person.fullNameEn.params.sex.description",
				type: "select",
				options: [
					{key: "male", label: "male"},
					{key: "female", label: "female"}
				],
				default: PARAMS.sex
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(sex: string = PARAMS.sex): string {
			const NAME = sex === "male" ? MALE_NAME_EN : FEMALE_NAME_EN
			return NAME[Math.floor(Math.random() * NAME.length)]
		}
	})
}
