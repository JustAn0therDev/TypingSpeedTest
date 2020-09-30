export default function addEscEventListenerToWindow(): void {
    window.addEventListener('keyup', (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
            document.querySelector('button')?.click();
        }
    });
}