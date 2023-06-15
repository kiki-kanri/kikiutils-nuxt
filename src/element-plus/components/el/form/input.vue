<template>
	<el-form-item>
		<el-input
			:autosize="autosize"
			:clearable="clearable"
			:disabled="disabled"
			:placeholder="placeholder"
			:type="type"
			@blur="$emits('blur', $event)"
			@change="$emits('change', $event)"
			v-model="inputValue"
		/>
	</el-form-item>
</template>

<script setup>

	import { onMounted, ref, watch } from 'vue';

	import { propBooleanFalse, propBooleanTrue, propString } from '../../../../composables/props';

	const props = defineProps({
		autosize: propBooleanTrue,
		clearable: propBooleanFalse,
		disabled: propBooleanFalse,
		placeholder: propString(''),
		modelValue: String,
		type: propString('text')
	});

	const $emits = defineEmits(['blur', 'change', 'update:modelValue']);

	const inputValue = ref('');

	onMounted(() => inputValue.value = props.modelValue);

	watch(props, (nv, ov) => {
		if (nv.modelValue === inputValue.value) return;
		inputValue.value = nv.modelValue;
	});

	watch(inputValue, (nv, ov) => {
		if (nv === props.modelValue) return;
		$emits('update:modelValue', nv);
	});

</script>
