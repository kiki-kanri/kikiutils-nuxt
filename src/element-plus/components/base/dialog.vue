<template>
	<el-dialog
		:close-on-click-modal="clickClose"
		:close-on-press-escape="escClose"
		:title='`${dialog.edit ? "編輯" : "新增"}${dialog.title}`'
		v-model="dialog.show"
		append-to-body
		center
	>
		<slot></slot>
		<state-absolute
			:loading-text="loadingText"
			:success-text="successText"
			:error-text="errorText"
			:state="saveState"
		/>
	</el-dialog>
</template>

<script setup>

	// props
	const props = defineProps({
		dialog: Object,
		clickClose: propBooleanTrue,
		escClose: propBooleanTrue,
		loadingText: propString('儲存中...'),
		successText: propString('儲存成功！'),
		errorText: propString('儲存失敗！'),
		saveState: Object
	});

</script>
