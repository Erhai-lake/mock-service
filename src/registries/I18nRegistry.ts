export type Locale = string

export class I18nRegistry {
	private messages = new Map<string, Record<string, string>>()
	private currentLocale: Locale = "zh-CN"
	private fallbackLocale: Locale = "zh-CN"

	/**
	 * 注册语言包（追加，不覆盖）
	 */
	register(locale: string, messages: Record<string, any>) {
		const FLAT_MESSAGES = flattenObject(messages)
		const EXISTING = this.messages.get(locale) ?? {}
		this.messages.set(locale, {...EXISTING, ...FLAT_MESSAGES})
	}

	/**
	 * 设置当前语言
	 */
	setLocale(locale: Locale) {
		this.currentLocale = locale
	}

	/**
	 * 设置兜底语言
	 */
	setFallbackLocale(locale: Locale) {
		this.fallbackLocale = locale
	}

	/**
	 * 获取当前语言
	 */
	getLocale(): Locale {
		return this.currentLocale
	}

	/**
	 * 翻译
	 */
	t(key?: string): string {
		if (!key) return ""
		const CURRENT = this.messages.get(this.currentLocale)
		if (CURRENT && key in CURRENT) return CURRENT[key]
		const FALLBACK = this.messages.get(this.fallbackLocale)
		if (FALLBACK && key in FALLBACK) return FALLBACK[key]
		// 最差情况: 直接返回 key
		return key
	}
}

const flattenObject = (obj: Record<string, any>, prefix = "", result: Record<string, string> = {}) => {
	for (const KEY in obj) {
		const VALUE = obj[KEY]
		const NEW_KEY = prefix ? `${prefix}.${KEY}` : KEY
		if (typeof VALUE === "string") {
			result[NEW_KEY] = VALUE
		} else if (typeof VALUE === "object" && VALUE !== null) {
			flattenObject(VALUE, NEW_KEY, result)
		}
	}
	return result
}
