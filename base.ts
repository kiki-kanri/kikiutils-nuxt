import { addComponentsDir } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';

export const install = (nuxt: Nuxt, isElementPlus: boolean = false) => {
	const composablesPath = `${__dirname}/src${isElementPlus ? '/element-plus' : ''}/composables`;
	nuxt.options.imports.dirs.push(composablesPath);
	nuxt.options.imports.dirs.push(`${composablesPath}/*/*.{ts,js,mjs,mts}`);

	const componentPath = `${__dirname}/src${isElementPlus ? '/element-plus' : ''}/components`;
	addComponentsDir({ path: componentPath });
}
