import type { Nuxt } from '@nuxt/schema';
import { defu } from 'defu';
import removeConsole from 'vite-plugin-remove-console';

import type { RequiredModuleOptions } from '../types/options';

export function setupOptions({ options }: Nuxt) {
    options.devtools = defu(options.devtools, { enabled: false });
    options.experimental = defu(
        options.experimental,
        {
            headNext: true,
            inlineSSRStyles: false,
        },
    );

    options.nitro = defu(
        options.nitro,
        {
            compressPublicAssets: true,
            minify: true,
        },
    );

    options.typescript = defu(
        options.typescript,
        {
            tsConfig: {
                compilerOptions: {
                    noUncheckedIndexedAccess: true,
                    noUnusedLocals: true,
                    noUnusedParameters: true,
                },
            },
            typeCheck: true,
        },
    );

    options.vite = defu(
        options.vite,
        {
            build: {
                assetsInlineLimit: 0,
                rollupOptions: {
                    output: {
                        manualChunks(id: string) {
                            if (id.endsWith('.css')) return;
                            const moduleName = id.match(/\.pnpm\/@?([^@]+)@/)?.[1];
                            return moduleName?.includes('nuxt') ? 'nuxt' : moduleName;
                        },
                    },
                },
            },
        },
    );
}

export function setupVitePlugins(
    {
        enabledVitePlugins,
        removeConsoleOptions,
    }: RequiredModuleOptions,
    nuxt: Nuxt,
) {
    if (!enabledVitePlugins || enabledVitePlugins?.removeConsole === false) return;
    nuxt.options.vite.plugins ||= [];
    nuxt.options.vite.plugins.push(removeConsole(removeConsoleOptions));
}
