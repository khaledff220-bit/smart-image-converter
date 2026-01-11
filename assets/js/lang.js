const translations = {
    ar: {
        // Navbar & General
        "txt-logo": "Smart Image Converter",
        "lang-btn": "English",
        "m1": "الرئيسية", "m2": "🔒 حماية", "m3": "🔑 فك", "m4": "🖼️ جودة", "m5": "📄 دمج", "m6": "⚙️ ضغط",
        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة.",

        // Index Page (الرئيسية)
        "hero-h1": "حوّل ملفاتك بذكاء المستقبل",
        "hero-p": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        "card-protect-t": "حماية الصور",
        "card-protect-p": "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.",
        "txt-s2-t": "فك التشفير", "txt-s2-d": "استرجع صورك الأصلية من ملفاتك المشفرة بسرعة وأمان تام.",
        "txt-s3-t": "تحسين الجودة", "txt-s3-d": "ضاعف دقة الصور الضبابية واجعلها أكثر ووضوحاً بضغطة زر.",
        "txt-s4-t": "دمج PDF", "txt-s4-d": "اجمع عدة ملفات PDF في مستند واحد مرتب ومنسق.",
        "txt-s5-t": "ضغط PDF", "txt-s5-d": "قلل حجم مستنداتك دون التأثير على جودة النصوص والرسومات.",

        // Protect Page (صفحة الحماية)
        "txt-hero-title-protect": "تشفير الصور بخصوصية تامة",
        "txt-hero-desc-protect": "قم بحماية صورك محلياً باستخدام تقنية AES-256.",
        "txt-label-protect": "اضغط هنا لرفع الصورة",
        "txt-pass-label": "كلمة المرور:",
        "btnEncrypt": "تشفير وتحميل",
        "password": "أدخل كلمة السر هنا...",
        "how-to-title": "كيفية حماية وتشفير صورك بخصوصية تامة؟",
        "step1-t": "1. الرفع المحلي والآمن",
        "step1-d": "اختر الصورة التي ترغب في حمايتها. يتم التشفير داخل متصفحك فقط لضمان خصوصية الصور المطلقة.",
        "step2-t": "2. قوة تشفير AES-256",
        "step2-d": "أدخل كلمة مرور قوية. نستخدم بروتوكول تشفير AES-256 العالمي لحماية البيانات الحساسة.",
        "step3-t": "3. تحميل الملف المشفر",
        "step3-d": "بضغط 'تشفير'، ستحصل على ملف .enc لا يمكن فتحه بدون كلمة المرور الصحيحة.",

        // Decrypt Page (صفحة فك التشفير - التحديث الجديد)
        "txt-title-dec-page": "فك تشفير الصور - استعادة صورك المحمية",
        "txt-hero-title-decrypt": "استعادة الصور المشفرة",
        "txt-hero-desc-decrypt": "أدخل الملف المشفر وكلمة المرور الصحيحة لاستعادة صورتك الأصلية فوراً.",
        "txt-label-decrypt": "اختر الملف المشفر (.enc)",
        "txt-pass-label-decrypt": "كلمة المرور:",
        "btnDecrypt": "فك التشفير وعرض الصورة",
        "how-to-decrypt-title": "كيف تقوم باستعادة صورك المشفرة؟",
        "dec-step1-t": "1. رفع ملف .enc",
        "dec-step1-d": "قم برفع الملف الذي قمت بتشفيره سابقاً. العملية تتم بالكامل داخل متصفحك لضمان عدم تسرب كلمة المرور.",
        "dec-step2-t": "2. فك التشفير اللحظي",
        "dec-step2-d": "عند إدخال كلمة المرور، تقوم الخوارزمية بمطابقة المفاتيح واستعادة البيانات الأصلية للصورة فوراً.",
        "dec-step3-t": "3. معاينة وحفظ",
        "dec-step3-d": "ستظهر لك معاينة للصورة المسترجعة. يمكنك التأكد منها ثم حفظها على جهازك مرة أخرى بصيغتها الأصلية."
    },
    en: {
        // Navbar & General
        "txt-logo": "Smart Image Converter",
        "lang-btn": "عربي",
        "m1": "Home", "m2": "🔒 Protect", "m3": "🔑 Decrypt", "m4": "🖼️ Quality", "m5": "📄 Merge", "m6": "⚙️ Compress",
        "txt-footer": "© 2026 Smart Image Converter. All rights reserved.",

        // Index Page
        "hero-h1": "Convert Files with Future Intelligence",
        "hero-p": "A comprehensive platform for local file processing with 2026 tech.",
        "card-protect-t": "Image Protection",
        "card-protect-p": "Encrypt your images with an unbreakable password using AES technology.",
        "txt-s2-t": "Decryption", "txt-s2-d": "Restore your original images from encrypted files quickly and safely.",
        "txt-s3-t": "Quality Enhance", "txt-s3-d": "Double the resolution of blurry images and make them clearer instantly.",
        "txt-s4-t": "Merge PDF", "txt-s4-d": "Combine multiple PDF files into one organized document.",
        "txt-s5-t": "Compress PDF", "txt-s5-d": "Reduce document size without affecting quality.",

        // Protect Page
        "txt-hero-title-protect": "Encrypt Images Privately",
        "txt-hero-desc-protect": "Secure your images locally using AES-256 technology.",
        "txt-label-protect": "Click here to upload image",
        "txt-pass-label": "Password:",
        "btnEncrypt": "Encrypt & Download",
        "password": "Enter password here...",
        "how-to-title": "How to Protect and Encrypt Your Images Privately?",
        "step1-t": "1. Local & Secure Upload",
        "step1-d": "Select the image you want to protect. Encryption happens inside your browser for total privacy.",
        "step2-t": "2. Strong AES-256 Encryption",
        "step2-d": "Enter a strong password. We use the global AES-256 encryption standard for sensitive data protection.",
        "step3-t": "3. Download Encrypted File",
        "step3-d": "By clicking 'Encrypt', you'll get a .enc file that cannot be opened without the correct password.",

        // Decrypt Page
        "txt-title-dec-page": "Image Decryption - Restore Protected Photos",
        "txt-hero-title-decrypt": "Restore Encrypted Images",
	"txt-card-title-dec": "Data Decryption",
        "txt-hero-desc-decrypt": "Enter the encrypted file and correct password to restore your original image instantly.",
        "txt-label-decrypt": "Select Encrypted File (.enc)",
        "txt-pass-label-decrypt": "Password:",
        "btnDecrypt": "Decrypt & View Image",
        "how-to-decrypt-title": "How to Restore Your Encrypted Images?",
        "dec-step1-t": "1. Upload .enc File",
        "dec-step1-d": "Upload the file you previously encrypted. The process happens entirely in your browser to ensure your password never leaks.",
        "dec-step2-t": "2. Instant Decryption",
        "dec-step2-d": "When you enter the password, the algorithm matches the keys and restores the original image data instantly.",
        "dec-step3-t": "3. Preview & Save",
        "dec-step3-d": "A preview of the restored image will appear. You can verify it and then save it back to your device in its original format."
    }
};

// الدالة المحدثة التي تدعم innerHTML و placeholders
function applyLanguage(lang) {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[lang];
    for (let id in t) {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = t[id];
            } else {
                // استخدام innerHTML يضمن ترجمة الفقرات الطويلة التي تحتوي على أرقام أو رموز
                element.innerHTML = t[id];
            }
        }
    }
    localStorage.setItem('preferredLang', lang);
}

function changeLanguage() {
    const currentLang = document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    applyLanguage(savedLang);
});
