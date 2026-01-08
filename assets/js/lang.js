const translations = {
    ar: {
        logo: "مُحوِّل الصور الذكي",
        btn: "English",
        dir: "rtl",
        m1: "الرئيسية", m2: "🔒 حماية", m3: "🔑 تشفير", m4: "🖼️ جودة", m5: "📄 دمج", m6: "⚙️ ضغط",
        // index.html
        heroT_index: "حوّل ملفاتك بذكاء المستقبل",
        heroD_index: "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        // compress-pdf.html
        heroT_compress: "تقليل حجم PDF",
        heroD_compress: "وفر مساحة التخزين عبر ضغط ملفات PDF مع الحفاظ على وضوح المحتوى.",
        cardT_compress: "ضاغط الملفات الذكي",
        label_compress: "اختر ملف PDF للضغط",
        origSize: "حجم الملف الأصلي:",
        compSize: "الحجم بعد الضغط:",
        actionBtn_compress: "بدء الضغط والتحميل",
        // decrypt.html
        heroT_decrypt: "استعادة صورك الأصلية",
        heroD_decrypt: "أدخل الملف المشفر وكلمة المرور الصحيحة لاسترجاع صورتك فوراً.",
        cardT_decrypt: "فك التشفير الآمن",
        label_decrypt: "اختر الملف المشفر (.enc)",
        passLabel: "كلمة المرور:",
        btnDecrypt: "فك التشفير الآن",
        fileSelected: "تم اختيار ملف مشفر:",
        // password-protect.html
        heroT_protect: "تشفير الصور بخصوصية تامة",
        heroD_protect: "حول صورك إلى ملفات مشفرة لا يمكن فتحها إلا بكلمة مرور من اختيارك.",
        cardT_protect: "حماية البيانات القوية",
        label_protect: "اختر الصورة المراد حمايتها",
        passSet: "تعيين كلمة المرور:",
        encryptLevel: "مستوى التشفير:",
        optHigh: "عالي (AES-256)",
        optStandard: "قياسي (AES-128)",
        btnEncrypt: "تشفير وتحميل الملف",
        // image-quality.html
        heroT_quality: "زيادة وضوح الصور",
        heroD_quality: "استخدم تقنيات المعالجة الرقمية لتحويل الصور الضبابية إلى صور أكثر حدة ووضوحاً.",
        cardT_quality: "محسن الدقة الذكي",
        label_quality: "ارفع الصورة لتحسينها",
        preview: "تم اختيار الصورة:",
        btnImprove: "حسن جودة صورتك",
        // Footer
        footer: "© 2026 محول الصور الذكي."
    },
    en: {
        logo: "Smart Image Converter",
        btn: "عربي",
        dir: "ltr",
        m1: "Home", m2: "🔒 Protect", m3: "🔑 Decrypt", m4: "🖼️ Quality", m5: "📄 Merge", m6: "⚙️ Compress",
        // index.html
        heroT_index: "Transform Files with Future Intel",
        heroD_index: "Secure local file processing platform - 2026 Tech",
        // compress-pdf.html
        heroT_compress: "Compress PDF Size",
        heroD_compress: "Save storage space by compressing PDF files while maintaining quality.",
        cardT_compress: "Smart File Compressor",
        label_compress: "Select PDF file to compress",
        origSize: "Original File Size:",
        compSize: "Compressed Size:",
        actionBtn_compress: "Start Compression & Download",
        // decrypt.html
        heroT_decrypt: "Restore Original Photos",
        heroD_decrypt: "Enter the encrypted file and correct password to retrieve your photo instantly.",
        cardT_decrypt: "Secure Decryption",
        label_decrypt: "Choose encrypted file (.enc)",
        passLabel: "Password:",
        btnDecrypt: "Decrypt Now",
        fileSelected: "Encrypted file selected:",
        // password-protect.html
        heroT_protect: "Encrypted Image Privacy",
        heroD_protect: "Convert your photos into encrypted files that can only be opened with your password.",
        cardT_protect: "Strong Data Protection",
        label_protect: "Choose image to protect",
        passSet: "Set Password:",
        encryptLevel: "Encryption Level:",
        optHigh: "High (AES-256)",
        optStandard: "Standard (AES-128)",
        btnEncrypt: "Encrypt & Download File",
        // image-quality.html
        heroT_quality: "Upscale Image Quality",
        heroD_quality: "Use digital processing techniques to transform blurry images into sharper, clearer ones.",
        cardT_quality: "AI Quality Enhancer",
        label_quality: "Upload image to enhance",
        preview: "Image selected:",
        btnImprove: "Enhance Your Photo",
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
    
    updateText('txt-logo', langData.logo);
    updateText('lang-btn', langData.btn);
    updateText('txt-footer', langData.footer);

    for(let i=1; i<=6; i++) {
        updateText('m' + i, langData['m' + i]);
    }

    if (path.includes('compress-pdf.html')) {
        updateText('txt-hero-title', langData.heroT_compress);
        updateText('txt-hero-desc', langData.heroD_compress);
        updateText('txt-card-title', langData.cardT_compress);
        updateText('txt-label', langData.label_compress);
        updateText('txt-orig-size', langData.origSize);
        updateText('txt-comp-size', langData.compSize);
        updateText('txt-btn-action', langData.actionBtn_compress);
    } 
    else if (path.includes('decrypt.html')) {
        updateText('txt-hero-title', langData.heroT_decrypt);
        updateText('txt-hero-desc', langData.heroD_decrypt);
        updateText('txt-card-title', langData.cardT_decrypt);
        updateText('txt-label', langData.label_decrypt);
        updateText('txt-pass-label', langData.passLabel);
        updateText('btnDecrypt', langData.btnDecrypt);
        updateText('txt-file-selected', langData.fileSelected);
    }
    else if (path.includes('password-protect.html')) {
        updateText('txt-hero-title', langData.heroT_protect);
        updateText('txt-hero-desc', langData.heroD_protect);
        updateText('txt-card-title', langData.cardT_protect);
        updateText('txt-label', langData.label_protect);
        updateText('txt-pass-label', langData.passSet);
        updateText('txt-level-label', langData.encryptLevel);
        updateText('opt-high', langData.optHigh);
        updateText('opt-standard', langData.optStandard);
        updateText('btnEncrypt', langData.btnEncrypt);
    }
    else if (path.includes('image-quality.html')) {
        updateText('txt-hero-title', langData.heroT_quality);
        updateText('txt-hero-desc', langData.heroD_quality);
        updateText('txt-card-title', langData.cardT_quality);
        updateText('txt-label', langData.label_quality);
        updateText('txt-preview', langData.preview);
        updateText('btnImprove', langData.btnImprove);
    }
    else {
        updateText('txt-hero-title', langData.heroT_index);
        updateText('txt-hero-desc', langData.heroD_index);
    }
    
    document.documentElement.dir = langData.dir;
    document.documentElement.lang = currentLang;
}

function updateText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

window.addEventListener('DOMContentLoaded', () => {
    if (navigator.language.startsWith('en')) {
        currentLang = 'en';
        applyTranslations();
    }
});
