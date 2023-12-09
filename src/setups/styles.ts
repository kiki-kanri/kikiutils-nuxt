import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

import type { RequiredModuleOptions } from '../types';

export const setupStyles = ({ enabledStyles }: RequiredModuleOptions, nuxt: Nuxt, resolver: Resolver) => {
	if (!enabledStyles) return;
	if (enabledStyles.font) nuxt.options.css.push(resolver.resolve('runtime/assets/css/font.css'));
	if (enabledStyles.reboot) nuxt.options.css.push(resolver.resolve('runtime/assets/css/reboot.css'));
	if (enabledStyles.scrollbar) nuxt.options.css.push(resolver.resolve('runtime/assets/css/scrollbar.css'));
};
