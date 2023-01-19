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

	import { propString } from '../../composables/props';

	defineProps({
		btnSize: propString('small'),
		btnText: propString('操作'),
		btnType: propString('primary')
	});

</script>
