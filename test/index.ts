import {createMockService} from "../dist/index"
import type {mockServiceOptions} from "../dist/index"
// import {createMockService} from "@erhai_lake/mock-service"
// import type {generatorCategoryRegistry} from "@erhai_lake/mock-service"
import {generatorTestCategory} from "./generator"
import {processorTestCategory} from "./processor"
import {i18nZhCN} from "./i18n/registerZhCN"

// 创建 Mock Service 实例
const MOCK_SERVICE_OPTIONS: mockServiceOptions = {
	generatorRegisters: [generatorTestCategory],
	processorRegisters: [processorTestCategory],
	i18nRegisters: [i18nZhCN]
}
const mock = createMockService(MOCK_SERVICE_OPTIONS)

mock.reload()

console.log(mock.templateGenerateData('{{$string.uuid}}'))

console.log(mock.templateGenerateData('{{$testGen.testFn1}}'))
console.log(mock.templateGenerateData('{{$testGen.testFn1|format|testFn1}}'))
console.log(mock.templateGenerateData('{{$testGen.testFn2|testFn3}}'))
console.log(mock.templateGenerateData('{{$testGen.testFn2}}'))
console.log(mock.templateGenerateData('{{$testGen.testFn3(min=100,max=200)|testFn3}}'))

console.log(mock.getGeneratorCategoryInfo("testGen"))
console.log(mock.getAllGeneratorsInfo("testGen"))
console.log(mock.getProcessorCategoryInfo("testProc"))
console.log(mock.getAllProcessorsInfo("testProc"))
