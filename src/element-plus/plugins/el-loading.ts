import { defineNuxtPlugin } from '#app';
import { ElLoading } from 'element-plus';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(ElLoading);
});
