import removeConsole from 'vite-plugin-remove-console';
import type { Nuxt } from '@nuxt/schema';

import type { RequiredModuleOptions } from '../types';

export const setupDevtoolsOptions = ({ nuxtOptions }: RequiredModuleOptions, nuxt: Nuxt) => {
	Object.assign(nuxt.options.devtools, nuxtOptions.devtools);
};

export const setupExperimentalOptions = ({ nuxtOptions }: RequiredModuleOptions, nuxt: Nuxt) => {
	Object.assign(nuxt.options.experimental, nuxtOptions.experimental);
};

export const setupNitroOptions = ({ nuxtOptions }: RequiredModuleOptions, nuxt: Nuxt) => {
	Object.assign(nuxt.options.nitro, nuxtOptions.nitro);
};

export const setupTypescriptOptions = ({ nuxtOptions }: RequiredModuleOptions, nuxt: Nuxt) => {
	Object.assign(nuxt.options.typescript, nuxtOptions.typescript);
};

export const setupVitePlugins = ({ enabledVitePlugins }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (enabledVitePlugins?.removeConsole === false) return;
	nuxt.options.vite.plugins = nuxt.options.vite.plugins || [];
	nuxt.options.vite.plugins.push(removeConsole());
};
