export default function addEscEventListenerToWindow(): void {
    window.addEventListener('keyup', (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
            // Ignoring this because "Element" type DOES have a click function.
            // @ts-ignore
            document.querySelector('#button-reset-typing-input-state')?.click();
        }
    });
}