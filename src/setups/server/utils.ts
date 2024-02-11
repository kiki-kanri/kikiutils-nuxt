import { addServerImportsDir } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../../types';

export const setupServerUtils = ({ enabledServerUtils }: RequiredModuleOptions, reslover: Resolver) => {
	if (!enabledServerUtils) return;
	if (enabledServerUtils.datetime) addServerImportsDir(reslover.resolve('runtime/composables/datetime'));
	if (enabledServerUtils.error) addServerImportsDir(reslover.resolve('runtime/server/utils/error'));
	if (enabledServerUtils.hash) addServerImportsDir(reslover.resolve('runtime/composables/hash'));
	if (enabledServerUtils.string) addServerImportsDir(reslover.resolve('runtime/composables/string'));
};
