import { randomStr } from './string'

/**
 * 將文字內的特殊字元替換成html替換符號
 */
export const replaceText = (text: string) => {
	return text.replace(/&/gi, '&amp;')
		.replace(/ /gi, '&nbsp;')
		.replace(/　/gi, '&emsp;')
		.replace(/​/gi, '&#8203;')
		.replace(/</gi, '&lt;')
		.replace(/>/gi, '&gt;')
		.replace(/'/gi, '&apos;')
		.replace(/"/gi, '&quot;')
		.replace(/\n/gi, '<br>');
}

/**
 * 將文字內的html替換符號替換回特殊特殊字元
 */
export const unreplaceText = (text: string) => {
	return text.replace(/<br>/gi, '\n')
		.replace(/&quot;/gi, '\"')
		.replace(/&apos;/gi, '\'')
		.replace(/&gt;/gi, '>')
		.replace(/&lt;/gi, '<')
		.replace(/&#8203;/gi, '​')
		.replace(/&ZeroWidthSpace;/gi, '​')
		.replace(/&emsp;/gi, '　')
		.replace(/&nbsp;/gi, ' ')
		.replace(/&amp;/gi, '&');
}

/**
 * 將文字內的連接轉為html href
 */
export const changeTextToLink = (text: string) => {
	let regex = /(https?:\/\/|www\.)+[^\s]+/g;
	let urls = text.match(regex) || [];
	let splitStr = `{[${randomStr(8)}]}`;
	let replacedUrlsText = text.replace(regex, splitStr);
	replacedUrlsText = replaceText(replacedUrlsText);
	let texts = replacedUrlsText.split(splitStr);
	let html = '';

	for (let i = 0; i < texts.length; i++) {
		html += texts[i];
		if (urls[i]) html += `<a href="${encodeURI(urls[i])}" target="_blank" rel="nofollow noopener">${replaceText(urls[i])}</a>`;
	}

	return html;
}
