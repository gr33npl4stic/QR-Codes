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
    const savedLang = localStorage.getItem('exhibition-lang')
        || (navigator.language.startsWith('de') ? 'de' : 'en');
    
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

        // Announce language change to screen readers
        var announce = document.getElementById('lang-announce');
        if (announce) {
            announce.textContent = lang === 'de' ? 'Sprache: Deutsch' : 'Language: English';
        }

        // Update theme toggle label for current language
        updateThemeLabel();
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
    
    // Update theme toggle aria-label based on current state and language
    function updateThemeLabel() {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var lang = localStorage.getItem('exhibition-lang') || 'de';
        if (lang === 'de') {
            btn.setAttribute('aria-label', isDark ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln');
        } else {
            btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    // Theme Toggle Function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('exhibition-theme', newTheme);
        updateThemeLabel();
    }
    
    // Optional: Add theme toggle button listener if button exists
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Set initial theme label
    updateThemeLabel();
    
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
