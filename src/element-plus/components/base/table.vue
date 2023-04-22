<template>
	<el-table border stripe>
		<slot></slot>
		<el-table-column align="right" label="操作" v-if="!hideAction">
			<template #default="scope">
				<div class="m-n1 d-flex flex-wrap justify-content-end">
					<slot name="brfore-table-action" :scope="scope"></slot>
					<btn-action class="m-1" @click="openDialogFunction(scope.row)" v-if="!hideEditBtn">編輯</btn-action>
					<ask-delete :delete-function="deleteFunction" :row="scope.row" v-if="!hideDeleteBtn" />
					<slot name="after-table-action" :scope="scope"></slot>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>

	import { propBooleanFalse } from '../../../composables/props';

	defineProps({
		deleteFunction: Function,
		hideAction: propBooleanFalse,
		hideDeleteBtn: propBooleanFalse,
		hideEditBtn: propBooleanFalse,
		openDialogFunction: Function
	});

</script>
