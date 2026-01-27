# mock-service

## Introduction

mock-service is a JavaScript library for generating mock data. It provides a rich set of categories and methods, along
with corresponding processors, to help developers quickly generate mock data that meets specific requirements.

PS: This project was originally extracted from another one of my projects (an HTTP and WebSocket request tool), and has
since been modified and optimized.

> This project is open-sourced under the MIT License. You are free to use, modify, and distribute the code as long as
> you comply with the license terms.  
> Note: This project is still under active development. Contributions and feedback are welcome.

## Basic Usage

```js
import MockService from "@erhai_lake/mock-service"

const MOCK = new MockService()

console.log("Get all categories")
console.log(MOCK.getAllCategory())

console.log("Get category by id")
console.log(MOCK.getCategory("string"))

console.log("Get all methods by category id")
console.log(MOCK.getAllMethods("string"))

console.log("Get method by category id and method id")
console.log(MOCK.getMethod("string", "uuid"))

console.log("Get all processor categories")
console.log(MOCK.getAllProcessorCategory())

console.log("Get processor category by id")
console.log(MOCK.getProcessorCategory("encodingDecoding"))

console.log("Get all processors by method id")
console.log(MOCK.getMethod("string", "uuid").getAllProcessors())

console.log("Get processor by method id and processor id")
console.log(MOCK.getMethod("string", "uuid").getProcessor("md5"))
console.log(MOCK.getMethod("string", "uuid").getProcessor("sha"))

console.log("Generate method id")
const UUID = MOCK.getMethod("string", "uuid").generate()
console.log(UUID)

console.log("Apply processor by method id and processor id")
console.log(MOCK.getMethod("string", "uuid").getProcessor("md5").apply(UUID))
console.log(MOCK.getMethod("string", "uuid").getProcessor("sha").apply(UUID, "SHA512"))

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
console.log(MOCK.generateTemplate(TEMPLATE))

console.log("Get data using the template")
console.log(MOCK.generateData("{{$string.uuid}}"))

console.log("Use processors in the template")
console.log(MOCK.generateData("{{$string.uuid|md5}}"))

console.log("You can also nest and combine")
console.log(MOCK.generateData('{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("喵{{$string.uuid}}")}}")}}'))

console.log("Extract templates from a string")
console.log(MOCK.extractTemplates("Hello there, your username is {{$string.nanoid}}, and your UUID is {{$string.uuid}}"))

console.log("Parse and replace templates in a string")
console.log(MOCK.resolveTemplate("Hello there, your username is {{$string.nanoid}}, and your UUID is {{$string.uuid}}"))
```

If you still need custom categories, methods, processor categories, processor methods

```js
import {createMockService} from "@erhai_lake/mock-service"

const userCategory = (categoryRegistry, processorRegistry) => {
	const CATEGORY = categoryRegistry.registerCategory({
		id: "user",
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

console.log("Get all categories")
console.log(mock.getAllCategory())
```

## Contents

### Currently Available Categories and Methods

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

### Currently Available Processor Categories and Methods

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

* ✅ Commercial use
* ✅ Modification
* ✅ Distribution
* ✅ Private use
* ❗ License and copyright notice required
* ❌ Liability
* ❌ Warranty