import {MethodRegistry} from "./MethodRegistry"

/**
 * 类别的数据结构
 */
export interface Category {
	id: string
	title: string
	description: string
	methods: MethodRegistry
}

/**
 * 注册类别时的参数
 */
export interface RegisterCategoryOptions {
	id: string
	title: string
	description: string
}

/**
 * 类别注册器
 */
export class CategoryRegistry {
	private categories: Map<string, Category>

	constructor() {
		this.categories = new Map()
	}

	/**
	 * 注册类别
	 */
	registerCategory(options: RegisterCategoryOptions): Category {
		const {id, title, description} = options
		if (!id) throw new Error("类别必须具有ID")
		if (!title) throw new Error("类别必须具有标题")
		if (!description) throw new Error("类别必须具有描述")
		if (this.categories.has(id)) throw new Error(`类别 [${id}] 已存在`)
		const CATEGORY: Category = {id, title, description, methods: new MethodRegistry()}
		this.categories.set(id, CATEGORY)
		return CATEGORY
	}


	/**
	 * 获取类别
	 */
	getCategory(id: string): Category | undefined {
		return this.categories.get(id)
	}

	/**
	 * 获取所有类别
	 */
	getAllCategories(): Category[] {
		return Array.from(this.categories.values())
	}
}