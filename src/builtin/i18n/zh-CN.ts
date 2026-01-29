import {I18nRegistry} from "../../registries"

export default function registerZhCN(i18n: I18nRegistry) {
	i18n.register("zh-CN", {
		category: {
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
					title: "符号字符串",
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
				fromCharacters: {
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
							description: "SHA 算法",
							type: "select",
							default: "SHA256",
							options: ["SHA1", "SHA224", "SHA256", "SHA384", "SHA512"]
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
			}
		}
	})
}
