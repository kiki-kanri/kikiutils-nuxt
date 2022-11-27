// Object

/**
 * 將base64轉為blob
 */
export const base64ToBlob = (data: string) => {
	let rImageType = /data:(image\/.+);base64,/;
	let mimeString = '';

	let raw = data.replace(rImageType, (header, imageType) => {
		mimeString = imageType;
		return '';
	});

	let base64 = Buffer.from(raw, 'base64');
	let bytes = base64.toString('base64');
	let bytesLength = bytes.length;
	let uInt8Array = new Uint8Array(bytesLength);

	for (let i = 0; i < bytesLength; i += 1) {
		uInt8Array[i] = bytes.charCodeAt(i);
	}

	return new Blob([uInt8Array], { type: mimeString });
}

/**
 * 建立檔案的blob url
 */
export const createObjectUrl = (file: Blob): string | null => {
	try {
		if (window.URL !== undefined) {
			return window.URL.createObjectURL(file);
		} else if (window.webkitURL !== undefined) {
			return window.webkitURL.createObjectURL(file);
		}
	} catch (error) { }

	return null;
}

/**
 * 建立檔案的blob url(從html物件上)
 */
export const createObjectUrlFromTarget = (target): string | null => {
	let file = target.files[0];
	let burl = createObjectUrl(file);
	target.value = '';
	return burl;
}

/**
 * 複製object物件
 */
export const deepCopy = (object: object) => {
	return JSON.parse(JSON.stringify(object));
}

/**
 * 將object內所有值更改為指定值
 */
export const flatDict = (dict: object, value: any) => {
	for (let key in dict) dict[key] = value;
}

/**
 * 移除該物件blob url，使其失效
 */
export const revokeObjectUrl = (url: string) => {
	if (window.URL != undefined) {
		window.URL.revokeObjectURL(url)
	} else if (window.webkitURL != undefined) {
		window.webkitURL.revokeObjectURL(url);
	}
}
