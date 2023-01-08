import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
	setup (options, nuxt) {
		if (!nuxt.options.imports) nuxt.options.imports = {};
		if (nuxt.options.imports.dirs == undefined) {
			nuxt.options.imports.dirs = [
				'./composables',
				'composables/*/*.{ts,js,mjs,mts}'
			];
		}

		nuxt.options.imports.dirs.push('./node_modules/kikiutils-nuxt/src/composables');
		nuxt.options.imports.dirs.push('./node_modules/kikiutils-nuxt/src/composables/*/*.{ts,js,mjs,mts}');
	}
});
