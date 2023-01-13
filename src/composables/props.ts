export const propBooleanFalse = {
	type: Boolean,
	default: false
}

export const propBooleanTrue = {
	type: Boolean,
	default: true
}

export const propReactiveDict = {
	type: Object,
	default: () => reactive({})
}

export const propString = (defaultValue: string) => {
	return {
		type: String,
		default: defaultValue
	}
}
