import type { RequiredDeep } from 'type-fest';

export type RequiredModuleOptions = RequiredDeep<ModuleOptions>;

export interface ModuleOptions {
	enabled?: boolean;
	enabledModules?: {
		colorMode?: boolean;
		googleFonts?: boolean;
		purgecss?: boolean;
		robots?: boolean;
		security?: boolean;
		unocss?: boolean;
		vueuse?: boolean;
	};

	enabledVitePlugins?: {
		removeConsole?: boolean;
	};

	importAllComposablesDirTSFiles?: boolean;
	nuxtOptions?: {
		experimental?: {
			headNext?: boolean;
			inlineSSRStyles?: boolean;
		};

		nitro?: {
			compressPublicAssets?: boolean;
		};

		typescript?: {
			tsConfig?: {
				compilerOptions?: {
					noImplicitOverride?: boolean;
					noUncheckedIndexedAccess?: boolean;
					noUnusedLocals?: boolean;
					noUnusedParameters?: boolean;
				};
			};

			typeCheck?: boolean;
		};
	};
}
