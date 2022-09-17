import { isString } from 'lodash-es'

/**
 * 判斷檔案是否為指定類型
 */
export const fileIs = (file: string | Blob, type: string) => {
	let fileMime = getFileMime(file);
	return fileMime.type === type.toLowerCase();
}

/**
 * 從html事件中獲取檔案
 */
// export const getFilesFromEvent = async (event) => {
// 	if (event.type === 'paste') {
// 		return event.clipboardData.files;
// 	} else if (event.type === 'drop') {
// 		if (event.dataTransfer.types[0] === 'Files') return await getFilesFromDataTransferItems(event.dataTransfer.items);
// 	}

// 	if (event.target) return event.target.files || [];
// 	return [];
// }

/**
 * 獲取檔案(依據檔案或檔案名稱)的MIME類別
 */
export const getFileMime = (file) => {
	let mime: string;

	if (!isString(file)) {
		mime = file.type === '' ? lookupMime(file.name) : file.type;
	} else {
		mime = lookupMime(file);
	}

	return {
		ext: mime.split('/')[1],
		mime,
		type: mime.split('/')[0]
	}
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
