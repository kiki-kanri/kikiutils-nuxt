'use strict'

import FileType from 'file-type/browser'
import { getFilesFromDataTransferItems } from 'datatransfer-files-promise'
import JsFileDownloader from 'js-file-downloader'
import moment from 'moment'
import _ from 'underscore'

moment.locale('zh-TW');



/**
 * 常用或公用Function \
 * Array: 陣列處理 \
 * Cookie: Cookie處理
 * Copy: 複製陣列或物件 \
 * Date and time: 日期與時間處理 \
 * Get: 獲取資料或是檔案內容等 \
 * Math: 數學計算 \
 * Object and Object url: 物件處理與Url轉換等 \
 * Other: 其餘工具
 * Random string and int: 隨機數字、字串等 \
 * Text: 字串與文字處理
 */
export class Utils {
	constructor(context) {
		this.$axios = context.$axios;
		this._ = _;
		if(!this.isServer()) window._ = _;
	}

	

	/* Array */

	/**
	 * 獲取該數字陣列的平均值
	 * @param {Array} array 純數字陣列
	 * @param {Number} fixed 取小數點位數，預設小數點後兩位
	 * @returns {Number} 平均值
	 */
	avgArray(array, fixed = 2) {
		let avg = this.sumArray(array) / array.length;
		return fixed ? parseFloat(avg.toFixed(fixed)) : avg;
	}

	/**
	 * 清空陣列
	 * @param {Array} array 任意陣列
	 */
	clearArray(array) {
		array.splice(0, array.length);
	}

	/**
	 * 隨機打亂陣列內容
	 * @param {Array} array 任意陣列
	 */
	shuffleArray(array) {
		return this._.shuffle(array);
	}

	/**
	 * 獲取該數字陣列的加總
	 * @param {Array} array 純數字陣列
	 * @returns {Number} 加總
	 */
	sumArray(array) {
		return array.reduce((a, b) => a + b);
	}

	/* Cookie */

	/**
	 * 將字串Cookie轉為dict
	 * @param {String} cookie 字串Cookie
	 * @returns {object} Cookie dict物件
	 */
	decodeCookie(cookie) {
		cookie = cookie.split(';');
		let result = {};

		for(let c of cookie) {
			if(c.includes('=')) {
				let sc = c.split('=');
				result[sc[0]] = sc[1];
			}
		}

		return result;
	}

	/**
	 * 將Dict Cookie轉為字串
	 * @param {object} cookie Dict Cookie
	 * @returns {String} 字串Cookie
	 */
	encodeCookie(cookie) {
		let result = '';

		for(let key in cookie) {
			result += `${key}=${cookie[key]};`
		}

		return result;
	}

	/* Copy */

	/**
	 * 複製文字至剪貼簿
	 * @param {String} text 要複製的文字
	 */
	async copyTextToClipboard(text) {
		await navigator.clipboard.writeText(text);
	}

	/* Date and  time */

	/**
	 * 計算輸入時間與當前本地時間相差多久
	 * @param {Number} timestamp 時間戳(不含毫秒)
	 * @returns {String} 計算完成的時間
	 */
	getDateToNow(timestamp) {
		let date = moment(new Date(timestamp * 1000));
		return date.fromNow();
	}

	/**
	 * 判斷輸入日期是否合法
	 * @param {String} date 字串日期
	 * @returns 是否合法
	 */
	isDate(date) {
		if(date == '') return false;
		date = date.replace(/-/g, '/');
		let d = new Date(date);
		if(isNaN(d)) return false;
		let arr = date.split('/');
		return (parseInt(arr[0], 10) == d.getFullYear()) && (parseInt(arr[1], 10) == (d.getMonth() + 1)) && (parseInt(arr[2], 10) == d.getDate());
	}

	/**
	 * 獲取本地時間
	 * @param {Boolean} timestamp 是否返回時間戳(不含毫秒)
	 * @param {Boolean} isoDate 是否僅返回ISO格式日期
	 * @returns {String | Number} 字串時間或是時間戳
	 */
	nowTime(timestamp = false, isoDate = false) {
		let date = moment();
		if(timestamp) return date.unix();
		return date.format(isoDate ? 'YYYY[-]MM[-]DD' : 'YYYY[年]MMMMDo dddd k:m:s');
	}

	/**
	 * 將時間戳轉為字串表示
	 * @param {Number} timestamp 時間戳(不含毫秒)
	 * @param {Boolean} utc 時間戳時間是否為UTC時間
	 * @returns {String} 轉換完成的時間
	 */
	strTime(timestamp, utc = true) {
		let newDate = new Date();
		if(utc) timestamp -= newDate.getTimezoneOffset() * 60;
		newDate.setTime(timestamp * 1000);
		return moment(newDate).format('YYYY[年]MMMMDo dddd k:m:s');
	}

	/**
	 * 將日期時間字串轉為ISO標準日期字串
	 * @param {String} date 日期時間字串
	 * @returns ISO標準日期字串
	 */
	toISODate(datetime) {
		return moment(new Date(datetime)).format('YYYY[-]MM[-]DD');
	}

