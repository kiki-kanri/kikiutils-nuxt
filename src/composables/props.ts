import { reactive } from 'vue';

export const propBooleanFalse = {
	default: false,
	type: Boolean
}

export const propBooleanTrue = {
	default: true,
	type: Boolean
}

export const propReactiveArray = {
	default: () => reactive([]),
	type: Array
}

export const propReactiveDict = {
	default: () => reactive({}),
	type: Object
}

export const propNumber = (defaultValue: number) => {
	return {
		default: defaultValue,
		type: Number
	}
}

export const propString = (defaultValue: string) => {
	return {
		default: defaultValue,
		type: String
	}
}
