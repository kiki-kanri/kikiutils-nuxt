import { addImportsDir } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../types';

export const setupComposables = (moduleOptions: RequiredModuleOptions, reslover: Resolver) => {
	if (moduleOptions.enabledComposables.hash) addImportsDir(reslover.resolve('runtime/composables/hash'));
	if (moduleOptions.enabledComposables.string) addImportsDir(reslover.resolve('runtime/composables/string'));
	if (moduleOptions.enabledComposables.text) addImportsDir(reslover.resolve('runtime/composables/text'));
	if (moduleOptions.enabledComposables.time) addImportsDir(reslover.resolve('runtime/composables/time'));
	if (moduleOptions.enabledModules.elementPlus) setupElementPlusComposables(moduleOptions, reslover);
};

function setupElementPlusComposables({ elementPlus: { enabledComposables } }: RequiredModuleOptions, reslover: Resolver) {
	if (enabledComposables.form) addImportsDir(reslover.resolve('runtime/element-plus/composables/form'));
	if (enabledComposables.message) addImportsDir(reslover.resolve('runtime/element-plus/composables/message'));
	if (enabledComposables.notification) addImportsDir(reslover.resolve('runtime/element-plus/composables/notification'));
}
