import {WEEKDAYS_ABBREVIATED_ZH, WEEKDAYS_ZH} from "../constants/WeekdaysZH"
import {WEEKDAYS_ABBREVIATED_EN, WEEKDAYS_EN} from "../constants/WeekdaysEN"

interface Params {
	language: "zh" | "en",
	abbreviated: boolean
}

const PARAMS: Params = {
	language: "zh",
	abbreviated: false
}

export default function registerWeekday(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "weekday",
		title: "category.date.weekday.title",
		description: "category.date.weekday.description",
		params: [
			{
				id: "language",
				title: "category.date.weekday.params.language.title",
				description: "category.date.weekday.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "abbreviated",
				title: "category.date.weekday.params.abbreviated.title",
				description: "category.date.weekday.params.abbreviated.description",
				type: "boolean",
				default: false
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {language, abbreviated} = {...PARAMS, ...params}
			const WEEKDAYS = abbreviated ? language === "zh" ? WEEKDAYS_ABBREVIATED_ZH : WEEKDAYS_ABBREVIATED_EN : language === "zh" ? WEEKDAYS_ZH : WEEKDAYS_EN
			return WEEKDAYS[Math.floor(Math.random() * WEEKDAYS.length)]
		}
	})
}
