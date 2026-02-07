export const i18nZhCN = (i18nRegistry: any) => {
	i18nRegistry.register("zh-CN", {
		generator: {
			testGen: {
				title: "这是一个测试生成器分类",
				description: "这是一个测试生成器分类的描述",
				testFn1: {
					title: "这是一个测试生成器",
					description: "这是一个测试生成器的描述"
				},
				testFn2: {
					title: "这是一个测试生成器(有1参数)",
					description: "这是一个测试生成器的描述",
					params: {
						a: {
							title: "这是一个测试参数",
							description: "这是一个测试参数的描述"
						}
					}
				},
				testFn3: {
					title: "这是一个测试生成器(有2参数)",
					description: "这是一个测试生成器的描述",
					params: {
						min: {
							title: "最小参数值",
							description: "这是一个测试参数的描述"
						},
						max: {
							title: "最大参数值",
							description: "这是一个测试参数的描述"
						}
					}
				}
			}
		},
		processor: {
			testProc: {
				title: "这是一个测试处理器分类",
				description: "这是一个测试处理器分类的描述",
				testFn1: {
					title: "这是一个测试处理器",
					description: "这是一个测试处理器的描述"
				},
				testFn2: {
					title: "这是一个测试处理器(有1参数)",
					description: "这是一个测试处理器的描述",
					params: {
						a: {
							title: "这是一个测试参数",
							description: "这是一个测试参数的描述"
						}
					}
				},
				testFn3: {
					title: "这是一个测试处理器(有2参数)",
					description: "这是一个测试处理器的描述",
					params: {
						min: {
							title: "最小参数值",
							description: "这是一个测试参数的描述"
						},
						max: {
							title: "最大参数值",
							description: "这是一个测试参数的描述"
						}
					}
				}
			}
		}
	})
}