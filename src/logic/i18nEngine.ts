import type {mockService} from "../index"

export class i18nEngine {
	constructor(private service: mockService) {}

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

	translate(key: string): string {
		return this.service.internal.i18nRegistry.t(key)
	}

	getTranslateTable(): any {
		return this.service.internal.i18nRegistry
	}
}