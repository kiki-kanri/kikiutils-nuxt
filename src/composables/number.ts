import { random } from 'lodash-es'

/**
 * 獲取隨機數
 *
 * 若未傳入最大值，則範圍為0至傳入的第一個值
 */
export const randomNumber = (min: number, max: number | undefined = undefined): number => {
	if (max === null) {
		max = min;
		min = 0;
	}

	return random(min, max);
}
