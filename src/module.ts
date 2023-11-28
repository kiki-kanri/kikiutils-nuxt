import { addImportsDir, addTypeTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';

import { setupComposables } from './setups/composables';
import { setupColorMode, setupElementPlus, setupGoogleFonts, setupPurgecss, setupRobots, setupSecurity, setupUnocss, setupVueuse } from './setups/modules';
import { setupOptions, setupVitePlugins } from './setups/options';
import { setupServerErrorUtils, setupServerHashUtils, setupServerStringUtils, setupServerTimeUtils } from './setups/server/utils';
import { setupStyles } from './setups/styles';
import type { ModuleOptions, RequiredModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
	defaults: {
		addGlobalUtilsTypes: true,
		elementPlus: {
			enabledComposables: { form: true }
		},
		enabled: true,
		enabledComposables: {
			hash: true,
			string: true,
			text: true,
			time: true
		},
		enabledModules: {
			colorMode: true,
			elementPlus: false,
			googleFonts: true,
			purgecss: true,
			robots: true,
			security: true,
			unocss: true,
			vueuse: true
		},
		enabledServerUtils: {
			error: true,
			hash: true,
			string: true,
			time: true
		},
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
			enabledReset: { tailwind: true }
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
		setupComposables(moduleOptions, resolver);
		if (options.importAllComposablesDirTSFiles) addImportsDir(`${nuxt.options.rootDir}/composables/**/*.ts`);

		// Modules
		await setupColorMode(moduleOptions, nuxt);
		await setupElementPlus(moduleOptions, nuxt);
		await setupGoogleFonts(moduleOptions, nuxt);
		await setupPurgecss(moduleOptions, nuxt);
		await setupRobots(moduleOptions, nuxt);
		await setupSecurity(moduleOptions, nuxt);
		await setupUnocss(moduleOptions, nuxt);
		await setupVueuse(moduleOptions, nuxt);

		// Options
		setupOptions(moduleOptions, nuxt);

		// Server utils
		setupServerErrorUtils(moduleOptions, resolver);
		setupServerHashUtils(moduleOptions, resolver);
		setupServerStringUtils(moduleOptions, resolver);
		setupServerTimeUtils(moduleOptions, resolver);

		// Styles
		setupStyles(moduleOptions, nuxt, resolver);

		// Utils types
		if (moduleOptions.addGlobalUtilsTypes) addTypeTemplate({ filename: 'types/global-utils.d.ts', getContents: () => `export * from '@kikiutils/types';export * from '@kikiutils/types/nuxt';` });

		// Vite plugins
		setupVitePlugins(moduleOptions, nuxt);
		logger.success('@kikiutils/nuxt module initialization successful.');
	}
});
