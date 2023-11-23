import removeConsole from 'vite-plugin-remove-console';
import type { Nuxt } from '@nuxt/schema';

import type { RequiredModuleOptions } from '../types';

export const setupExperimentalOptions = (nuxt: Nuxt, { nuxtOptions }: RequiredModuleOptions) => {
	Object.assign(nuxt.options.experimental, nuxtOptions.experimental);
};

export const setupNitroOptions = (nuxt: Nuxt, { nuxtOptions }: RequiredModuleOptions) => {
	Object.assign(nuxt.options.nitro, nuxtOptions.nitro);
};

export const setupTypescriptOptions = (nuxt: Nuxt, { nuxtOptions }: RequiredModuleOptions) => {
	Object.assign(nuxt.options.typescript, nuxtOptions.typescript);
};

export const setupVitePlugins = (nuxt: Nuxt, { enabledVitePlugins }: RequiredModuleOptions) => {
	if (enabledVitePlugins?.removeConsole === false) return;
	nuxt.options.vite.plugins = nuxt.options.vite.plugins || [];
	nuxt.options.vite.plugins.push(removeConsole());
};
