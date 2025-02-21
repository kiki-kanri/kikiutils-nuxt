import type { Nuxt } from '@nuxt/schema';
import removeConsole from 'vite-plugin-remove-console';

import type { RequiredModuleOptions } from '../types';

export function setupOptions({ nuxtOptions }: RequiredModuleOptions, nuxt: Nuxt) {
    Object.assign(nuxt.options.devtools, nuxtOptions.devtools);
    Object.assign(nuxt.options.experimental, nuxtOptions.experimental);
    Object.assign(nuxt.options.nitro, nuxtOptions.nitro);
    Object.assign(nuxt.options.typescript, nuxtOptions.typescript);
}

export function setupVitePlugins(
    {
        enabledVitePlugins,
        removeConsoleOptions,
    }: RequiredModuleOptions,
    nuxt: Nuxt,
) {
    if (!enabledVitePlugins || enabledVitePlugins?.removeConsole === false) return;
    nuxt.options.vite.plugins = nuxt.options.vite.plugins || [];
    nuxt.options.vite.plugins.push(removeConsole(removeConsoleOptions));
}
