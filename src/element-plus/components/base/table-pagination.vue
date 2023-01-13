<template>
	<div class="d-flex align-items-center flex-wrap">
		<span class="me-3">總計：{{ total }}&nbsp;筆資料</span>
		<el-pagination
			layout="sizes, prev, pager, next"
			:disabled="loading"
			:page-sizes="[10, 20, 50, 100, 500, 1000]"
			:total="total"
			@current-change="loadDataFunction"
			@size-change="loadDataFunction"
			v-model:current-page="params.page"
			v-model:page-size="params.limit"
		/>
	</div>
</template>

<script setup>

	const props = defineProps({
		loadDataFunction: Function,
		loading: Boolean,
		params: Object,
		total: Number
	});

</script>
