/**
 * 傳入分母與分子，獲得百分比數字(含%)
 */
export const toPercent = (molecular: number, denominator: number, withSymbol: boolean = true) => {
	const result = (molecular / denominator * 100).toFixed(2);
	return withSymbol ? `${result}%` : result;
}
