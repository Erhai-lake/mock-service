# mock-service

## Introduction / 简介

mock-service is a JavaScript library for generating mock data.

mock-service 是一个用于生成模拟数据的 JavaScript 库.

It provides a wealth of generators, as well as the corresponding processor, can help developers quickly generate simulation data that meet the requirements.

它提供了丰富的生成器, 以及对应的处理器, 可以帮助开发人员快速生成符合要求的模拟数据.

A fully extensible mock data generation library with categories, methods, and processors.

一个可扩展的模拟数据生成库, 包含分类, 方法和处理器.

[Documentation / 文档](https://docs.elake.top/project/mock_service/)

## Import / 导入

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

```javascript
import mock from "@erhai_lake/mock-service"

// 获取所有分类信息
console.log(mock.getAllGeneratorCategoryInfo())
// 根据分类ID和生成器ID获取信息
console.log(mock.getGeneratorInfo("string", "uuid"))

// 获取处理器分类信息
console.log(mock.getAllProcessorsInfo("encodingDecoding"))
// 根据分类ID和生成器ID获取信息
console.log(mock.getProcessorInfo("encodingDecoding", "sha"))

// 生成器使用
const UUIDV4 = mock.generateData("string", "uuid")
console.log(UUIDV4)
// 参数
const UUIDV7 = mock.generateData("string", "uuid", {version: "v7"})
console.log(UUIDV7)

// 处理器使用
console.log(mock.applyProcessor("encodingDecoding", "sha", UUIDV7))
console.log(mock.applyProcessor("encodingDecoding", "sha", UUIDV7, "SHA512"))

// 通过模板调用
console.log(mock.templateGenerateData("{{$string.uuid}}"))
console.log(mock.templateGenerateData("{{$string.uuid|sha}}"))
console.log(mock.templateGenerateData('{{$string.uuid(version="v7")|sha("SHA512")}}'))

// 无限嵌套(我不觉得你会套这么多)
console.log(mock.templateGenerateData('{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("{{$string.uuid|concat("😮{{$string.uuid|concat("阿{{$string.uuid}}")}}")|concat("喵{{$string.uuid}}")}}")}}'))
// 字符串调用
console.log(mock.resolveTemplate("Hello there, your username is {{$string.nanoid}}, and your UUID is {{$string.uuid}}"))
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