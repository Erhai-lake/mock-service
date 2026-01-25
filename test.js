import mock from "./dist/index.js"

console.log("获取所有分类")
console.log(mock.getAllCategory())

console.log("获取指定分类 传入分类id")
console.log(mock.getCategory("string"))

console.log("获取所有方法 传入分类id")
console.log(mock.getAllMethods("string"))

console.log("获取指定方法 传入分类id和方法名")
console.log(mock.getMethod("string", "uuid"))

console.log("获取所有处理器分类")
console.log(mock.getAllProcessorCategory())

console.log("获取指定处理器分类 传入分类id")
console.log(mock.getProcessorCategory("encodingDecoding"))

console.log("获取指定方法的所有处理器")
console.log(mock.getMethod("string", "uuid").getAllProcessors())

console.log("获取指定方法的指定处理器 传入处理器id")
console.log(mock.getMethod("string", "uuid").getProcessor("md5"))
console.log(mock.getMethod("string", "uuid").getProcessor("sha"))

console.log("请求指定方法")
const UUID = mock.getMethod("string", "uuid").generate()
console.log(UUID)

console.log("请求指定方法, 并应用指定处理器 传入处理器id")
console.log(mock.getMethod("string", "uuid").getProcessor("md5").apply(UUID))
console.log(mock.getMethod("string", "uuid").getProcessor("sha").apply(UUID, "SHA512"))

console.log("生成模板, 支持参数, 处理器, 处理器参数, 这个方法不支持嵌套, 但是可以直接塞模板")
const TEMPLATE = {
	category: "string",
	method: "alpha",
	params: {
		min: 100,
		max: 200
	},
	processors: [
		{
			id: "sha",
			params: {
				algorithm: "SHA512"
			}
		},
		{
			id: "lconcat",
			params: {
				startString: "{{$string.uuid}}"
			}
		}
	]
}
console.log(mock.generateTemplate(TEMPLATE))

console.log("使用模板获取")
console.log(mock.generateData("{{$string.uuid}}"))

console.log("模板使用处理器")
console.log(mock.generateData("{{$string.uuid|md5}}"))

console.log("还可以嵌套组合")
console.log(mock.generateData('{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("喵{{$string.uuid}}")}}")}}'))

console.log("从字符串中提取模板")
console.log(mock.extractTemplates("你好啊, 你的用户名是 {{$string.nanoid}}, UUID是 {{$string.uuid}}"))

console.log("解析并替换字符串中的模板")
console.log(mock.resolveTemplate("你好啊, 你的用户名是 {{$string.nanoid}}, UUID是 {{$string.uuid}}"))
