import type {CategoryRegistry, ProcessorCategoryRegistry} from "@erhai_lake/mock-service"
import {createMockService} from "@erhai_lake/mock-service"

const userCategory = (categoryRegistry: CategoryRegistry, processorRegistry: ProcessorCategoryRegistry) => {
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