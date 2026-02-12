import {processorRegistry} from "./processorRegistry"

export interface processorCategory {
	id: string
	title: string
	description: string
	processors: processorRegistry
}

export interface registerProcessorCategoryOptions {
	id: string
	title: string
	description: string
}

export class processorCategoryRegistry {
	private categories: Map<string, processorCategory>

	constructor() {
		this.categories = new Map()
	}

	registerCategory(options: registerProcessorCategoryOptions): processorCategory {
		const {id, title, description} = options
		if (!id) throw new Error("global.processorCategoryRegistry.idEmpty")
		if (!title) throw new Error("global.processorCategoryRegistry.titleEmpty")
		if (!description) throw new Error("global.processorCategoryRegistry.descriptionEmpty")
		if (this.categories.has(id)) throw new Error(`global.processorCategoryRegistry.idDuplicate|${JSON.stringify({id})}`)
		const CATEGORY: processorCategory = {id, title, description, processors: new processorRegistry()}
		this.categories.set(id, CATEGORY)
		return CATEGORY
	}

	getCategory(id: string): processorCategory {
		const CATEGORY = this.categories.get(id)
		if (!CATEGORY) throw new Error(`global.processorCategoryRegistry.processorCategoryEmpty|${JSON.stringify({id})}`)
		return CATEGORY
	}

	getAllCategories(): processorCategory[] {
		return Array.from(this.categories.values())
	}
}