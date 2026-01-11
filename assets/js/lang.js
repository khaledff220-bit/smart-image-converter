const translations = {
    ar: {
        "txt-logo": "Smart Image Converter",
        "lang-btn": "English",
        "m1": "الرئيسية", "m2": "🔒 حماية", "m3": "🔑 فك", "m4": "🖼️ جودة", "m5": "📄 دمج", "m6": "⚙️ ضغط",
        "hero-h1": "حوّل ملفاتك بذكاء المستقبل",
        "hero-p": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        "card-protect-t": "حماية الصور",
        "card-protect-p": "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.",
        "txt-s2-t": "فك التشفير",
        "txt-s2-d": "استرجع صورك الأصلية من ملفاتك المشفرة بسرعة وأمان تام.",
        "txt-s3-t": "تحسين الجودة",
        "txt-s3-d": "ضاعف دقة الصور الضبابية واجعلها أكثر ووضوحاً بضغطة زر.",
        "txt-s4-t": "دمج PDF",
        "txt-s4-d": "اجمع عدة ملفات PDF في مستند واحد مرتب ومنسق.",
        "txt-s5-t": "ضغط PDF",
        "txt-s5-d": "قلل حجم مستنداتك دون التأثير على جودة النصوص والرسومات.",
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة."
    },
    en: {
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "m1": "Home", "m2": "🔒 Protect", "m3": "🔑 Decrypt", "m4": "🖼️ Quality", "m5": "📄 Merge", "m6": "⚙️ Compress",
        "hero-h1": "Convert Files with Future Intelligence",
        "hero-p": "A comprehensive platform for local file processing with 2026 tech.",
        "card-protect-t": "Image Protection",
        "card-protect-p": "Encrypt your images with an unbreakable password using AES technology.",
        "txt-s2-t": "Decryption",
        "txt-s2-d": "Restore your original images from encrypted files quickly and safely.",
        "txt-s3-t": "Quality Enhance",
        "txt-s3-d": "Double the resolution of blurry images and make them clearer instantly.",
        "txt-s4-t": "Merge PDF",
        "txt-s4-d": "Combine multiple PDF files into one organized document.",
        "txt-s5-t": "Compress PDF",
        "txt-s5-d": "Reduce document size without affecting text or graphic quality.",
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
            element.innerText = t[id];
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
