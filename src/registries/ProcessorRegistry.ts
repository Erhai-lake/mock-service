/**
 * 处理器定义
 */
export interface Processor<P = any, R = any> {
	id: string
	title: string
	description: string
	params?: P
	apply: (value: any, params?: P) => R
}

/**
 * 处理器注册类
 */
export class ProcessorRegistry {
	private processors: Map<string, Processor>

	constructor() {
		this.processors = new Map()
	}

	/**
	 * 注册处理器
	 */
	registerProcessor<P = any, R = any>(definition: Processor<P, R>): Processor<P, R> {
		const { id, title, description } = definition
		if (!id) throw new Error("处理器必须具有id!")
		if (!title) throw new Error("处理器必须具有标题!")
		if (!description) throw new Error("处理器必须具有描述!")
		if (this.processors.has(id)) throw new Error(`处理器 [${id}] 已存在`)
		this.processors.set(id, definition)
		return definition
	}

	/**
	 * 获取处理器
	 */
	getProcessor(id: string): Processor | undefined {
		return this.processors.get(id)
	}

	/**
	 * 获取所有处理器
	 */
	getAllProcessors(): Processor[] {
		return Array.from(this.processors.values())
	}
}