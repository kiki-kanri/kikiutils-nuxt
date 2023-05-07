import _formatDate from 'date-fns/esm/format';
import _formatISODate from 'date-fns/esm/formatISO';
import _getTimestamp from 'date-fns/esm/getTime';
import _isDate from 'date-fns/esm/isDate';
import dateFnsZhTw from 'date-fns/esm/locale/zh-TW';
import omit from 'lodash-es/omit';

interface StrTimeOptions {
	format?: string;
	locale?: Locale;
	utc?: boolean;
}

const defaultStrTimeOptions = <StrTimeOptions>{
	format: 'yyyy年MMMMdo kk:mm:ss',
	locale: dateFnsZhTw,
	utc: false
};

/**
 * Local timestamp to utc (second).
 */
export const localTimestampToUTC = (timestamp: number) => timestamp + timeZoneOffset;

/**
 * Local timestamp to utc (millisecond).
 */
export const localTimestampToUTCMs = (timestampMs: number) => timestampMs + timeZoneOffsetMs;

/**
 * Get now utc timestamp (second).
 */
export const nowTimestampUTC = () => Math.floor(nowTimestampUTCMs() / 1000);

/**
 * Get now utc timestamp (millisecond).
 */
export const nowTimestampUTCMs = () => localTimestampToUTCMs(new Date().getTime());

/**
 * Change timestamp to string format (second).
 */
export const strTime = (timestamp: number, options: StrTimeOptions = defaultStrTimeOptions) => {
	if (!options.format) options.format = defaultStrTimeOptions.format as string;
	if (options.utc) timestamp = utcTimestampToLocal(timestamp);
	const locale = options.locale || defaultStrTimeOptions.locale as Locale;
	return _formatDate(timestamp * 1000, options.format, { locale });
}

/**
 * Change utc second timestamp to local string format.
 */
export const strUTCTime = (timestamp: number, options: Omit<StrTimeOptions, 'utc'> = omit(defaultStrTimeOptions, ['utc'])) => strTime(timestamp, { utc: true, ...options });

/**
 * Base timezone offset (second).
 */
export const timeZoneOffset = new Date().getTimezoneOffset() * 60;

/**
 * Base timezone offset (millisecond).
 */
export const timeZoneOffsetMs = timeZoneOffset * 1000;

/**
 * UTC timestamp to local (second).
 */
export const utcTimestampToLocal = (timestamp: number) => timestamp - timeZoneOffset;

/**
 * UTC timestamp to local (millisecond).
 */
export const utcTimestampToLocalMs = (timestampMs: number) => timestampMs - timeZoneOffsetMs;
