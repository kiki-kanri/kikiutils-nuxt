import { FormItemRule } from 'element-plus';

type Validator = FormItemRule['validator'];

export const getFormRule = (message = '', options: FormItemRule = {}) => {
	let { asyncValidator, required, trigger, validator } = options;
	if (required === undefined) required = true;
	if (trigger === undefined) trigger = 'blur';
	if (asyncValidator) return { asyncValidator, trigger };
	if (validator) return { validator, trigger };
	return { ...options, message, required, trigger };
}

export const getFormRuleUseValidator = (validator: Validator) => getFormRule('', { validator });