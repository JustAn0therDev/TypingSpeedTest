export default function setLocalStorageColorsToOnLoad() {
    window.onload = function () {
        const backgroundElements: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('.background');
        const foregroundElements: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll('.foreground');

        if (localStorage['tstbg']) {
            backgroundElements.forEach((element: HTMLDivElement) => element.style.background = localStorage['tstbg']);
        }

        if (localStorage['tstfg']) {
            foregroundElements.forEach((element: HTMLSpanElement) => element.style.color = localStorage['tstfg']);
        }

    }
}