import type {processorCategoryRegistry} from "../../../registries"
import {registerFormat} from "./registerFormat"
import {registerFormatISO8601} from "./registerFormatISO8601"
import {registerFormatISO9075} from "./registerFormatISO9075"
import {registerFormatRFC3339} from "./registerFormatRFC3339"
import {registerFormatRFC7231} from "./registerFormatRFC7231"
import {registerStartOfDay} from "./registerStartOfDay"
import {registerTimestamp} from "./registerTimestamp"
import {registerMillisecondsTimestamp} from "./registerMillisecondsTimestamp"
import {registerAdjustDays} from "./registerAdjustDays"
import {registerAdjustWeeks} from "./registerAdjustWeeks"
import {registerAdjustMonths} from "./registerAdjustMonths"
import {registerAdjustQuarters} from "./registerAdjustQuarters"
import {registerAdjustYears} from "./registerAdjustYears"
import {registerAdjustISOWeekYears} from "./registerAdjustISOWeekYears"
import {registerAdjustHours} from "./registerAdjustHours"
import {registerAdjustMinutes} from "./registerAdjustMinutes"
import {registerAdjustSeconds} from "./registerAdjustSeconds"
import {registerAdjustMilliseconds} from "./registerAdjustMilliseconds"
import {registerAdjustWorkday} from "./registerAdjustWorkday"
import {registerAdjustHoliday} from "./registerAdjustHoliday"

export const processorDateCategory = (processorRegistry: processorCategoryRegistry) => {
	const CATEGORY = processorRegistry.registerCategory({
		id: "date",
		title: "processors.date.title",
		description: "processors.date.description"
	})
	registerFormat(CATEGORY)
	registerFormatISO8601(CATEGORY)
	registerFormatISO9075(CATEGORY)
	registerFormatRFC3339(CATEGORY)
	registerFormatRFC7231(CATEGORY)
	registerStartOfDay(CATEGORY)
	registerTimestamp(CATEGORY)
	registerMillisecondsTimestamp(CATEGORY)
	registerAdjustDays(CATEGORY)
	registerAdjustWeeks(CATEGORY)
	registerAdjustMonths(CATEGORY)
	registerAdjustQuarters(CATEGORY)
	registerAdjustYears(CATEGORY)
	registerAdjustISOWeekYears(CATEGORY)
	registerAdjustHours(CATEGORY)
	registerAdjustMinutes(CATEGORY)
	registerAdjustSeconds(CATEGORY)
	registerAdjustMilliseconds(CATEGORY)
	registerAdjustWorkday(CATEGORY)
	registerAdjustHoliday(CATEGORY)
}
