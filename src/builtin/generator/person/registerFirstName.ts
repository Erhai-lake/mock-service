import {MALE_NAME_ZH, FEMALE_NAME_ZH} from "../constants/nameZH"

interface params {
	sex: "male" | "female"
}

const PARAMS: params = {
	sex: "male"
}

export const registerFirstName = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "firstName",
		title: "generator.person.firstName.title",
		description: "generator.person.firstName.description",
		params: [
			{
				id: "sex",
				title: "generator.person.firstName.params.sex.title",
				description: "generator.person.firstName.params.sex.description",
				type: "select",
				options: [
					{key: "male", label: "male"},
					{key: "female", label: "female"}
				],
				default: PARAMS.sex
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {sex} = {...PARAMS, ...params}
			const NAME = sex === "male" ? MALE_NAME_ZH : FEMALE_NAME_ZH
			return NAME[Math.floor(Math.random() * NAME.length)]
		}
	})
}
