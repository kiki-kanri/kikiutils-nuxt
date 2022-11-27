/**
 * 比對html key event事件觸發的按鍵
 */
export const checkEventKey = (
	event: KeyboardEvent,
	key: string,
	options: {
		alt?: boolean,
		ctrl?: boolean,
		shift?: boolean
	} = {},
	ignoreCase: boolean = false
) => {
	if (event.key === key || (ignoreCase && event.key.toLowerCase() === key.toLowerCase())) {
		if (options.ctrl && !(event.ctrlKey || event.metaKey)) return false;
		if (options.shift && !event.shiftKey) return false;
		if (options.alt && !event.altKey) return false;
		return true;
	}

	return false;
}

/**
 * 判斷檔案是否為指定類型
 */
export const fileIs = (file: string | Blob, type: string) => {
	let fileMime = getFileMime(file);
	return fileMime.type === type.toLowerCase();
}

/**
 * 判斷檔案是否為Gif
 */
export const isGif = (file: string | Blob) => {
	let fileMime = getFileMime(file);
	return fileMime.type === 'image' && fileMime.ext === 'gif';
}

/**
 * 判斷檔案是否為圖片
 */
export const isImage = (file: string | Blob) => {
	return fileIs(file, 'image');
}

/**
 * 判斷檔案是否為影片
 */
export const isVideo = (file: string | Blob) => {
	return fileIs(file, 'video');
}
