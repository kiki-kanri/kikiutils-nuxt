import type { FormItemRule } from 'element-plus';

export const createElFormItemRule = (message: string = '', options: FormItemRule = {}) => {
	const { asyncValidator, required = true, trigger = 'blur', type = 'string', validator } = options;
	if (asyncValidator) return { asyncValidator, trigger };
	if (validator) return { validator, trigger };
	return { ...options, message, required, trigger, type };
};
