# mock-service

## Introduction / 简介

mock-service is a JavaScript library for generating mock data. It provides a rich set of categories and methods, along
with corresponding processors, to help developers quickly generate mock data that meets specific requirements.

mock-service 是一个用于生成模拟数据的 JavaScript 库. 它提供了丰富的类别和方法, 以及对应的处理器, 可以帮助开发人员快速生成符合要求的模拟数据.

A fully extensible mock data generation library with categories, methods, and processors.

一个完全可扩展的模拟数据生成库, 包含类别, 方法和处理器.

## Contents / 内容

### Currently Available Methods / 目前有的方法

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
* lorem
	* sentence
	* sentences
	* paragraph
	* paragraphs
	* word
	* words
	* slug

### Currently Available Processors / 目前有的处理器

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

## Installation / 安装

### Using npm / 使用 npm

```bash
npm install @erhai_lake/mock-service
```

### Using yarn / 使用 yarn

```bash
yarn add @erhai_lake/mock-service
```

### Using Pnpm / 使用 pnpm

```bash
pnpm add @erhai_lake/mock-service
```

## Basic Usage / 基本用法

```js
import mock from "@erhai_lake/mock-service"

// Set the language and fallback language to en-US, the default is zh-CN
mock.setLocale("en-US")
mock.setFallbackLocale("en-US")

// You can also set the fallback language
// mock.setLocale("en-US", "en-US")

console.log(mock.getLocale()) // "en-US"

console.log("Get all categories")
console.log(mock.getAllCategory())

console.log("Get method by category id and method id")
console.log(mock.getMethod("string", "uuid"))

console.log("Get processor by category, method, and processor ID")
console.log(mock.getMethod("string", "uuid").getProcessor("md5"))
console.log(mock.getMethod("string", "uuid").getProcessor("sha"))

console.log("Generate data from a method")
const UUID = mock.getMethod("string", "uuid").generate()
console.log(UUID)

console.log("Apply a processor to a method's output")
console.log(mock.getMethod("string", "uuid").getProcessor("md5").apply(UUID))
console.log(mock.getMethod("string", "uuid").getProcessor("sha").apply(UUID, "SHA512"))

console.log("Generate template: supports parameters, processors, and processor parameters. This method does not support nesting, but you can directly embed templates.")
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

console.log("Get data using the template")
console.log(mock.generateData("{{$string.uuid}}"))

console.log("Use processors in the template")
console.log(mock.generateData("{{$string.uuid|md5}}"))

console.log("You can also nest and combine") // Just look, I don't think you really can set so many
console.log(mock.generateData('{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("喵{{$string.uuid}}")}}")}}'))

console.log("Extract templates from a string")
console.log(mock.extractTemplates("Hello there, your username is {{$string.nanoid}}, and your UUID is {{$string.uuid}}"))

console.log("Parse and replace templates in a string")
console.log(mock.resolveTemplate("Hello there, your username is {{$string.nanoid}}, and your UUID is {{$string.uuid}}"))
```

If you still need custom categories, methods, processor categories, processor methods

如果你还需要自定义分类, 方法, 处理器分类, 处理器方法~ (真是小馋猫呢, 什么都想要~)

```js
import {createMockService} from "@erhai_lake/mock-service"

const userCategory = (categoryRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "test",
		title: "User Related",
		description: "User information generation"
	})

	CATEGORY.methods.registerMethod({
		id: "name",
		title: "Username",
		description: "Random username",
		generate() {
			return "user_" + Math.random().toString(36).slice(2, 8)
		}
	})

	CATEGORY.methods.registerMethod({
		id: "age",
		title: "Age",
		description: "Random age",
		generate() {
			return Math.floor(Math.random() * 60) + 18
		}
	})
}

const mock = createMockService({
	categoryRegisters: [userCategory],
	processorRegisters: []
})

console.log(mock.getCategory("test"))
```

```ts
import type {CategoryRegistry} from "@erhai_lake/mock-service"
import {createMockService} from "@erhai_lake/mock-service"

const userCategory = (categoryRegistry: CategoryRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "test",
		title: "User Related",
		description: "User information generation"
	})

	CATEGORY.methods.registerMethod({
		id: "name",
		title: "Username",
		description: "Random username",
		generate() {
			return "user_" + Math.random().toString(36).slice(2, 8)
		}
	})

	CATEGORY.methods.registerMethod({
		id: "age",
		title: "Age",
		description: "Random age",
		generate() {
			return Math.floor(Math.random() * 60) + 18
		}
	})
}

const mock = createMockService({
	categoryRegisters: [userCategory],
	processorRegisters: []
})

console.log(mock.getCategory("test"))
```

## License / 许可证

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

本项目采用 MIT 许可证 —— 详情请参阅 [LICENSE](LICENSE) 文件.

### MIT License Summary

* ✅ Commercial use
* ✅ Modification
* ✅ Distribution
* ✅ Private use
* ❗ License and copyright notice required
* ❌ Liability
* ❌ Warranty

## Sponsorship Support / 赞助支持

Maintaining an open-source project requires significant time and resources. Your sponsorship will directly support:

维护一个开源项目需要大量的时间和资源. 您的赞助将直接支持:

* 🛠️ Continuous development and updates
* 🛠️ 持续开发和更新
* 🚀 New features and enhancements
* 🚀 新功能和增强功能
* 🐛 Bug fixes and issue resolution
* 🐛 错误修复和问题解决
* 📚 Documentation improvements and expanded examples
* 📚 文档改进和扩展示例

### Ways to contribute / 贡献方式

* [Alipay/Wechat](https://www.elake.top/zan-zhu)

PS: This project was originally extracted from another one of my projects (an HTTP and WebSocket request tool), and has since been modified and optimized.

PS: 这个项目最开始是从我的另一个项目(一个HTTP, WebSocket请求工具)中提取出来的, 并进行了一些修改和优化.

> This project is open-sourced under the MIT License. You are free to use, modify, and distribute the code as long as you comply with the license terms.
>
> 本项目基于 MIT 许可证开源, 您可以在遵守许可证条款的前提下自由使用、修改和分发本项目的代码.
>
> Note: This project is still under active development. Contributions and feedback are welcome.
>
> 注意: 本项目仍在开发中, 欢迎贡献代码和反馈问题.