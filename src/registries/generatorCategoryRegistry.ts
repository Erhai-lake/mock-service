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
		if (!id) throw new Error("分类必须具有ID")
		if (!title) throw new Error("分类必须具有标题")
		if (!description) throw new Error("分类必须具有描述")
		if (this.categories.has(id)) throw new Error(`分类 [${id}] 已存在`)
		const CATEGORY: generatorCategory = {id, title, description, generators: new generatorRegistry()}
		this.categories.set(id, CATEGORY)
		return CATEGORY
	}

	getCategory(id: string): generatorCategory  {
		const CATEGORY = this.categories.get(id)
		if (!CATEGORY) throw new Error(`分类 [${id}] 不存在`)
		return CATEGORY
	}

	getAllCategories(): generatorCategory[] {
		return Array.from(this.categories.values())
	}

	clear() {
		this.categories.clear()
	}
}