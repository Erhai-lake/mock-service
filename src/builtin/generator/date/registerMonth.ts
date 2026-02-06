import {MONTHS_ABBREVIATED_ZH, MONTHS_ZH} from "../constants/monthsZH"
import {MONTHS_ABBREVIATED_EN, MONTHS_EN} from "../constants/monthsEN"

interface params {
	language: "zh" | "en",
	abbreviated: boolean
}

const PARAMS: params = {
	language: "zh",
	abbreviated: false
}

export const registerMonth = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "month",
		title: "generator.date.month.title",
		description: "generator.date.month.description",
		params: [
			{
				id: "language",
				title: "generator.date.month.params.language.title",
				description: "generator.date.month.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "abbreviated",
				title: "generator.date.month.params.abbreviated.title",
				description: "generator.date.month.params.abbreviated.description",
				type: "boolean",
				default: false
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {language, abbreviated} = {...PARAMS, ...params}
			const MONTHS = abbreviated ? language === "zh" ? MONTHS_ABBREVIATED_ZH : MONTHS_ABBREVIATED_EN : language === "zh" ? MONTHS_ZH : MONTHS_EN
			return MONTHS[Math.floor(Math.random() * MONTHS.length)]
		}
	})
}
