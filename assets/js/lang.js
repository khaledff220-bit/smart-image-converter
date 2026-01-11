const translations = {
    ar: {
        "txt-logo": "SI Converter",
        "lang-btn": "English",
        "m1": "الرئيسية", "m2": "🔒 حماية", "m3": "🔑 فك", "m4": "🖼️ جودة", "m5": "📄 دمج",
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة.",
        
        // Protect Page
        "txt-hero-title-protect": "تشفير الصور بخصوصية تامة",
        "txt-hero-desc-protect": "حول صورك إلى ملفات مشفرة لا يمكن فتحها إلا بكلمة مرور.",
        "txt-label-protect": "اضغط لرفع الصورة المراد حمايتها",
        "txt-pass-label": "تعيين كلمة المرور:",
        "btnEncrypt": "تشفير وتحميل الملف الآمن",
        "txt-step-protect-h": "🛡️ دليل حماية الصور خطوة بخطوة",
        "p-step1-t": "1. رفع الصورة", "p-step1-d": "اختر صورتك الخاصة، العملية تتم في متصفحك فقط.",
        "p-step2-t": "2. القفل", "p-step2-d": "ضع كلمة سر قوية، الملف لن يفتح بدونها أبداً.",
        "p-step3-t": "3. التشفير", "p-step3-d": "يتم تحويل الصورة لبيانات غير مفهومة بتقنية AES-256.",
        "p-step4-t": "4. التحميل", "p-step4-d": "حمل الملف المشفر وشاركه بأمان تام."
    },
    en: {
        "txt-logo": "SI Converter",
        "lang-btn": "عربي",
        "m1": "Home", "m2": "🔒 Protect", "m3": "🔑 Decrypt", "m4": "🖼️ Quality", "m5": "📄 Merge",
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved.",

        // Protect Page
        "txt-hero-title-protect": "Encrypt Images Privately",
        "txt-hero-desc-protect": "Secure your images with a password only you know.",
        "txt-label-protect": "Click to upload image to protect",
        "txt-pass-label": "Set Password:",
        "btnEncrypt": "Encrypt & Download Secure File",
        "txt-step-protect-h": "🛡️ Step-by-Step Protection Guide",
        "p-step1-t": "1. Upload", "p-step1-d": "Select your image; processing is strictly local.",
        "p-step2-t": "2. Lock", "p-step2-d": "Set a strong password; it's the only way to open it.",
        "p-step3-t": "3. Encrypt", "p-step3-d": "Image data is secured using AES-256 encryption.",
        "p-step4-t": "4. Save", "p-step4-d": "Download your .enc file and share it safely."
    }
};

function changeLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    htmlTag.setAttribute('lang', currentLang);
    htmlTag.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[currentLang];
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === 'INPUT') element.placeholder = t[id];
            else element.innerText = t[id];
        }
    }
    localStorage.setItem('preferredLang', currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', savedLang);
    htmlTag.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    
    const t = translations[savedLang];
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === 'INPUT') element.placeholder = t[id];
            else element.innerText = t[id];
        }
    }
});
