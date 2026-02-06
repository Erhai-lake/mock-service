import {LASTNAMES_ZH} from "../constants/lastnamesZH"

export const registerLastName = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "lastName",
		title: "generator.person.lastName.title",
		description: "generator.person.lastName.description",
		processors: ["string", "encodingDecoding"],
		generate(): string {
			return LASTNAMES_ZH[Math.floor(Math.random() * LASTNAMES_ZH.length)]
		}
	})
}
