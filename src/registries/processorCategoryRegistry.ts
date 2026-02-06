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
		if (!id) throw new Error("处理器分类必须具有ID")
		if (!title) throw new Error("处理器分类必须具有标题")
		if (!description) throw new Error("处理器分类必须具有描述")
		if (this.categories.has(id)) throw new Error(`处理器分类 [${id}] 已存在`)
		const CATEGORY: processorCategory = {id, title, description, processors: new processorRegistry()}
		this.categories.set(id, CATEGORY)
		return CATEGORY
	}

	getCategory(id: string): processorCategory {
		const CATEGORY = this.categories.get(id)
		if (!CATEGORY) throw new Error(`处理器分类 [${id}] 不存在`)
		return CATEGORY
	}

	getAllCategories(): processorCategory[] {
		return Array.from(this.categories.values())
	}
}