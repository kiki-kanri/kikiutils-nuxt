import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule, installModule } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';
import { merge } from 'lodash-es';
import removeConsole from 'vite-plugin-remove-console';

import defaultOptions from './options';

export interface ModuleOptions {
	/**
	 * Register axios response interceptors with element plus error message.
	 * @default false
	 */
	axiosInterceptorsPlugin: boolean;

	/**
	 * Register element plus, must manually install `@element-plus/nuxt` or `element-plus` package when enable.
	 * @value `true` - Use plugin to register.
	 * @value `module` - Use `@element-plus/nuxt` to register.
	 * @default false
	 */
	elementPlus: boolean | 'module';

	/**
	 * Register dragover, drop and keydown event handler.
	 * @default true
	 */
	eventHanlderPlugin: boolean;

	/**
	 * Install `nuxt-purgecss` module, must manually install package.
	 * @default true
	 */
	nuxtPurgecss: boolean;

	/**
	 * Register scss.
	 * @default true
	 */
	styles: boolean;

	/**
	 * Install `@vueuse/nuxt` module, must manually install package.
	 * @default true
	 */
	vueuseNuxt: boolean;
}

function install(options: ModuleOptions, nuxt: Nuxt, elementPlusMode: boolean | 'module' = false) {
	// Get base path
	const { resolve } = createResolver(import.meta.url);
	const basePath = resolve(`./src${elementPlusMode ? '/element-plus' : ''}`);
	const componentsPath = `${basePath}/components`;
	const composablesPath = resolve(`${basePath}/composables`);
	const scssesPath = resolve(`${basePath}/styles/scss`);

	// Add component, composables, plugins and scss
	addComponentsDir({ path: componentsPath });
	addImportsDir(composablesPath);
	if (options.styles) nuxt.options.css.push(`${scssesPath}/index.scss`);

	// Register axios plugin and detect elementPlusMode
	if (!elementPlusMode) {
		if (options.axiosInterceptorsPlugin) addPlugin(`${basePath}/plugins/axios.ts`);
		if (options.eventHanlderPlugin) addPlugin(`${basePath}/plugins/eventhandler.ts`);
		return;
	}

	// Element plus use plugin
	if (elementPlusMode === true) {
		addPlugin(`${basePath}/plugins/element-plus.ts`);
		nuxt.options.css.push('element-plus/dist/index.css');
		nuxt.options.css.push('element-plus/theme-chalk/dark/css-vars.css');
		nuxt.options.vite.optimizeDeps.include.push('dayjs');
	}

	// Setting purgecss
	if (nuxt.options.purgecss) {
		nuxt.options.purgecss.safelist.deep.push(...[/dialog-/, /el-/]);
		nuxt.options.purgecss.safelist.standard.push('dark');
	}
}

function settingNitro(nuxt: Nuxt) {
	nuxt.options.nitro = nuxt.options.nitro || {};
	merge(nuxt.options.nitro, defaultOptions.nitro);
}

function settingPurgecss(nuxt: Nuxt) {
	nuxt.options.purgecss = nuxt.options.purgecss || {};
	merge(nuxt.options.purgecss, defaultOptions.purgecss);
	nuxt.options.purgecss.safelist.deep.push(/swal2/);
	nuxt.options.purgecss.safelist.standard.push(...[
		'a',
		'align-items-center',
		'bg-white',
		'body',
		'd-flex',
		'flex-middle',
		'flex-wrap',
		'h4',
		'h5',
		'html',
		'justify-content-center',
		'justify-content-end',
		'kikiutils-nuxt-spinner-border',
		'kikiutils-nuxt-sr-only',
		'l-0',
		'm-0',
		'm-1',
		'm-3',
		'm-n1',
		'mb-0',
		'me-3',
		'mt-0',
		'mt-3',
		'p',
		'p-0',
		'p-3',
		'position-absolute',
		'rounded-10px',
		't-0',
		'text-center',
		'text-danger',
		'text-success',
		'wh-100'
	]);

	nuxt.options.purgecss.safelist.deep = [...new Set(nuxt.options.purgecss.safelist.deep)];
	nuxt.options.purgecss.safelist.standard = [...new Set(nuxt.options.purgecss.safelist.standard)];
}

function settingVite(nuxt: Nuxt) {
	nuxt.options.vite = nuxt.options.vite || {};
	merge(nuxt.options.vite, defaultOptions.vite);
	nuxt.options.vite.optimizeDeps.include.push(...['anchorme', 'copy-to-clipboard']);
	nuxt.options.vite.plugins.push(removeConsole());
}

export default defineNuxtModule<ModuleOptions>({
	defaults: {
		axiosInterceptorsPlugin: false,
		elementPlus: false,
		eventHanlderPlugin: true,
		nuxtPurgecss: true,
		styles: true,
		vueuseNuxt: true
	},
	meta: {
		compatibility: {
			nuxt: '^3.5'
		},
		configKey: 'kikiutilsNuxt',
		name: 'kikiutils-nuxt'
	},
	setup(options, nuxt) {
		// Install modules
		if (options.nuxtPurgecss) installModule('nuxt-purgecss');
		if (options.vueuseNuxt) installModule('@vueuse/nuxt');

		// Settings
		settingNitro(nuxt);
		if (options.nuxtPurgecss && options.styles) settingPurgecss(nuxt);
		settingVite(nuxt);
		if (nuxt.options.experimental === undefined) nuxt.options.experimental = {};
		if (nuxt.options.experimental.payloadExtraction === undefined) nuxt.options.experimental.payloadExtraction = false;
		if (nuxt.options.telemetry === undefined) nuxt.options.telemetry = false;

		// Install components, composables, plugins, scss
		install(options, nuxt);
		if (options.elementPlus) install(options, nuxt, true);
	}
});
