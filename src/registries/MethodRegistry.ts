/**
 * 方法生成函数类型
 */
export type MethodGenerate = (...args: any[]) => any

export interface MethodParam {
	id: string
	type?: string
	default?: any
	[key: string]: any
}

/**
 * 方法处理器的最小结构
 */
export interface MethodProcessor {
	id: string
	[key: string]: any
}

/**
 * 方法的数据结构
 */
export interface Method {
	id: string
	title: string
	description: string
	generate: MethodGenerate
	params?: MethodParam[]
	processorIds?: unknown
	processors: Map<string, MethodProcessor>

	registerProcessor(processor: MethodProcessor): void

	getProcessor(id: string): MethodProcessor | undefined

	getAllProcessors(): MethodProcessor[]
}

/**
 * 注册方法时的参数
 */
export interface RegisterMethodOptions {
	id: string
	title: string
	description: string,
	generate: MethodGenerate
	params?: MethodParam[]
	processors?: unknown
}

/**
 * 方法注册类
 */
export class MethodRegistry {
	private methods: Map<string, Method>

	constructor() {
		this.methods = new Map()
	}

	/**
	 * 注册方法
	 */
	registerMethod(options: RegisterMethodOptions): Method {
		const {id, title, description, generate, processors} = options
		if (!id) throw new Error("方法必须具有id!")
		if (!title) throw new Error("方法必须具有标题!")
		if (!description) throw new Error("方法必须具有描述!")
		if (this.methods.has(id)) throw new Error(`方法 [${id}] 已存在`)
		const METHOD: Method = {
			id,
			title,
			description,
			generate,
			params: options.params,
			processorIds: processors,
			processors: new Map(),
			registerProcessor(processor: MethodProcessor) {
				if (!processor?.id) throw new Error("处理器必须具有id!")
				if (this.processors.has(processor.id)) throw new Error(`处理器 [${processor.id}] 已存在`)
				this.processors.set(processor.id, processor)
			},
			getProcessor(id: string) {
				return this.processors.get(id)
			},
			getAllProcessors() {
				return Array.from(this.processors.values())
			}
		}
		this.methods.set(id, METHOD)
		return METHOD
	}

	/**
	 * 获取方法
	 */
	getMethod(id: string): Method | undefined {
		return this.methods.get(id)
	}

	/**
	 * 获取所有方法
	 */
	getAllMethods(): Method[] {
		return Array.from(this.methods.values())
	}
}