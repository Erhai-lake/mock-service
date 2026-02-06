import {TIMEZONE_OPTIONS} from "../../generator/constants/timezones"
import {parseToDateTime} from "../../public/parseToDateTime"
import {DateTime} from "luxon"

interface params {
	timezone: string
	formatString: string
}

const PARAMS: params = {
	timezone: "Asia/Shanghai",
	formatString: "yyyy-MM-dd HH:mm:ss"
}

export const registerFormat = (CATEGORY: any): void => {
	CATEGORY.processors.registerProcessor({
		id: "format",
		title: "processors.date.format.title",
		description: "processors.date.format.description",
		params: [
			{
				id: "timezone",
				title: "processors.date.format.params.timezone.title",
				description: "processors.date.format.params.timezone.description",
				type: "select",
				options: TIMEZONE_OPTIONS,
				default: PARAMS.timezone
			},
			{
				id: "formatString",
				title: "processors.date.format.params.formatString.title",
				description: "processors.date.format.params.formatString.description",
				type: "select",
				options: [
					{key: "yyyy-MM-dd HH:mm:ss.SSS", label: "yyyy-MM-dd HH:mm:ss.SSS"},
					{key: "yyyy-MM-dd HH:mm:ss", label: "yyyy-MM-dd HH:mm:ss"},
					{key: "yyyy-MM-dd HH:mm", label: "yyyy-MM-dd HH:mm"},
					{key: "yyyy-MM-dd", label: "yyyy-MM-dd"},
					{key: "HH:mm:ss.SSS", label: "HH:mm:ss.SSS"},
					{key: "HH:mm:ss", label: "HH:mm:ss"},
					{key: "HH:mm", label: "HH:mm"},
					{key: "yyyy-MM-dd'T'HH:mm:ss", label: "yyyy-MM-dd'T'HH:mm:ss"},
					{key: "yyyy-MM-dd'T'HH:mm:ss.SSS", label: "yyyy-MM-dd'T'HH:mm:ss.SSS"},
					{key: "yyyy-MM-dd'T'HH:mm:ssZZ", label: "yyyy-MM-dd'T'HH:mm:ssZZ"},
					{key: "yyyy-MM-dd'T'HH:mm:ss.SSSZZ", label: "yyyy-MM-dd'T'HH:mm:ss.SSSZZ"},
					{key: "yyyyMMdd", label: "yyyyMMdd"},
					{key: "yyyyMMddHHmmss", label: "yyyyMMddHHmmss"},
					{key: "yyyyMMddHHmmssSSS", label: "yyyyMMddHHmmssSSS"},
					{key: "yyyy/MM/dd HH:mm:ss.SSS", label: "yyyy/MM/dd HH:mm:ss.SSS"},
					{key: "yyyy/MM/dd HH:mm:ss", label: "yyyy/MM/dd HH:mm:ss"},
					{key: "yyyy/MM/dd", label: "yyyy/MM/dd"}
				],
				default: PARAMS.formatString
			}
		],
		apply(value: string, params: Partial<params> = {}): string {
			const {timezone, formatString} = {...PARAMS, ...params}
			const DATE = parseToDateTime(value, DateTime.now(), timezone).date
			return DATE.toFormat(formatString)
		}
	})
}
