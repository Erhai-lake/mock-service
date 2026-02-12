import {processor} from "./processorRegistry"

export type generateMethod = (...args: any[]) => any

export interface generatorParam {
	id: string
	type?: string
	default?: any

	[key: string]: any
}

export interface generator {
	id: string
	title: string
	description: string
	generate: generateMethod
	params?: generatorParam[]
	processorIds?: string[]
	processors: Map<string, processor>

	registerProcessor(processor: processor): void

	getProcessor(id: string): processor

	getAllProcessors(): processor[]

	clearProcessors(): void
}

export interface registerGeneratorOptions {
	id: string
	title: string
	description: string,
	generate: generateMethod
	params?: generatorParam[]
	processors?: unknown
}

export class generatorRegistry {
	private generators: Map<string, generator>

	constructor() {
		this.generators = new Map()
	}

	registerGenerator(options: registerGeneratorOptions): generator {
		const {id, title, description, generate, processors} = options
		if (!id) throw new Error("global.generatorRegistry.idEmpty")
		if (!title) throw new Error("global.generatorRegistry.titleEmpty")
		if (!description) throw new Error("global.generatorRegistry.descriptionEmpty")
		if (this.generators.has(id)) throw new Error(`global.generatorRegistry.idDuplicate|${JSON.stringify({id})}`)
		const GENERATOR: generator = {
			id,
			title,
			description,
			generate,
			params: options.params,
			processorIds: processors as string[],
			processors: new Map(),
			registerProcessor(processor: processor) {
				if (!processor?.id) throw new Error(`global.generatorRegistry.processorIdEmpty|${JSON.stringify({id})}`)
				if (this.processors.has(processor.id)) throw new Error(`global.generatorRegistry.processorIdDuplicate|${JSON.stringify({id, processorId: processor.id})}`)
				this.processors.set(processor.id, processor)
			},
			getProcessor(id: string) {
				const PROCESSOR = this.processors.get(id)
				if (!PROCESSOR) throw new Error(`global.generatorRegistry.processorEmpty|${JSON.stringify({id, processorId: id})}`)
				return PROCESSOR
			},
			getAllProcessors() {
				return Array.from(this.processors.values())
			},
			clearProcessors() {
				this.processors.clear()
			}
		}
		this.generators.set(id, GENERATOR)
		return GENERATOR
	}

	getGenerator(id: string): generator {
		const GENERATOR = this.generators.get(id)
		if (!GENERATOR) throw new Error(`global.generatorRegistry.generatorEmpty|${JSON.stringify({id})}`)
		return GENERATOR
	}

	getAllGenerator(): generator[] {
		return Array.from(this.generators.values())
	}

	addProcessorIdToAll(processorCategoryId: string) {
		for (const GENERATOR of this.generators.values()) {
			if (!GENERATOR.processorIds) GENERATOR.processorIds = []
			if (!GENERATOR.processorIds.includes(processorCategoryId)) {
				GENERATOR.processorIds.push(processorCategoryId)
			}
		}
	}

	removeProcessorIdFromAll(processorCategoryId: string) {
		for (const GENERATOR of this.generators.values()) {
			if (GENERATOR.processorIds) {
				GENERATOR.processorIds = GENERATOR.processorIds.filter(id => id !== processorCategoryId)
				GENERATOR.clearProcessors()
			}
		}
	}
}