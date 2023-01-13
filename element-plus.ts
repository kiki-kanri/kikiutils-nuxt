import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
	setup (options, nuxt) {
		if (nuxt.options.imports.dirs == undefined) {
			nuxt.options.imports.dirs = [
				'./composables',
				'composables/*/*.{ts,js,mjs,mts}',
				'./utils'
			];
		}

		nuxt.options.imports.dirs.push(`${__dirname}/src/element-plus/composables`);
		nuxt.options.imports.dirs.push(`${__dirname}/src/element-plus/composables/*/*.{ts,js,mjs,mts}`);
		const componentsPath = `${__dirname}/src/element-plus/components`
		if (nuxt.options.components === false) return;
		if (nuxt.options.components === true) {
			nuxt.options.components = {
				dirs: ['~/components']
			}
		}

		if (Array.isArray(nuxt.options.components)) {
			nuxt.options.components.push(componentsPath);
		} else {
			nuxt.options.components.dirs.push(componentsPath);
		}
	}
});
