import { random } from 'lodash-es'

const RANDOM_LETTERS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
const RANDOM_LETTERS_LENGTH = RANDOM_LETTERS.length;

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
 * 獲取隨機字串
 */
export const randomStr = (minLength: number = 8, maxLength: number = 8): string => {
	let string = '';

	for (let i = 0; i < randomNumber(minLength, maxLength); i++) {
		string += RANDOM_LETTERS.charAt(Math.floor(Math.random() * RANDOM_LETTERS_LENGTH));
	}

	return string;
}
