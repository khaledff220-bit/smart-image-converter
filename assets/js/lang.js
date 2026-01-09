const translations = {
    ar: {
        // القائمة العلوية
        "txt-logo": "مُحوِّل الصور الذكي",
        "lang-btn": "English",
        "m1": "الرئيسية", "m2": "🔒 حماية", "m3": "🔑 فك تشفير", "m4": "🖼️ جودة", "m5": "📄 دمج", "m6": "⚙️ ضغط",

        // الرئيسية
        "txt-hero-title": "حوّل ملفاتك بذكاء المستقبل",
        "txt-hero-desc": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        "txt-s1-t": "حماية الصور", "txt-s1-b": "ابدأ التشفير",
        "txt-s2-t": "فك التشفير", "txt-s2-b": "فك التشفير الآن",
        "txt-s3-t": "تحسين الجودة", "txt-s3-b": "حسن جودة صورتك",
        "txt-s4-t": "دمج PDF", "txt-s4-b": "دمج الملفات",
        "txt-s5-t": "ضغط PDF", "txt-s5-b": "ضغط الملفات",

        // صفحة الحماية وفك التشفير (مشترك وجديد)
        "txt-card-title": "حماية وفك تشفير البيانات",
        "txt-label": "اختر الملف المطلوب",
        "txt-pass-label": "كلمة المرور:",
        "txt-level-label": "مستوى التشفير:",
        "opt-high": "عالي (AES-256)", "opt-standard": "قياسي (AES-128)",
        "btnEncrypt": "تشفير وتحميل الملف",
        "btnDecrypt": "فك التشفير وعرض الصورة",
        "downloadLink": "تحميل الصورة المستعادة",
        "pass-ph": "أدخل كلمة المرور",

        // الفوتر
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة."
    },
    en: {
        // Navbar
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "m1": "Home", "m2": "🔒 Protect", "m3": "🔑 Decrypt", "m4": "🖼️ Quality", "m5": "📄 Merge", "m6": "⚙️ Compress",

        // Home
        "txt-hero-title": "Convert Files with Future AI",
        "txt-hero-desc": "Comprehensive platform for local file processing with 2026 tech.",
        "txt-s1-t": "Image Protection", "txt-s1-b": "Start Encrypting",
        "txt-s2-t": "Decryption", "txt-s2-b": "Decrypt Now",
        "txt-s3-t": "Quality Enhance", "txt-s3-b": "Improve Quality",
        "txt-s4-t": "Merge PDF", "txt-s4-b": "Merge Files",
        "txt-s5-t": "Compress PDF", "txt-s5-b": "Compress Files",

        // Protect & Decrypt Pages
        "txt-card-title": "Data Protection & Decryption",
        "txt-label": "Choose the required file",
        "txt-pass-label": "Password:",
        "txt-level-label": "Encryption Level:",
        "opt-high": "High (AES-256)", "opt-standard": "Standard (AES-128)",
        "btnEncrypt": "Encrypt & Download",
        "btnDecrypt": "Decrypt & View Image",
        "downloadLink": "Download Restored Image",
        "pass-ph": "Enter password",

        // Footer
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
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
            if (id === 'pass-ph' && document.getElementById('password')) {
                document.getElementById('password').placeholder = t[id];
            } else {
                element.innerText = t[id];
            }
        }
    }
    localStorage.setItem('preferredLang', currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== document.documentElement.getAttribute('lang')) {
        changeLanguage(); 
    }
});