	/* Get */

	/**
	 * 直接下載檔案
	 * @param {String} url 檔案網址，可以是一般網址或是blob url
	 * @param {String} saveName 儲存的檔案名稱
	 */
	downloadFile(url, saveName) {
		new JsFileDownloader({ 
			url: url,
			filename: saveName
		});
	}

	/**
	 * 獲取指定的Url Get參數
	 * @param {String} name Get 參數名稱
	 * @returns {String | null} 獲取到的值，若無則返回null
	 */
	getUrlParam(name) {
		let params = new URLSearchParams(window.location.search);

		for(let pair of params.entries()) {
			if(pair[0] == name) return pair[1];
		}

		return null;
	}

	/**
	 * 獲取檔案(依據檔案或檔案名稱)的MIME類別
	 * @param {String | Blob} file 檔案或檔案名稱
	 * @returns {object} 檔案MIME類別
	 */
	async getFileMime(file) {
		let ext, mime;

		if(typeof(file) == this.TYPE_STR) {
			ext = file.split('.').pop();
			mime = 'other';

			if(ext.match(/webp|gif/)) mime = `image/${ext}`;
			if(ext.match(/mp4|flv|webm|ogg/)) mime = `video/${ext}`;
		} else {
			let fileType = await FileType.fromBlob(file.slice(0, 32));
			ext = fileType ? fileType.ext : '';
			mime = fileType ? fileType.mime : '';
		}

		return {
			ext,
			mime,
			type : mime.split('/')[0]
		};
	}

	/* Math */

	/**
	 * 計算百分比
	 * @param {Number} value 分子
	 * @param {Number} base 分母
	 * @param {Number} fixed 取小數點位數
	 * @param {Boolean} toString 是否返回帶"%"字串
	 * @returns {String | Number} 字串百分比或浮點數
	 */
	getPercent(value, base, fixed = 1, toString = false) {
		let percent = parseFloat((value / base * 100).toFixed(fixed));
		return toString ? `${percent}%` : percent;
	}

	/* Object and object url */

	/**
	 * 將base64轉為blob
	 * @param {String} data base64資料
	 * @returns Blob檔案
	 */
	base64ToBlob(data) {
		let rImageType = /data:(image\/.+);base64,/;
		let mimeString = '';
		let raw, uInt8Array;

		raw = data.replace(rImageType, (header, imageType) => {
			mimeString = imageType;
			return '';
		});

		raw = atob(raw);
		let rawLength = raw.length;
		uInt8Array = new Uint8Array(rawLength);

		for(let i = 0 ; i < rawLength ; i += 1) {
			uInt8Array[i] = raw.charCodeAt(i);
		}

		return new Blob([uInt8Array], { type: mimeString });
	}

	/**
	 * 建立檔案的blob url
	 * @param {Blob} file 檔案
	 * @returns {String | null} 成功則返回url，否則返回null
	 */
	createObjectUrl(file) {
		try {
			if(window.createObjcectURL != undefined) {
				return window.createOjcectURL(file);
			} else if(window.URL != undefined) {
				return window.URL.createObjectURL(file);
			} else if(window.webkitURL != undefined) {
				return window.webkitURL.createObjectURL(file);
			}
		} catch(error) {}

		return null;
	}

	/**
	 * 建立檔案的blob url(從html物件上)
	 * @param {object} target html 物件
	 * @returns {String | null} 成功則返回url
	 */
	createObjectUrlFromTarget(target) {
		let file = target.files[0];
		let burl = this.createObjectUrl(file);
		target.value = '';
		return burl;
	}

	/**
	 * 複製object物件
	 * @param {object} object 陣列或字典物件(內部元素需純文字或數字)
	 * @returns {object} 複製出的物件
	 */
	deepCopy(object) {
		return JSON.parse(JSON.stringify(object));
	}

	/**
	 * 計算object物件內元素數量
	 * @param {object} object 陣列或字典物件
	 * @returns {Number} 元素數量
	 */
	len(object) {
		let count = 0;
		for(let key in object) count += 1;
		return count;
	}

	/**
	 * 判斷檔案是否為指定類型
	 * @param {Blob | String} file 檔案或檔案名稱
	 * @param {String} type 類型，比如image,video
	 * @returns {Boolean} 是或否
	 */
	async fileIs(file, type) {
		let fileMime = await this.getFileMime(file);
		return fileMime.type == type.toLowerCase();
	}

	/**
	 * 判斷檔案是否為Gif
	 * @param {Blob | String} file 檔案或檔案名稱
	 * @returns {Boolean} 是或否
	 */
	async isGif(file) {
		let fileMime = await this.getFileMime(file);
		return fileMime.type == 'image' && fileMime.ext == 'gif';
	}

	/**
	 * 判斷檔案是否為圖片
	 * @param {Blob | String} file 檔案或檔案名稱
	 * @returns {Boolean} 是或否
	 */
	async isImage(file) {
		return await this.fileIs(file, 'image');
	}

