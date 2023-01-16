<template>
	<el-form-item>
		<el-switch :disabled="disabled" v-model="inputValue" />
	</el-form-item>
</template>

<script setup>

	const props = defineProps({
		disabled: propBooleanFalse,
		modelValue: Boolean
	});

	const $emits = defineEmits(['update:modelValue']);

	const inputValue = ref(false);

	onMounted(() => {
		inputValue.value = props.modelValue;
	});

	watch(props, (nv, ov) => {
		if (nv.modelValue === inputValue.value) return;
		inputValue.value = nv.modelValue;
	});

	watch(inputValue, (nv, ov) => {
		if (nv === props.modelValue) return;
		$emits('update:modelValue', nv);
	});

</script>
