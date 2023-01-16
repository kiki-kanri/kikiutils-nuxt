import { defineNuxtModule } from '@nuxt/kit';
import { install } from './base';

export default defineNuxtModule({
	setup(options, nuxt) {
		install(options, nuxt);
		const indexCssPath = `${__dirname}/src/styles/scss/index.scss`;
		nuxt.options.css.push(indexCssPath);
	}
});
