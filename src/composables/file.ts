import { isString } from 'lodash-es';
import imageMimes from '../types/image.json';

/**
 * 從html事件中獲取檔案
 */
export const getFilesFromEvent = async (event) => {
	if (event.type === 'paste') {
		return event.clipboardData.files;
	} else if (event.type === 'drop') {
		// if (event.dataTransfer.types[0] === 'Files') return await getFilesFromDataTransferItems(event.dataTransfer.items);
	}

	if (event.target) return event.target.files || [];
	return [];
}

export const getFileMimeFromFilename = (filename: string) => {
	const ext = filename.split('.').pop();

	for (const mime in imageMimes) {
		if ((imageMimes[mime].extensions || []).includes(ext)) {
			return mime;
		}
	}

	return '';
}

/**
 * 獲取檔案(依據檔案或檔案名稱)的MIME類別
 */
export const getFileMime = (fileOrName: Blob | File | string) => {
	const mime = isString(fileOrName) ? getFileMimeFromFilename(fileOrName) : fileOrName.type;

	return {
		ext: mime.split('/')[1],
		mime,
		type: mime.split('/')[0]
	}
}
