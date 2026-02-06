import {LASTNAMES_ZH} from "../constants/lastnamesZH"
import {MALE_NAME_ZH, FEMALE_NAME_ZH} from "../constants/nameZH"

interface params {
	sex: "male" | "female"
}

const PARAMS: params = {
	sex: "male"
}

export const registerFullName = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "fullName",
		title: "generator.person.fullName.title",
		description: "generator.person.fullName.description",
		params: [
			{
				id: "sex",
				title: "generator.person.fullName.params.sex.title",
				description: "generator.person.fullName.params.sex.description",
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
