import { sha3_224, sha3_256, sha3_384, sha3_512 } from '@noble/hashes/sha3';
import { bytesToHex as toHex } from '@noble/hashes/utils';

export const sha3224 = (text: string) => toHex(sha3_224(text));
export const sha3256 = (text: string) => toHex(sha3_256(text));
export const sha3384 = (text: string) => toHex(sha3_384(text));
export const sha3512 = (text: string) => toHex(sha3_512(text));
