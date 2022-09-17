import _formatDate from 'date-fns/esm/format'
import _formatISODate from 'date-fns/esm/formatISO'
import _getTimestamp from 'date-fns/esm/getTime'
import _isDate from 'date-fns/esm/isDate'

import dateFnsZhTw from 'date-fns/esm/locale/zh-TW'

// Date and time

/**
 * 獲取本地時間
 */
export const nowTime = (timestamp: boolean = false, isoDate: boolean = false): string | number => {
	let date = new Date();
	if (timestamp) return _getTimestamp(date);
	if (isoDate) return _formatISODate(date);
	return _formatDate(date, 'yyyy年MMMMdo kk:mm:ss', { locale: dateFnsZhTw });
}

/**
 * 將時間戳轉為字串表示
 */
export const strTime = (timestamp: number, utc: boolean = true): string => {
	let newDate = new Date();
	if (utc) timestamp -= newDate.getTimezoneOffset() * 60;
	newDate.setTime(timestamp * 1000);
	return _formatDate(newDate, 'yyyy年MMMMdo kk:mm:ss', { locale: dateFnsZhTw });
}

/**
 * 將日期時間字串轉為ISO標準日期字串
 */
export const toISODate = (datetime: string) => {
	return _formatISODate(new Date(datetime));
}