	/**
	 * 判斷檔案是否為影片
	 * @param {Blob | String} file 檔案或檔案名稱
	 * @returns {Boolean} 是或否
	 */
	async isVideo(file) {
		return await this.fileIs(file, 'video');
	}

	/**
	 * 將object內所有值更改為指定值
	 * @param {object} dict 字典物件
	 * @param {*} value 指定更改的值
	 */
	flatDict(dict, value) {
		for(let key in dict) dict[key] = value;
	}

	/**
	 * 使用Url獲取檔案
	 * @param {String} url 網址
	 * @param {'GET' | 'POST'} method 請求類型
	 * @param {object} data 請求資料
	 * @returns {false | Blob} 成功獲取則返回該檔案Blob物件
	 */
	async getFileFromUrl(url, method = 'GET', data = {}) {
		try {
			let response = await this.$axios({
				url : url,
				method : method,
				responseType : 'blob',
				data: data
			});

			if(response.data) {
				let file = new Blob([response.data], { type : response.headers['content-type'] });
				return file;
			}
		} catch(error) {}

		return false;
	}

	/**
	 * 從html事件中獲取檔案
	 * @param {*} event html js 事件
	 * @returns {Array} 檔案陣列
	 */
	async getFilesFromEvent(event) {
		if(event.type == 'paste') {
			return event.clipboardData.files;
		} else if(event.type == 'drop') {
			if(event.dataTransfer.types[0] == 'Files') return await getFilesFromDataTransferItems(event.dataTransfer.items);
		}

		if(event.target) return event.target.files || [];
		return [];
	}

	/**
	 * 移除該物件blob url，使其失效
	 * @param {String} url blob網址
	 */
	revokeObjectUrl(url) {
		if(window.revokeObjectURL != undefined) {
			window.revokeObjectURL(url)
		} else if(window.URL != undefined) {
			window.URL.revokeObjectURL(url)
		} else if(window.webkitURL != undefined) {
			window.webkitURL.revokeObjectURL(url);
		}
	}

	/* Random string and int */

	/**
	 * 獲取隨機數
	 * @param {Number} min 最小值
	 * @param {Number | undefined} max 最大值(若無輸入則範圍為0到最小值)
	 * @returns {Number} 在指定範圍內的隨機數
	 */
	randomInt(min, max = undefined) {
		return this._.random(min, max);
	}

	/**
	 * 獲取隨機字串
	 * @param {Number} len 字串長度
	 * @param {Boolean} number 是否由純數字組成
	 * @returns {String} 隨機字串
	 */
	randomStr(len, number) {
		let chars = number ? '0123456789' : 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
		let maxPos = chars.length;
		let code = '';

		for(let i = 0 ; i < len ; i++) {
			code += chars.charAt(Math.floor(Math.random() * maxPos));
		}

		return code;
	}

	/* text */

	/**
	 * 將文字內的特殊字元替換成html替換符號
	 * @param {String} text 文字
	 * @returns {String} 轉換完成的文字
	 */
	replaceText(text) {
		return text.replace(/&/gi , '&amp;')
					.replace(/ /gi , '&nbsp;')
					.replace(/　/gi , '&emsp;')
					.replace(/​/gi, '&#8203;')
					.replace(/</gi , '&lt;')
					.replace(/>/gi , '&gt;')
					.replace(/'/gi , '&apos;')
					.replace(/"/gi , '&quot;')
					.replace(/\n/gi, '<br>');
	}

	/**
	 * 將文字內的html替換符號替換回特殊特殊字元
	 * @param {String} text 文字
	 * @returns {String} 轉換完成的文字
	 */
	unreplaceText(text) {
		return text.replace(/<br>/gi , '\n')
					.replace(/&quot;/gi , '\"')
					.replace(/&apos;/gi , '\'')
					.replace(/&gt;/gi , '>')
					.replace(/&lt;/gi , '<')
					.replace(/&#8203;/gi , '​')
					.replace(/&ZeroWidthSpace;/gi , '​')
					.replace(/&emsp;/gi , '　')
					.replace(/&nbsp;/gi , ' ')
					.replace(/&amp;/gi, '&');
	}

	/**
	 * 將文字內的連接轉為html href
	 * @param {String} text 文字
	 * @returns {String} 轉換完成的文字
	 */
	changeTextToLink(text) {
		let regex = /(https?:\/\/|www\.)+[^\s]+/g;
		let urls = text.match(regex) || [];
		let splitStr = `{[${this.randomStr(8)}]}`;
		let replacedUrlsText = text.replace(regex, splitStr);
		replacedUrlsText = this.replaceText(replacedUrlsText);
		let texts = replacedUrlsText.split(splitStr);
		let html = '';

		for(let i = 0 ; i < texts.length ; i++) {
			html += texts[i];
			if(urls[i]) html += `<a href="${encodeURI(urls[i])}" target="_blank" rel="nofollow noopener">${this.replaceText(urls[i])}</a>`;
		}

		return html;
	}
}



export default function(context, inject) {
	inject('utils', new Utils(context));
};
