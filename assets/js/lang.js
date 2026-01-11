const translations = {
    ar: {
        // Navbar & General
        "txt-logo": "Smart Image Converter",
        "lang-btn": "English",
        "m1": "الرئيسية", "m2": "🔒 حماية", "m3": "🔑 فك", "m4": "🖼️ جودة", "m5": "📄 دمج", "m6": "⚙️ ضغط",
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة.",

        // Index Page (الرئيسية)
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

        // Protect Page (صفحة الحماية - الإضافات الجديدة)
        "txt-hero-title-protect": "تشفير الصور بخصوصية تامة",
        "txt-hero-desc-protect": "قم بحماية صورك محلياً باستخدام تقنية AES-256.",
        "txt-label-protect": "اضغط هنا لرفع الصورة",
        "txt-pass-label": "كلمة المرور:",
        "btnEncrypt": "تشفير وتحميل",
        "password": "أدخل كلمة السر هنا..." // لترجمة الـ placeholder
    },
    en: {
        // Navbar & General
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "m1": "Home", "m2": "🔒 Protect", "m3": "🔑 Decrypt", "m4": "🖼️ Quality", "m5": "📄 Merge", "m6": "⚙️ Compress",
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved.",

        // Index Page
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

        // Protect Page
        "txt-hero-title-protect": "Encrypt Images Privately",
        "txt-hero-desc-protect": "Secure your images locally using AES-256 technology.",
        "txt-label-protect": "Click here to upload image",
        "txt-pass-label": "Password:",
        "btnEncrypt": "Encrypt & Download",
        "password": "Enter password here..."
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
            // التحقق من نوع العنصر
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // ترجمة الـ placeholder إذا كان حقلاً للإدخال
                element.placeholder = t[id];
            } else {
                // ترجمة النص للعناصر الأخرى
                element.innerText = t[id];
            }
        }
    }
    // حفظ اللغة المختارة
    localStorage.setItem('preferredLang', lang);
}

function changeLanguage() {
    const currentLang = document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
}

// تنفيذ الترجمة فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    applyLanguage(savedLang);
});
