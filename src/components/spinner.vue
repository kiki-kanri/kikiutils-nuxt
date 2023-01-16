<template>
	<span class="kikiutils-nuxt-spinner-border">
		<span class="kikiutils-nuxt-sr-only">Spinning</span>
	</span>
</template>

<style scoped>

	@keyframes kikiutils-nuxt-spinner-border {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(359deg);
		}
	}

	.kikiutils-nuxt-spinner-border {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		vertical-align: -0.125em;
		border: 0.25em red solid;
		border-right: 0.25em solid transparent;
		border-radius: 50%;
		-webkit-animation: spinner-border .75s linear infinite;
		animation: kikiutils-nuxt-spinner-border .75s linear infinite;
	}

	.kikiutils-nuxt-sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0,0,0,0);
		white-space: nowrap;
		border: 0;
	}

</style>
