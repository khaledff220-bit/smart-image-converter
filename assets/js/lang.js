/* ============================================
    🌍 نظام الترجمة الذكي - النسخة الشاملة 2026
=============================================== */

const translations = {
    ar: {
        // القائمة العلوية والشعار
        "txt-logo": "Smart Image Converter",
        "m1": "الرئيسية",
        "m2": "🔒 حماية",
        "m3": "🔑 فك",
        "m4": "🖼️ جودة",
        "m5": "📄 دمج",
        "m6": "⚙️ ضغط",
        "lang-btn": "English",

        // صفحة تحسين الجودة (image-quality.html)
        "txt-title-upscale-page": "تحسين جودة الصور - Smart Converter",
        "txt-hero-title-upscale": "تحسين جودة الصور",
        "txt-hero-desc-upscale": "تقنية 2026 لمعالجة البكسلات مباشرة في متصفحك.",
        "txt-label-upscale": "اضغط لاختيار صورة",
        "txt-preview-label": "المعاينة الحالية:",
        "txt-btn-upscale-start": "ابدأ التحسين الآمن",
        "txt-btn-download": "📥 تحميل الصورة المحسنة",
        "txt-privacy-title": "🔒 حماية وخصوصية بياناتك",
        "txt-privacy-desc": "تتم عملية تحسين الصور بالكامل داخل متصفحك. نحن لا نقوم برفع صورك إلى أي خادم خارجي، مما يضمن أماناً بنسبة 100%.",

        // الواجهة الرئيسية (index.html)
        "hero-h1": "حوّل ملفاتك بذكاء المستقبل",
        "hero-p": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        "card-protect-t": "حماية الصور",
        "card-protect-p": "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.",
        "txt-s2-t": "فك التشفير",
        "txt-s2-d": "استرجع صورك الأصلية من ملفاتك المشفرة بسرعة وأمان تام.",
        "txt-s3-t": "تحسين الجودة",
        "txt-s3-d": "ضاعف دقة الصور الضبابية واجعلها أكثر وضوحاً بضغطة زر.",
        "txt-s4-t": "دمج PDF",
        "txt-s4-d": "اجمع عدة ملفات PDF في مستند واحد مرتب ومنسق.",
        "txt-s5-t": "ضغط PDF",
        "txt-s5-d": "قلل حجم مستنداتك دون التأثير على جودة النصوص والرسومات.",

        // أزرار الواجهة الرئيسية
        "txt-btn-encrypt": "تشفير الصور",
        "btnDecryptText": "استعادة الصور",
        "m5-btn": "ابدأ الدمج",
        "m6-btn": "تقليل الحجم",

        // قسم الحماية (password-protect.html)
        "txt-hero-title-encrypt": "تشفير الصور بخصوصية تامة",
        "txt-hero-desc-encrypt": "قم بحماية صورك محلياً باستخدام تقنية AES-256.",
        "txt-card-title-enc": "إنشاء طبقة حماية",
        "txt-label-encrypt": "اختر الصورة المراد حمايتها",
        "txt-pass-label-encrypt": "عيّن كلمة مرور قوية:",
        "how-it-works-title": "كيف تعمل تقنية الحماية لدينا؟",
        "enc-desc-detail": "نحن نستخدم بروتوكول AES-256، وهو المعيار العالمي لحماية البيانات.",

        // قسم فك التشفير (decrypt.html)
        "txt-hero-title-decrypt": "استعادة الصور المشفرة",
        "txt-hero-desc-decrypt": "أدخل الملف المشفر وكلمة المرور الصحيحة لاستعادة صورتك الأصلية.",
        "txt-card-title-dec": "فك حماية البيانات",
        "txt-label-decrypt": "اختر الملف المشفر (.enc)",
        "txt-pass-label-decrypt": "كلمة المرور:",

        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة."
    },
    en: {
        // Navbar & Logo
        "txt-logo": "Smart Image Converter",
        "m1": "Home",
        "m2": "🔒 Protect",
        "m3": "🔑 Decrypt",
        "m4": "🖼️ Quality",
        "m5": "📄 Merge",
        "m6": "⚙️ Compress",
        "lang-btn": "عربي",

        // Image Quality Page (image-quality.html)
        "txt-title-upscale-page": "Image Upscaler - Smart Converter",
        "txt-hero-title-upscale": "AI Image Upscaling",
        "txt-hero-desc-upscale": "2026 technology to process pixels directly in your browser.",
        "txt-label-upscale": "Click to select an image",
        "txt-preview-label": "Current Preview:",
        "txt-btn-upscale-start": "Start Secure Upscale",
        "txt-btn-download": "📥 Download Enhanced Image",
        "txt-privacy-title": "🔒 Data Privacy & Protection",
        "txt-privacy-desc": "The upscaling process happens entirely in your browser. We never upload your images to any server, ensuring 100% security.",

        // Main Interface (index.html)
        "hero-h1": "Convert with Future Intelligence",
        "hero-p": "Comprehensive platform for local and secure file processing",
        "card-protect-t": "Image Protection",
        "card-protect-p": "Encrypt your images with strong AES technology.",
        "txt-s2-t": "Decryption",
        "txt-s2-d": "Restore original images from encrypted files safely.",
        "txt-s3-t": "Quality Boost",
        "txt-s3-d": "Double the resolution of blurry images instantly.",
        "txt-s4-t": "PDF Merge",
        "txt-s4-d": "Merge multiple PDF files into one organized document.",
        "txt-s5-t": "PDF Compress",
        "txt-s5-d": "Reduce file size without affecting document quality.",

        // Main Interface Buttons
        "txt-btn-encrypt": "Encrypt Image",
        "btnDecryptText": "Restore Image",
        "m5-btn": "Start Merging",
        "m6-btn": "Compress Now",

        // Protection Section
        "txt-hero-title-encrypt": "Secure Image Encryption",
        "txt-hero-desc-encrypt": "Protect your images locally using AES-256 technology.",
        "txt-card-title-enc": "Create Protection Layer",
        "txt-label-encrypt": "Choose image to protect",
        "txt-pass-label-encrypt": "Set a strong password:",
        "how-it-works-title": "How does it work?",
        "enc-desc-detail": "We use AES-256 protocol, the global standard for data protection.",

        // Decryption Section
        "txt-hero-title-decrypt": "Restore Encrypted Images",
        "txt-hero-desc-decrypt": "Enter the encrypted file and correct password.",
        "txt-card-title-dec": "Data Decryption",
        "txt-label-decrypt": "Select encrypted file (.enc)",
        "txt-pass-label-decrypt": "Password:",

        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
    }
};

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const t = translations[lang];
    for (let id in t) {
        const el = document.getElementById(id);
        if (el) {
            if (el.tagName === 'INPUT') {
                el.placeholder = t[id];
            } else {
                el.innerText = t[id];
            }
        }
    }
    localStorage.setItem('preferredLang', lang);
}

function changeLanguage() {
    const currentLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(localStorage.getItem('preferredLang') || 'ar');
});
