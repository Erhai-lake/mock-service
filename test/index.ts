import {createMockService} from "../dist/index"
import type {mockServiceOptions} from "../dist/index"
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

console.log(mock.templateGenerateData("{{=return 1+4}}"))
console.log(mock.templateGenerateData("{{=1+4}}"))
const CODE = `
    context.setVar("BASE_PRICE", 300)
    const TAX = 1
    const TOTAL = context.getVar("BASE_PRICE") * (1 + TAX)
    context.setVar("BASE_PRICE", TOTAL)
    return context.getVar("BASE_PRICE")
`
console.log(mock.customExpression(CODE))
console.log(mock.templateGenerateData(`{{=${CODE}}}`))
console.log(mock.templateGenerateData(`{{=${CODE}|md5}}`))

mock.setVar("testVar", "testValue")
console.log(mock.getVar("testVar"))
console.log(mock.templateGenerateData('{{$var.getVar("testVar")}}'))
console.log(mock.templateGenerateData('{{$var.getVar("testVar")}}'))
console.log(mock.templateGenerateData('{{@testVar}}'))
console.log(mock.templateGenerateData('{{@testVar|md5}}'))
console.log(mock.templateGenerateData('{{$var.clearVar}}'))
console.log(mock.templateGenerateData('{{$var.getVar("testVar")}}'))

mock.switchErrorOutput(false)
console.log(mock.applyGlobalProcessor("format", "202308sas1512as3456"))
console.log(mock.templateGenerateData('{{$lorem.paragraph(min=10,max=9)}}'))

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
