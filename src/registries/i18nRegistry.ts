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

	getFallbackLocale(): string {
		return this.fallbackLocale
	}

	translate(key: string, params?: Record<string, any>): string {
		if (!key) return ""
		let template
		const CURRENT = this.messages.get(this.currentLocale)
		const FALLBACK = this.messages.get(this.fallbackLocale)
		if (CURRENT && key in CURRENT) {
			template = CURRENT[key]
		} else if (FALLBACK && key in FALLBACK) {
			template = FALLBACK[key]
		} else {
			template = key
		}
		if (!params || !template.includes("{")) return template
		return template.replace(/\{(\w+)}/g, (MATCH, VAR_NAME) => {
			const VALUE = params[VAR_NAME]
			return VALUE !== undefined ? String(VALUE) : MATCH
		})
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
