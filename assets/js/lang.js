/* ============================================
    🌍 نظام الترجمة الذكي - إصدار 2026
    تم مراجعة كافة المعرفات لضمان التوافق التام
=============================================== */

const translations = {
    ar: {
        // Navbar & General
        "txt-logo": "Smart Image Converter",
        "lang-btn": "English",
        "m1": "الرئيسية",
        "m2": "🔒 حماية",
        "m3": "🔑 فك",
        "m4": "🖼️ جودة",
        "m5": "📄 دمج",
        "m6": "⚙️ ضغط",
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

        // Protect Page (صفحة الحماية)
        "txt-hero-title-encrypt": "تشفير الصور بخصوصية تامة",
        "txt-hero-desc-encrypt": "قم بحماية صورك محلياً باستخدام تقنية AES-256.",
        "txt-card-title-enc": "إنشاء طبقة حماية",
        "txt-label-encrypt": "اضغط هنا لرفع الصورة",
        "txt-pass-label-encrypt": "كلمة المرور:",
        "txt-btn-encrypt": "تشفير وحفظ الملف",
        "password": "أدخل كلمة السر هنا...",
        "how-it-works-title": "كيف تعمل تقنية الحماية لدينا؟",
        "enc-desc-detail": "نحن نستخدم بروتوكول AES-256، وهو نفس المعيار الذي تستخدمه الحكومات لحماية البيانات الحساسة. لا يتم تخزين صورك على أي خادم.",

        // Decrypt Page (صفحة فك التشفير)
        "txt-title-dec-page": "فك تشفير الصور - Smart Image Converter",
        "txt-hero-title-decrypt": "استعادة الصور المشفرة",
        "txt-hero-desc-decrypt": "أدخل الملف المشفر وكلمة المرور الصحيحة لاستعادة صورتك الأصلية فوراً.",
        "txt-card-title-dec": "فك حماية البيانات",
        "txt-label-decrypt": "اختر الملف المشفر (.enc)",
        "txt-pass-label-decrypt": "كلمة المرور:",
        "btnDecrypt": "فك التشفير وعرض الصورة",
        "how-to-decrypt-title": "كيف تقوم باستعادة صورك المشفرة؟",
        "dec-step1-d": "تتم العملية محلياً 100%؛ حيث يقوم المتصفح باستخدام مفتاح التشفير لفك البيانات دون رفعها لأي سيرفر."
    },
    en: {
        // Navbar & General
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "m1": "Home",
        "m2": "🔒 Protect",
        "m3": "🔑 Decrypt",
        "m4": "🖼️ Quality",
        "m5": "📄 Merge",
        "m6": "⚙️ Compress",
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
        "txt-s5-d": "Reduce document size without affecting quality.",

        // Protect Page
        "txt-hero-title-encrypt": "Encrypt Images Privately",
        "txt-hero-desc-encrypt": "Secure your images locally using AES-256 technology.",
        "txt-card-title-enc": "Create Protection Layer",
        "txt-label-encrypt": "Click here to upload image",
        "txt-pass-label-encrypt": "Password:",
        "txt-btn-encrypt": "Encrypt & Save File",
        "password": "Enter password here...",
        "how-it-works-title": "How does our protection technology work?",
        "enc-desc-detail": "We use the AES-256 protocol, the same standard used by governments. Your images are never stored on any server.",

        // Decrypt Page
        "txt-title-dec-page": "Image Decryption - Smart Image Converter",
        "txt-hero-title-decrypt": "Restore Encrypted Images",
        "txt-hero-desc-decrypt": "Enter the encrypted file and correct password to restore your image instantly.",
        "txt-card-title-dec": "Data Decryption",
        "txt-label-decrypt": "Select Encrypted File (.enc)",
        "txt-pass-label-decrypt": "Password:",
        "btnDecrypt": "Decrypt & View Image",
        "how-to-decrypt-title": "How to Restore Your Encrypted Images?",
        "dec-step1-d": "The process is 100% local; the browser uses the encryption key to decrypt data without uploading to any server."
    }
};

// الدالة الأساسية لتطبيق اللغة
function applyLanguage(lang) {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[lang];
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            // التحقق إذا كان العنصر Input لتغيير الـ Placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = t[id];
            } else {
                element.innerHTML = t[id];
            }
        }
    }
    localStorage.setItem('preferredLang', lang);
    
    // تحديث نص زر اللغة نفسه ليعرض اللغة المقابلة
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.innerHTML = t['lang-btn'];
}

function changeLanguage() {
    const currentLang = document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
}

// التشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    applyLanguage(savedLang);
});
