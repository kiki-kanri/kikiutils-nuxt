import { ElLoading } from 'element-plus';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(ElLoading);
});
