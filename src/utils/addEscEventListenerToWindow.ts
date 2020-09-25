export default function addEscEventListenerToWindow(): void {
    window.addEventListener('keyup', (evt: KeyboardEvent) => {
        console.log(evt.key);
        if (evt.key === "Escape") {
            document.querySelector('button')?.click();
        }
    });
}