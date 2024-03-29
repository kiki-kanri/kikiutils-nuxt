import { defu } from 'defu';
import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { ModuleOptions as SecurityModuleOptions } from 'nuxt-security';

import type { RequiredModuleOptions } from '../types';

export const setupColorMode = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules || !enabledModules.colorMode) return;
	nuxt.options.colorMode = defu(nuxt.options.colorMode, { classSuffix: '', preference: 'dark' });
	await installModule('@nuxtjs/color-mode', {}, nuxt);
};

export const setupElementPlus = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules || !enabledModules.elementPlus) return;
	// @ts-ignore
	nuxt.options.elementPlus = defu(nuxt.options.elementPlus, { themes: ['dark'] });
	await installModule('@element-plus/nuxt', {}, nuxt);
};

export const setupGoogleFonts = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules || !enabledModules.googleFonts) return;
	nuxt.options.googleFonts = defu(nuxt.options.googleFonts, {
		display: 'swap',
		download: false,
		families: { 'Noto+Sans+TC': true }
	});

	await installModule('@nuxtjs/google-fonts', {}, nuxt);
};

export const setupPurgecss = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules || !enabledModules.purgecss) return;
	nuxt.options.purgecss = nuxt.options.purgecss || {};
	const originalSafelist = nuxt.options.purgecss.safelist;
	const safelistOptions: { deep: RegExp[]; standard: (RegExp | string)[] } = {
		deep: [],
		standard: [
			/-(appear|enter|leave)(|-(active|from|to))$/,
			/.*data-v-.*/,
			/:deep/,
			/:global/,
			/:slotted/,
			/^(?!cursor-move).+-move$/,
			/^nuxt-link(|-exact)-active$/,
			'__nuxt',
			'body',
			'html',
			'nuxt-progress'
		]
	};

	if (enabledModules.unocss) {
		safelistOptions.standard.push(
			...[
				/--unocss--/,
				/-\[\S+\]/,
				/__uno_hash_(\w{6})/
			]
		);
	}

	if (Array.isArray(originalSafelist)) {
		safelistOptions.standard.push(...originalSafelist);
	} else if (originalSafelist) {
		safelistOptions.deep.push(...(originalSafelist.deep || []));
		safelistOptions.standard.push(...(originalSafelist.standard || []));
	}

	safelistOptions.deep = [...new Set(safelistOptions.deep)];
	safelistOptions.standard = [...new Set(safelistOptions.standard)];
	nuxt.options.purgecss.safelist = safelistOptions;
	await installModule('nuxt-purgecss', {}, nuxt);
};

export const setupRobots = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules || !enabledModules.robots) return;
	await installModule('@nuxtjs/robots', {}, nuxt);
};

export const setupSecurity = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules || !enabledModules.security) return;
	nuxt.options.security = defu(nuxt.options.security, <SecurityModuleOptions>{
		corsHandler: { origin: process.env.WEB_HOST },
		headers: {
			crossOriginEmbedderPolicy: nuxt.options.dev ? 'unsafe-none' : 'require-corp',
			xFrameOptions: nuxt.options.dev ? 'SAMEORIGIN' : 'DENY'
		}
	});

	await installModule('nuxt-security', {}, nuxt);
};

export const setupUnocss = async ({ enabledModules, unocss }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules || !enabledModules.unocss) return;
	if (unocss.enabledReset && unocss.enabledReset.tailwind) nuxt.options.css.push('@unocss/reset/tailwind.css');
	await installModule('@unocss/nuxt', {}, nuxt);
};

export const setupVueuse = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules || !enabledModules.vueuse) return;
	await installModule('@vueuse/nuxt', {}, nuxt);
};
