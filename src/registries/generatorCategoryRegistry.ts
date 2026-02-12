import {generatorRegistry} from "./generatorRegistry"

export interface generatorCategory {
	id: string
	title: string
	description: string
	generators: generatorRegistry
}

export interface registerCategoryOptions {
	id: string
	title: string
	description: string
}

export class generatorCategoryRegistry {
	private categories: Map<string, generatorCategory>

	constructor() {
		this.categories = new Map()
	}

	registerCategory(options: registerCategoryOptions): generatorCategory {
		const {id, title, description} = options
		if (!id) throw new Error("global.generatorCategoryRegistry.idEmpty")
		if (!title) throw new Error("global.generatorCategoryRegistry.titleEmpty")
		if (!description) throw new Error("global.generatorCategoryRegistry.descriptionEmpty")
		if (this.categories.has(id)) throw new Error(`global.generatorCategoryRegistry.idDuplicate|${JSON.stringify({id})}`)
		const CATEGORY: generatorCategory = {id, title, description, generators: new generatorRegistry()}
		this.categories.set(id, CATEGORY)
		return CATEGORY
	}

	getCategory(id: string): generatorCategory {
		const CATEGORY = this.categories.get(id)
		if (!CATEGORY) throw new Error(`global.generatorCategoryRegistry.generatorCategoryEmpty|${JSON.stringify({id})}`)
		return CATEGORY
	}

	getAllCategories(): generatorCategory[] {
		return Array.from(this.categories.values())
	}
}