import {WordsPick} from "../../public/WordsPick"

export const WORDS_ZH = {
	// 名词
	noun: {
		// 实体
		entity: [
			"系统", "模块", "组件", "服务", "平台", "功能",
			"方案", "模型", "框架", "结构", "环境", "流程"
		],
		// 抽象
		abstract: [
			"能力", "机制", "逻辑", "策略", "方式", "原则",
			"模式", "规则", "条件", "目标", "方向", "结果"
		],
		// 数据
		data: [
			"参数", "配置", "状态", "数据", "字段",
			"内容", "信息", "结果", "记录", "指标"
		],
		// 用户
		user: [
			"用户", "开发者", "客户端", "调用方",
			"管理者", "参与者", "使用者"
		],
		// 技术
		tech: [
			"接口", "协议", "实例", "请求", "响应",
			"方法", "对象", "资源", "通道"
		],
		// 场景
		scene: [
			"业务场景", "使用场景", "应用场景",
			"运行环境", "实际情况"
		]
	},
	// 动词
	verb: {
		// 操作
		operate: [
			"处理", "生成", "创建", "初始化", "执行",
			"计算", "解析", "构建", "维护", "管理"
		],
		// 影响
		affect: [
			"影响", "决定", "控制", "限制",
			"引导", "调整", "优化", "约束"
		],
		// 连接
		connect: [
			"关联", "依赖", "绑定", "映射",
			"组合", "拆分", "集成", "对接"
		],
		// 状态
		state: [
			"存在", "变化", "保持", "更新",
			"演化", "稳定", "扩展", "收敛"
		],
		// 表达式
		express: [
			"体现", "反映", "表示", "说明",
			"描述", "定义"
		]
	},
	// 形容词
	adj: {
		// 质量
		quality: [
			"稳定的", "灵活的", "高效的", "可靠的",
			"可配置的", "可扩展的", "通用的"
		],
		// 范围
		scope: [
			"全局的", "局部的", "内部的", "外部的",
			"当前的", "默认的"
		],
		// 程度
		degree: [
			"一定程度的", "相对较高的",
			"有限的", "持续的", "可控的"
		]
	}
}

export const ZH_TEMPLATES = [
	// 技术行为
	() => {
		const ADJ = WordsPick(WORDS_ZH.adj.quality)
		const SUBJECT = WordsPick(WORDS_ZH.noun.entity)
		const VERB = WordsPick(WORDS_ZH.verb.operate)
		const OBJECT = WordsPick(WORDS_ZH.noun.data)
		return `${ADJ}${SUBJECT}${VERB}${OBJECT}`
	},
	// 场景 + 流程
	() => {
		const SCENE = WordsPick(WORDS_ZH.noun.scene)
		const PROCESS = WordsPick(WORDS_ZH.noun.abstract)
		const SUBJECT = WordsPick(WORDS_ZH.noun.entity)
		const VERB = WordsPick(WORDS_ZH.verb.operate)
		return Math.random() < 0.2 ? `${SUBJECT}根据${PROCESS}${VERB}相关数据` : `在${SCENE}中，${SUBJECT}根据${PROCESS}${VERB}相关数据`
	},
	// 用户视角
	() => {
		const USER = WordsPick(WORDS_ZH.noun.user)
		const VERB = WordsPick(WORDS_ZH.verb.operate)
		const OBJECT = WordsPick(WORDS_ZH.noun.entity)
		return `${USER}可以通过配置${VERB}${OBJECT}`
	},
	// 模块关系
	() => {
		const SUBJECT = WordsPick(WORDS_ZH.noun.entity)
		const VERB = WordsPick(WORDS_ZH.verb.connect)
		const OBJECT = WordsPick(WORDS_ZH.noun.tech)
		return `${SUBJECT}${VERB}${OBJECT}`
	},
	// 状态 + 范围
	() => {
		const SCOPE = WordsPick(WORDS_ZH.adj.scope)
		const SUBJECT = WordsPick(WORDS_ZH.noun.data)
		const VERB = WordsPick(WORDS_ZH.verb.state)
		return `${SCOPE}${SUBJECT}${VERB}`
	},
	// 抽象影响
	() => {
		const ABSTRACT = WordsPick(WORDS_ZH.noun.abstract)
		const VERB = WordsPick(WORDS_ZH.verb.affect)
		const TARGET = WordsPick(WORDS_ZH.noun.entity)
		return `${ABSTRACT}${VERB}${TARGET}的整体行为`
	},
	// 描述 / 文档语气
	() => {
		const SUBJECT = WordsPick(WORDS_ZH.noun.abstract)
		const VERB = WordsPick(WORDS_ZH.verb.express)
		const OBJECT = WordsPick(WORDS_ZH.noun.entity)
		return `该${SUBJECT}${VERB}${OBJECT}的设计目标`
	},
	// 状态程度
	() => {
		const SUBJECT = WordsPick(WORDS_ZH.noun.entity)
		const VERB = WordsPick(WORDS_ZH.verb.state)
		const DEGREE = WordsPick(WORDS_ZH.adj.degree)
		return `${SUBJECT}处于${DEGREE}${VERB}状态`
	}
]
