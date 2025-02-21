import { addImportsDir } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../types';

export function setupComposables(moduleOptions: RequiredModuleOptions, resolver: Resolver) {
    if (moduleOptions.enabledModules && moduleOptions.enabledModules.elementPlus) setupElementPlusComposables(moduleOptions, resolver);
    if (!moduleOptions.enabledComposables) return;
    if (moduleOptions.enabledComposables.axios) addImportsDir(resolver.resolve('runtime/composables/axios'));
    if (moduleOptions.enabledComposables.datetime) addImportsDir(resolver.resolve('runtime/composables/datetime'));
    if (moduleOptions.enabledComposables.hash) addImportsDir(resolver.resolve('runtime/composables/hash'));
    if (moduleOptions.enabledComposables.string) addImportsDir(resolver.resolve('runtime/composables/string'));
    if (moduleOptions.enabledComposables.text) addImportsDir(resolver.resolve('runtime/composables/text'));
}

function setupElementPlusComposables({ elementPlus: { enabledComposables } }: RequiredModuleOptions, resolver: Resolver) {
    if (!enabledComposables) return;
    if (enabledComposables.form) addImportsDir(resolver.resolve('runtime/element-plus/composables/form'));
}
