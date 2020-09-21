export default function triggerHeaderAnimation(): void {
    setInterval(() => {
        const headerPipe = document.getElementById("header-pipe");
        if (headerPipe) {
            headerPipe.style.display !== "none" 
            ? headerPipe.style.display = "none" 
            : headerPipe.style.display = "inline";
        }
    }, 1000);
}