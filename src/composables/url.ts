/**
 * 獲取指定的Url Get參數
 */
export const getUrlParam = (name: string) => {
	let params = new URLSearchParams(window.location.search);

	for (let pair of params.entries()) {
		if (pair[0] === name) return pair[1];
	}

	return null;
}
