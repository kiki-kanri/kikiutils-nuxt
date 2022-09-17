import mimes from 'mime-db/db.json'


export const getMimeFromFileName = (filename: string) => {
	let ext = filename.split('.').pop();

	for (let mime of mimes) {
		if (mimes[mime].extensions) {
			if (mimes[mime].extensions.includes(ext)) {
				return mime;
			}
		}
	}

	return '';
}
