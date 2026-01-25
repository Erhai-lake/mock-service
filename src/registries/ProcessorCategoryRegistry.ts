import {ProcessorRegistry} from "./ProcessorRegistry"

/**
 * 处理器类别的数据结构
 */
export interface ProcessorCategory {
	id: string
	title: string
	description: string
	methods: ProcessorRegistry
}

/**
 * 注册处理器类别时的参数
 */
export interface RegisterProcessorCategoryOptions {
	id: string
	title: string
	description: string
}

/**
 * 处理器类别注册器
 */
export class ProcessorCategoryRegistry {
	private categories: Map<string, ProcessorCategory>

	constructor() {
		this.categories = new Map()
	}

	/**
	 * 注册处理器类别
	 */
	registerCategory(options: RegisterProcessorCategoryOptions): ProcessorCategory {
		const {id, title, description} = options
		if (!id) throw new Error("处理器类别必须具有ID")
		if (!title) throw new Error("处理器类别必须具有标题")
		if (!description) throw new Error("处理器类别必须具有描述")
		if (this.categories.has(id)) throw new Error(`处理器类别 [${id}] 已存在`)
		const CATEGORY: ProcessorCategory = {id, title, description, methods: new ProcessorRegistry()}
		this.categories.set(id, CATEGORY)
		return CATEGORY
	}

	/**
	 * 获取处理器类别
	 */
	getCategory(id: string): ProcessorCategory | undefined {
		return this.categories.get(id)
	}

	/**
	 * 获取所有处理器类别
	 */
	getAllCategories(): ProcessorCategory[] {
		return Array.from(this.categories.values())
	}
}