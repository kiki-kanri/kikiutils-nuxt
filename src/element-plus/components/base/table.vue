<template>
	<el-table border stripe>
		<slot></slot>
		<el-table-column align="right" label="操作" v-if="!hideAction">
			<template #default="scope">
				<div class="m-n1 d-flex flex-wrap justify-content-end">
					<slot name="before-table-action" :scope="scope"></slot>
					<btn-action class="m-1" @click="openDialogFunction(scope.row)" v-if="getHideEditBtnState(scope.row)">編輯</btn-action>
					<ask-delete :delete-function="deleteFunction" :row="scope.row" v-if="getHideDeleteBtnState(scope.row)" />
					<slot name="after-table-action" :scope="scope"></slot>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>

	import { propBooleanFalse } from '../../../composables/props';

	const props = defineProps({
		deleteFunction: Function,
		hideAction: propBooleanFalse,
		hideDeleteBtn: propBooleanFalse,
		hideDeleteBtnFunction: Function,
		hideEditBtn: propBooleanFalse,
		hideEditBtnFunction: Function,
		openDialogFunction: Function
	});

	function getHideDeleteBtnState(row) {
		if (props.hideDeleteBtnFunction) return !props.hideDeleteBtnFunction(row);
		return !props.hideDeleteBtn;
	}

	function getHideEditBtnState(row) {
		if (props.hideEditBtnFunction) return !props.hideEditBtnFunction(row);
		return !props.hideEditBtn;
	}

</script>
