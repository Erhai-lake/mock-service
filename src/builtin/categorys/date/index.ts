import type {CategoryRegistry} from "../../../registries"
import registerIsoTimestamp from "./IsoTimestamp"
import registerTimestamp from "./Timestamp"
import registerMillisecondsTimestamp from "./MillisecondsTimestamp"
import registerNow from "./Now"
import registerAnytime from "./Anytime"
import registerFuture from "./Future"
import registerPast from "./Past"
import registerBirthdate from "./Birthdate"
import registerTimeZone from "./TimeZone"

export default function dateCategory(categoryRegistry: CategoryRegistry) {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "date",
		title: "category.date.title",
		description: "category.date.description"
	})

	registerIsoTimestamp(CATEGORY)
	registerTimestamp(CATEGORY)
	registerMillisecondsTimestamp(CATEGORY)
	registerNow(CATEGORY)
	registerAnytime(CATEGORY)
	registerFuture(CATEGORY)
	registerPast(CATEGORY)
	registerBirthdate(CATEGORY)
	registerTimeZone(CATEGORY)
}
