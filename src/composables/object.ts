// Object

interface Dict<T> {
	[key: string]: T;
}

/**
 * 將base64轉為blob
 */
export const base64ToBlob = (data: string) => {
	const mimePattern = /data:(image\/.+);base64,/;
	let mime = '';
	const raw = data.replace(mimePattern, (header, mimeString: string) => {
		mime = mimeString;
		return '';
	});

	const base64 = Buffer.from(raw, 'base64');
	const bytes = base64.toString('base64');
	const bytesLength = bytes.length;
	const uInt8Array = new Uint8Array(bytesLength);
	for (let i = 0; i < bytesLength; i++) uInt8Array[i] = bytes.charCodeAt(i);
	return new Blob([uInt8Array], { type: mime });
}

/**
 * 建立檔案的blob url
 */
export const createObjectUrl = (file: Blob) => {
	try {
		if (window.URL !== undefined) {
			return window.URL.createObjectURL(file);
		} else if (window.webkitURL !== undefined) {
			return window.webkitURL.createObjectURL(file);
		}
	} catch (error) { }
}

/**
 * 建立檔案的blob url(從html物件上)
 */
export const createObjectUrlFromInput = (inputElement: HTMLInputElement) => {
	const file = inputElement.files![0];
	const url = createObjectUrl(file);
	inputElement.value = '';
	return url;
}

/**
 * 將object內所有值更改為指定值
 */
export const flatDict = (dict: Dict<any>, value: any) => {
	for (const key in dict) dict[key] = value;
}

/**
 * 移除該物件blob url，使其失效
 */
export const revokeObjectUrl = (url: string) => {
	if (window.URL !== undefined) {
		window.URL.revokeObjectURL(url)
	} else if (window.webkitURL !== undefined) {
		window.webkitURL.revokeObjectURL(url);
	}
}
