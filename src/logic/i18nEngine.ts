import type {mockService} from "../index"

export class i18nEngine {
	constructor(private service: mockService) {
	}

	setLocale(locale: string, fallbackLocale: string) {
		this.service.internal.i18nRegistry.setLocale(locale)
		if (fallbackLocale) this.service.internal.i18nRegistry.setFallbackLocale(fallbackLocale)
	}

	setFallbackLocale(fallbackLocale: string) {
		this.service.internal.i18nRegistry.setFallbackLocale(fallbackLocale)
	}

	getLocale(): string {
		return this.service.internal.i18nRegistry.getLocale()
	}

	getFallbackLocale(): string {
		return this.service.internal.i18nRegistry.getFallbackLocale()
	}

	translate(key: string, params?: Record<string, any>): string {
		return this.service.internal.i18nRegistry.translate(key, params)
	}

	getTranslateTable(): any {
		return this.service.internal.i18nRegistry
	}
}