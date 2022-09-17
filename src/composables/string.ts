/**
 * 獲取隨機字串
 */
export const randomStr = (len: number, number: boolean = false): string => {
	let chars = number ? '0123456789' : 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
	let maxPos = chars.length;
	let code = '';

	for (let i = 0; i < len; i++) {
		code += chars.charAt(Math.floor(Math.random() * maxPos));
	}

	return code;
}
