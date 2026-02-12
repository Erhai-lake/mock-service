export type processorMethod = (value: any, ...args: any[]) => any

export interface processorParam {
	id: string
	type?: string
	default?: any

	[key: string]: any
}

export interface processor {
	id: string
	title: string
	description: string
	params?: processorParam[]
	apply: processorMethod
}

export class processorRegistry {
	private processors: Map<string, processor>

	constructor() {
		this.processors = new Map()
	}

	registerProcessor(definition: processor): processor {
		const {id, title, description} = definition
		if (!id) throw new Error("global.processorRegistry.idEmpty")
		if (!title) throw new Error("global.processorRegistry.titleEmpty")
		if (!description) throw new Error("global.processorRegistry.descriptionEmpty")
		if (this.processors.has(id)) throw new Error(`global.processorRegistry.idDuplicate|${JSON.stringify({id})}`)
		this.processors.set(id, definition)
		return definition
	}

	getProcessor(id: string): processor {
		const PROCESSOR = this.processors.get(id)
		if (!PROCESSOR) throw new Error(`global.processorRegistry.processorEmpty|${JSON.stringify({id})}`)
		return PROCESSOR
	}

	getAllProcessors(): processor[] {
		return Array.from(this.processors.values())
	}
}