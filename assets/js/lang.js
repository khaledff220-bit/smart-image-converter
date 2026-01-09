const translations = {
    ar: {
        logo: "مُحوِّل الصور الذكي",
        langBtn: "English",
        heroTitle: "حوّل ملفاتك بذكاء المستقبل",
        heroDesc: "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        s1t: "حماية الصور", s1d: "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.", s1b: "ابدأ التشفير",
        s2t: "فك التشفير", s2d: "استرجع صورك الأصلية من ملفاتك المشفرة بسرعة وأمان تام.", s2b: "فك التشفير الآن",
        s3t: "تحسين الجودة", s3d: "ضاعف دقة الصور الضبابية واجعلها أكثر ووضوحاً بضغطة زر.", s3b: "حسن جودة صورتك",
        s4t: "دمج PDF", s4d: "اجمع عدة ملفات PDF في مستند واحد مرتب ومنسق.", s4b: "دمج الملفات",
        s5t: "ضغط PDF", s5d: "قلل حجم مستنداتك دون التأثير على جودة النصوص والرسومات.", s5b: "ضغط الملفات",
        footer: "© 2026 محول الصور الذكي. جميع الحقوق محفوظة."
    },
    en: {
        logo: "Smart Image Converter",
        langBtn: "عربي",
        heroTitle: "Convert Your Files with Future AI",
        heroDesc: "A comprehensive platform to process images and files locally with 2026 technologies.",
        s1t: "Image Protection", s1d: "Encrypt your images with a strong password using unbreakable AES technology.", s1b: "Start Encrypting",
        s2t: "Decryption", s2d: "Quickly and securely recover your original images from encrypted files.", s2b: "Decrypt Now",
        s3t: "Quality Enhance", s3d: "Double the resolution of blurry images and make them clearer with one click.", s3b: "Improve Quality",
        s4t: "Merge PDF", s4d: "Combine multiple PDF files into one organized and formatted document.", s4b: "Merge Files",
        s5t: "Compress PDF", s5d: "Reduce the size of your documents without affecting text or graphic quality.", s5b: "Compress Files",
        footer: "© 2026 Smart Image Converter. All rights reserved."
    }
};

function changeLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    
    // تغيير الخصائص الأساسية
    htmlTag.setAttribute('lang', currentLang);
    htmlTag.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    // تحديث النصوص بناءً على الـ IDs
    const t = translations[currentLang];
    document.getElementById('txt-logo').innerText = t.logo;
    document.getElementById('lang-btn').innerText = t.langBtn;
    document.getElementById('txt-hero-title').innerText = t.heroTitle;
    document.getElementById('txt-hero-desc').innerText = t.heroDesc;
    
    // ترجمة الأقسام
    document.getElementById('txt-s1-t').innerText = t.s1t;
    document.getElementById('txt-s1-d').innerText = t.s1d;
    document.getElementById('txt-s1-b').innerText = t.s1b;
    
    document.getElementById('txt-s2-t').innerText = t.s2t;
    document.getElementById('txt-s2-d').innerText = t.s2d;
    document.getElementById('txt-s2-b').innerText = t.s2b;
    
    document.getElementById('txt-s3-t').innerText = t.s3t;
    document.getElementById('txt-s3-d').innerText = t.s3d;
    document.getElementById('txt-s3-b').innerText = t.s3b;
    
    document.getElementById('txt-s4-t').innerText = t.s4t;
    document.getElementById('txt-s4-d').innerText = t.s4d;
    document.getElementById('txt-s4-b').innerText = t.s4b;
    
    document.getElementById('txt-s5-t').innerText = t.s5t;
    document.getElementById('txt-s5-d').innerText = t.s5d;
    document.getElementById('txt-s5-b').innerText = t.s5b;
    
    document.getElementById('txt-footer').innerText = t.footer;
}
