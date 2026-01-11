const translations = {
    ar: {
        "txt-logo": "مُحوِّل الصور الذكي",
        "lang-btn": "English",
        "m1": "الرئيسية", "m2": "🔒 حماية", "m3": "🔑 فك تشفير", "m4": "🖼️ جودة", "m5": "📄 دمج", "m6": "⚙️ ضغط",
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة.",

        // صفحة الدمج (PDF Merge)
        "txt-hero-title": "دمج ملفات PDF بسهولة",
        "txt-hero-desc": "اجمع عدة ملفات PDF في مستند واحد مرتب واحترافي بضغطة زر وبأمان تام.",
        "txt-card-title": "منظم المستندات الذكي",
        "txt-label": "اختر ملفات PDF لدمجها",
        "txt-list-title": "الملفات المختارة:",
        "btnMerge": "ابدأ دمج الملفات الآن",
        "txt-step-h": "🎬 كيفية دمج ملفات PDF خطوة بخطوة",
        "txt-step1-t": "الخطوة 1: اختيار الملفات",
        "txt-step1-d": "اضغط على زر 'اختر ملفات PDF' وحدد جميع المستندات التي ترغب في دمجها.",
        "txt-step2-t": "الخطوة 2: مراجعة القائمة",
        "txt-step2-d": "تأكد من ظهور أسماء كافة الملفات في القائمة للتأكد من جاهزيتها للدمج.",
        "txt-step3-t": "الخطوة 3: المعالجة المحلية",
        "txt-step3-d": "اضغط على 'ابدأ الدمج'. تتم العملية داخل متصفحك لضمان خصوصية بياناتك.",
        "txt-step4-t": "الخطوة 4: التحميل الفوري",
        "txt-step4-d": "سيقوم النظام بتجميع الصفحات وتحميل ملف PDF مدمج تلقائياً.",

        // صفحة الحماية (Password Protect)
        "txt-hero-title-protect": "تشفير الصور بخصوصية تامة",
        "txt-hero-desc-protect": "حول صورك إلى ملفات مشفرة لا يمكن فتحها إلا بكلمة مرور من اختيارك.",
        "txt-card-title-protect": "حماية البيانات القوية",
        "txt-label-protect": "اختر الصورة المراد حمايتها",
        "txt-pass-label": "تعيين كلمة المرور:",
        "txt-level-label": "مستوى التشفير:",
        "opt-high": "عالي (AES-256)",
        "opt-standard": "قياسي (AES-128)",
        "btnEncrypt": "تشفير وتحميل الملف",
        "txt-step-protect-h": "🛡️ كيف تحمي صورك بكلمة مرور مشفرة؟",
        "p-step1-t": "1. رفع الصورة",
        "p-step1-d": "اختر الصورة التي ترغب في حمايتها من جهازك، العملية تتم محلياً بالكامل.",
        "p-step2-t": "2. تعيين كلمة المرور",
        "p-step2-d": "أدخل كلمة مرور قوية. تذكرها جيداً لأنك ستحتاجها لفتح الصورة لاحقاً.",
        "p-step3-t": "3. التشفير العسكري",
        "p-step3-d": "نستخدم خوارزمية AES-256 لتشفير بيانات الصورة وتحويلها إلى ملف محمي.",
        "p-step4-t": "4. التحميل الآمن",
        "p-step4-d": "اضغط على زر التشفير وسيتم تحميل ملفك المحمي بصيغة .enc فوراً."
    },
    en: {
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "m1": "Home", "m2": "🔒 Protect", "m3": "🔑 Decrypt", "m4": "🖼️ Quality", "m5": "📄 Merge", "m6": "⚙️ Compress",
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved.",

        // PDF Merge Page
        "txt-hero-title": "Merge PDF Files Easily",
        "txt-hero-desc": "Combine multiple PDF files into one professional document with total security.",
        "txt-card-title": "Smart Document Organizer",
        "txt-label": "Choose PDF files to merge",
        "txt-list-title": "Selected Files:",
        "btnMerge": "Start Merging Now",
        "txt-step-h": "🎬 How to Merge PDF Files Step by Step",
        "txt-step1-t": "Step 1: Select Files",
        "txt-step1-d": "Click 'Choose PDF Files' and select all documents you want to merge.",
        "txt-step2-t": "Step 2: Review List",
        "txt-step2-d": "Make sure all file names appear in the list to ensure they are ready.",
        "txt-step3-t": "Step 3: Local Processing",
        "txt-step3-d": "Click 'Start Merge'. Processing happens in your browser for 100% privacy.",
        "txt-step4-t": "Step 4: Instant Download",
        "txt-step4-d": "The system will combine pages and download a single merged PDF automatically.",

        // Password Protect Page
        "txt-hero-title-protect": "Encrypt Images with Privacy",
        "txt-hero-desc-protect": "Turn your images into encrypted files that can only be opened with a password.",
        "txt-card-title-protect": "Strong Data Protection",
        "txt-label-protect": "Choose image to protect",
        "txt-pass-label": "Set Password:",
        "txt-level-label": "Encryption Level:",
        "opt-high": "High (AES-256)",
        "opt-standard": "Standard (AES-128)",
        "btnEncrypt": "Encrypt & Download",
        "txt-step-protect-h": "🛡️ How to Password Protect Your Images?",
        "p-step1-t": "1. Upload Image",
        "p-step1-d": "Select the image you want to protect. Processing is 100% local.",
        "p-step2-t": "2. Set Password",
        "p-step2-d": "Enter a strong password. You will need it to decrypt the image later.",
        "p-step3-t": "3. Military-Grade Encryption",
        "p-step3-d": "We use AES-256 to transform your image into a secure file.",
        "p-step4-t": "4. Secure Download",
        "p-step4-d": "Click encrypt and your protected .enc file will download instantly."
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
