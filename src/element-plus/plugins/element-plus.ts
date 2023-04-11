import { defineNuxtPlugin } from '#app';
import ElementPlus from 'element-plus';
import zhTW from 'element-plus/dist/locale/zh-tw';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(ElementPlus, {
		locale: zhTW
	});
});
