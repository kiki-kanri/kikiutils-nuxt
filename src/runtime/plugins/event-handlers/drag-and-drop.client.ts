import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
	window.addEventListener('dragover', (event) => event.preventDefault());
	window.addEventListener('drop', (event) => event.preventDefault());
});
