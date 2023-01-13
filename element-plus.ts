import { defineNuxtModule } from '@nuxt/kit';
import { install } from './base';

export default defineNuxtModule({
	setup(options, nuxt) {
		install(options, nuxt, true);
	}
});
