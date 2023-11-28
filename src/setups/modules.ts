import { defu } from 'defu';
import { installModule } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { ModuleOptions as SecurityModuleOptions } from 'nuxt-security';

import type { RequiredModuleOptions } from '../types';

export const setupColorMode = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules.colorMode) return;
	nuxt.options.colorMode = defu(nuxt.options.colorMode, { classSuffix: '', preference: 'dark' });
	await installModule('@nuxtjs/color-mode', {}, nuxt);
};

export const setupElementPlus = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules.elementPlus) return;
	// @ts-ignore
	nuxt.options.elementPlus = defu(nuxt.options.elementPlus, { themes: ['dark'] });
	await installModule('@element-plus/nuxt', {}, nuxt);
};

export const setupGoogleFonts = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules.googleFonts) return;
	nuxt.options.googleFonts = defu(nuxt.options.googleFonts, {
		display: 'swap',
		download: false,
		families: { 'Noto+Sans+TC': true }
	});

	await installModule('@nuxtjs/google-fonts', {}, nuxt);
};

export const setupPurgecss = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules.purgecss) return;
	nuxt.options.purgecss = defu(nuxt.options.purgecss, {});
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
		safelistOptions.deep.push(...safelistOptions.deep);
		safelistOptions.standard.push(...safelistOptions.standard);
	}

	safelistOptions.deep = [...new Set(safelistOptions.deep)];
	safelistOptions.standard = [...new Set(safelistOptions.standard)];
	nuxt.options.purgecss.safelist = safelistOptions;
	await installModule('nuxt-purgecss', {}, nuxt);
};

export const setupRobots = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules.robots) return;
	await installModule('@nuxtjs/robots', {}, nuxt);
};

export const setupSecurity = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules.security) return;
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
	if (!enabledModules.unocss) return;
	if (unocss.enabledReset.tailwind) nuxt.options.css.push('@unocss/reset/tailwind.css');
	await installModule('@unocss/nuxt', {}, nuxt);
};

export const setupVueuse = async ({ enabledModules }: RequiredModuleOptions, nuxt: Nuxt) => {
	if (!enabledModules.vueuse) return;
	await installModule('@vueuse/nuxt', {}, nuxt);
};
