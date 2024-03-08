import { addPlugin } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../types';

export const setupPlugins = (moduleOptions: RequiredModuleOptions, resolver: Resolver) => {
	if (!moduleOptions.enabledPlugins) return;
	if (moduleOptions.enabledPlugins.eventHandlers) {
		if (moduleOptions.enabledPlugins.eventHandlers.dragAndDrop) addPlugin({ mode: 'client', src: resolver.resolve('runtime/plugins/event-handlers/drag-and-drop.client') });
	}
};
