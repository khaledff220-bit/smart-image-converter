/**
 * الملف الرئيسي - تهيئة جميع أدوات الموقع
 * الإصدار النهائي - يشمل جميع الأدوات الستة
 * 
 * قائمة الأدوات:
 * 1. ضغط PDF (compress-pdf)
 * 2. تحسين جودة الصور (image-quality)
 * 3. حماية الصور وتشفيرها (password-protect)
 * 4. فك تشفير الصور (decrypt)
 * 5. دمج PDF (merge-pdf)
 * 6. تحويل الصور إلى PDF (image-to-pdf)
 * 
 * تاريخ التحديث: 2026-06-03
 */

// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 ==========================================");
    console.log("🚀 بدء تهيئة أدوات Smart Image Converter");
    console.log("🚀 ==========================================");
    
    // تفعيل PDF.js Worker
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        console.log("✅ PDF.js worker configured");
    } else {
        console.warn("⚠️ PDF.js غير موجود - قد تؤثر على أدوات PDF");
    }
    
    // التحقق من وجود المكتبات الأساسية
    if (typeof CryptoJS !== 'undefined') {
        console.log("✅ CryptoJS (التشفير) موجود");
    } else {
        console.warn("⚠️ CryptoJS غير موجود - أدوات التشفير لن تعمل");
    }
    
    if (typeof jspdf !== 'undefined') {
        console.log("✅ jsPDF موجود");
    }
    
    console.log("📋 جاري تهيئة الأدوات...");
    
    // تأخير بسيط للتأكد من تحميل جميع المكتبات والملفات
    setTimeout(() => {
        let toolsInitialized = 0;
        let toolsFailed = 0;
        
        // ============================================
        // 1. تهيئة أداة ضغط PDF
        // ============================================
        if (typeof window.initPDFCompressor === 'function') {
            try {
                console.log("🔧 [1/6] تهيئة أداة ضغط PDF...");
                window.initPDFCompressor("compress-pdf-container");
                toolsInitialized++;
                console.log("✅ [1/6] أداة ضغط PDF جاهزة");
            } catch(e) {
                console.error("❌ [1/6] خطأ في تهيئة ضغط PDF:", e);
                toolsFailed++;
            }
        } else {
            console.warn("⚠️ [1/6] initPDFCompressor غير موجود - تأكد من تحميل pdf-compressor.js");
            toolsFailed++;
        }
        
        // ============================================
        // 2. تهيئة أداة تحسين جودة الصور
        // ============================================
        if (typeof window.initimagequality === 'function') {
            try {
                console.log("🔧 [2/6] تهيئة أداة تحسين جودة الصور...");
                window.initimagequality("image-quality-container");
                toolsInitialized++;
                console.log("✅ [2/6] أداة تحسين جودة الصور جاهزة");
            } catch(e) {
                console.error("❌ [2/6] خطأ في تهيئة تحسين الجودة:", e);
                toolsFailed++;
            }
        } else {
            console.warn("⚠️ [2/6] initimagequality غير موجود - تأكد من تحميل image-optimizer.js");
            toolsFailed++;
        }
        
        // ============================================
        // 3. تهيئة أداة حماية الصور (تشفير)
        // ============================================
        if (typeof window.initpasswordprotect === 'function') {
            try {
                console.log("🔧 [3/6] تهيئة أداة حماية الصور وتشفيرها...");
                window.initpasswordprotect("password-protect-container");
                toolsInitialized++;
                console.log("✅ [3/6] أداة حماية الصور جاهزة");
            } catch(e) {
                console.error("❌ [3/6] خطأ في تهيئة حماية الصور:", e);
                toolsFailed++;
            }
        } else {
            console.warn("⚠️ [3/6] initpasswordprotect غير موجود - تأكد من تحميل password-protect.js");
            toolsFailed++;
        }
        
        // ============================================
        // 4. تهيئة أداة فك تشفير الصور
        // ============================================
        if (typeof window.initdecrypt === 'function') {
            try {
                console.log("🔧 [4/6] تهيئة أداة فك تشفير الصور...");
                window.initdecrypt("decrypt-container");
                toolsInitialized++;
                console.log("✅ [4/6] أداة فك تشفير الصور جاهزة");
            } catch(e) {
                console.error("❌ [4/6] خطأ في تهيئة فك التشفير:", e);
                toolsFailed++;
            }
        } else {
            console.warn("⚠️ [4/6] initdecrypt غير موجود - تأكد من تحميل decrypt.js");
            toolsFailed++;
        }
        
        // ============================================
        // 5. تهيئة أداة دمج PDF
        // ============================================
        if (typeof window.initMergePDF === 'function') {
            try {
                console.log("🔧 [5/6] تهيئة أداة دمج PDF...");
                window.initMergePDF("merge-pdf-container");
                toolsInitialized++;
                console.log("✅ [5/6] أداة دمج PDF جاهزة");
            } catch(e) {
                console.error("❌ [5/6] خطأ في تهيئة دمج PDF:", e);
                toolsFailed++;
            }
        } else {
            console.warn("⚠️ [5/6] initMergePDF غير موجود - تأكد من تحميل merge-pdf.js");
            toolsFailed++;
        }
        
        // ============================================
        // 6. تهيئة أداة تحويل الصور إلى PDF
        // ============================================
        if (typeof window.initImageToPDF === 'function') {
            try {
                console.log("🔧 [6/6] تهيئة أداة تحويل الصور إلى PDF...");
                window.initImageToPDF("image-to-pdf-container");
                toolsInitialized++;
                console.log("✅ [6/6] أداة تحويل الصور إلى PDF جاهزة");
            } catch(e) {
                console.error("❌ [6/6] خطأ في تهيئة تحويل الصور إلى PDF:", e);
                toolsFailed++;
            }
        } else {
            console.warn("⚠️ [6/6] initImageToPDF غير موجود - تأكد من تحميل image-to-pdf.js");
            toolsFailed++;
        }
        
        // ============================================
        // تقرير نهائي عن حالة التهيئة
        // ============================================
        console.log("🚀 ==========================================");
        console.log(`📊 تقرير التهيئة: ${toolsInitialized} أداة تم تهيئتها بنجاح، ${toolsFailed} أداة فشلت`);
        
        if (toolsFailed === 0) {
            console.log("🎉 جميع الأدوات تعمل بشكل مثالي!");
        } else {
            console.log("⚠️ بعض الأدوات لم يتم تهيئتها - تأكد من تحميل جميع الملفات");
        }
        console.log("🚀 ==========================================");
        
    }, 250);
});

console.log("✅ main.js (الإصدار النهائي) تم تحميله بنجاح");
console.log("📅 تاريخ التحديث: 2026-06-03");
