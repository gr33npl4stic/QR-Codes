document.addEventListener('DOMContentLoaded', function() {
    // Theme switching with localStorage
    const savedTheme = localStorage.getItem('exhibition-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Language switching with localStorage
    const btnDe = document.getElementById('btn-de');
    const btnEn = document.getElementById('btn-en');
    const langDe = document.querySelector('[data-lang="de"]');
    const langEn = document.querySelector('[data-lang="en"]');
    const htmlElement = document.documentElement;

    // Check localStorage for language preference
    const savedLang = localStorage.getItem('exhibition-lang') || 'de';
    
    function switchLanguage(lang) {
        if (lang === 'de') {
            langDe.classList.add('active-lang');
            langEn.classList.remove('active-lang');
            langDe.removeAttribute('aria-hidden');
            langEn.setAttribute('aria-hidden', 'true');
            btnDe.classList.add('active');
            btnEn.classList.remove('active');
            btnDe.setAttribute('aria-pressed', 'true');
            btnEn.setAttribute('aria-pressed', 'false');
            htmlElement.setAttribute('lang', 'de');
            localStorage.setItem('exhibition-lang', 'de');
        } else {
            langEn.classList.add('active-lang');
            langDe.classList.remove('active-lang');
            langEn.removeAttribute('aria-hidden');
            langDe.setAttribute('aria-hidden', 'true');
            btnEn.classList.add('active');
            btnDe.classList.remove('active');
            btnEn.setAttribute('aria-pressed', 'true');
            btnDe.setAttribute('aria-pressed', 'false');
            htmlElement.setAttribute('lang', 'en');
            localStorage.setItem('exhibition-lang', 'en');
        }
        
        // Close all accordions when switching language
        closeAllAccordions();
    }
    
    // Set initial language
    switchLanguage(savedLang);
    
    btnDe.addEventListener('click', () => switchLanguage('de'));
    btnEn.addEventListener('click', () => switchLanguage('en'));
    
    // Accordion functionality - only one open at a time
    function closeAllAccordions() {
        const allDetails = document.querySelectorAll('.accordion-item');
        allDetails.forEach(details => {
            details.removeAttribute('open');
        });
    }
    
    // Add click handlers to all details elements for exclusive behavior
    const allDetails = document.querySelectorAll('.accordion-item');
    allDetails.forEach(details => {
        details.addEventListener('toggle', function() {
            if (this.open) {
                // Close all other accordions when this one opens
                allDetails.forEach(otherDetails => {
                    if (otherDetails !== this && otherDetails.open) {
                        otherDetails.removeAttribute('open');
                    }
                });
            }
        });
    });
    
    // Theme Toggle Function (optional - can be triggered by button or automatically)
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('exhibition-theme', newTheme);
    }
    
    // Optional: Add theme toggle button listener if button exists
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Optional: Detect system preference on first visit
    // Uncomment if you want to use system preference by default
    /*
    if (!localStorage.getItem('exhibition-theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', initialTheme);
        localStorage.setItem('exhibition-theme', initialTheme);
    }
    */
});
