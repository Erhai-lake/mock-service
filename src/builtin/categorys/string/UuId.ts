import {MAX, NIL, v1, v3, v4, v5, v7} from "uuid"

export const UUID_NAMESPACE = {
	DNS: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
	URL: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
	OID: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
	X500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8"
} as const

type NamespaceType = keyof typeof UUID_NAMESPACE | "CUSTOM"

const resolveNamespace = (type: NamespaceType, custom?: string): string => {
	if (type === "CUSTOM") {
		if (!custom) throw new Error("CUSTOM namespace requires a valid UUID")
		return custom
	}
	const NAMESPACE = UUID_NAMESPACE[type]
	if (!NAMESPACE) throw new Error(`Unsupported namespace type: ${type}`)
	return NAMESPACE
}

interface Params {
	version: "NIL" | "MAX" | "v1" | "v3" | "v4" | "v5" | "v7"
	namespaceType: NamespaceType
	namespace: string
	name: string
}

const PARAMS: Params = {
	version: "v4",
	namespaceType: "URL",
	namespace: "",
	name: ""
}

export default function registerUUID(CATEGORY: any): void {
	CATEGORY.methods.registerMethod({
		id: "uuid",
		title: "category.string.uuid.title",
		description: "category.string.uuid.description",
		params: [
			{
				id: "version",
				title: "category.string.uuid.params.version.title",
				description: "category.string.uuid.params.version.description",
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
				title: "category.string.uuid.params.namespaceType.title",
				description: "category.string.uuid.params.namespaceType.description",
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
				title: "category.string.uuid.params.namespace.title",
				description: "category.string.uuid.params.namespace.description",
				type: "string",
				default: PARAMS.namespace
			},
			{
				id: "name",
				title: "category.string.uuid.params.name.title",
				description: "category.string.uuid.params.name.description",
				type: "string",
				default: PARAMS.name
			}
		],
		processors: ["string", "encodingDecoding"],
		generate(params: Partial<Params> = {}): string {
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
					return v3(name, resolveNamespace(<NamespaceType>namespaceType, namespace))
				case "v4":
					return v4()
				case "v5":
					if (!name) throw new Error(`UUID${version} requires a non-empty name`)
					return v5(name, resolveNamespace(<NamespaceType>namespaceType, namespace))
				case "v7":
					return v7()
				default:
					return v4()
			}
		}
	})
}
