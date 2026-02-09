/**
 * 处理number类型的参数
 */
export const clampNumber = (value: number, min?: number, max?: number, step?: number): number => {
	let result = value
	if (min !== undefined && result < min) result = min
	if (max !== undefined && result > max) result = max
	if (step !== undefined && step > 0) {
		const OFFSET = result - (min ?? 0)
		const REMAINDER = OFFSET % step
		if (REMAINDER !== 0) result = result - REMAINDER
	}
	return result
}