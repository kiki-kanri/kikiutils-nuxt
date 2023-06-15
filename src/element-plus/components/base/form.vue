<template>
	<el-form
		ref="formRef"
		autocomplate="off"
		@submit.prevent="saveFunction($refs.formRef)"
		hide-required-asterisk
		status-icon
	>
		<slot></slot>
		<div class="text-center" v-if="!hideBtnArea">
			<el-button native-type="submit" type="primary">儲存</el-button>
		</div>
	</el-form>
</template>

<script setup>

	import { propBooleanFalse } from '../../../composables/props';

	defineProps({
		hideBtnArea: propBooleanFalse,
		saveFunction: Function
	});

</script>
