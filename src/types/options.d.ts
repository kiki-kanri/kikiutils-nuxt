import type { RequiredDeep } from 'type-fest';

export type RequiredModuleOptions = RequiredDeep<ModuleOptions>;

export interface ModuleOptions {
	addGlobalUtilsTypes?: boolean;
	elementPlus?: {
		enabledComposables?: {
			form?: boolean;
			message?: boolean;
			notification?: boolean;
		};
	};

	enabled?: boolean;
	enabledComposables?: {
		hash?: boolean;
		string?: boolean;
		text?: boolean;
		time?: boolean;
	};

	enabledModules?: {
		colorMode?: boolean;
		elementPlus?: boolean;
		googleFonts?: boolean;
		purgecss?: boolean;
		robots?: boolean;
		security?: boolean;
		unocss?: boolean;
		vueuse?: boolean;
	};

	enabledServerUtils?: {
		error?: boolean;
		hash?: boolean;
		string?: boolean;
		time?: boolean;
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
