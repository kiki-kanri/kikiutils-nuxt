const RANDOM_LETTERS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
const RANDOM_LETTERS_LENGTH = RANDOM_LETTERS.length;

/**
 * 獲取隨機字串
 */
export const randomStr = (minLength: number = 8, maxLength: number = 8): string => {
	let string = '';

	for (let i = 0; i < randomNumber(minLength, maxLength); i++) {
		string += RANDOM_LETTERS[Math.floor(Math.random() * RANDOM_LETTERS_LENGTH)];
	}

	return string;
}
