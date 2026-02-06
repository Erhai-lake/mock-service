export class i18nRegistry {
	private messages = new Map<string, Record<string, string>>()
	private currentLocale: string = "zh-CN"
	private fallbackLocale: string = "zh-CN"

	register(locale: string, messages: Record<string, any>) {
		const FLAT_MESSAGES = flattenObject(messages)
		const EXISTING = this.messages.get(locale) ?? {}
		this.messages.set(locale, {...EXISTING, ...FLAT_MESSAGES})
	}

	setLocale(locale: string) {
		this.currentLocale = locale
	}

	setFallbackLocale(locale: string) {
		this.fallbackLocale = locale
	}

	getLocale(): string {
		return this.currentLocale
	}

	t(key?: string): string {
		if (!key) return ""
		const CURRENT = this.messages.get(this.currentLocale)
		if (CURRENT && key in CURRENT) return CURRENT[key]
		const FALLBACK = this.messages.get(this.fallbackLocale)
		if (FALLBACK && key in FALLBACK) return FALLBACK[key]
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
