import mimeDB from 'mime-db/db.json'

const mimes = JSON.parse(JSON.stringify(mimeDB));


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
