export const stripToInfo = <T>(obj: any, keysToExclude: string[]): T => {
	if (!obj) return null as any
	const RESULT = {...obj}
	keysToExclude.forEach(key => delete RESULT[key])
	return RESULT as T
}