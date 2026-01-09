const translations = {
    ar: {
        "txt-logo": "مُحوِّل الصور الذكي",
        "lang-btn": "English",
        "m1": "الرئيسية", "m2": "🔒 حماية", "m3": "🔑 فك تشفير", "m4": "🖼️ جودة", "m5": "📄 دمج", "m6": "⚙️ ضغط",
        "txt-hero-title": "دمج ملفات PDF بسهولة",
        "txt-hero-desc": "اجمع عدة ملفات PDF في مستند واحد مرتب واحترافي بضغطة زر وبأمان تام.",
        "txt-card-title": "منظم المستندات الذكي",
        "txt-label": "اختر ملفات PDF لدمجها",
        "txt-list-title": "الملفات المختارة:",
        "btnMerge": "ابدأ دمج الملفات الآن",
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة.",
        
        // خطوات التعليمات
        "txt-step-h": "🎬 كيفية دمج ملفات PDF خطوة بخطوة",
        "txt-step1-t": "الخطوة 1: اختيار الملفات",
        "txt-step1-d": "اضغط على زر 'اختر ملفات PDF' وحدد جميع المستندات التي ترغب في دمجها من جهازك.",
        "txt-step2-t": "الخطوة 2: مراجعة القائمة",
        "txt-step2-d": "تأكد من ظهور أسماء كافة الملفات في القائمة للتأكد من جاهزيتها للدمج.",
        "txt-step3-t": "الخطوة 3: المعالجة المحلية",
        "txt-step3-d": "اضغط على 'ابدأ الدمج'. تتم العملية داخل متصفحك لضمان خصوصية بياناتك.",
        "txt-step4-t": "الخطوة 4: التحميل الفوري",
        "txt-step4-d": "سيقوم النظام بتجميع الصفحات وتحميل ملف PDF مدمج تلقائياً على جهازك."
    },
    en: {
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "m1": "Home", "m2": "🔒 Protect", "m3": "🔑 Decrypt", "m4": "🖼️ Quality", "m5": "📄 Merge", "m6": "⚙️ Compress",
        "txt-hero-title": "Merge PDF Files Easily",
        "txt-hero-desc": "Combine multiple PDF files into one professional document with total security.",
        "txt-card-title": "Smart Document Organizer",
        "txt-label": "Choose PDF files to merge",
        "txt-list-title": "Selected Files:",
        "btnMerge": "Start Merging Now",
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved.",

        // Step Instructions
        "txt-step-h": "🎬 How to Merge PDF Files Step by Step",
        "txt-step1-t": "Step 1: Select Files",
        "txt-step1-d": "Click 'Choose PDF Files' and select all documents you want to merge from your device.",
        "txt-step2-t": "Step 2: Review List",
        "txt-step2-d": "Make sure all file names appear in the list to ensure they are ready for merging.",
        "txt-step3-t": "Step 3: Local Processing",
        "txt-step3-d": "Click 'Start Merge'. Processing happens in your browser to ensure data privacy.",
        "txt-step4-t": "Step 4: Instant Download",
        "txt-step4-d": "The system will combine pages and download a single merged PDF automatically."
    }
};

function changeLanguage() {
    const htmlTag = document.documentElement;
    const currentLang = htmlTag.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    htmlTag.setAttribute('lang', currentLang);
    htmlTag.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[currentLang];
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = t[id];
        }
    }
    localStorage.setItem('preferredLang', currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', savedLang);
    htmlTag.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    
    const t = translations[savedLang];
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) element.innerText = t[id];
    }
});
