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

        // الصفحة الرئيسية (Hero Section)
        "txt-hero-title": "حوّل ملفاتك بذكاء المستقبل",
        "txt-hero-desc": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",

        // بطاقات الخدمات (الرئيسية)
        "txt-s1-t": "حماية الصور", 
        "txt-s1-d": "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.", 
        "txt-s1-b": "ابدأ التشفير",
        
        "txt-s2-t": "فك التشفير", 
        "txt-s2-d": "استرجع صورك الأصلية من ملفاتك المشفرة بسرعة وأمان تام.", 
        "txt-s2-b": "فك التشفير الآن",
        
        "txt-s3-t": "تحسين الجودة", 
        "txt-s3-d": "ضاعف دقة الصور الضبابية واجعلها أكثر ووضوحاً بضغطة زر.", 
        "txt-s3-b": "حسن جودة صورتك",
        
        "txt-s4-t": "دمج PDF", 
        "txt-s4-d": "اجمع عدة ملفات PDF في مستند واحد مرتب ومنسق.", 
        "txt-s4-b": "دمج الملفات",
        
        "txt-s5-t": "ضغط PDF", 
        "txt-s5-d": "قلل حجم مستنداتك دون التأثير على جودة النصوص والرسومات.", 
        "txt-s5-b": "ضغط الملفات",

        // صفحة حماية الصور (Password Protect)
        "txt-card-title": "حماية البيانات القوية",
        "txt-label": "اختر الصورة المراد حمايتها",
        "txt-pass-label": "تعيين كلمة المرور:",
        "txt-level-label": "مستوى التشفير:",
        "opt-high": "عالي (AES-256)",
        "opt-standard": "قياسي (AES-128)",
        "btnEncrypt": "تشفير وتحميل الملف",
        "pass-ph": "أدخل كلمة مرور قوية",

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
        "txt-s1-t": "Image Protection", 
        "txt-s1-d": "Encrypt images with strong AES passwords locally.", 
        "txt-s1-b": "Start Encrypting",
        
        "txt-s2-t": "Decryption", 
        "txt-s2-d": "Securely recover your original images from encrypted files.", 
        "txt-s2-b": "Decrypt Now",
        
        "txt-s3-t": "Quality Enhance", 
        "txt-s3-d": "Double resolution of blurry images with one click.", 
        "txt-s3-b": "Improve Quality",
        
        "txt-s4-t": "Merge PDF", 
        "txt-s4-d": "Combine multiple PDF files into one organized document.", 
        "txt-s4-b": "Merge Files",
        
        "txt-s5-t": "Compress PDF", 
        "txt-s5-d": "Reduce file size without affecting quality.", 
        "txt-s5-b": "Compress Files",

        // Password Protect Page
        "txt-card-title": "Strong Data Protection",
        "txt-label": "Choose image to protect",
        "txt-pass-label": "Set Password:",
        "txt-level-label": "Encryption Level:",
        "opt-high": "High (AES-256)",
        "opt-standard": "Standard (AES-128)",
        "btnEncrypt": "Encrypt & Download",
        "pass-ph": "Enter a strong password",

        // Footer
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
    }
};

function changeLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    
    // تغيير لغة الوثيقة واتجاه النص
    htmlTag.setAttribute('lang', currentLang);
    htmlTag.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[currentLang];
    
    // ترجمة جميع العناصر التي تمتلك ID مطابق للمفاتيح أعلاه
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            // إذا كان العنصر هو حقل إدخال كلمة المرور، نترجم الـ Placeholder أيضاً
            if (id === 'pass-ph' && document.getElementById('password')) {
                document.getElementById('password').placeholder = t[id];
            } else {
                element.innerText = t[id];
            }
        }
    }

    // حفظ اللغة المختارة في المتصفح (اختياري لضمان بقاء اللغة عند التنقل)
    localStorage.setItem('preferredLang', currentLang);
}

// تنفيذ اللغة المحفوظة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang !== document.documentElement.getAttribute('lang')) {
        changeLanguage(); 
    }
});
