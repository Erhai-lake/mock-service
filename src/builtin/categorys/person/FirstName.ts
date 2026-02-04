import {MALE_NAME_ZH, FEMALE_NAME_ZH} from "../constants/NameZH"

interface Params {
	sex: "male" | "female"
}

const PARAMS: Params = {
	sex: "male"
}

export default function registerFirstName(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "firstName",
		title: "category.person.firstName.title",
		description: "category.person.firstName.description",
		params: [
			{
				id: "sex",
				title: "category.person.firstName.params.sex.title",
				description: "category.person.firstName.params.sex.description",
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
			const NAME = sex === "male" ? MALE_NAME_ZH : FEMALE_NAME_ZH
			return NAME[Math.floor(Math.random() * NAME.length)]
		}
	})
}
