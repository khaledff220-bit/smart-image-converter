const translations = {
    ar: {
        logo: "مُحوِّل الصور الذكي",
        btn: "English",
        dir: "rtl",
        // ترجمة القائمة العلوية (لأقسام الموقع)
        m1: "الرئيسية", m2: "🔒 حماية", m3: "🔑 تشفير", m4: "🖼️ جودة", m5: "📄 دمج", m6: "⚙️ ضغط",
        // نصوص الصفحة الرئيسية
        heroT_index: "حوّل ملفاتك بذكاء المستقبل",
        heroD_index: "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        // نصوص صفحة ضغط PDF
        heroT_compress: "تقليل حجم PDF",
        heroD_compress: "وفر مساحة التخزين عبر ضغط ملفات PDF مع الحفاظ على وضوح المحتوى."
    },
    en: {
        logo: "Smart Image Converter",
        btn: "عربي",
        dir: "ltr",
        // Navigation Menu Translation
        m1: "Home", m2: "🔒 Protect", m3: "🔑 Decrypt", m4: "🖼️ Quality", m5: "📄 Merge", m6: "⚙️ Compress",
        // Home Page Texts
        heroT_index: "Transform Files with Future Intel",
        heroD_index: "Secure local file processing platform - 2026 Tech",
        // Compress PDF Page Texts
        heroT_compress: "Compress PDF Size",
        heroD_compress: "Save storage space by compressing PDF files while maintaining quality."
    }
};

let currentLang = 'ar';

function changeLanguage() {
    currentLang = (currentLang === 'ar') ? 'en' : 'ar';
    applyTranslations();
}

function applyTranslations() {
    const langData = translations[currentLang];
    
    // 1. ترجمة اللوجو والزر
    if(document.getElementById('txt-logo')) document.getElementById('txt-logo').innerText = langData.logo;
    if(document.getElementById('lang-btn')) document.getElementById('lang-btn').innerText = langData.btn;

    // 2. ترجمة القائمة العلوية (إذا كانت موجودة في الصفحة)
    if(document.getElementById('m1')) document.getElementById('m1').innerText = langData.m1;
    if(document.getElementById('m2')) document.getElementById('m2').innerText = langData.m2;
    if(document.getElementById('m3')) document.getElementById('m3').innerText = langData.m3;
    if(document.getElementById('m4')) document.getElementById('m4').innerText = langData.m4;
    if(document.getElementById('m5')) document.getElementById('m5').innerText = langData.m5;
    if(document.getElementById('m6')) document.getElementById('m6').innerText = langData.m6;

    // 3. ترجمة نصوص الهيدر (تلقائياً حسب الصفحة)
    const hTitle = document.getElementById('txt-hero-title');
    const hDesc = document.getElementById('txt-hero-desc');

    if (hTitle && hDesc) {
        if (window.location.pathname.includes('compress-pdf.html')) {
            hTitle.innerText = langData.heroT_compress;
            hDesc.innerText = langData.heroD_compress;
        } else {
            hTitle.innerText = langData.heroT_index;
            hDesc.innerText = langData.heroD_index;
        }
    }
    
    // 4. تغيير اتجاه ولغة الصفحة
    document.documentElement.dir = langData.dir;
    document.documentElement.lang = currentLang;
}

// الفحص التلقائي للغة المتصفح عند التحميل
window.addEventListener('DOMContentLoaded', () => {
    let browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
        currentLang = 'en';
        applyTranslations();
    }
});
