export const WORDS_EN = {
	// 名词
	noun: {
		// 实体
		entity: [
			"system", "module", "component", "service", "platform", "feature",
			"solution", "model", "framework", "structure", "environment", "process"
		],
		// 抽象
		abstract: [
			"capability", "mechanism", "logic", "strategy", "approach", "principle",
			"pattern", "rule", "condition", "goal", "direction", "result"
		],
		// 数据
		data: [
			"parameter", "configuration", "state", "data", "field",
			"content", "information", "record", "metric"
		],
		// 用户
		user: [
			"user", "developer", "client", "caller",
			"administrator", "participant"
		],
		// 技术
		tech: [
			"interface", "protocol", "instance", "request", "response",
			"method", "object", "resource", "channel"
		],
		// 场景
		scene: [
			"business scenario", "use case", "application scenario",
			"runtime environment"
		]
	},
	// 动词
	verb: {
		// 操作
		operate: [
			"process", "generate", "create", "initialize", "execute",
			"calculate", "parse", "build", "maintain", "manage"
		],
		// 影响
		affect: [
			"affect", "determine", "control", "limit",
			"guide", "adjust", "optimize", "constrain"
		],
		// 连接
		connect: [
			"associate", "depend on", "bind", "map",
			"combine", "split", "integrate", "connect"
		],
		// 状态
		state: [
			"exist", "change", "remain", "update",
			"evolve", "stabilize", "expand", "converge"
		],
		// 表达
		express: [
			"reflect", "represent", "indicate", "describe",
			"define"
		]
	},
	// 形容词
	adj: {
		// 质量
		quality: [
			"stable", "flexible", "efficient", "reliable",
			"configurable", "scalable", "generic"
		],
		// 范围
		scope: [
			"global", "local", "internal", "external",
			"current", "default"
		],
		// 程度
		degree: [
			"to some extent", "relatively high",
			"limited", "continuous", "controllable"
		]
	}
}

export const EN_TEMPLATES = [
	// 技术行为
	() => {
		const ADJ = pick(WORDS_EN.adj.quality)
		const SUBJECT = pick(WORDS_EN.noun.entity)
		const VERB = pick(WORDS_EN.verb.operate)
		const OBJECT = pick(WORDS_EN.noun.data)
		return `The ${ADJ} ${SUBJECT} ${VERB}s the ${OBJECT}`
	},
	// 场景 + 过程
	() => {
		const SCENE = pick(WORDS_EN.noun.scene)
		const PROCESS = pick(WORDS_EN.noun.abstract)
		const SUBJECT = pick(WORDS_EN.noun.entity)
		const VERB = pick(WORDS_EN.verb.operate)
		return Math.random() < 0.2 ? `${SUBJECT} ${VERB}s data based on the ${PROCESS}` : `In the ${SCENE}, the ${SUBJECT} ${VERB}s data based on the ${PROCESS}`
	},
	// 用户视角
	() => {
		const USER = pick(WORDS_EN.noun.user)
		const VERB = pick(WORDS_EN.verb.operate)
		const OBJECT = pick(WORDS_EN.noun.entity)
		return `The ${USER} can ${VERB} the ${OBJECT} through configuration`
	},
	// 模块关系
	() => {
		const SUBJECT = pick(WORDS_EN.noun.entity)
		const VERB = pick(WORDS_EN.verb.connect)
		const OBJECT = pick(WORDS_EN.noun.tech)
		return `The ${SUBJECT} ${VERB}s the ${OBJECT}`
	},
	// 范围 + 状态
	() => {
		const SCOPE = pick(WORDS_EN.adj.scope)
		const SUBJECT = pick(WORDS_EN.noun.data)
		const VERB = pick(WORDS_EN.verb.state)
		return `The ${SCOPE} ${SUBJECT} ${VERB}s`
	},
	// 抽象影响
	() => {
		const ABSTRACT = pick(WORDS_EN.noun.abstract)
		const VERB = pick(WORDS_EN.verb.affect)
		const TARGET = pick(WORDS_EN.noun.entity)
		return `The ${ABSTRACT} ${VERB}s the overall behavior of the ${TARGET}`
	},
	// 描述 / 文档语气
	() => {
		const SUBJECT = pick(WORDS_EN.noun.abstract)
		const VERB = pick(WORDS_EN.verb.express)
		const OBJECT = pick(WORDS_EN.noun.entity)
		return `This ${SUBJECT} ${VERB}s the design goal of the ${OBJECT}`
	},
	// 状态 + 程度
	() => {
		const SUBJECT = pick(WORDS_EN.noun.entity)
		const VERB = pick(WORDS_EN.verb.state)
		const DEGREE = pick(WORDS_EN.adj.degree)
		return `The ${SUBJECT} ${VERB}s ${DEGREE}`
	}
]


const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]