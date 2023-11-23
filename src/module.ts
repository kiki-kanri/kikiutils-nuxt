import { addImportsDir, defineNuxtModule, useLogger } from '@nuxt/kit';

import { setupColorMode, setupGoogleFonts, setupPurgecss, setupRobots, setupSecurity, setupUnocss, setupVueuse } from './setups/modules';
import { setupExperimentalOptions, setupNitroOptions, setupTypescriptOptions, setupVitePlugins } from './setups/options';
import type { ModuleOptions, RequiredModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
	defaults: {
		enabled: true,
		enabledModules: {
			colorMode: true,
			googleFonts: true,
			purgecss: true,
			robots: true,
			security: true,
			unocss: true,
			vueuse: true
		},
		importAllComposablesDirTSFiles: true,
		nuxtOptions: {
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
		enabledVitePlugins: { removeConsole: true }
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

		// Composables
		if (options.importAllComposablesDirTSFiles) addImportsDir(`${nuxt.options.rootDir}/composables/**/*.ts`);

		// Modules
		await setupColorMode(nuxt, moduleOptions);
		await setupGoogleFonts(nuxt, moduleOptions);
		await setupPurgecss(nuxt, moduleOptions);
		await setupRobots(nuxt, moduleOptions);
		await setupSecurity(nuxt, moduleOptions);
		await setupUnocss(nuxt, moduleOptions);
		await setupVueuse(nuxt, moduleOptions);

		// Options
		setupExperimentalOptions(nuxt, moduleOptions);
		setupNitroOptions(nuxt, moduleOptions);
		setupTypescriptOptions(nuxt, moduleOptions);

		// Vite plugins
		setupVitePlugins(nuxt, moduleOptions);
		logger.success('@kikiutils/nuxt module initialization successful.');
	}
});
