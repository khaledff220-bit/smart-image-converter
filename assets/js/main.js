/**
 * الملف الرئيسي - تهيئة جميع أدوات الموقع
 * تم تحديثه ليشمل جميع الأدوات: ضغط PDF، تحسين جودة الصور، وغيرها
 */

// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 بدء تهيئة أدوات الموقع...");
    
    // التحقق من وجود المكتبات الأساسية
    if (typeof pdfjsLib !== 'undefined') {
        console.log("✅ PDF.js موجود");
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    } else {
        console.warn("⚠️ PDF.js غير موجود");
    }
    
    if (typeof jspdf !== 'undefined') {
        console.log("✅ jsPDF موجود");
    }
    
    // تأخير بسيط للتأكد من اكتمال تحميل جميع المكتبات
    setTimeout(() => {
        // 1. تهيئة أداة ضغط PDF
        if (typeof window.initPDFCompressor === 'function') {
            console.log("✅ تهيئة أداة ضغط PDF");
            window.initPDFCompressor("compress-pdf-container");
        } else {
            console.error("❌ initPDFCompressor غير موجود!");
        }
        
        // 2. تهيئة أداة تحسين جودة الصور
        if (typeof window.initimagequality === 'function') {
            console.log("✅ تهيئة أداة تحسين جودة الصور");
            window.initimagequality("image-quality-container");
        } else {
            console.error("❌ initimagequality غير موجود! تأكد من تحميل ملف image-optimizer.js");
        }
        
        // 3. تهيئة أداة دمج PDF (عند إضافتها)
        if (typeof window.initMergePDF === 'function') {
            console.log("✅ تهيئة أداة دمج PDF");
            window.initMergePDF("merge-pdf-container");
        }
        
        // 4. تهيئة أداة حماية الصور (عند إضافتها)
        if (typeof window.initPasswordProtect === 'function') {
            console.log("✅ تهيئة أداة حماية الصور");
            window.initPasswordProtect("password-protect-container");
        }
        
        // 5. تهيئة أداة فك التشفير (عند إضافتها)
        if (typeof window.initDecrypt === 'function') {
            console.log("✅ تهيئة أداة فك التشفير");
            window.initDecrypt("decrypt-container");
        }
        
        // 6. تهيئة أداة تحويل الصور إلى PDF (عند إضافتها)
        if (typeof window.initImageToPDF === 'function') {
            console.log("✅ تهيئة أداة تحويل الصور إلى PDF");
            window.initImageToPDF("image-to-pdf-container");
        }
        
        console.log("✅ تم الانتهاء من تهيئة جميع الأدوات المتاحة");
    }, 200);
});

console.log("✅ تم تحميل ملف main.js بنجاح");
