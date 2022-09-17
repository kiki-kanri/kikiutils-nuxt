// Copy

/**
 * 複製文字至剪貼簿
 */
export const copyTextToClipboard = async (text: string) => {
	await navigator.clipboard.writeText(text);
}

// Location

export const goHome = (timeout: number = 1000) => {
	setTimeout(() => window.location.assign('/'), timeout);
}

// Python functions

export const all = (args: Array<any>) => {
	return args.every((x) => x);
}

export const any = (args: Array<any>) => {
	return args.some((x) => x);
}
