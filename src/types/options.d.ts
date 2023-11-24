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

	enabledStyles?: {
		font?: boolean;
		reboot?: boolean;
		scrollbar?: boolean;
	};

	enabledVitePlugins?: {
		removeConsole?: boolean;
	};

	importAllComposablesDirTSFiles?: boolean;
	nuxtOptions?: {
		devtools?: {
			enabled: boolean;
		};

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

	unocss?: {
		enabledReset?: {
			tailwind?: boolean;
		};
	};
}
