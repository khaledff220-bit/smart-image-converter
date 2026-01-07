const translations = {
    ar: {
        logo: "مُحوِّل الصور الذكي",
        m1: "الرئيسية", m2: "🔒 حماية الصور", m3: "🔑 فك التشفير", m4: "🖼️ تحسين الجودة", m5: "📄 دمج PDF",
        heroT: "حوّل ملفاتك بذكاء المستقبل",
        btn: "English", dir: "rtl"
    },
    en: {
        logo: "Smart Image Converter",
        m1: "Home", m2: "🔒 Protect", m3: "🔑 Decrypt", m4: "🖼️ Quality", m5: "📄 Merge PDF",
        heroT: "Transform Files with Future Intel",
        btn: "عربي", dir: "ltr"
    }
};

let currentLang = 'ar';

function changeLanguage() {
    currentLang = (currentLang === 'ar') ? 'en' : 'ar';
    applyTranslations();
}

function applyTranslations() {
    const langData = translations[currentLang];
    
    // ترجمة النصوص العامة (تأكد من وجود هذه الـ IDs في كل الصفحات)
    if(document.getElementById('txt-logo')) document.getElementById('txt-logo').innerText = langData.logo;
    if(document.getElementById('m1')) document.getElementById('m1').innerText = langData.m1;
    if(document.getElementById('m2')) document.getElementById('m2').innerText = langData.m2;
    if(document.getElementById('m3')) document.getElementById('m3').innerText = langData.m3;
    if(document.getElementById('m4')) document.getElementById('m4').innerText = langData.m4;
    if(document.getElementById('m5')) document.getElementById('m5').innerText = langData.m5;
    if(document.getElementById('lang-btn')) document.getElementById('lang-btn').innerText = langData.btn;
    
    document.documentElement.dir = langData.dir;
}

// التحويل التلقائي عند التحميل
window.addEventListener('DOMContentLoaded', () => {
    if (navigator.language.startsWith('en')) {
        currentLang = 'en';
        applyTranslations();
    }
});
