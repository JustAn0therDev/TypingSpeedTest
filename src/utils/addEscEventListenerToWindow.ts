export default function addEscEventListenerToWindow(): void {
    window.addEventListener('keyup', (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
            const spanElement: HTMLSpanElement | null = document.querySelector('#span-reset-typing-input-state');
            spanElement?.click();
        }
    });
}