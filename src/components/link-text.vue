<template>
	<a target="_blank" :href="src">{{ href }}</a>
</template>

<script setup>

	import { computed } from 'vue';

	import { propBooleanFalse } from '../composables/props';

	const props = defineProps({
		href: String,
		https: propBooleanFalse
	});

	const src = computed(() => {
		if (props.href.match(/https?:\/\//gi)) return props.href;
		return `http${props.https ? 's' : ''}://${props.href}`;
	});

</script>
