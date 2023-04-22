<template>
	<div class="m-1 d-flex" :key="row.id">
		<el-popover placement="left" popper-class="text-center" trigger="click" v-model:visible="show">
			<p>確定刪除?</p>
			<div class="m-n1">
				<el-button class="m-1" size="small" @click="show = false">取消</el-button>
				<btn-action class="m-1" type="danger" @click="deleteExec">確定</btn-action>
			</div>
			<template #reference>
				<btn-action type="danger">刪除</btn-action>
			</template>
		</el-popover>
	</div>
</template>

<script setup>

	import { ref } from 'vue';

	const props = defineProps({
		deleteFunction: Function,
		row: Object
	});

	const show = ref(false);

	async function deleteExec() {
		show.value = false;
		await props.deleteFunction(props.row);
	}

</script>
