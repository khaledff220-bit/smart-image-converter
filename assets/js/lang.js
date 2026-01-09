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

        // العناصر المشتركة في صفحات الأدوات
        "txt-card-title": "معالجة البيانات المتقدمة",
        "txt-label": "اختر الملف المطلوب معالجته",
        "txt-pass-label": "كلمة المرور:",
        "txt-level-label": "مستوى التشفير:",
        "opt-high": "عالي (AES-256)", 
        "opt-standard": "قياسي (AES-128)",
        "pass-ph": "أدخل كلمة المرور هنا",
        "txt-preview": "معاينة الملف المختارة:",
        "txt-list-title": "الملفات المختارة للدمج:",

        // أزرار الأكشن
        "btnEncrypt": "تشفير وتحميل الملف",
        "btnDecrypt": "فك التشفير وعرض الصورة",
        "btnImprove": "حسن جودة صورتك",
        "btnMerge": "ابدأ دمج الملفات الآن",
        "downloadLink": "تحميل الملف المستعاد",

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

        // Common Tool Elements
        "txt-card-title": "Advanced Data Processing",
        "txt-label": "Choose the file to process",
        "txt-pass-label": "Password:",
        "txt-level-label": "Encryption Level:",
        "opt-high": "High (AES-256)", 
        "opt-standard": "Standard (AES-128)",
        "pass-ph": "Enter password here",
        "txt-preview": "Selected file preview:",
        "txt-list-title": "Files selected for merging:",

        // Action Buttons
        "btnEncrypt": "Encrypt & Download",
        "btnDecrypt": "Decrypt & View Image",
        "btnImprove": "Improve Image Quality",
        "btnMerge": "Start Merging Now",
        "downloadLink": "Download Restored File",

        // Footer
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
    }
};

function changeLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    
    // ضبط اتجاه الصفحة واللغة
    htmlTag.setAttribute('lang', currentLang);
    htmlTag.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[currentLang];
    
    // تحديث كافة النصوص بناءً على الـ ID
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            // معالجة خاصة لحقول الإدخال لتغيير الـ Placeholder
            if (id === 'pass-ph' && document.getElementById('password')) {
                document.getElementById('password').placeholder = t[id];
            } else {
                element.innerText = t[id];
            }
        }
    }
    
    // حفظ التفضيلات في المتصفح
    localStorage.setItem('preferredLang', currentLang);
}

// تشغيل اللغة المحفوظة عند فتح أي صفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== document.documentElement.getAttribute('lang')) {
        // نقوم بتغيير اللغة بدون تبديل (Toggle) القيمة الحالية
        const htmlTag = document.documentElement;
        htmlTag.setAttribute('lang', savedLang);
        htmlTag.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
        
        const t = translations[savedLang];
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
    }
});
