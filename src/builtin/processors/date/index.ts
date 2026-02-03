import type {ProcessorCategoryRegistry} from "../../../registries"
import registerFormat from "./Format"
import registerFormatISO8601 from "./FormatISO8601"
import registerFormatISO9075 from "./FormatISO9075"
import registerFormatRFC3339 from "./FormatRFC3339"
import registerFormatRFC7231 from "./FormatRFC7231"
import registerStartOfDay from "./StartOfDay"
import registerTimestamp from "./Timestamp"
import registerMillisecondsTimestamp from "./MillisecondsTimestamp"
import registerAdjustDays from "./AdjustDays"
import registerAdjustWeeks from "./AdjustWeeks"
import registerAdjustMonths from "./AdjustMonths"
import registerAdjustQuarters from "./AdjustQuarters"
import registerAdjustYears from "./AdjustYears"
import registerAdjustISOWeekYears from "./AdjustISOWeekYears"
import registerAdjustHours from "./AdjustHours"
import registerAdjustMinutes from "./AdjustMinutes"
import registerAdjustSeconds from "./AdjustSeconds"
import registerAdjustMilliseconds from "./AdjustMilliseconds"
import registerAdjustWorkday from "./AdjustWorkday"
import registerAdjustHoliday from "./AdjustHoliday"

export default function date(processorRegistry: ProcessorCategoryRegistry) {
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
