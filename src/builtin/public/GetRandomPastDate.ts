/**
 * 获取范围内的随机过去日期
 */
export const GetRandomPastDate  = (refDate?: string, scope: number = 3): Date => {
	const BASE = refDate ? new Date(refDate) : new Date()
	const SAFE_BASE = isNaN(BASE.getTime()) ? new Date() : BASE
	const START = new Date(SAFE_BASE)
	START.setMonth(START.getMonth() - scope)
	const END = new Date(SAFE_BASE)
	const RANDOM_TIME = START.getTime() + Math.random() * (END.getTime() - START.getTime())
	return new Date(RANDOM_TIME)
}
