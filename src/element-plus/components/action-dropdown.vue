<template>
	<el-dropdown trigger="click">
		<btn-action :type="btnType">{{ btnText }}</btn-action>
		<template #dropdown>
			<el-dropdown-menu>
				<slot></slot>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>

	defineProps({
		btnText: propString('操作'),
		btnType: propString('primary')
	});

</script>
