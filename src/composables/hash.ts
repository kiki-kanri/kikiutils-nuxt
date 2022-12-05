import { SHA3 } from 'sha3';

function hash(size: 224 | 256 | 384 | 512, text: string) {
	let sha3Hash = new SHA3(size);
	sha3Hash.update(text);
	return sha3Hash.digest('hex');
}

export const sha3224 = (text: string) => hash(224, text);
export const sha3256 = (text: string) => hash(256, text);
export const sha3384 = (text: string) => hash(384, text);
export const sha3512 = (text: string) => hash(512, text);
