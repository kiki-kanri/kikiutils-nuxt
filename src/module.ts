import { addImportsDir, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';

import { setupHashComposables } from './setups/composables';
import { setupColorMode, setupGoogleFonts, setupPurgecss, setupRobots, setupSecurity, setupUnocss, setupVueuse } from './setups/modules';
import { setupDevtoolsOptions, setupExperimentalOptions, setupNitroOptions, setupTypescriptOptions, setupVitePlugins } from './setups/options';
import { setupServerHashUtils } from './setups/server/utils';
import { setupStyles } from './setups/styles';
import type { ModuleOptions, RequiredModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
	defaults: {
		enabled: true,
		enabledComposables: { hash: true },
		enabledModules: {
			colorMode: true,
			googleFonts: true,
			purgecss: true,
			robots: true,
			security: true,
			unocss: true,
			vueuse: true
		},
		enabledServerUtils: { hash: true },
		enabledStyles: {
			font: true,
			reboot: true,
			scrollbar: true
		},
		enabledVitePlugins: { removeConsole: true },
		importAllComposablesDirTSFiles: true,
		nuxtOptions: {
			devtools: { enabled: false },
			experimental: {
				headNext: true,
				inlineSSRStyles: false
			},
			nitro: { compressPublicAssets: true },
			typescript: {
				tsConfig: {
					compilerOptions: {
						noImplicitOverride: true,
						noUncheckedIndexedAccess: true,
						noUnusedLocals: true,
						noUnusedParameters: true
					}
				},
				typeCheck: true
			}
		},
		unocss: {
			enabledReset: {
				tailwind: true
			}
		}
	},
	meta: {
		configKey: 'kikiutilsNuxt',
		name: '@kikiutils/nuxt'
	},
	async setup(options, nuxt) {
		const logger = useLogger();
		if (!options.enabled) return logger.info('@kikiutils/nuxt module disabled.');
		logger.info('Initializing @kikiutils/nuxt module...');
		const moduleOptions = options as RequiredModuleOptions;
		const resolver = createResolver(import.meta.url);

		// Composables
		setupHashComposables(moduleOptions, resolver);
		if (options.importAllComposablesDirTSFiles) addImportsDir(`${nuxt.options.rootDir}/composables/**/*.ts`);

		// Modules
		await setupColorMode(moduleOptions, nuxt);
		await setupGoogleFonts(moduleOptions, nuxt);
		await setupPurgecss(moduleOptions, nuxt);
		await setupRobots(moduleOptions, nuxt);
		await setupSecurity(moduleOptions, nuxt);
		await setupUnocss(moduleOptions, nuxt);
		await setupVueuse(moduleOptions, nuxt);

		// Options
		setupDevtoolsOptions(moduleOptions, nuxt);
		setupExperimentalOptions(moduleOptions, nuxt);
		setupNitroOptions(moduleOptions, nuxt);
		setupTypescriptOptions(moduleOptions, nuxt);

		// Server utils
		setupServerHashUtils(moduleOptions, resolver);

		// Styles
		setupStyles(moduleOptions, nuxt, resolver);

		// Vite plugins
		setupVitePlugins(moduleOptions, nuxt);
		logger.success('@kikiutils/nuxt module initialization successful.');
	}
});
