import type { RequiredDeep } from 'type-fest';
import type removeConsole from 'vite-plugin-remove-console';

export type RequiredModuleOptions = RequiredDeep<ModuleOptions>;

export interface ModuleOptions {
	/**
	 * @default true
	 */
	addGlobalUtilsTypes?: boolean;
	elementPlus?: {
		enabledComposables?:
			| {
					/**
					 * @default true
					 */
					form?: boolean;
			  }
			| false;

		enabledStyles?:
			| {
					/**
					 * @default true
					 */
					reboot?: boolean;
			  }
			| false;
	};

	/**
	 * @default true
	 */
	enabled?: boolean;
	enabledComposables?:
		| {
				/**
				 * @default true
				 */
				axios?: boolean;

				/**
				 * @default true
				 */
				datetime?: boolean;

				/**
				 * @default true
				 */
				hash?: boolean;

				/**
				 * @default true
				 */
				string?: boolean;

				/**
				 * @default true
				 */
				text?: boolean;
		  }
		| false;

	enabledModules?:
		| {
				/**
				 * @default true
				 */
				colorMode?: boolean;

				/**
				 * @default false
				 */
				elementPlus?: boolean;

				/**
				 * @default true
				 */
				googleFonts?: boolean;

				/**
				 * @default true
				 */
				purgecss?: boolean;

				/**
				 * @default true
				 */
				robots?: boolean;

				/**
				 * @default true
				 */
				security?: boolean;

				/**
				 * @default true
				 */
				unocss?: boolean;

				/**
				 * @default true
				 */
				vueuse?: boolean;
		  }
		| false;

	enabledPlugins?:
		| {
				eventHandlers?:
					| {
							/**
							 * @default true
							 */
							dragAndDrop?: boolean;
					  }
					| false;
		  }
		| false;

	enabledServerUtils?:
		| {
				/**
				 * @default true
				 */
				datetime?: boolean;

				/**
				 * @default true
				 */
				error?: boolean;

				/**
				 * @default true
				 */
				hash?: boolean;

				/**
				 * @default true
				 */
				string?: boolean;
		  }
		| false;

	enabledStyles?:
		| {
				/**
				 * @default true
				 */
				font?: boolean;

				/**
				 * @default true
				 */
				reboot?: boolean;

				/**
				 * @default true
				 */
				scrollbar?: boolean;
		  }
		| false;

	enabledVitePlugins?:
		| {
				/**
				 * @default true
				 */
				removeConsole?: boolean;
		  }
		| false;

	/**
	 * @default true
	 */
	importAllComposablesDirTSFiles?: boolean;
	nuxtOptions?: {
		devtools?: {
			/**
			 * @default false
			 */
			enabled: boolean;
		};

		experimental?: {
			/**
			 * @default true
			 */
			headNext?: boolean;

			/**
			 * @default false
			 */
			inlineSSRStyles?: boolean;
		};

		nitro?: {
			/**
			 * @default true
			 */
			compressPublicAssets?: boolean;

			/**
			 * @default true
			 */
			minify: boolean;
		};

		typescript?: {
			tsConfig?: {
				compilerOptions?: {
					/**
					 * @default true
					 */
					noImplicitOverride?: boolean;

					/**
					 * @default true
					 */
					noUncheckedIndexedAccess?: boolean;

					/**
					 * @default true
					 */
					noUnusedLocals?: boolean;

					/**
					 * @default true
					 */
					noUnusedParameters?: boolean;
				};
			};

			/**
			 * @default true
			 */
			typeCheck?: boolean;
		};
	};

	/**
	 * @default { includes: ['error', 'info', 'log', 'warn'] }
	 */
	removeConsoleOptions?: Parameters<typeof removeConsole>[0];
	unocss?: {
		enabledReset?:
			| {
					/**
					 * @default true
					 */
					tailwind?: boolean;
			  }
			| false;
	};
}
