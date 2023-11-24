import { addImportsDir } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../types';

export const setupComposables = ({ enabledComposables }: RequiredModuleOptions, reslover: Resolver) => {
	if (enabledComposables.hash) addImportsDir(reslover.resolve('runtime/composables/hash'));
	if (enabledComposables.string) addImportsDir(reslover.resolve('runtime/composables/string'));
	if (enabledComposables.time) addImportsDir(reslover.resolve('runtime/composables/time'));
};
