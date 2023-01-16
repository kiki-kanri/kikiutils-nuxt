<template>
	<a target="_blank" :href="src">{{ href }}</a>
</template>

<script setup>

	import { propBooleanFalse } from '../composables/props';

	const props = defineProps({
		href: String,
		https: propBooleanFalse
	});

	const src = computed(() => {
		return `http${props.https ? 's' : ''}://${props.href}`;
	});

</script>
