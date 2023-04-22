<template>
	<el-form
		ref="formRef"
		autocomplate="off"
		@submit.prevent="saveFunction($refs.formRef)"
		hide-required-asterisk
		status-icon
	>
		<slot></slot>
		<div class="text-center">
			<el-button type="primary" native-type="submit">儲存</el-button>
		</div>
	</el-form>
</template>

<script setup>

	defineProps({
		saveFunction: Function
	});

</script>
