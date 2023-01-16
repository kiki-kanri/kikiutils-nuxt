<template>
	<el-menu-item :index="index" @click="mainState.sidebar = false">{{ text }}</el-menu-item>
</template>

<script setup>

	const props = defineProps([
		'index',
		'text'
	]);

</script>
