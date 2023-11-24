import { addImportsDir } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../types';

export const setupHashComposables = ({ enabledComposables }: RequiredModuleOptions, reslover: Resolver) => {
	if (!enabledComposables.hash) return;
	addImportsDir(reslover.resolve('runtime/composables/hash'));
};
