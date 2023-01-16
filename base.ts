import { addComponentsDir } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';

export const install = (options, nuxt: Nuxt, isElementPlus: boolean = false) => {
	if (nuxt.options.imports.dirs == undefined) {
		nuxt.options.imports.dirs = [
			'~/composables',
			'~/composables/*/*.{ts,js,mjs,mts}',
			'~/utils',
			'~/utils/*/*.{ts,js,mjs,mts}'
		];
	}

	const composablesPath = `${__dirname}/src${isElementPlus ? '/element-plus' : ''}/composables`;
	nuxt.options.imports.dirs.push(composablesPath);
	nuxt.options.imports.dirs.push(`${composablesPath}/*/*.{ts,js,mjs,mts}`);

	const componentPath = `${__dirname}/src${isElementPlus ? '/element-plus' : ''}/components`;
	addComponentsDir({ path: componentPath });

	const indexCssPath = `${__dirname}/src/styles/scss/index.scss`;
	nuxt.options.css.push(indexCssPath);
}
