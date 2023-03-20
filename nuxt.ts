import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';

interface ModuleOptions {
	elementPlus: boolean;
	styles: boolean;
}

function install(options: ModuleOptions, nuxt: Nuxt, isElementPlus = false) {
	const { resolve } = createResolver(import.meta.url);
	const src = resolve(`./src${isElementPlus ? '/element-plus' : ''}`);
	const composablesPath = resolve(`${src}/composables`);
	addImportsDir(composablesPath);
	addImportsDir(`${src}/*/*.{ts,js,mjs,mts}`);

	const componentsPath = `${src}/components`;
	addComponentsDir({ path: componentsPath });
	if (!isElementPlus) return;
	addPlugin(`${src}/plugins/el-loading.ts`);
	nuxt.options.css.push('element-plus/dist/index.css');
	if (options.styles) nuxt.options.css.push(`${src}/styles/scss/index.scss`);
}

export default defineNuxtModule<ModuleOptions>({
	defaults: {
		elementPlus: false,
		styles: true
	},
	setup(options, nuxt) {
		install(options, nuxt);
		if (options.elementPlus) install(options, nuxt, true);
		if (options.styles) nuxt.options.css.push(`${__dirname}/src/styles/scss/index.scss`);
		if (nuxt.options.purgecss) {
			const purgecss = nuxt.options.purgecss;
			if (purgecss.safelist === undefined) purgecss.safelist = {};
			if (purgecss.safelist.standard === undefined) purgecss.safelist.standard = [];
			purgecss.safelist.standard.push(...[
				'align-items-center',
				'bg-white',
				'd-flex',
				'flex-middle',
				'flex-wrap',
				'h5',
				'justify-content-center',
				'justify-content-end',
				'kikiutils-nuxt-spinner-border',
				'kikiutils-nuxt-sr-only',
				'l-0',
				'm-1',
				'm-3',
				'm-n1',
				'me-3',
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
	}
});
