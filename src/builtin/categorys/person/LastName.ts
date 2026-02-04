import {LASTNAMES_ZH} from "../constants/LastnamesZH"

export default function registerLastName(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "lastName",
		title: "category.person.lastName.title",
		description: "category.person.lastName.description",
		processors: ["string", "encodingDecoding"],
		generate(): string {
			return LASTNAMES_ZH[Math.floor(Math.random() * LASTNAMES_ZH.length)]
		}
	})
}
