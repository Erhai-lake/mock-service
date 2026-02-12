import {i18nRegistry} from "../../registries"

export const i18nZhCN = (i18nRegistry: i18nRegistry) => {
	i18nRegistry.register("zh-CN", {
		global: {
			i18nRegistry: {
				localeEmpty: "语言环境不能为空"
			},
			generatorCategoryRegistry: {
				idEmpty: "生成器分类 ID 不能为空",
				titleEmpty: "生成器分类标题不能为空",
				descriptionEmpty: "生成器分类描述不能为空",
				idDuplicate: "生成器分类 {id} 重复",
				generatorCategoryEmpty: "生成器分类 {id} 不存在"
			},
			generatorRegistry: {
				idEmpty: "生成器 ID 不能为空",
				titleEmpty: "生成器标题不能为空",
				descriptionEmpty: "生成器描述不能为空",
				idDuplicate: "生成器 {id} 重复",
				processorIdEmpty: "生成器 {id} 必须具有处理器 ID",
				processorIdDuplicate: "生成器 {id} 中的处理器 {processorId} 重复",
				processorEmpty: "处理器 {id} 不存在",
				generatorEmpty: "生成器 {id} 不存在"
			},
			processorCategoryRegistry: {
				idEmpty: "处理器分类 ID 不能为空",
				titleEmpty: "处理器分类标题不能为空",
				descriptionEmpty: "处理器分类描述不能为空",
				idDuplicate: "处理器分类 {id} 重复",
				processorCategoryEmpty: "处理器分类 {id} 不存在"
			},
			processorRegistry: {
				idEmpty: "处理器 ID 不能为空",
				titleEmpty: "处理器标题不能为空",
				descriptionEmpty: "处理器描述不能为空",
				idDuplicate: "处理器 {id} 重复",
				processorEmpty: "处理器 {id} 不存在"
			},
			templateInvalid: "模板无效: {template}"
		},
		generator: {
			var: {
				title: "变量系统",
				description: "变量系统的相关方法",
				getVar: {
					title: "获取变量",
					description: "根据变量键获取变量值",
					params: {
						key: {
							title: "变量键",
							description: "要获取的变量键"
						}
					}
				},
				setVar: {
					title: "设置变量",
					description: "根据变量键设置变量值",
					params: {
						key: {
							title: "变量键",
							description: "要设置的变量键"
						},
						value: {
							title: "变量值",
							description: "要设置的变量值"
						},
						isReturn: {
							title: "是否返回",
							description: "是否返回设置的变量值"
						}
					}
				},
				clearVar: {
					title: "清除变量",
					description: "清除所有变量"
				}
			},
			string: {
				title: "字符串 / UUID 等",
				description: "字符串相关的方法",
				uuid: {
					title: "UUID",
					description: "生成随机且唯一的 UUID(v1, v4, v7)基于命名空间和名称生成可复现的 UUID(v3, v5)",
					params: {
						version: {
							title: "UUID 版本",
							description: "要生成的 UUID 版本 (v3 使用 MD5, v5 使用 SHA-1)"
						},
						namespaceType: {
							title: "命名空间类型",
							description: "(v3, v5) 选择预定义的命名空间类型, 或使用自定义命名空间 UUID"
						},
						namespace: {
							title: "自定义命名空间",
							description: "(v3, v5) 当命名空间类型为 CUSTOM 时, 填写一个有效的 UUID 作为命名空间"
						},
						name: {
							title: "名称",
							description: "(v3, v5) 用于生成 UUID 的名称内容, 相同的名称和命名空间将生成相同的 UUID"
						}
					}
				},
				nanoId: {
					title: "生成 NanoID",
					description: "生成一个随机且尽量唯一的 Nano ID",
					params: {
						min: {
							title: "最小长度",
							description: "Nano ID 最小长度"
						},
						max: {
							title: "最大长度",
							description: "Nano ID 最大长度"
						}
					}
				},
				alpha: {
					title: "字母字符串",
					description: "生成一个由字母组成的字符串",
					params: {
						min: {
							title: "最小长度",
							description: "要生成的字母字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的字母字符串的最大长度, 如果超出, 则会截取到最大长度"
						},
						casing: {
							title: "大小写",
							description: "字母大小写"
						},
						exclude: {
							title: "排除字符",
							description: "一个或多个要排除的字符, 用英文逗号分隔, 会同时排除大小写"
						}
					}
				},
				numeric: {
					title: "数字字符串",
					description: "生成一个由数字组成的字符串",
					params: {
						min: {
							title: "最小长度",
							description: "要生成的数字字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的数字字符串的最大长度, 如果超出, 则会截取到最大长度"
						},
						allowLeadingZero: {
							title: "允许前导零",
							description: "是否允许生成的数字字符串以零开头"
						},
						exclude: {
							title: "排除字符",
							description: "一个或多个要排除的字符, 用英文逗号分隔"
						}
					}
				},
				alphanumeric: {
					title: "字母数字字符串",
					description: "生成一个由字母和数字组成的字符串",
					params: {
						min: {
							title: "最小长度",
							description: "要生成的字母数字字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的字母数字字符串的最大长度, 如果超出, 则会截取到最大长度"
						},
						casing: {
							title: "大小写",
							description: "字母大小写"
						},
						allowLeadingZero: {
							title: "允许前导零",
							description: "是否允许生成的字母数字字符串以零开头"
						},
						exclude: {
							title: "排除字符",
							description: "一个或多个要排除的字符, 用英文逗号分隔, 会同时排除大小写"
						}
					}
				},
				symbol: {
					title: "随机符号字符串 (混合)",
					description: "生成一个由符号组成的字符串",
					params: {
						min: {
							title: "最小长度",
							description: "要生成的符号字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的符号字符串的最大长度, 如果超出, 则会截取到最大长度"
						}
					}
				},
				sample: {
					title: "示例字符串",
					description: "生成一个由字母, 数字, 符号组成的字符串",
					params: {
						min: {
							title: "最小长度",
							description: "要生成的字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的字符串的最大长度, 如果超出, 则会截取到最大长度"
						},
						casing: {
							title: "大小写",
							description: "字母大小写"
						},
						allowLeadingZero: {
							title: "允许前导零",
							description: "是否允许生成的字符串以零开头"
						},
						exclude: {
							title: "排除字符",
							description: "一个或多个要排除的字符, 用英文逗号分隔, 会同时排除大小写"
						}
					}
				},
				characters: {
					title: "从字符中随机选择",
					description: "从给定的字符中随机选择指定数量的字符",
					params: {
						characters: {
							title: "字符",
							description: "要从中选择字符的字符串, 使用英文逗号分隔, 如果一个字符里有多个字符, 则会视为一个字符"
						},
						min: {
							title: "最小长度",
							description: "要生成的字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的字符串的最大长度, 如果超出, 则会截取到最大长度"
						}
					}
				},
				binary: {
					title: "随机一个二进制字符串",
					description: "返回一个随机的二进制字符串",
					params: {
						prefix: {
							title: "前缀",
							description: "生成的二进制字符串的前缀"
						},
						min: {
							title: "最小长度",
							description: "要生成的字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的字符串的最大长度, 如果超出, 则会截取到最大长度(前缀不计算在内)"
						}
					}
				},
				octal: {
					title: "随机一个八进制字符串",
					description: "返回一个随机的八进制字符串",
					params: {
						prefix: {
							title: "前缀",
							description: "生成的八进制字符串的前缀"
						},
						min: {
							title: "最小长度",
							description: "要生成的字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的字符串的最大长度, 如果超出, 则会截取到最大长度(前缀不计算在内)"
						}
					}
				},
				hexadecimal: {
					title: "随机一个十六进制字符串",
					description: "返回一个随机的十六进制字符串",
					params: {
						prefix: {
							title: "前缀",
							description: "生成的十六进制字符串的前缀"
						},
						casing: {
							title: "大小写",
							description: "字母大小写"
						},
						min: {
							title: "最小长度",
							description: "要生成的字符串的最小长度"
						},
						max: {
							title: "最大长度",
							description: "要生成的字符串的最大长度, 如果超出, 则会截取到最大长度(前缀不计算在内)"
						}
					}
				}
			},
			lorem: {
				title: "单词 / 句子 / 段落 等",
				description: "Lorem Ipsum 相关的方法",
				sentence: {
					title: "生成以句号结尾的句子",
					description: "生成一个由随机词语组成的句子, 以句号结尾",
					params: {
						language: {
							title: "语言",
							description: "要生成的句子的语言"
						},
						min: {
							title: "最小单词数",
							description: "要生成的最小词语数"
						},
						max: {
							title: "最大单词数",
							description: "要生成的最大词语数"
						}
					}
				},
				sentences: {
					title: "生成多个以句号结尾的句子",
					description: "生成多个由随机词语组成的句子, 以句号结尾",
					params: {
						language: {
							title: "语言",
							description: "要生成的句子的语言"
						},
						sentenceMin: {
							title: "最小单词数",
							description: "每个句子的最小词语数"
						},
						sentenceMax: {
							title: "最大单词数",
							description: "每个句子的最大词语数"
						},
						min: {
							title: "最小句子数",
							description: "要生成的最小句子数"
						},
						max: {
							title: "最大句子数",
							description: "要生成的最大句子数"
						},
						separator: {
							title: "分隔符",
							description: "每个句子之间的分隔符"
						}
					}
				},
				paragraph: {
					title: "生成一个段落",
					description: "生成一个由多个句子组成的段落",
					params: {
						language: {
							title: "语言",
							description: "要生成的句子的语言"
						},
						min: {
							title: "最小句子数",
							description: "要生成的最小句子数"
						},
						max: {
							title: "最大句子数",
							description: "要生成的最大句子数"
						}
					}
				},
				paragraphs: {
					title: "生成多个段落",
					description: "生成多个由多个句子组成的段落",
					params: {
						language: {
							title: "语言",
							description: "要生成的句子的语言"
						},
						min: {
							title: "最小段落数",
							description: "要生成的最小段落数"
						},
						max: {
							title: "最大段落数",
							description: "要生成的最大段落数"
						},
						newlines: {
							title: "换行符数量",
							description: "每个段落之间的换行符数量"
						}
					}
				},
				word: {
					title: "生成一个单词",
					description: "生成一个随机单词",
					params: {
						language: {
							title: "语言",
							description: "要生成的单词的语言"
						}
					}
				},
				words: {
					title: "生成多个单词",
					description: "生成多个随机单词",
					params: {
						language: {
							title: "语言",
							description: "要生成的单词的语言"
						},
						min: {
							title: "最小单词数",
							description: "要生成的最小词语数"
						},
						max: {
							title: "最大单词数",
							description: "要生成的最大词语数"
						},
						separator: {
							title: "分隔符",
							description: "每个单词之间的分隔符"
						}
					}
				},
				slug: {
					title: "生成 slugified 文本",
					description: "生成一个由多个单词组成的 slugified 文本",
					params: {
						min: {
							title: "最小单词数",
							description: "要生成的最小词语数"
						},
						max: {
							title: "最大单词数",
							description: "要生成的最大词语数"
						}
					}
				}
			},
			number: {
				title: "数值",
				description: "数值相关的方法",
				int: {
					title: "整数",
					description: "随机生成一个整数",
					params: {
						min: {
							title: "最小整数",
							description: "要生成的最小整数"
						},
						max: {
							title: "最大整数",
							description: "要生成的最大整数"
						},
						multipleOf: {
							title: "倍数",
							description: "要生成的整数必须是这个数的倍数, 0 表示不限制"
						}
					}
				},
				positiveInt: {
					title: "正整数",
					description: "随机生成一个正整数",
					params: {
						min: {
							title: "最小正整数",
							description: "要生成的最小正整数"
						},
						max: {
							title: "最大正整数",
							description: "要生成的最大正整数"
						},
						multipleOf: {
							title: "倍数",
							description: "要生成的正整数必须是这个数的倍数, 0 表示不限制"
						}
					}
				},
				negativeInt: {
					title: "负整数",
					description: "随机生成一个负整数",
					params: {
						min: {
							title: "最小负整数",
							description: "要生成的最小负整数"
						},
						max: {
							title: "最大负整数",
							description: "要生成的最大负整数"
						},
						multipleOf: {
							title: "倍数",
							description: "要生成的负整数必须是这个数的倍数, 0 表示不限制"
						}
					}
				},
				bigInt: {
					title: "大整数",
					description: "随机生成一个大整数",
					params: {
						min: {
							title: "最小大整数",
							description: "要生成的最小大整数"
						},
						max: {
							title: "最大大整数",
							description: "要生成的最大大整数"
						}
					}
				},
				float: {
					title: "浮点数",
					description: "随机生成一个浮点数",
					params: {
						min: {
							title: "最小浮点数",
							description: "要生成的最小浮点数"
						},
						max: {
							title: "最大浮点数",
							description: "要生成的最大浮点数"
						},
						fractionDigits: {
							title: "小数位数",
							description: "要生成的浮点数的小数位数"
						},
						multipleOf: {
							title: "倍数",
							description: "要生成的浮点数必须是这个数的倍数, 0 表示不限制"
						}
					}
				},
				binary: {
					title: "二进制",
					description: "随机生成一个二进制数",
					params: {
						min: {
							title: "最小二进制数",
							description: "要生成的最小二进制数"
						},
						max: {
							title: "最大二进制数",
							description: "要生成的最大二进制数"
						}
					}
				},
				octal: {
					title: "八进制",
					description: "随机生成一个八进制数",
					params: {
						min: {
							title: "最小八进制数",
							description: "要生成的最小八进制数"
						},
						max: {
							title: "最大八进制数",
							description: "要生成的最大八进制数"
						}
					}
				},
				hexadecimal: {
					title: "十六进制",
					description: "随机生成一个十六进制数",
					params: {
						min: {
							title: "最小十六进制数",
							description: "要生成的最小十六进制数"
						},
						max: {
							title: "最大十六进制数",
							description: "要生成的最大十六进制数"
						}
					}
				}
			},
			date: {
				title: "日期 / 时间",
				description: "日期时间相关的方法",
				isoTimestamp: {
					title: "ISO 时间字符串",
					description: "返回符合 ISO 8601 标准的时间字符串",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						},
						excludeMilliseconds: {
							title: "是否排除毫秒",
							description: "是否排除时间戳中的毫秒部分"
						},
						representation: {
							title: "表示形式",
							description: "时间表示形式, 格式化哪些部分: 日期, 时间或两者(完整)"
						},
						timezoneSuffix: {
							title: "时区后缀",
							description: "时区后缀, 例如: (无标识, UTC, 偏移量)"
						}
					}
				},
				timestamp: {
					title: "Unix时间戳 (秒)",
					description: "Unix 时间戳, 单位: 秒",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						}
					}
				},
				millisecondsTimestamp: {
					title: "Unix时间戳 (毫秒)",
					description: "Unix 时间戳, 单位: 毫秒",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						}
					}
				},
				now: {
					title: "当前时间",
					description: "当前时间(支持偏移)",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						}
					}
				},
				anytime: {
					title: "任意时间",
					description: "随机一个任意时间",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						},
						refDate: {
							title: "参考时间",
							description: "在参考时间前后的时间范围内取值, 例如: (xxxx-xx-xx)"
						},
						scope: {
							title: "时间范围",
							description: "在参考时间前后的时间范围, 单位: 月"
						},
						representation: {
							title: "表示形式",
							description: "时间表示形式, 格式化哪些部分: 日期, 时间或两者(完整)"
						},
						direction: {
							title: "时间方向",
							description: "时间方向, 取值范围, 前后, 未来, 过去"
						}
					}
				},
				birthdate: {
					title: "出生日期",
					description: "随机取值后, 通过参考时间反推出出生日期",
					params: {
						min: {
							title: "最小年龄",
							description: "要生成的最小年龄"
						},
						max: {
							title: "最大年龄",
							description: "要生成的最大年龄"
						},
						refDate: {
							title: "参考时间",
							description: "用参考时间作为基准计算出生日期, 例如: (xxxx-xx-xx)"
						},
						representation: {
							title: "表示形式",
							description: "时间表示形式, 格式化哪些部分: 日期, 时间或两者(完整)"
						}
					}
				},
				month: {
					title: "月份",
					description: "随机一个月份",
					params: {
						language: {
							title: "语言",
							description: "月份的语言"
						},
						abbreviated: {
							title: "是否缩写",
							description: "是否缩写月份"
						}
					}
				},
				weekday: {
					title: "星期",
					description: "随机一个星期",
					params: {
						language: {
							title: "语言",
							description: "星期的语言"
						},
						abbreviated: {
							title: "是否缩写",
							description: "是否缩写星期"
						}
					}
				},
				between: {
					title: "时间范围",
					description: "随机取值后, 在指定时间范围内取值",
					params: {
						from: {
							title: "开始时间",
							description: "开始时间, 例如: (xxxx-xx-xx)"
						},
						to: {
							title: "结束时间",
							description: "结束时间, 例如: (xxxx-xx-xx)"
						}
					}
				},
				timeZone: {
					title: "时区",
					description: "随机一个时区"
				}
			},
			person: {
				title: "姓名 / 性别 / 职业等",
				description: "个人资料",
				fullName: {
					title: "姓名",
					description: "随机一个姓名",
					params: {
						sex: {
							title: "性别",
							description: "性别, 只有男女"
						}
					}
				},
				lastName: {
					title: "姓氏",
					description: "随机一个姓氏"
				},
				firstName: {
					title: "名字",
					description: "随机一个名字",
					params: {
						sex: {
							title: "性别",
							description: "性别, 只有男女"
						}
					}
				},
				fullNameEn: {
					title: "姓名(英文)",
					description: "随机一个英文姓名",
					params: {
						sex: {
							title: "性别",
							description: "性别, 只有男女"
						}
					}
				},
				sex: {
					title: "性别",
					description: "随机一个性别",
					params: {
						language: {
							title: "语言",
							description: "性别的语言"
						}
					}
				}
			}
		},
		processors: {
			string: {
				title: "字符串相关",
				description: "字符串相关的处理器",
				lower: {
					title: "小写",
					description: "将字符串转换为小写"
				},
				upper: {
					title: "大写",
					description: "将字符串转换为大写"
				},
				length: {
					title: "长度",
					description: "获取字符串的长度"
				},
				substr: {
					title: "截取子字符串",
					description: "截取字符串的子字符串",
					params: {
						start: {
							title: "截取开始位置",
							description: "截取的开始位置"
						},
						length: {
							title: "截取长度",
							description: "截取的长度"
						}
					}
				},
				concat: {
					title: "字符串右拼接",
					description: "将输入的字符串在右侧与另一个字符串拼接在一起",
					params: {
						endString: {
							title: "拼接字符串",
							description: "拼接的字符串"
						}
					}
				},
				lconcat: {
					title: "字符串左拼接",
					description: "将输入的字符串在左侧与另一个字符串拼接在一起",
					params: {
						startString: {
							title: "拼接字符串",
							description: "拼接的字符串"
						}
					}
				},
				number: {
					title: "字符串转换为数字",
					description: "将输入的字符串转换为数字"
				},
				padStart: {
					title: "字符串左填充",
					description: "将输入的字符串在左侧填充指定的字符串, 直到达到指定的长度",
					params: {
						maxLength: {
							title: "最大长度",
							description: "填充后的字符串最大长度"
						},
						fillString: {
							title: "填充字符串",
							description: "用于填充的字符串"
						}
					}
				},
				padEnd: {
					title: "字符串右填充",
					description: "将输入的字符串在右侧填充指定的字符串, 直到达到指定的长度",
					params: {
						maxLength: {
							title: "最大长度",
							description: "填充后的字符串最大长度"
						},
						fillString: {
							title: "填充字符串",
							description: "用于填充的字符串"
						}
					}
				}
			},
			encodingDecoding: {
				title: "编码解码",
				description: "编码解码相关的处理器",
				md5: {
					title: "MD5",
					description: "对字符串进行 MD5 编码"
				},
				sha: {
					title: "SHA",
					description: "对字符串进行 SHA 编码",
					params: {
						algorithm: {
							title: "算法",
							description: "SHA 算法"
						}
					}
				},
				base64: {
					title: "Base64",
					description: "对字符串进行 Base64 编码"
				},
				unbase64: {
					title: "Base64 解码",
					description: "对 Base64 编码的字符串进行解码"
				},
				encodeURIComponent: {
					title: "URI 编码",
					description: "对字符串进行 URI 编码"
				},
				decodeURIComponent: {
					title: "URI 解码",
					description: "对 URI 编码的字符串进行解码"
				}
			},
			date: {
				title: "日期时间相关",
				description: "日期时间相关的处理器",
				format: {
					title: "格式化",
					description: "将日期时间格式化为指定的字符串",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						},
						formatString: {
							title: "格式化字符串",
							description: "格式化字符串"
						}
					}
				},
				formatISO8601: {
					title: "格式化 ISO 8601",
					description: "将日期时间格式化为 ISO 8601 字符串",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						},
						excludeMilliseconds: {
							title: "是否排除毫秒",
							description: "是否排除毫秒"
						},
						representation: {
							title: "表示形式",
							description: "时间表示形式, 格式化哪些部分: 日期, 时间或两者(完整)"
						},
						timezoneSuffix: {
							title: "时区后缀",
							description: "时区后缀"
						}
					}
				},
				formatISO9075: {
					title: "格式化 ISO 9075",
					description: "将日期时间格式化为 ISO 9075 字符串",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						},
						excludeMilliseconds: {
							title: "是否排除毫秒",
							description: "是否排除毫秒"
						}
					}
				},
				formatRFC3339: {
					title: "格式化 RFC 3339",
					description: "将日期时间格式化为 RFC 3339 字符串",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						},
						excludeMilliseconds: {
							title: "是否排除毫秒",
							description: "是否排除毫秒"
						},
						timezoneSuffix: {
							title: "时区后缀",
							description: "时区后缀"
						}
					}
				},
				formatRFC7231: {
					title: "格式化 RFC 7231",
					description: "将日期时间格式化为 RFC 7231 字符串",
					params: {
						timezone: {
							title: "时区",
							description: "时区, 例如: (Asia/Shanghai)"
						}
					}
				},
				startOfDay: {
					title: "一天的起点",
					description: "将日期时间设置为当天的开始时间: 00:00:00"
				},
				timestamp: {
					title: "秒级时间戳",
					description: "将日期时间转换为秒级时间戳"
				},
				millisecondsTimestamp: {
					title: "毫秒级时间戳",
					description: "将日期时间转换为毫秒级时间戳"
				},
				adjustDays: {
					title: "调整天数",
					description: "将日期时间调整指定的天数",
					params: {
						amount: {
							title: "天数",
							description: "要调整的天数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少天数"
						}
					}
				},
				adjustWeeks: {
					title: "调整周数",
					description: "将日期时间调整指定的周数",
					params: {
						amount: {
							title: "周数",
							description: "要调整的周数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少周数"
						}
					}
				},
				adjustMonths: {
					title: "调整月数",
					description: "将日期时间调整指定的月数",
					params: {
						amount: {
							title: "月数",
							description: "要调整的月数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少月数"
						}
					}
				},
				adjustQuarters: {
					title: "调整季度数",
					description: "将日期时间调整指定的季度数",
					params: {
						amount: {
							title: "季度数",
							description: "要调整的季度数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少季度数"
						}
					}
				},
				adjustYears: {
					title: "调整年份数",
					description: "将日期时间调整指定的年份数",
					params: {
						amount: {
							title: "年份数",
							description: "要调整的年份数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少年份数"
						}
					}
				},
				adjustISOWeekYears: {
					title: "调整 ISO 周年份数",
					description: "将日期时间调整指定的 ISO 周年份数",
					params: {
						amount: {
							title: "ISO 周年份数",
							description: "要调整的 ISO 周年份数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少 ISO 周年份数"
						}
					}
				},
				adjustHours: {
					title: "调整小时数",
					description: "将日期时间调整指定的小时数",
					params: {
						amount: {
							title: "小时数",
							description: "要调整的小时数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少小时数"
						}
					}
				},
				adjustMinutes: {
					title: "调整分钟数",
					description: "将日期时间调整指定的分钟数",
					params: {
						amount: {
							title: "分钟数",
							description: "要调整的分钟数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少分钟数"
						}
					}
				},
				adjustSeconds: {
					title: "调整秒数",
					description: "将日期时间调整指定的秒数",
					params: {
						amount: {
							title: "秒数",
							description: "要调整的秒数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少秒数"
						}
					}
				},
				adjustMilliseconds: {
					title: "调整毫秒数",
					description: "将日期时间调整指定的毫秒数",
					params: {
						amount: {
							title: "毫秒数",
							description: "要调整的毫秒数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少毫秒数"
						}
					}
				},
				adjustWorkday: {
					title: "调整工作日",
					description: "将日期时间调整指定的工作日数",
					params: {
						amount: {
							title: "工作日数",
							description: "要调整的工作日数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少工作日数"
						},
						workdaysList: {
							title: "工作日列表",
							description: "工作日列表, 1代表周一, 7代表周日, 英文,号分割"
						}
					}
				},
				adjustHoliday: {
					title: "调整非工作日",
					description: "将日期时间调整指定的非工作日数",
					params: {
						amount: {
							title: "休息日数",
							description: "要调整的休息日数"
						},
						increase: {
							title: "增加/减少",
							description: "增加或减少休息日数"
						},
						holidaysList: {
							title: "休息日列表",
							description: "休息日列表, 1代表周一, 7代表周日, 英文,号分割"
						}
					}
				}
			}
		},
		error: {
			processorNotFound: "未找到处理器: {id}",
			maxIsLessThanMin: "max 参数必须大于或等于 min 参数",
			poolIsEmpty: "字符池不能为空",
			poolIsEmptyAfterExclude: "排除字符后字符池不能为空",
			unsupportedDate: "不支持的日期时间格式: {format}",
			fractionDigitsIsLessThanMultipleOf: "fractionDigits 参数必须大于或等于 multipleOf 参数",
			customNamespaceInvalid: "CUSTOM 命名空间要求提供一个有效的 UUID",
			unsupportedNamespaceType: "不支持的命名空间类型: {type}",
			uuidVersionEmptyName: "UUID{version} 不能为空"
		}
	})
}
