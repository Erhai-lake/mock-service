import {MAX, NIL, v1, v3, v4, v5, v7} from "uuid"

export const UUID_NAMESPACE = {
	DNS: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
	URL: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
	OID: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
	X500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8"
} as const

type namespaceType = keyof typeof UUID_NAMESPACE | "CUSTOM"

const resolveNamespace = (type: namespaceType, custom?: string): string => {
	if (type === "CUSTOM") {
		if (!custom) throw new Error("CUSTOM namespace requires a valid UUID")
		return custom
	}
	const NAMESPACE = UUID_NAMESPACE[type]
	if (!NAMESPACE) throw new Error(`Unsupported namespace type: ${type}`)
	return NAMESPACE
}

interface params {
	version: "NIL" | "MAX" | "v1" | "v3" | "v4" | "v5" | "v7"
	namespaceType: namespaceType
	namespace: string
	name: string
}

const PARAMS: params = {
	version: "v4",
	namespaceType: "URL",
	namespace: "",
	name: ""
}

export const registerUUID = (CATEGORY: any): void => {
	CATEGORY.generators.registerGenerator({
		id: "uuid",
		title: "generator.string.uuid.title",
		description: "generator.string.uuid.description",
		params: [
			{
				id: "version",
				title: "generator.string.uuid.params.version.title",
				description: "generator.string.uuid.params.version.description",
				type: "select",
				options: [
					{key: "NIL", label: "NIL"},
					{key: "MAX", label: "MAX"},
					{key: "v1", label: "v1"},
					{key: "v3", label: "v3"},
					{key: "v4", label: "v4"},
					{key: "v5", label: "v5"},
					{key: "v7", label: "v7"}
				],
				default: PARAMS.version
			},
			{
				id: "namespaceType",
				title: "generator.string.uuid.params.namespaceType.title",
				description: "generator.string.uuid.params.namespaceType.description",
				type: "select",
				options: [
					{key: "URL", label: "URL"},
					{key: "DNS", label: "DNS"},
					{key: "OID", label: "OID"},
					{key: "X500", label: "X500"},
					{key: "CUSTOM", label: "CUSTOM"}
				],
				default: PARAMS.namespaceType
			},
			{
				id: "namespace",
				title: "generator.string.uuid.params.namespace.title",
				description: "generator.string.uuid.params.namespace.description",
				type: "string",
				default: PARAMS.namespace
			},
			{
				id: "name",
				title: "generator.string.uuid.params.name.title",
				description: "generator.string.uuid.params.name.description",
				type: "string",
				default: PARAMS.name
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<params> = {}): string {
			const {version, namespaceType, namespace, name} = {...PARAMS, ...params}
			switch (version) {
				case "NIL":
					return NIL
				case "MAX":
					return MAX
				case "v1":
					return v1()
				case "v3":
					if (!name) throw new Error(`UUID${version} requires a non-empty name`)
					return v3(name, resolveNamespace(<namespaceType>namespaceType, namespace))
				case "v4":
					return v4()
				case "v5":
					if (!name) throw new Error(`UUID${version} requires a non-empty name`)
					return v5(name, resolveNamespace(<namespaceType>namespaceType, namespace))
				case "v7":
					return v7()
				default:
					return v4()
			}
		}
	})
}
