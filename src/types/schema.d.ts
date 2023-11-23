import type { ModuleOptions as PurgecssModuleOptions } from 'nuxt-purgecss';

declare module '@nuxt/schema' {
	interface NuxtOptions {
		purgecss?: PurgecssModuleOptions;
	}
}

export {};
