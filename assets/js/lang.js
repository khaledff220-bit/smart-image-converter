const translations = {
    ar: {
        logo: "مُحوِّل الصور الذكي",
        btn: "English",
        dir: "rtl",
        m1: "الرئيسية", m2: "🔒 حماية", m3: "🔑 تشفير", m4: "🖼️ جودة", m5: "📄 دمج", m6: "⚙️ ضغط",
        heroT_compress: "تقليل حجم PDF",
        heroD_compress: "وفر مساحة التخزين عبر ضغط ملفات PDF مع الحفاظ على وضوح المحتوى.",
        cardT: "ضاغط الملفات الذكي",
        label: "اختر ملف PDF للضغط",
        origSize: "حجم الملف الأصلي:",
        compSize: "الحجم بعد الضغط:",
        actionBtn: "بدء الضغط والتحميل",
        footer: "© 2026 محول الصور الذكي."
    },
    en: {
        logo: "Smart Image Converter",
        btn: "عربي",
        dir: "ltr",
        m1: "Home", m2: "🔒 Protect", m3: "🔑 Decrypt", m4: "🖼️ Quality", m5: "📄 Merge", m6: "⚙️ Compress",
        heroT_compress: "Compress PDF Size",
        heroD_compress: "Save storage space by compressing PDF files while maintaining quality.",
        cardT: "Smart File Compressor",
        label: "Select PDF file to compress",
        origSize: "Original File Size:",
        compSize: "Compressed Size:",
        actionBtn: "Start Compression & Download",
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
    
    // ترجمة النصوص العامة
    if(document.getElementById('txt-logo')) document.getElementById('txt-logo').innerText = langData.logo;
    if(document.getElementById('lang-btn')) document.getElementById('lang-btn').innerText = langData.btn;
    if(document.getElementById('txt-footer')) document.getElementById('txt-footer').innerText = langData.footer;

    // ترجمة القائمة
    for(let i=1; i<=6; i++) {
        const m = document.getElementById('m' + i);
        if(m) m.innerText = langData['m' + i];
    }

    // ترجمة نصوص الصفحة الداخلية
    if (window.location.pathname.includes('compress-pdf.html')) {
        if(document.getElementById('txt-hero-title')) document.getElementById('txt-hero-title').innerText = langData.heroT_compress;
        if(document.getElementById('txt-hero-desc')) document.getElementById('txt-hero-desc').innerText = langData.heroD_compress;
        if(document.getElementById('txt-card-title')) document.getElementById('txt-card-title').innerText = langData.cardT;
        if(document.getElementById('txt-label')) document.getElementById('txt-label').innerText = langData.label;
        if(document.getElementById('txt-orig-size')) document.getElementById('txt-orig-size').innerText = langData.origSize;
        if(document.getElementById('txt-comp-size')) document.getElementById('txt-comp-size').innerText = langData.compSize;
        if(document.getElementById('txt-btn-action')) document.getElementById('txt-btn-action').innerText = langData.actionBtn;
    }
    
    document.documentElement.dir = langData.dir;
    document.documentElement.lang = currentLang;
}

window.addEventListener('DOMContentLoaded', () => {
    if (navigator.language.startsWith('en')) {
        currentLang = 'en';
        applyTranslations();
    }
});
