import { addServerImports } from '@nuxt/kit';
import type { Resolver } from '@nuxt/kit';

import type { RequiredModuleOptions } from '../../types';

export const setupServerHashUtils = ({ enabledServerUtils }: RequiredModuleOptions, reslover: Resolver) => {
	if (!enabledServerUtils.hash) return;
	const hashComposablesFilePath = reslover.resolve('runtime/composables/hash');
	addServerImports([
		{ from: hashComposablesFilePath, name: 'sha3224' },
		{ from: hashComposablesFilePath, name: 'sha3256' },
		{ from: hashComposablesFilePath, name: 'sha3384' },
		{ from: hashComposablesFilePath, name: 'sha3512' }
	]);
};

export const setupServerStringUtils = ({ enabledServerUtils }: RequiredModuleOptions, reslover: Resolver) => {
	if (!enabledServerUtils.string) return;
	const stringComposablesFilePath = reslover.resolve('runtime/composables/string');
	addServerImports([
		{ from: stringComposablesFilePath, name: 'randomAlphabeticString' },
		{ from: stringComposablesFilePath, name: 'randomLowerCaseAlphabeticString' }
	]);
};