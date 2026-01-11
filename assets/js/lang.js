const translations = {
    ar: {
        // القائمة العلوية والشعار
        "txt-logo": "Smart Image Converter",
        "lang-btn": "English",
        "m1": "الرئيسية", 
        "m2": "🔒 حماية", 
        "m3": "🔑 فك تشفير", 
        "m4": "🖼️ جودة", 
        "m5": "📄 دمج", 
        "m6": "⚙️ ضغط",

        // محتوى الصفحة الرئيسية (Index) كما في الصورة الثانية
        "hero-h1": "حوِّل ملفاتك بذكاء المستقبل",
        "hero-p": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026.",
        "card-protect-t": "حماية الصور",
        "card-protect-p": "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.",

        // تذييل الصفحة
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة."
    },
    en: {
        // Navbar & Logo
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "m1": "Home", 
        "m2": "🔒 Protect", 
        "m3": "🔑 Decrypt", 
        "m4": "🖼️ Quality", 
        "m5": "📄 Merge", 
        "m6": "⚙️ Compress",

        // Hero Section Content
        "hero-h1": "Convert Files with Future Intelligence",
        "hero-p": "A comprehensive platform for processing images and files locally with 2026 technology.",
        "card-protect-t": "Image Protection",
        "card-protect-p": "Encrypt your images with a strong, unbreakable password using AES technology.",

        // Footer
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
    }
};

/**
 * دالة تطبيق اللغة على العناصر
 */
function applyLanguage(lang) {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[lang];
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            // التعامل مع المدخلات (Placeholders)
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = t[id];
            } else {
                element.innerText = t[id];
            }
        }
    }
    
    // حفظ التفضيل في المتصفح
    localStorage.setItem('preferredLang', lang);
}

/**
 * دالة تبديل اللغة عند الضغط على الزر
 */
function changeLanguage() {
    const currentLang = document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
}

/**
 * تشغيل اللغة المختارة تلقائياً عند فتح الموقع
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    applyLanguage(savedLang);
});
