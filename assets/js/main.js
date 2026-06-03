/**
 * الملف الرئيسي - تهيئة جميع أدوات الموقع
 */

// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 بدء تهيئة الموقع...");
    
    // التحقق من وجود المكتبات
    if (typeof pdfjsLib !== 'undefined') {
        console.log("✅ PDF.js موجود");
    }
    if (typeof jspdf !== 'undefined') {
        console.log("✅ jsPDF موجود");
    }
    if (typeof PDFCompressor !== 'undefined') {
        console.log("✅ PDFCompressor موجود");
    }
    
    // تهيئة أداة ضغط PDF
    if (typeof window.initPDFCompressor === 'function') {
        console.log("✅ تم العثور على initPDFCompressor");
        window.initPDFCompressor("compress-pdf-container");
    } else {
        console.error("❌ initPDFCompressor غير موجود!");
    }
    
    // هنا يمكنك تهيئة الأدوات الأخرى
    // window.initImageQuality("image-quality-container");
    // window.initMergePDF("merge-pdf-container");
    // إلخ...
    
    console.log("✅ تم تهيئة جميع الأدوات بنجاح");
});
