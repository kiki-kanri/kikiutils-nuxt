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
				'kikiutils-nuxt-spinner-border',
				'kikiutils-nuxt-sr-only',
				'position-absolute',
				'p-0',
				't-0',
				'l-0',
				'wh-100',
				'flex-middle',
				'bg-white',
				'text-center',
				'text-danger',
				'text-success',
				'mt-3',
				'm-1',
				'd-flex',
				'm-3',
				'p-3',
				'm-n1',
				'justify-content-center',
				'align-items-center',
				'flex-wrap',
				'me-3',
				'justify-content-end'
			]);
		}
	}
});
