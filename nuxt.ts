import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';

interface ModuleOptions {
	elementPlus: boolean;
	elementPlusConfig: {};
	elementPlusLoadMethod: 'nuxt' | 'plugin';
	styles: boolean;
}

function install(options: ModuleOptions, nuxt: Nuxt, isElementPlus = false) {
	// Get base path
	const { resolve } = createResolver(import.meta.url);
	const basePath = resolve(`./src${isElementPlus ? '/element-plus' : ''}`);
	const componentsPath = `${basePath}/components`;
	const composablesPath = resolve(`${basePath}/composables`);
	const scssesPath = resolve(`${basePath}/styles/scss`);

	// Add component, composables and scss
	addComponentsDir({ path: componentsPath });
	addImportsDir(composablesPath);
	addImportsDir(`${composablesPath}/*/*.{ts,js,mjs,mts}`);
	if (options.styles) nuxt.options.css.push(`${scssesPath}/index.scss`);

	// Element plus only
	if (!isElementPlus) return;
	if (nuxt.options.purgecss) nuxt.options.purgecss.safelist.standard.push('dark');
	if (options.elementPlusLoadMethod === 'nuxt') {
		nuxt.options.elementPlus = options.elementPlusConfig;
	} else {
		addPlugin(`${basePath}/plugins/element-plus.ts`);
		nuxt.options.css.push('element-plus/dist/index.css');
		nuxt.options.css.push('element-plus/theme-chalk/dark/css-vars.css');
	}
}

export default defineNuxtModule<ModuleOptions>({
	defaults: {
		elementPlus: false,
		elementPlusConfig: {
			importStyle: 'css',
			themes: ['dark']
		},
		elementPlusLoadMethod: 'plugin',
		styles: true
	},
	setup(options, nuxt) {
		if (options.styles && nuxt.options.purgecss) {
			const purgecss = nuxt.options.purgecss;
			if (purgecss.safelist === undefined) purgecss.safelist = {};
			if (purgecss.safelist.standard === undefined) purgecss.safelist.standard = [];
			purgecss.safelist.standard.push(...[
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
				'm-1',
				'm-3',
				'm-n1',
				'me-3',
				'mt-0',
				'mt-3',
				'p',
				'p-0',
				'p-3',
				'position-absolute',
				't-0',
				'text-center',
				'text-danger',
				'text-success',
				'wh-100'
			]);
		}

		install(options, nuxt);
		if (options.elementPlus) install(options, nuxt, true);
	}
});
