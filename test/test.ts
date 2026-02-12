import mock from "../dist/index.js"

console.log(mock.templateGenerateData("{{$date.millisecondsTimestamp|formatRFC7231}}"))

// 重载
mock.reload()

// 切换错误输出逻辑
mock.switchErrorOutput(false)

// 自定义表达式
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

// 变量
mock.setVar("testVar", "testValue")
console.log(mock.getVar("testVar"))
console.log(mock.templateGenerateData('{{$var.getVar("testVar")}}'))
console.log(mock.templateGenerateData('{{$var.getVar("testVar")}}'))
console.log(mock.templateGenerateData('{{@testVar}}'))
console.log(mock.templateGenerateData('{{@testVar|md5}}'))
console.log(mock.templateGenerateData('{{$var.clearVar}}'))
console.log(mock.templateGenerateData('{{$var.getVar("testVar")}}'))

console.log(mock.applyGlobalProcessor("format", "202308sas1512as3456"))
console.log(mock.templateGenerateData('{{$lorem.paragraph(min=10,max=9)}}'))

console.log(mock.templateGenerateData('{{$string.uuid}}'))
