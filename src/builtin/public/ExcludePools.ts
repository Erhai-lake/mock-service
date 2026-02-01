export const ExcludePools = (pool: string, exclude: string): string => {
	if (!exclude) return pool
	const EXCLUDE_SET = new Set(
		exclude
			.split(",")
			.map(ch => ch.trim())
			.filter(Boolean)
			.map(ch => [ch.toLowerCase(), ch.toUpperCase()])
			.flat()
	)
	return pool.split("").filter(ch => !EXCLUDE_SET.has(ch)).join("")
}