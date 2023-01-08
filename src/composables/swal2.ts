import { SweetAlertOptions, SweetAlertCustomClass } from 'sweetalert2';

const _swal = require('sweetalert2');

const sweetalertCustomClass: SweetAlertCustomClass = {
	actions: 'mt-3',
	icon: 'mt-0 mx-auto',
	title: 'p-0'
}

const swal = _swal.mixin({
	allowEscapeKey: false,
	allowOutsideClick: false,
	padding: '1rem',
	confirmButtonText: '確認',
	buttonsStyling: false,
	customClass: sweetalertCustomClass
});

// Sweetalert2

/**
 * 彈出載入中的sweetalert2
 */
export const sendingAlertStart = (startText: string = '連線中...', options: SweetAlertOptions = {}) => {
	swal.fire({
		title: startText,
		...options,
		didOpen: () => {
			swal.showLoading(null);
		}
	});
}

/**
 * 彈出成功提示的sweetalert2
 */
export const sendingAlertSuccess = (successText: string, options: SweetAlertOptions = {}) => {
	swal.fire({
		customClass: {
			...sweetalertCustomClass,
			confirmButton: 'el-button el-button--success'
		},
		icon: 'success',
		title: successText,
		...options
	});
}

/**
 * 彈出失敗提示的sweetalert2
 */
export const sendingAlertError = (errorText: string = '連線錯誤！請稍候再試。', options: SweetAlertOptions = {}) => {
	swal.fire({
		customClass: {
			...sweetalertCustomClass,
			confirmButton: 'el-button el-button--danger'
		},
		icon: 'error',
		title: errorText,
		...options
	});
}

/**
 * 關閉sweetalert2視窗
 */
export const sendingAlertClose = swal.close;
