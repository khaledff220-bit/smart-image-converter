const translations = {
    ar: {
        logo: "مُحوِّل الصور الذكي",
        btn: "English",
        dir: "rtl",
        // القائمة العلوية
        m1: "الرئيسية", m2: "🔒 حماية", m3: "🔑 تشفير", m4: "🖼️ جودة", m5: "📄 دمج", m6: "⚙️ ضغط",
        // الصفحة الرئيسية (index.html)
        heroT_index: "حوّل ملفاتك بذكاء المستقبل",
        heroD_index: "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        // صفحة ضغط PDF (compress-pdf.html)
        heroT_compress: "تقليل حجم PDF",
        heroD_compress: "وفر مساحة التخزين عبر ضغط ملفات PDF مع الحفاظ على وضوح المحتوى.",
        cardT_compress: "ضاغط الملفات الذكي",
        label_compress: "اختر ملف PDF للضغط",
        origSize: "حجم الملف الأصلي:",
        compSize: "الحجم بعد الضغط:",
        actionBtn_compress: "بدء الضغط والتحميل",
        // صفحة فك التشفير (decrypt.html)
        heroT_decrypt: "استعادة صورك الأصلية",
        heroD_decrypt: "أدخل الملف المشفر وكلمة المرور الصحيحة لاسترجاع صورتك فوراً.",
        cardT_decrypt: "فك التشفير الآمن",
        label_decrypt: "اختر الملف المشفر (.enc)",
        passLabel: "كلمة المرور:",
        btnDecrypt: "فك التشفير الآن",
        fileSelected: "تم اختيار ملف مشفر:",
        // التذييل
        footer: "© 2026 محول الصور الذكي."
    },
    en: {
        logo: "Smart Image Converter",
        btn: "عربي",
        dir: "ltr",
        // Navigation Menu
        m1: "Home", m2: "🔒 Protect", m3: "🔑 Decrypt", m4: "🖼️ Quality", m5: "📄 Merge", m6: "⚙️ Compress",
        // Home Page
        heroT_index: "Transform Files with Future Intel",
        heroD_index: "Secure local file processing platform - 2026 Tech",
        // PDF Compression Page
        heroT_compress: "Compress PDF Size",
        heroD_compress: "Save storage space by compressing PDF files while maintaining quality.",
        cardT_compress: "Smart File Compressor",
        label_compress: "Select PDF file to compress",
        origSize: "Original File Size:",
        compSize: "Compressed Size:",
        actionBtn_compress: "Start Compression & Download",
        // Decrypt Page
        heroT_decrypt: "Restore Original Photos",
        heroD_decrypt: "Enter the encrypted file and correct password to retrieve your photo instantly.",
        cardT_decrypt: "Secure Decryption",
        label_decrypt: "Choose encrypted file (.enc)",
        passLabel: "Password:",
        btnDecrypt: "Decrypt Now",
        fileSelected: "Encrypted file selected:",
        // Footer
        footer: "© 2026 Smart Image Converter."
    }
};

let currentLang = 'ar';

function changeLanguage() {
    currentLang = (currentLang === 'ar') ? 'en' : 'ar';
    applyTranslations();
}

function applyTranslations() {
    const langData = translations[currentLang];
    const path = window.location.pathname;
    
    // 1. ترجمة العناصر الثابتة (اللوجو، الزر، الفوتر)
    if(document.getElementById('txt-logo')) document.getElementById('txt-logo').innerText = langData.logo;
    if(document.getElementById('lang-btn')) document.getElementById('lang-btn').innerText = langData.btn;
    if(document.getElementById('txt-footer')) document.getElementById('txt-footer').innerText = langData.footer;

    // 2. ترجمة القائمة العلوية
    for(let i=1; i<=6; i++) {
        const m = document.getElementById('m' + i);
        if(m) m.innerText = langData['m' + i];
    }

    // 3. ترجمة صفحة ضغط PDF
    if (path.includes('compress-pdf.html')) {
        updateText('txt-hero-title', langData.heroT_compress);
        updateText('txt-hero-desc', langData.heroD_compress);
        updateText('txt-card-title', langData.cardT_compress);
        updateText('txt-label', langData.label_compress);
        updateText('txt-orig-size', langData.origSize);
        updateText('txt-comp-size', langData.compSize);
        updateText('txt-btn-action', langData.actionBtn_compress);
    } 
    // 4. ترجمة صفحة فك التشفير
    else if (path.includes('decrypt.html')) {
        updateText('txt-hero-title', langData.heroT_decrypt);
        updateText('txt-hero-desc', langData.heroD_decrypt);
        updateText('txt-card-title', langData.cardT_decrypt);
        updateText('txt-label', langData.label_decrypt);
        updateText('txt-pass-label', langData.passLabel);
        updateText('btnDecrypt', langData.btnDecrypt);
        updateText('txt-file-selected', langData.fileSelected);
    }
    // 5. ترجمة الصفحة الرئيسية
    else {
        updateText('txt-hero-title', langData.heroT_index);
        updateText('txt-hero-desc', langData.heroD_index);
    }
    
    // ضبط اتجاه الصفحة
    document.documentElement.dir = langData.dir;
    document.documentElement.lang = currentLang;
}

// دالة مساعدة لتجنب الأخطاء إذا كان العنصر غير موجود
function updateText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

// التشغيل التلقائي عند التحميل
window.addEventListener('DOMContentLoaded', () => {
    if (navigator.language.startsWith('en')) {
        currentLang = 'en';
        applyTranslations();
    }
});
