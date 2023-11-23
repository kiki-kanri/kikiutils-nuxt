import { defineNuxtModule } from '@nuxt/kit';

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
	defaults: {},
	meta: {
		configKey: 'kikiutilsNuxt',
		name: '@kikiutils/nuxt'
	},
	setup(options, nuxt) {}
});
