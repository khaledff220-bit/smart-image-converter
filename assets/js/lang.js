const translations = {
    ar: {
        "txt-logo": "مُحوِّل الصور الذكي",
        "lang-btn": "English",
        "txt-hero-title": "حوّل ملفاتك بذكاء المستقبل",
        "txt-hero-desc": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        "txt-s1-t": "حماية الصور", "txt-s1-d": "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.", "txt-s1-b": "ابدأ التشفير",
        "txt-s2-t": "فك التشفير", "txt-s2-d": "استرجع صورك الأصلية من ملفاتك المشفرة بسرعة وأمان تام.", "txt-s2-b": "فك التشفير الآن",
        "txt-s3-t": "تحسين الجودة", "txt-s3-d": "ضاعف دقة الصور الضبابية واجعلها أكثر ووضوحاً بضغطة زر.", "txt-s3-b": "حسن جودة صورتك",
        "txt-s4-t": "دمج PDF", "txt-s4-d": "اجمع عدة ملفات PDF في مستند واحد مرتب ومنسق.", "txt-s4-b": "دمج الملفات",
        "txt-s5-t": "ضغط PDF", "txt-s5-d": "قلل حجم مستنداتك دون التأثير على جودة النصوص والرسومات.", "txt-s5-b": "ضغط الملفات",
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة."
    },
    en: {
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "txt-hero-title": "Convert Files with Future AI",
        "txt-hero-desc": "Comprehensive platform for local file processing with 2026 tech.",
        "txt-s1-t": "Image Protection", "txt-s1-d": "Encrypt images with strong AES passwords localy.", "txt-s1-b": "Start Encrypting",
        "txt-s2-t": "Decryption", "txt-s2-d": "Securely recover your original images from encrypted files.", "txt-s2-b": "Decrypt Now",
        "txt-s3-t": "Quality Enhance", "txt-s3-d": "Double resolution of blurry images with one click.", "txt-s3-b": "Improve Quality",
        "txt-s4-t": "Merge PDF", "txt-s4-d": "Combine multiple PDF files into one organized document.", "txt-s4-b": "Merge Files",
        "txt-s5-t": "Compress PDF", "txt-s5-d": "Reduce file size without affecting quality.", "txt-s5-b": "Compress Files",
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
    }
};

function changeLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    
    htmlTag.setAttribute('lang', currentLang);
    htmlTag.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[currentLang];
    
    // هذه الحلقة تمر على كل مفتاح وترجمته بدلاً من كتابة كل سطر يدوياً
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = t[id];
        }
    }
}
