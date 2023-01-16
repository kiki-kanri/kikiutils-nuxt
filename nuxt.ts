import { defineNuxtModule } from '@nuxt/kit';
import { install } from './base';

export default defineNuxtModule({
	setup(options, nuxt) {
		install(options, nuxt);
		nuxt.options.css.push(`${__dirname}/src/styles/scss/index.scss`);

		if (nuxt.options.purgecss) {
			const purgecss = nuxt.options.purgecss;
			if (purgecss.safelist === undefined) purgecss.safelist = {};
			if (purgecss.safelist.standard === undefined) purgecss.safelist.standard = [];
			purgecss.safelist.standard.push(...[
				'kikiutils-nuxt-spinner-border',
				'kikiutils-nuxt-sr-only',
				'position-absolute',
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
