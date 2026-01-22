/* ============================================
    🌍 نظام الترجمة الذكي - النسخة الشاملة 2026
=============================================== */

const translations = {
    ar: {
        // القائمة العلوية والشعار
        "txt-logo": "Smart Image Converter",
        "m1": "الرئيسية",
        "m2": "🔒 حماية",
        "m3": "🔑 فك",
        "m4": "🖼️ جودة",
        "m5": "📄 دمج",
        "m6": "⚙️ ضغط",
        "lang-btn": "English",

        // صفحة تحسين الجودة (image-quality.html)
        "txt-title-upscale-page": "تحسين جودة الصور - Smart Converter",
        "txt-hero-title-upscale": "تحسين جودة الصور",
        "txt-hero-desc-upscale": "تقنية 2026 لمعالجة البكسلات مباشرة في متصفحك.",
        "txt-label-upscale": "اضغط لاختيار صورة",
        "txt-preview-label": "المعاينة الحالية:",
        "txt-btn-upscale-start": "ابدأ التحسين الآمن",
        "txt-btn-download": "📥 تحميل الصورة المحسنة",
        "txt-privacy-title": "🔒 حماية وخصوصية بياناتك",
        "txt-privacy-desc": "تتم عملية تحسين الصور بالكامل داخل متصفحك. نحن لا نقوم برفع صورك إلى أي خادم خارجي، مما يضمن أماناً بنسبة 100%.",

        // الواجهة الرئيسية (index.html)
        "hero-h1": "حوّل ملفاتك بذكاء المستقبل",
        "hero-p": "منصة شاملة لمعالجة الصور والملفات محلياً بأمان تام وبتقنيات 2026",
        "card-protect-t": "حماية الصور",
        "card-protect-p": "قم بتشفير صورك بكلمة مرور قوية لا يمكن كسرها باستخدام تقنية AES.",
        "txt-s2-t": "فك التشفير",
        "txt-s2-d": "استرجع صورك الأصلية من ملفاتك المشفرة بسرعة وأمان تام.",
        "txt-s3-t": "تحسين الجودة",
        "txt-s3-d": "ضاعف دقة الصور الضبابية واجعلها أكثر وضوحاً بضغطة زر.",
        "txt-s4-t": "دمج PDF",
        "txt-s4-d": "اجمع عدة ملفات PDF في مستند واحد مرتب ومنسق.",
        "txt-s5-t": "ضغط PDF",
        "txt-s5-d": "قلل حجم مستنداتك دون التأثير على جودة النصوص والرسومات.",

        // أزرار الواجهة الرئيسية
        "txt-btn-encrypt": "تشفير الصور",
        "btnDecryptText": "استعادة الصور",
        "m5-btn": "ابدأ الدمج",
        "m6-btn": "تقليل الحجم",

        // قسم الحماية (password-protect.html)
        "txt-hero-title-encrypt": "تشفير الصور بخصوصية تامة",
        "txt-hero-desc-encrypt": "قم بحماية صورك محلياً باستخدام تقنية AES-256.",
        "txt-card-title-enc": "إنشاء طبقة حماية",
        "txt-label-encrypt": "اختر الصورة المراد حمايتها",
        "txt-pass-label-encrypt": "عيّن كلمة مرور قوية:",
        "how-it-works-title": "كيف تعمل تقنية الحماية لدينا؟",
        "enc-desc-detail": "نحن نستخدم بروتوكول AES-256، وهو المعيار العالمي لحماية البيانات.",

        // قسم فك التشفير (decrypt.html)
        "txt-hero-title-decrypt": "استعادة الصور المشفرة",
        "txt-hero-desc-decrypt": "أدخل الملف المشفر وكلمة المرور الصحيحة لاستعادة صورتك الأصلية.",
        "txt-card-title-dec": "فك حماية البيانات",
        "txt-label-decrypt": "اختر الملف المشفر (.enc)",
        "txt-pass-label-decrypt": "كلمة المرور:",

        // قسم دمج PDF (merge-pdf.html)
        "txt-hero-title-merge": "دمج ملفات PDF بسهولة",
        "txt-hero-desc-merge": "اجمع عدة ملفات PDF في مستند واحد مرتب واحترافي بضغطة زر وبأمان تام.",
        "txt-card-title-merge": "منظم المستندات الذكي",
        "txt-label-merge": "اختر ملفات PDF لدمجها",
        "txt-list-title": "الملفات المختارة:",
        "btn-merge-action": "ابدأ دمج الملفات الآن",
        "txt-step-h-merge": "🎬 كيفية دمج ملفات PDF خطوة بخطوة",
        "txt-step1-t-merge": "الخطوة 1: اختيار الملفات",
        "txt-step1-d-merge": "اضغط على زر 'اختر ملفات PDF' وحدد جميع المستندات التي ترغب في دمجها من جهازك.",
        "txt-step2-t-merge": "الخطوة 2: مراجعة القائمة",
        "txt-step2-d-merge": "تأكد من ظهور أسماء كافة الملفات في القائمة للتأكد من جاهزيتها للدمج.",
        "txt-step3-t-merge": "الخطوة 3: المعالجة المحلية",
        "txt-step3-d-merge": "اضغط على 'ابدأ الدمج'. تتم العملية داخل متصفحك لضمان خصوصية بياناتك.",
        "txt-step4-t-merge": "الخطوة 4: التحميل الفوري",
        "txt-step4-d-merge": "سيقوم النظام بتجميع الصفحات وتحميل ملف PDF مدمج تلقائياً على جهازك.",
	"file-info": "0 من 20 صورة",

	// قسم دمج PDF (تحديث الخيارات المفقودة)
        "btn-clear-merge": "مسح الكل",
        "txt-label-orient": "اتجاه الصفحة:",
        "txt-orient-v": "عمودي",
        "txt-orient-h": "أفقي",
        "txt-label-size": "حجم الصفحة:",
        "txt-check-numbers": "أرقام الصفحات",
        "txt-check-watermark": "علامة مائية",

	// الأدوات المتعلقة (Related Tools)
        "txt-related-title": "🛠️ أدوات أخرى قد تحتاجها:",
        "txt-related-compress": "ضغط PDF",
        "txt-related-compress-desc": "قلل حجم ملفاتك",
        "txt-related-protect": "حماية الصور",
        "txt-related-protect-desc": "أضف كلمة مرور",
        "txt-related-quality": "تحسين الجودة",
        "txt-related-quality-desc": "حسن صورك",

        // قسم ضغط PDF (compress-pdf.html)
        "txt-hero-title-compress": "تقليل حجم PDF",
        "txt-hero-desc-compress": "وفر مساحة التخزين عبر ضغط ملفات PDF مع الحفاظ على وضوح المحتوى.",
        "txt-card-title-compress": "ضاغط الملفات الذكي",
        "txt-label-compress": "اختر ملف PDF للضغط",
        "txt-orig-size": "حجم الملف الأصلي:",
        "txt-comp-size": "الحجم بعد الضغط:",
        "btn-compress-action": "بدء الضغط والتحميل",
        "txt-step-h-compress": "🎬 كيفية ضغط ملفات PDF خطوة بخطوة",
        "txt-step1-t-compress": "الخطوة 1: رفع الملف",
        "txt-step1-d-compress": "اختر ملف PDF الذي ترغب في تقليل حجمه من جهازك.",
        "txt-step2-t-compress": "الخطوة 2: تحليل الحجم",
        "txt-step2-d-compress": "سيقوم النظام بحساب الحجم الحالي وتقدير الحجم بعد الضغط.",
        "txt-step3-t-compress": "الخطوة 3: الضغط الآمن",
        "txt-step3-d-compress": "تتم عملية الضغط محلياً دون رفع الملف لأي خادم خارجي.",
        "txt-step4-t-compress": "الخطوة 4: التحميل",
        "txt-step4-d-compress": "بمجرد الانتهاء، سيتم تحميل النسخة المضغوطة تلقائياً.",

	// --- كود قسم ضغط PDF بالعربي ---
"txt-savings-label": "توفير مساحة:",
"txt-comp-level-title": "اختر مستوى الضغط:",
"txt-level-low": "منخفض",
"txt-level-low-desc": "جودة عالية جداً",
"txt-level-med": "متوسط",
"txt-level-med-desc": "توازن مثالي",
"txt-level-high": "عالي",
"txt-level-high-desc": "أصغر حجم ممكن",
"btn-reset-compress": "إعادة تعيين",
"txt-opt-img": "تحسين الصور داخل الملف",
"txt-rem-meta": "إزالة البيانات الوصفية (Metadata)",
"txt-comp-fonts": "ضغط الخطوط المدمجة",

        "txt-footer": "© 2026 محول الصور الذكي. جميع الحقوق محفوظة."
    },
    en: {
        // Navbar & Logo
        "txt-logo": "Smart Image Converter",
        "m1": "Home",
        "m2": "🔒 Protect",
        "m3": "🔑 Decrypt",
        "m4": "🖼️ Quality",
        "m5": "📄 Merge",
        "m6": "⚙️ Compress",
        "lang-btn": "عربي",

        // Image Quality Page (image-quality.html)
        "txt-title-upscale-page": "Image Upscaler - Smart Converter",
        "txt-hero-title-upscale": "AI Image Upscaling",
        "txt-hero-desc-upscale": "2026 technology to process pixels directly in your browser.",
        "txt-label-upscale": "Click to select an image",
        "txt-preview-label": "Current Preview:",
        "txt-btn-upscale-start": "Start Secure Upscale",
        "txt-btn-download": "📥 Download Enhanced Image",
        "txt-privacy-title": "🔒 Data Privacy & Protection",
        "txt-privacy-desc": "The upscaling process happens entirely in your browser. We never upload your images to any server, ensuring 100% security.",

        // Main Interface (index.html)
        "hero-h1": "Convert with Future Intelligence",
        "hero-p": "Comprehensive platform for local and secure file processing",
        "card-protect-t": "Image Protection",
        "card-protect-p": "Encrypt your images with strong AES technology.",
        "txt-s2-t": "Decryption",
        "txt-s2-d": "Restore original images from encrypted files safely.",
        "txt-s3-t": "Quality Boost",
        "txt-s3-d": "Double the resolution of blurry images instantly.",
        "txt-s4-t": "PDF Merge",
        "txt-s4-d": "Merge multiple PDF files into one organized document.",
        "txt-s5-t": "PDF Compress",
        "txt-s5-d": "Reduce file size without affecting document quality.",

        // Main Interface Buttons
        "txt-btn-encrypt": "Encrypt Image",
        "btnDecryptText": "Restore Image",
        "m5-btn": "Start Merging",
        "m6-btn": "Compress Now",

        // Protection Section
        "txt-hero-title-encrypt": "Secure Image Encryption",
        "txt-hero-desc-encrypt": "Protect your images locally using AES-256 technology.",
        "txt-card-title-enc": "Create Protection Layer",
        "txt-label-encrypt": "Choose image to protect",
        "txt-pass-label-encrypt": "Set a strong password:",
        "how-it-works-title": "How does it work?",
        "enc-desc-detail": "We use AES-256 protocol, the global standard for data protection.",

        // Decryption Section
        "txt-hero-title-decrypt": "Restore Encrypted Images",
        "txt-hero-desc-decrypt": "Enter the encrypted file and correct password.",
        "txt-card-title-dec": "Data Decryption",
        "txt-label-decrypt": "Select encrypted file (.enc)",
        "txt-pass-label-decrypt": "Password:",

        // PDF Merge Section (merge-pdf.html)
        "txt-hero-title-merge": "Merge PDF Files Easily",
        "txt-hero-desc-merge": "Combine multiple PDF files into one organized document instantly and securely.",
        "txt-card-title-merge": "Smart Document Organizer",
        "txt-label-merge": "Choose PDF files to merge",
        "txt-list-title": "Selected Files:",
        "btn-merge-action": "Start Merging Now",
        "txt-step-h-merge": "🎬 How to Merge PDF Step by Step",
        "txt-step1-t-merge": "Step 1: Select Files",
        "txt-step1-d-merge": "Click 'Choose PDF files' and select all documents you want to merge from your device.",
        "txt-step2-t-merge": "Step 2: Review List",
        "txt-step2-d-merge": "Make sure all file names appear in the list to ensure they are ready for merging.",
        "txt-step3-t-merge": "Step 3: Local Processing",
        "txt-step3-d-merge": "Click 'Start Merging'. The process happens in your browser to ensure data privacy.",
        "txt-step4-t-merge": "Step 4: Instant Download",
        "txt-step4-d-merge": "The system will combine pages and automatically download the merged PDF file.",

	// PDF Merge Section (Missing options)
        "btn-clear-merge": "Clear All",
        "txt-label-orient": "Page Orientation:",
        "txt-orient-v": "Portrait",
        "txt-orient-h": "Landscape",
        "txt-label-size": "Page Size:",
        "txt-check-numbers": "Page Numbers",
        "txt-check-watermark": "Watermark",
        
	"file-info": "0 of 20 images",

        // Related Tools
        "txt-related-title": "🛠️ Other tools you might need:",
        "txt-related-compress": "Compress PDF",
        "txt-related-compress-desc": "Reduce file size",
        "txt-related-protect": "Protect Images",
        "txt-related-protect-desc": "Add a password",
        "txt-related-quality": "Enhance Quality",
        "txt-related-quality-desc": "Improve your photos",


        // PDF Compress Section (compress-pdf.html)
        "txt-hero-title-compress": "Reduce PDF Size",
        "txt-hero-desc-compress": "Save storage space by compressing PDF files while maintaining content clarity.",
        "txt-card-title-compress": "Smart File Compressor",
        "txt-label-compress": "Choose PDF file to compress",
        "txt-orig-size": "Original File Size:",
        "txt-comp-size": "Compressed Size:",
        "btn-compress-action": "Start Compression & Download",
        "txt-step-h-compress": "🎬 How to Compress PDF Step by Step",
        "txt-step1-t-compress": "Step 1: Upload File",
        "txt-step1-d-compress": "Select the PDF file you want to reduce in size from your device.",
        "txt-step2-t-compress": "Step 2: Size Analysis",
        "txt-step2-d-compress": "The system will calculate the current size and estimate the compressed size.",
        "txt-step3-t-compress": "Step 3: Secure Compression",
        "txt-step3-d-compress": "The compression process happens locally without uploading to any external server.",
        "txt-step4-t-compress": "Step 4: Download",
        "txt-step4-d-compress": "Once finished, the compressed version will be downloaded automatically.",

// --- كود قسم ضغط PDF بالإنجليزي ---
"txt-savings-label": "Space Savings:",
"txt-comp-level-title": "Choose Compression Level:",
"txt-level-low": "Low",
"txt-level-low-desc": "Very High Quality",
"txt-level-med": "Medium",
"txt-level-med-desc": "Perfect Balance",
"txt-level-high": "High",
"txt-level-high-desc": "Smallest Size",
"btn-reset-compress": "Reset Tool",
"txt-opt-img": "Optimize images inside file",
"txt-rem-meta": "Remove Metadata",
"txt-comp-fonts": "Compress embedded fonts",

        "txt-footer": "© 2026 Smart Image Converter. All rights reserved."
    }
};

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const t = translations[lang];
    for (let id in t) {
        const el = document.getElementById(id);
        if (el) {
            if (el.tagName === 'INPUT') {
                el.placeholder = t[id];
            } else {
                el.innerText = t[id];
            }
        }
    }
    localStorage.setItem('preferredLang', lang);
}

function changeLanguage() {
    const currentLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(localStorage.getItem('preferredLang') || 'ar');
});
