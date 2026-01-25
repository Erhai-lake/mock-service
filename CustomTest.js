import {createMockService} from "./dist/index.js"

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