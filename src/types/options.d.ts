import type { RequiredDeep } from 'type-fest';

export type RequiredModuleOptions = RequiredDeep<ModuleOptions>;

export interface ModuleOptions {
	/**
	 * @default true
	 */
	addGlobalUtilsTypes?: boolean;
	elementPlus?: {
		enabledComposables?: {
			/**
			 * @default true
			 */
			form?: boolean;
		};
	};

	/**
	 * @default true
	 */
	enabled?: boolean;
	enabledComposables?: {
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

		/**
		 * @default true
		 */
		time?: boolean;
	};

	enabledModules?: {
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
	};

	enabledServerUtils?: {
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

		/**
		 * @default true
		 */
		time?: boolean;
	};

	enabledStyles?: {
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
	};

	enabledVitePlugins?: {
		/**
		 * @default true
		 */
		removeConsole?: boolean;
	};

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

	unocss?: {
		enabledReset?: {
			/**
			 * @default true
			 */
			tailwind?: boolean;
		};
	};
}
