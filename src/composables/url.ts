/**
 * 設定指定時間後導向指定url
 */
export const assignToUrl = (url: string = '/', timeout: number = 1000) => {
	setTimeout(() => window.location.assign(url), timeout);
}

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
