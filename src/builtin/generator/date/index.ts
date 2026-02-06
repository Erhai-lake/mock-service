import type {generatorCategoryRegistry} from "../../../registries"
import {registerIsoTimestamp} from "./registerIsoTimestamp"
import {registerTimestamp} from "./registerTimestamp"
import {registerMillisecondsTimestamp} from "./registerMillisecondsTimestamp"
import {registerNow} from "./registerNow"
import {registerAnytime} from "./registerAnytime"
import {registerBirthdate} from "./registerBirthdate"
import {registerMonth} from "./registerMonth"
import {registerWeekday} from "./registerWeekday"
import {registerBetween} from "./registerBetween"
import {registerTimeZone} from "./registerTimeZone"

export const generatorDateCategory = (categoryRegistry: generatorCategoryRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "date",
		title: "generator.date.title",
		description: "generator.date.description"
	})

	registerIsoTimestamp(CATEGORY)
	registerTimestamp(CATEGORY)
	registerMillisecondsTimestamp(CATEGORY)
	registerNow(CATEGORY)
	registerAnytime(CATEGORY)
	registerBirthdate(CATEGORY)
	registerMonth(CATEGORY)
	registerWeekday(CATEGORY)
	registerBetween(CATEGORY)
	registerTimeZone(CATEGORY)
}
