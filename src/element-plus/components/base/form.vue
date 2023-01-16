<template>
	<el-form
		ref="formRef"
		autocomplate="off"
		:model="formData"
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

<script>

	import { propBooleanTrue } from '../../../composables/props';

	export default {
		props: {
			dialog: Object,
			formData: Object,
			saveFunction: Function,
			showTime: propBooleanTrue
		}
	}

</script>
