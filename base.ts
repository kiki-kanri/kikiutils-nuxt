export const install = (options, nuxt, isElementPlus: boolean = false) => {
	if (nuxt.options.imports.dirs == undefined) {
		nuxt.options.imports.dirs = [
			'./composables',
			'composables/*/*.{ts,js,mjs,mts}',
			'./utils'
		];
	}

	const composablesPath = `${__dirname}/src${isElementPlus ? '/elemtnt-plus' : ''}/composables`;
	nuxt.options.imports.dirs.push(composablesPath);
	nuxt.options.imports.dirs.push(`${composablesPath}/*/*.{ts,js,mjs,mts}`);
}
