/**
 * 获取当前时间的 UTC 时间戳
 */
export const GetUtcNow = (): number => {
	const NOW = new Date()
	return NOW.getTime() + NOW.getTimezoneOffset() * 60_000
}