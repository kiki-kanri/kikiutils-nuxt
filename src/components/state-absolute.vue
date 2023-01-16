<template>
	<div
		class="position-absolute t-0 l-0 wh-100 flex-middle bg-white"
		style="z-index: 1080; opacity: 0.85;"
		:class="divClass"
		v-if="state.loading || success || error"
	>
		<div class="text-center">
			<icon-xmark class="text-danger" style="font-size: 2.5rem;" v-if="state.error || error" />
			<icon-check class="text-success" style="font-size: 2.5rem;" v-else-if="state.success || success" />
			<spinner label="Spinning" :variant="loadingColor" v-else></spinner>
			<h5 class="mt-3 mb-0" v-if="!noText">{{ stateText }}</h5>
		</div>
	</div>
</template>

<script setup>

	const props = defineProps({
		divClass: propString('rounded-10'),
		loadingColor: propString('danger'),
		loadingText: propString('載入中...'),
		successText: propString('載入成功！'),
		errorText: propString('載入失敗！'),
		noText: propBooleanFalse,
		success: propBooleanFalse,
		error: propBooleanFalse,
		state: {
			type: Object,
			default: getLoadingStateDict
		}
	});

	const stateText = computed(() => {
		if (props.state.error || props.error) return props.errorText;
		if (props.state.success || props.success) return props.successText;
		return props.loadingText;
	});

</script>
