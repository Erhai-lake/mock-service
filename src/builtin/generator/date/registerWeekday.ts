import {WEEKDAYS_ABBREVIATED_ZH, WEEKDAYS_ZH} from "../constants/weekdaysZH"
import {WEEKDAYS_ABBREVIATED_EN, WEEKDAYS_EN} from "../constants/weekdaysEN"

interface params {
	language: "zh" | "en",
	abbreviated: boolean
}

const PARAMS: params = {
	language: "zh",
	abbreviated: false
}

export const registerWeekday = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "weekday",
		title: "generator.date.weekday.title",
		description: "generator.date.weekday.description",
		params: [
			{
				id: "language",
				title: "generator.date.weekday.params.language.title",
				description: "generator.date.weekday.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "abbreviated",
				title: "generator.date.weekday.params.abbreviated.title",
				description: "generator.date.weekday.params.abbreviated.description",
				type: "boolean",
				default: false
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {language, abbreviated} = {...PARAMS, ...params}
			const WEEKDAYS = abbreviated ? language === "zh" ? WEEKDAYS_ABBREVIATED_ZH : WEEKDAYS_ABBREVIATED_EN : language === "zh" ? WEEKDAYS_ZH : WEEKDAYS_EN
			return WEEKDAYS[Math.floor(Math.random() * WEEKDAYS.length)]
		}
	})
}
