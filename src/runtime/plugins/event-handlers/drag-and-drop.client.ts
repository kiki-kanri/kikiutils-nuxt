import { defineNuxtPlugin } from '#app';

function onDragEvent(this: Window, event: DragEvent) {
    for (const item of event.dataTransfer?.items || []) {
        if (item.kind === 'file') {
            event.preventDefault();
            break;
        }
    }
}

export default defineNuxtPlugin(() => {
    window.addEventListener('dragover', onDragEvent);
    window.addEventListener('drop', onDragEvent);
});
