<template>
	<el-dialog
		:close-on-click-modal="clickClose"
		:close-on-press-escape="escClose"
		:title='`${dialog.isEdit ? "編輯" : "新增"}${titlePrefix}`'
		v-model="dialog.show"
		append-to-body
		center
	>
		<slot></slot>
		<state-absolute
			:error-text="errorText"
			:loading-text="loadingText"
			:state="saveState"
			:success-text="successText"
		/>
	</el-dialog>
</template>

<script setup>

	import { propBooleanTrue, propString } from '../../../composables/props';

	defineProps({
		clickClose: propBooleanTrue,
		dialog: {
			type: Object,
			default() {
				return reactive({
					isEdit: false,
					show: false
				});
			}
		},
		errorText: propString('儲存失敗！'),
		escClose: propBooleanTrue,
		loadingText: propString('儲存中...'),
		saveState: Object,
		successText: propString('儲存成功！'),
		titlePrefix: String
	});

</script>
