import liteMimes from '../mimes/lite.json'


export const getMimeFromFileName = (filename: string) => {
	let ext = filename.split('.').pop();

	for (let mime of liteMimes) {
		if (liteMimes[mime].extensions) {
			if (liteMimes[mime].extensions.includes(ext)) {
				return mime;
			}
		}
	}

	return '';
}
