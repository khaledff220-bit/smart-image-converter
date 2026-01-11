const translations = {
    ar: {
        // Navbar
        "m1": "الرئيسية", "m2": "🔒 حماية", "m3": "🔑 فك", "m4": "🖼️ جودة", "m5": "📄 دمج", "m6": "⚙️ ضغط",
        "lang-btn": "English",
        "txt-logo": "Smart Image Converter",
        
        // Index Page
        "hero-h1": "حوِّل ملفاتك بذكاء المستقبل",
        "hero-p": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026.",
        "card-protect-t": "حماية الصور",
        "card-protect-p": "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.",
        "btn-start": "ابدأ الآن",

        // Protect Page
        "txt-hero-title-protect": "تشفير الصور بخصوصية تامة",
        "txt-hero-desc-protect": "حول صورك إلى ملفات مشفرة لا يمكن فتحها إلا بكلمة مرور.",
        "txt-label-protect": "اضغط لرفع الصورة المراد حمايتها",
        "txt-pass-label": "تعيين كلمة المرور:",
        "btnEncrypt": "تشفير وتحميل الملف",
        
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة."
    },
    en: {
        // Navbar
        "m1": "Home", "m2": "🔒 Protect", "m3": "🔑 Decrypt", "m4": "🖼️ Quality", "m5": "📄 Merge", "m6": "⚙️ Compress",
        "lang-btn": "عربي",
        "txt-logo": "Smart Image Converter",

        // Index Page
        "hero-h1": "Convert Files with Future Intelligence",
        "hero-p": "A comprehensive platform for processing images and files locally with 2026 technology.",
        "card-protect-t": "Image Protection",
        "card-protect-p": "Encrypt your images with a strong password using AES technology.",
        "btn-start": "Start Now",

        // Protect Page
        "txt-hero-title-protect": "Encrypt Images Privately",
        "txt-hero-desc-protect": "Secure your images with a password only you know.",
        "txt-label-protect": "Click to upload image to protect",
        "txt-pass-label": "Set Password:",
        "btnEncrypt": "Encrypt & Download",

        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
    }
};

function applyLanguage(lang) {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[lang];
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === 'INPUT') {
                element.placeholder = t[id];
            } else {
                element.innerText = t[id];
            }
        }
    }
    localStorage.setItem('preferredLang', lang);
}

function changeLanguage() {
    const currentLang = document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    applyLanguage(savedLang);
});
