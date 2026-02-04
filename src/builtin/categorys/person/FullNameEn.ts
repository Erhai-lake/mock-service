import {MALE_NAME_EN, FEMALE_NAME_EN} from "../constants/NameEN"

interface Params {
	sex: "male" | "female"
}

const PARAMS: Params = {
	sex: "male"
}

export default function registerFullNameEn(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "fullNameEn",
		title: "category.person.fullNameEn.title",
		description: "category.person.fullNameEn.description",
		params: [
			{
				id: "sex",
				title: "category.person.fullNameEn.params.sex.title",
				description: "category.person.fullNameEn.params.sex.description",
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
