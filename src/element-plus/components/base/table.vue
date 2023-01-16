<template>
	<el-table border stripe>
		<slot></slot>
		<slot name="table-action"></slot>
		<el-table-column align="right" label="操作" v-if="!hideAction">
			<template #default="scope">
				<div class="m-n1 d-flex flex-wrap justify-content-end">
					<btn-action class="m-1" @click="openDialog(scope.row)">編輯</btn-action>
					<ask-delete :delete-function="deleteFunction" :row="scope.row" v-if="!hideDeleteBtn" />
					<slot name="table-action-area" :scope="scope"></slot>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>

	import { propBooleanFalse } from '../../../composables/props';

	defineProps({
		deleteFunction: Function,
		hideDeleteBtn: propBooleanFalse,
		hideAction: propBooleanFalse,
		openDialog: Function
	});

</script>
