import { addServerImportsDir } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../../types';

export const setupServerUtils = ({ enabledServerUtils }: RequiredModuleOptions, resolver: Resolver) => {
	if (!enabledServerUtils) return;
	if (enabledServerUtils.datetime) addServerImportsDir(resolver.resolve('runtime/composables/datetime'));
	if (enabledServerUtils.error) addServerImportsDir(resolver.resolve('runtime/server/utils/error'));
	if (enabledServerUtils.hash) addServerImportsDir(resolver.resolve('runtime/composables/hash'));
	if (enabledServerUtils.string) addServerImportsDir(resolver.resolve('runtime/composables/string'));
};
