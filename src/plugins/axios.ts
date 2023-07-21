import { defineNuxtPlugin } from '#app';

import { axiosInstance } from '../composables/axios';
import { errorMessage } from '../element-plus/composables/message';

export default defineNuxtPlugin((nuxtApp) => {
	axiosInstance.interceptors.response.use((response) => response, ({ response }) => {
		if (response.status === 401) return window.location.assign('/login');
		if (response.status === 409) errorMessage('欄位值重複或是該資料使用中！');
		if (response.status !== 422) errorMessage(`無法完成此操作！`);
		response.oldData = response.data;
		response.data = 'error';
		return response;
	});
});
