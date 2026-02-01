import {I18nRegistry} from "../../registries"

export default function registerEnUS(i18n: I18nRegistry) {
	i18n.register("en-US", {
		category: {
			string: {
				title: "Strings / UUID etc.",
				description: "String-related utilities",
				uuid: {
					title: "UUID",
					description: "Generate random and unique UUIDs (v1, v4, v7), or generate reproducible UUIDs based on a namespace and name (v3, v5).",
					params: {
						version: {
							title: "UUID Version",
							description: "The UUID version to generate (v3 uses MD5, v5 uses SHA-1)."
						},
						namespaceType: {
							title: "Namespace Type",
							description: "(v3, v5) Select a predefined namespace type, or use a custom namespace UUID."
						},
						namespace: {
							title: "Custom Namespace",
							description: "(v3, v5) When the namespace type is CUSTOM, provide a valid UUID as the namespace."
						},
						name: {
							title: "Name",
							description: "(v3, v5) The name used to generate the UUID. The same name and namespace will always produce the same UUID."
						}
					}
				},
				nanoId: {
					title: "Generate NanoID",
					description: "Generate a random and reasonably unique Nano ID",
					params: {
						min: {
							title: "Minimum length",
							description: "Minimum length of the Nano ID"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the Nano ID"
						}
					}
				},
				alpha: {
					title: "Alphabetic string",
					description: "Generate a string consisting of letters",
					params: {
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated alphabetic string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated alphabetic string. Extra characters will be truncated"
						},
						casing: {
							title: "Letter case",
							description: "Letter casing"
						},
						exclude: {
							title: "Exclude characters",
							description: "One or more characters to exclude, separated by commas. Both cases will be excluded"
						}
					}
				},
				numeric: {
					title: "Numeric string",
					description: "Generate a string consisting of digits",
					params: {
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated numeric string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated numeric string. Extra characters will be truncated"
						},
						allowLeadingZero: {
							title: "Allow leading zero",
							description: "Whether the generated numeric string may start with zero"
						},
						exclude: {
							title: "Exclude characters",
							description: "One or more characters to exclude, separated by commas"
						}
					}
				},
				alphanumeric: {
					title: "Alphanumeric string",
					description: "Generate a string consisting of letters and numbers",
					params: {
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated alphanumeric string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated alphanumeric string. Extra characters will be truncated"
						},
						casing: {
							title: "Letter case",
							description: "Letter casing"
						},
						allowLeadingZero: {
							title: "Allow leading zero",
							description: "Whether the generated alphanumeric string may start with zero"
						},
						exclude: {
							title: "Exclude characters",
							description: "One or more characters to exclude, separated by commas. Both cases will be excluded"
						}
					}
				},
				symbol: {
					title: "Symbol string",
					description: "Generate a string consisting of symbols",
					params: {
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated symbol string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated symbol string. Extra characters will be truncated"
						}
					}
				},
				sample: {
					title: "Sample string",
					description: "Generate a string consisting of letters, numbers, and symbols",
					params: {
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated string. Extra characters will be truncated"
						},
						casing: {
							title: "Letter case",
							description: "Letter casing"
						},
						allowLeadingZero: {
							title: "Allow leading zero",
							description: "Whether the generated string may start with zero"
						},
						exclude: {
							title: "Exclude characters",
							description: "One or more characters to exclude, separated by commas. Both cases will be excluded"
						}
					}
				},
				fromCharacters: {
					title: "Random from characters",
					description: "Randomly select a specified number of characters from the given set",
					params: {
						characters: {
							title: "Characters",
							description: "Characters to choose from, separated by commas. Multiple characters can be treated as a single unit"
						},
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated string. Extra characters will be truncated"
						}
					}
				},
				binary: {
					title: "Random binary string",
					description: "Return a random binary string",
					params: {
						prefix: {
							title: "Prefix",
							description: "Prefix of the generated binary string"
						},
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated string. Prefix is not included"
						}
					}
				},
				octal: {
					title: "Random octal string",
					description: "Return a random octal string",
					params: {
						prefix: {
							title: "Prefix",
							description: "Prefix of the generated octal string"
						},
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated string. Prefix is not included"
						}
					}
				},
				hexadecimal: {
					title: "Random hexadecimal string",
					description: "Return a random hexadecimal string",
					params: {
						prefix: {
							title: "Prefix",
							description: "Prefix of the generated hexadecimal string"
						},
						casing: {
							title: "Letter case",
							description: "Letter casing"
						},
						min: {
							title: "Minimum length",
							description: "Minimum length of the generated string"
						},
						max: {
							title: "Maximum length",
							description: "Maximum length of the generated string. Prefix is not included"
						}
					}
				}
			},
			lorem: {
				title: "Words / Sentences / Paragraphs",
				description: "Lorem Ipsum related utilities",
				sentence: {
					title: "Generate a sentence ending with a period",
					description: "Generate a sentence composed of random words, ending with a period",
					params: {
						language: {
							title: "Language",
							description: "Language of the generated sentence"
						},
						min: {
							title: "Minimum words",
							description: "Minimum number of words to generate"
						},
						max: {
							title: "Maximum words",
							description: "Maximum number of words to generate"
						}
					}
				},
				sentences: {
					title: "Generate multiple sentences ending with periods",
					description: "Generate multiple sentences composed of random words, each ending with a period",
					params: {
						language: {
							title: "Language",
							description: "Language of the generated sentences"
						},
						sentenceMin: {
							title: "Minimum words per sentence",
							description: "Minimum number of words per sentence"
						},
						sentenceMax: {
							title: "Maximum words per sentence",
							description: "Maximum number of words per sentence"
						},
						min: {
							title: "Minimum sentences",
							description: "Minimum number of sentences to generate"
						},
						max: {
							title: "Maximum sentences",
							description: "Maximum number of sentences to generate"
						},
						separator: {
							title: "Separator",
							description: "Separator between sentences"
						}
					}
				},
				paragraph: {
					title: "Generate a paragraph",
					description: "Generate a paragraph consisting of multiple sentences",
					params: {
						language: {
							title: "Language",
							description: "Language of the generated sentences"
						},
						min: {
							title: "Minimum sentences",
							description: "Minimum number of sentences to generate"
						},
						max: {
							title: "Maximum sentences",
							description: "Maximum number of sentences to generate"
						}
					}
				},
				paragraphs: {
					title: "Generate multiple paragraphs",
					description: "Generate multiple paragraphs consisting of multiple sentences",
					params: {
						language: {
							title: "Language",
							description: "Language of the generated sentences"
						},
						min: {
							title: "Minimum paragraphs",
							description: "Minimum number of paragraphs to generate"
						},
						max: {
							title: "Maximum paragraphs",
							description: "Maximum number of paragraphs to generate"
						},
						newlines: {
							title: "Newline count",
							description: "Number of newlines between paragraphs"
						}
					}
				},
				word: {
					title: "Generate a word",
					description: "Generate a random word",
					params: {
						language: {
							title: "Language",
							description: "Language of the generated word"
						}
					}
				},
				words: {
					title: "Generate multiple words",
					description: "Generate multiple random words",
					params: {
						language: {
							title: "Language",
							description: "Language of the generated words"
						},
						min: {
							title: "Minimum words",
							description: "Minimum number of words to generate"
						},
						max: {
							title: "Maximum words",
							description: "Maximum number of words to generate"
						},
						separator: {
							title: "Separator",
							description: "Separator between words"
						}
					}
				},
				slug: {
					title: "Generate slugified text",
					description: "Generate slugified text composed of multiple words",
					params: {
						min: {
							title: "Minimum words",
							description: "Minimum number of words to generate"
						},
						max: {
							title: "Maximum words",
							description: "Maximum number of words to generate"
						}
					}
				}
			},
			number: {
				title: "Number",
				description: "Methods related to numbers",
				int: {
					title: "Integer",
					description: "Randomly generate an integer",
					params: {
						min: {
							title: "Minimum integer",
							description: "The smallest integer to generate"
						},
						max: {
							title: "Maximum integer",
							description: "The largest integer to generate"
						},
						multipleOf: {
							title: "Multiple of",
							description: "The integer must be a multiple of this number, 0 means no restriction"
						}
					}
				},
				positiveInt: {
					title: "Positive Integer",
					description: "Randomly generate a positive integer",
					params: {
						min: {
							title: "Minimum positive integer",
							description: "The smallest positive integer to generate"
						},
						max: {
							title: "Maximum positive integer",
							description: "The largest positive integer to generate"
						},
						multipleOf: {
							title: "Multiple of",
							description: "The positive integer must be a multiple of this number, 0 means no restriction"
						}
					}
				},
				negativeInt: {
					title: "Negative Integer",
					description: "Randomly generate a negative integer",
					params: {
						min: {
							title: "Minimum negative integer",
							description: "The smallest negative integer to generate"
						},
						max: {
							title: "Maximum negative integer",
							description: "The largest negative integer to generate"
						},
						multipleOf: {
							title: "Multiple of",
							description: "The negative integer must be a multiple of this number, 0 means no restriction"
						}
					}
				},
				bigInt: {
					title: "Big Integer",
					description: "Randomly generate a big integer",
					params: {
						min: {
							title: "Minimum big integer",
							description: "The smallest big integer to generate"
						},
						max: {
							title: "Maximum big integer",
							description: "The largest big integer to generate"
						}
					}
				},
				float: {
					title: "Float",
					description: "Randomly generate a floating-point number",
					params: {
						min: {
							title: "Minimum float",
							description: "The smallest float to generate"
						},
						max: {
							title: "Maximum float",
							description: "The largest float to generate"
						},
						fractionDigits: {
							title: "Decimal places",
							description: "The number of decimal places for the generated float"
						},
						multipleOf: {
							title: "Multiple of",
							description: "The float must be a multiple of this number, 0 means no restriction"
						}
					}
				},
				binary: {
					title: "Binary",
					description: "Randomly generate a binary number",
					params: {
						min: {
							title: "Minimum binary number",
							description: "The smallest binary number to generate"
						},
						max: {
							title: "Maximum binary number",
							description: "The largest binary number to generate"
						}
					}
				},
				octal: {
					title: "Octal",
					description: "Randomly generate an octal number",
					params: {
						min: {
							title: "Minimum octal number",
							description: "The smallest octal number to generate"
						},
						max: {
							title: "Maximum octal number",
							description: "The largest octal number to generate"
						}
					}
				},
				hexadecimal: {
					title: "Hexadecimal",
					description: "Randomly generate a hexadecimal number",
					params: {
						min: {
							title: "Minimum hexadecimal number",
							description: "The smallest hexadecimal number to generate"
						},
						max: {
							title: "Maximum hexadecimal number",
							description: "The largest hexadecimal number to generate"
						}
					}
				}
			},
			date: {
				title: "Date / Time",
				description: "Date and time related methods",
				isoTimestamp: {
					title: "ISO Timestamp",
					description: "Returns a timestamp that conforms to the ISO 8601 standard",
					params: {
						timezone: {
							title: "Time Zone",
							description: "Time zone, for example: (Asia/Shanghai)"
						},
						excludeMilliseconds: {
							title: "Exclude Milliseconds",
							description: "Whether to exclude the milliseconds part of the timestamp"
						},
						formattingStyle: {
							title: "Formatting Style",
							description: "Formatting style, for example: (basic, extended)"
						},
						representation: {
							title: "Representation",
							description: "Time representation, which parts to format: date, time, or both (full)"
						},
						timezoneSuffix: {
							title: "Time Zone Suffix",
							description: "Time zone suffix, for example: (none, UTC, offset)"
						}
					}
				},
				timestamp: {
					title: "Unix Timestamp (Seconds)",
					description: "Unix timestamp, unit: seconds",
					params: {
						timezone: {
							title: "Time Zone",
							description: "Time zone, for example: (Asia/Shanghai)"
						}
					}
				},
				millisecondsTimestamp: {
					title: "Unix Timestamp (Milliseconds)",
					description: "Unix timestamp, unit: milliseconds",
					params: {
						timezone: {
							title: "Time Zone",
							description: "Time zone, for example: (Asia/Shanghai)"
						}
					}
				},
				now: {
					title: "Current Time",
					description: "Current time (supports offset)",
					params: {
						timezone: {
							title: "Time Zone",
							description: "Time zone, for example: (Asia/Shanghai)"
						}
					}
				},
				anytime: {
					title: "Any Time",
					description: "Randomly generates a time",
					params: {
						refDate: {
							title: "Reference Date",
							description: "Select a time within a range before or after the reference date, for example: (xxxx-xx-xx xx:xx:xx)"
						},
						scope: {
							title: "Time Range",
							description: "Time range before and after the reference date, unit: months"
						},
						representation: {
							title: "Representation",
							description: "Time representation, which parts to format: date, time, or both (full)"
						}
					}
				},
				future: {
					title: "Future Time",
					description: "Randomly generates a future time",
					params: {
						refDate: {
							title: "Reference Date",
							description: "Select a time within a range after the reference date, for example: (xxxx-xx-xx xx:xx:xx)"
						},
						scope: {
							title: "Time Range",
							description: "Time range after the reference date, unit: months"
						},
						representation: {
							title: "Representation",
							description: "Time representation, which parts to format: date, time, or both (full)"
						}
					}
				},
				past: {
					title: "Past Time",
					description: "Randomly generates a past time",
					params: {
						refDate: {
							title: "Reference Date",
							description: "Select a time within a range before the reference date, for example: (xxxx-xx-xx xx:xx:xx)"
						},
						scope: {
							title: "Time Range",
							description: "Time range before the reference date, unit: months"
						},
						representation: {
							title: "Representation",
							description: "Time representation, which parts to format: date, time, or both (full)"
						}
					}
				},
				birthdate: {
					title: "Birth Date",
					description: "Randomly generates a date and derives a birth date based on the reference date",
					params: {
						min: {
							title: "Minimum Age",
							description: "Minimum age to generate"
						},
						max: {
							title: "Maximum Age",
							description: "Maximum age to generate"
						},
						refDate: {
							title: "Reference Date",
							description: "Use the reference date as the basis to calculate the birth date, for example: (xxxx-xx-xx)"
						},
						representation: {
							title: "Representation",
							description: "Time representation, which parts to format: date, time, or both (full)"
						}
					}
				},
				timeZone: {
					title: "Time Zone",
					description: "Randomly generates a time zone"
				}
			}
		},
		processors: {
			string: {
				title: "String processing",
				description: "String-related processors",
				lower: {
					title: "Lowercase",
					description: "Convert string to lowercase"
				},
				upper: {
					title: "Uppercase",
					description: "Convert string to uppercase"
				},
				length: {
					title: "Length",
					description: "Get the length of the string"
				},
				substr: {
					title: "Substring",
					description: "Extract a substring from the string",
					params: {
						start: {
							title: "Start index",
							description: "Starting position of the substring"
						},
						length: {
							title: "Length",
							description: "Length of the substring"
						}
					}
				},
				concat: {
					title: "Right concatenate",
					description: "Concatenate another string to the right of the input string",
					params: {
						endString: {
							title: "Concatenated string",
							description: "String to concatenate"
						}
					}
				},
				lconcat: {
					title: "Left concatenate",
					description: "Concatenate another string to the left of the input string",
					params: {
						startString: {
							title: "Concatenated string",
							description: "String to concatenate"
						}
					}
				},
				number: {
					title: "Convert to number",
					description: "Convert the input string to a number"
				},
				padStart: {
					title: "Pad start",
					description: "Pad the string at the start until it reaches the specified length",
					params: {
						maxLength: {
							title: "Maximum length",
							description: "Maximum length after padding"
						},
						fillString: {
							title: "Fill string",
							description: "String used for padding"
						}
					}
				},
				padEnd: {
					title: "Pad end",
					description: "Pad the string at the end until it reaches the specified length",
					params: {
						maxLength: {
							title: "Maximum length",
							description: "Maximum length after padding"
						},
						fillString: {
							title: "Fill string",
							description: "String used for padding"
						}
					}
				}
			},
			encodingDecoding: {
				title: "Encoding & decoding",
				description: "Encoding and decoding related processors",
				md5: {
					title: "MD5",
					description: "Encode a string using MD5"
				},
				sha: {
					title: "SHA",
					description: "Encode a string using SHA",
					params: {
						algorithm: {
							title: "Algorithm",
							description: "SHA algorithm"
						}
					}
				},
				base64: {
					title: "Base64",
					description: "Encode a string using Base64"
				},
				unbase64: {
					title: "Base64 decode",
					description: "Decode a Base64 encoded string"
				},
				encodeURIComponent: {
					title: "URI encode",
					description: "Encode a string using URI encoding"
				},
				decodeURIComponent: {
					title: "URI decode",
					description: "Decode a URI encoded string"
				}
			}
		}
	})
}
