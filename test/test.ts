// ESM
// import mock from "./dist/index.js"
import {createMockService} from "../dist/index"
import type {generatorCategoryRegistry, generatorCategory, mockServiceOptions} from "../dist/index"
// import type {generatorCategoryInfo, generatorCategory} from "./dist/index.js"

// 注册生成器分类
export const generatorTestCategory = (generatorRegistry: generatorCategoryRegistry) => {
	const CATEGORY: generatorCategory = generatorRegistry.registerCategory({
		id: "test",
		title: "这是一个测试分类",
		description: "这是一个测试分类的描述"
	})

	// 生成器方法
	CATEGORY.generators.registerGenerator({
		id: "testFn1",
		title: "这是一个测试生成器",
		description: "这是一个测试生成器的描述",
		processors: ["string", "encodingDecoding", "date"],
		generate(): string {
			return String(Date.now())
		}
	})

	CATEGORY.generators.registerGenerator({
		id: "testFn2",
		title: "这是一个测试生成器(有参数)",
		description: "这是一个测试生成器的描述",
		params: [
			{
				id: "min",
				title: "generator.number.int.params.min.title",
				description: "generator.number.int.params.min.description",
				type: "number",
				default: Number.MIN_SAFE_INTEGER,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			},
			{
				id: "max",
				title: "generator.number.int.params.max.title",
				description: "generator.number.int.params.max.description",
				type: "number",
				default: Number.MAX_SAFE_INTEGER,
				min: Number.MIN_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
				step: 1
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params = {min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER}): number {
			const {min, max} = params
			return Math.floor(Math.random() * (max - min + 1) + min)
		}
	})
}

// 创建 Mock Service 实例
const MOCK_SERVICE_OPTIONS: mockServiceOptions = {
	generatorRegisters: [generatorTestCategory]
}
const mock = createMockService(MOCK_SERVICE_OPTIONS)

// 调用生成器
console.log(mock.templateGenerateData('{{$test.testFn1}}'))
// 1770389121984
console.log(mock.templateGenerateData('{{$test.testFn1|format}}'))
// 2026-02-06 22:45:21
console.log(mock.templateGenerateData('{{$test.testFn2}}'))
// -473234059550169
console.log(mock.templateGenerateData('{{$test.testFn2(min=100,max=200)}}'))
// 161

// console.log(mock.generateData('{{$person.fullNameEn}}'))
// console.log(mock.getGeneratorInfo("person", "firstName"))

// 生成器分类
// const CATEGORY: generatorCategoryInfo = mock.getGeneratorCategoryInfo("string")
// console.log(CATEGORY)
// const ALL_CATEGORY: generatorCategoryInfo[] = mock.getAllGeneratorCategoryInfo()
// console.log(ALL_CATEGORY)

// 生成器
// const GENERATOR: GeneratorInfo = mock.getGeneratorInfo("string", "nanoid")
// console.log(GENERATOR)
// const GENERATORS: GeneratorInfo[] = mock.getAllGeneratorsInfo("string")
// console.log(GENERATORS)

// 生成器处理器分类
// const P_CATEGORY: ProcessorCategoryInfo = mock.getProcessorCategoryInfo("string")
// console.log(P_CATEGORY)
// const P_ALL_CATEGORY: ProcessorCategoryInfo[] = mock.getAllProcessorCategoryInfo()
// console.log(P_ALL_CATEGORY)

// 处理器
// const PROCESSOR: ProcessorInfo = mock.getProcessorInfo("string", "substr")
// console.log(PROCESSOR)
// const PROCESSORS: ProcessorInfo[] = mock.getAllProcessorsInfo("string")
// console.log(PROCESSORS)

// 通过生成器获取处理器
// const PROCESSOR: ProcessorInfo = mock.getGeneratorProcessorInfo("string", "nanoid", "substr")
// console.log(PROCESSOR)
// const PROCESSORS: ProcessorInfo[] = mock.getGeneratorAllProcessorInfo("string", "nanoid")
// console.log(PROCESSORS)

// const PROCESSOR_GROUPS: ProcessorGroup[] = mock.getProcessorGroups()
// console.log(PROCESSOR_GROUPS)

// const PROCESSOR_GROUPS: ProcessorGroup[] = mock.getGeneratorProcessorGroups("string", "nanoid")
// console.log(PROCESSOR_GROUPS)

// const GENERATOR_GROUPS: GeneratorGroup[] = mock.getGeneratorGroups()
// console.log(GENERATOR_GROUPS)


// CJS
// const {default: mock} = require("./dist/index.cjs")
// const {createMockService} = require("./dist/index.cjs")
// const mock = createMockService({
// 	generatorRegisters: [],
// 	processorRegisters: [],
// 	i18nRegisters: []
// })

// import fs from "fs"
// const a =
// fs.writeFileSync("./a.txt", a.join("|"))
