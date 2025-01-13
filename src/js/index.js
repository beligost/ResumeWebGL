import { Gradient } from "./vendor/Gradient.js";

window.addEventListener("load", () => {
    const gradient = new Gradient();
    const canvas = document.getElementById('gradient-canvas');
    gradient.initGradient('#gradient-canvas');

    let fullPageHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    let windowHeight = document.documentElement.clientHeight;
    
    canvas.style.height = fullPageHeight + 'px';

    function setProgress() {
        const languageItems = document.querySelectorAll('.languages__item');
        const radius = 13;
        const circumference = 2 * Math.PI * radius;
    
        for (let i = 0; i < languageItems.length; i++) {
            let value = languageItems[i].dataset.progress;
            let offset = circumference - (value / 100) * circumference;
    
            languageItems[i].querySelector('.progress-bar').style.strokeDashoffset = offset;
        }
    }
    
    function showVisible() {
        let elems = document.querySelectorAll('.animate-visible');

        for (let i = 0; i < elems.length; i++) {
            let elem = elems[i];
            
            if (isVisible(elem)) {
                elem.classList.remove('animate-visible');

                if (elem.classList.contains('languages')) {
                    setTimeout(() => {
                        setProgress();
                    }, 500);
                }
            }
        }
    }
    
    function isVisible(elem) {
        let coords = elem.getBoundingClientRect();
        let topVisible = coords.top >= 0 && coords.top < windowHeight;
        let bottomVisible = coords.bottom < windowHeight && coords.bottom >= 0;

        return topVisible || bottomVisible;
    }
    
    document.addEventListener('scroll', () => {
        showVisible();
    });
});