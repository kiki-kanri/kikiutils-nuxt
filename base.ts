import { addComponentsDir, addImportsDir } from '@nuxt/kit';

export const install = (isElementPlus: boolean = false) => {
	const composablesPath = `${__dirname}/src${isElementPlus ? '/element-plus' : ''}/composables`;
	addImportsDir(composablesPath);
	addImportsDir(`${composablesPath}/*/*.{ts,js,mjs,mts}`);

	const componentPath = `${__dirname}/src${isElementPlus ? '/element-plus' : ''}/components`;
	addComponentsDir({ path: componentPath });
}
