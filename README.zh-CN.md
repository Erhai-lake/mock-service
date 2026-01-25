# mock-service

## 简介

mock-service 是一个用于生成模拟数据的 JavaScript 库. 它提供了丰富的类别和方法, 以及对应的处理器, 可以帮助开发人员快速生成符合要求的模拟数据.

PS: 这个项目最开始是从我的另一个项目(一个HTTP, WebSocket请求工具)中提取出来的, 并进行了一些修改和优化.

> 本项目基于 MIT 许可证开源, 您可以在遵守许可证条款的前提下自由使用、修改和分发本项目的代码.
> 注意: 本项目仍在开发中, 欢迎贡献代码和反馈问题.

## 基本用法

```js
import MockService from "@erhai_lake/mock-service"

const MOCK = new MockService()

console.log("获取所有分类")
console.log(MOCK.getAllCategory())

console.log("获取指定分类 传入分类id")
console.log(MOCK.getCategory("string"))

console.log("获取所有方法 传入分类id")
console.log(MOCK.getAllMethods("string"))

console.log("获取指定方法 传入分类id和方法名")
console.log(MOCK.getMethod("string", "uuid"))

console.log("获取所有处理器分类")
console.log(MOCK.getAllProcessorCategory())

console.log("获取指定处理器分类 传入分类id")
console.log(MOCK.getProcessorCategory("encodingDecoding"))

console.log("获取指定方法的所有处理器")
console.log(MOCK.getMethod("string", "uuid").getAllProcessors())

console.log("获取指定方法的指定处理器 传入处理器id")
console.log(MOCK.getMethod("string", "uuid").getProcessor("md5"))
console.log(MOCK.getMethod("string", "uuid").getProcessor("sha"))

console.log("请求指定方法")
const UUID = MOCK.getMethod("string", "uuid").generate()
console.log(UUID)

console.log("请求指定方法, 并应用指定处理器 传入处理器id")
console.log(MOCK.getMethod("string", "uuid").getProcessor("md5").apply(UUID))
console.log(MOCK.getMethod("string", "uuid").getProcessor("sha").apply(UUID, "SHA512"))

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
console.log(MOCK.generateTemplate(TEMPLATE))

console.log("使用模板获取")
console.log(MOCK.generateData("{{$string.uuid}}"))

console.log("模板使用处理器")
console.log(MOCK.generateData("{{$string.uuid|md5}}"))

console.log("还可以嵌套组合")
console.log(MOCK.generateData('{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("喵{{$string.uuid}}")}}")}}'))

console.log("从字符串中提取模板")
console.log(MOCK.extractTemplates("你好啊, 你的用户名是 {{$string.nanoid}}, UUID是 {{$string.uuid}}"))

console.log("解析并替换字符串中的模板")
console.log(MOCK.resolveTemplate("你好啊, 你的用户名是 {{$string.nanoid}}, UUID是 {{$string.uuid}}"))
```

如果你还需要自定义分类, 方法, 处理器分类, 处理器方法~ (真是小馋猫呢, 什么都想要~)

```js
import {createMockService} from "@erhai_lake/mock-service"

const userCategory = (categoryRegistry, processorRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "user",
		title: "用户相关",
		description: "用户信息生成"
	})

	CATEGORY.methods.registerMethod({
		id: "name",
		title: "用户名",
		description: "随机用户名",
		generate() {
			return "user_" + Math.random().toString(36).slice(2, 8)
		}
	})

	CATEGORY.methods.registerMethod({
		id: "age",
		title: "年龄",
		description: "随机年龄",
		generate() {
			return Math.floor(Math.random() * 60) + 18
		}
	})
}

const mock = createMockService({
	categoryRegisters: [userCategory],
	processorRegisters: []
})

console.log("获取所有分类")
console.log(mock.getAllCategory())
```

```ts
import type {CategoryRegistry, ProcessorCategoryRegistry} from "@erhai_lake/mock-service"
import {createMockService} from "@erhai_lake/mock-service"

const userCategory = (categoryRegistry: CategoryRegistry, processorRegistry: ProcessorCategoryRegistry) => {
	...
}

const mock = createMockService({
	categoryRegisters: [userCategory],
	processorRegisters: []
})

console.log("获取所有分类")
console.log(mock.getAllCategory())
```

## 内容

### 目前有的类别和方法

* string
	* uuid
	* nanoid
	* alpha
	* numeric
	* alphaNumeric
	* symbol
	* sample
	* fromCharacters
	* binary
	* octal
	* hexadecimal

### 目前有的处理器类别和方法

* string
	* lower
	* upper
	* length
	* substr
	* concat
	* lconcat
	* number
	* padStart
	* padEnd
* encodingDecoding
	* md5
	* sha
	* base64
	* unbase64
	* encodeURIComponent
	* decodeURIComponent

## 许可证

本项目采用 MIT 许可证 —— 详情请参阅 [LICENSE](LICENSE) 文件.

### MIT 许可证概要

* ✅ 允许商业使用
* ✅ 允许修改
* ✅ 允许分发
* ✅ 允许私下使用
* ❗ 必须保留许可证和版权声明
* ❌ 不承担任何责任
* ❌ 不提供任何担保
