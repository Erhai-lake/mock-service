import {LASTNAMES_ZH} from "../constants/LastnamesZH"
import {MALE_NAME_ZH, FEMALE_NAME_ZH} from "../constants/NameZH"

interface Params {
	sex: "male" | "female"
}

const PARAMS: Params = {
	sex: "male"
}

export default function registerFullName(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "fullName",
		title: "category.person.fullName.title",
		description: "category.person.fullName.description",
		params: [
			{
				id: "sex",
				title: "category.person.fullName.params.sex.title",
				description: "category.person.fullName.params.sex.description",
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
			const LASTNAME = LASTNAMES_ZH[Math.floor(Math.random() * LASTNAMES_ZH.length)]
			const NAME = sex === "male" ? MALE_NAME_ZH : FEMALE_NAME_ZH
			return `${LASTNAME}${NAME[Math.floor(Math.random() * NAME.length)]}`
		}
	})
}
