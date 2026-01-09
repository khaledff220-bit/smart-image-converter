const translations = {
    ar: {
        // القائمة العلوية واللوجو
        "txt-logo": "مُحوِّل الصور الذكي",
        "lang-btn": "English",
        "m1": "الرئيسية", 
        "m2": "🔒 حماية", 
        "m3": "🔑 فك تشفير", 
        "m4": "🖼️ جودة", 
        "m5": "📄 دمج", 
        "m6": "⚙️ ضغط",

        // الصفحة الرئيسية (Hero)
        "txt-hero-title": "حوّل ملفاتك بذكاء المستقبل",
        "txt-hero-desc": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        
        // بطاقات الخدمات (الرئيسية)
        "txt-s1-t": "حماية الصور", "txt-s1-b": "ابدأ التشفير",
        "txt-s2-t": "فك التشفير", "txt-s2-b": "فك التشفير الآن",
        "txt-s3-t": "تحسين الجودة", "txt-s3-b": "حسن جودة صورتك",
        "txt-s4-t": "دمج PDF", "txt-s4-b": "دمج الملفات",
        "txt-s5-t": "ضغط PDF", "txt-s5-b": "ضغط الملفات",

        // صفحة حماية وفك التشفير وتحسين الجودة
        "txt-card-title": "معالجة البيانات المتقدمة",
        "txt-label": "اختر الملف المطلوب معالجته",
        "txt-pass-label": "كلمة المرور:",
        "txt-level-label": "مستوى التشفير:",
        "opt-high": "عالي (AES-256)", 
        "opt-standard": "قياسي (AES-128)",
        "btnEncrypt": "تشفير وتحميل الملف",
        "btnDecrypt": "فك التشفير وعرض الصورة",
        "btnImprove": "حسن جودة صورتك",
        "downloadLink": "تحميل الصورة المستعادة",
        "pass-ph": "أدخل كلمة المرور هنا",
        "txt-preview": "معاينة الصورة المختارة:",

        // الفوتر
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

        // Hero Section
        "txt-hero-title": "Convert Files with Future AI",
        "txt-hero-desc": "Comprehensive platform for local file processing with 2026 tech.",

        // Service Cards (Main)
        "txt-s1-t": "Image Protection", "txt-s1-b": "Start Encrypting",
        "txt-s2-t": "Decryption", "txt-s2-b": "Decrypt Now",
        "txt-s3-t": "Quality Enhance", "txt-s3-b": "Improve Quality",
        "txt-s4-t": "Merge PDF", "txt-s4-b": "Merge Files",
        "txt-s5-t": "Compress PDF", "txt-s5-b": "Compress Files",

        // Protect, Decrypt & Quality Pages
        "txt-card-title": "Advanced Data Processing",
        "txt-label": "Choose the file to process",
        "txt-pass-label": "Password:",
        "txt-level-label": "Encryption Level:",
        "opt-high": "High (AES-256)", 
        "opt-standard": "Standard (AES-128)",
        "btnEncrypt": "Encrypt & Download",
        "btnDecrypt": "Decrypt & View Image",
        "btnImprove": "Improve Image Quality",
        "downloadLink": "Download Restored Image",
        "pass-ph": "Enter password here",
        "txt-preview": "Selected Image Preview:",

        // Footer
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
    }
};

function changeLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    
    // تغيير الخصائص الأساسية للـ HTML
    htmlTag.setAttribute('lang', currentLang);
    htmlTag.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[currentLang];
    
    // ترجمة كافة العناصر بناءً على الـ ID
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            // معالجة خاصة لحقول الإدخال (Placeholder)
            if (id === 'pass-ph' && document.getElementById('password')) {
                document.getElementById('password').placeholder = t[id];
            } else {
                element.innerText = t[id];
            }
        }
    }
    
    // حفظ اللغة في الذاكرة المحلية
    localStorage.setItem('preferredLang', currentLang);
}

// التأكد من ضبط اللغة الصحيحة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== document.documentElement.getAttribute('lang')) {
        changeLanguage(); 
    }
});
