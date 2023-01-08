import { random } from 'lodash-es'

/**
 * 獲取隨機數
 *
 * 若未傳入最大值，則範圍為0至傳入的第一個值
 */
export const randomNumber = (min: number, max?: number): number => {
	if (max === undefined) [max, min] = [min, 0];
	return random(min, max);
}

/**
 * 傳入分母與分子，獲得百分比數字(含%)
 */
export const toPercent = (molecular: number, denominator: number, withSymbol: boolean = true) => {
	let result = (molecular / denominator * 100).toFixed(2);
	return withSymbol ? `${result}%` : result;
}
