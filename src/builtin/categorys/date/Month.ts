import {MONTHS_ABBREVIATED_ZH, MONTHS_ZH} from "../constants/MonthsZH"
import {MONTHS_ABBREVIATED_EN, MONTHS_EN} from "../constants/MonthsEN"

interface Params {
	language: "zh" | "en",
	abbreviated: boolean
}

const PARAMS: Params = {
	language: "zh",
	abbreviated: false
}

export default function registerMonth(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "month",
		title: "category.date.month.title",
		description: "category.date.month.description",
		params: [
			{
				id: "language",
				title: "category.date.month.params.language.title",
				description: "category.date.month.params.language.description",
				type: "select",
				options: [
					{key: "zh", label: "中文"},
					{key: "en", label: "English"}
				],
				default: PARAMS.language
			},
			{
				id: "abbreviated",
				title: "category.date.month.params.abbreviated.title",
				description: "category.date.month.params.abbreviated.description",
				type: "boolean",
				default: false
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
			const {language, abbreviated} = {...PARAMS, ...params}
			const MONTHS = abbreviated ? language === "zh" ? MONTHS_ABBREVIATED_ZH : MONTHS_ABBREVIATED_EN : language === "zh" ? MONTHS_ZH : MONTHS_EN
			return MONTHS[Math.floor(Math.random() * MONTHS.length)]
		}
	})
}
