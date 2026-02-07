// 使用 createMockService 创建 Mock Service 实例
import {createMockService} from "../dist/index"
import type {i18nRegistry, mockServiceOptions} from "../dist/index"

const i18nZhCN = (i18nRegistry: i18nRegistry) => {
	i18nRegistry.register("zh-CN", {
		generator: {
			test: {
				title: "测试",
				description: "测试用的分类",
				test: {
					title: "测试生成器",
					description: "测试用的生成器"
				}
			}
		},
		processors: {
			test: {
				title: "测试",
				description: "测试用的分类",
				test: {
					title: "测试处理器",
					description: "测试用的处理器"
				}
			}
		}
	})
}

// 创建 Mock Service 实例
const MOCK_SERVICE_OPTIONS: mockServiceOptions = {
	i18nRegisters: [i18nZhCN]
}
const mock = createMockService(MOCK_SERVICE_OPTIONS)

// 调用翻译
console.log(mock.translate("generator.test.title"))
console.log(mock.translate("processors.test.test.title"))