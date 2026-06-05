/**
 * الملف الرئيسي - تحميل الأدوات فقط عند الحاجة
 */

// دالة لتحميل ملف JavaScript ديناميكياً
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// دالة لتحميل ملف CSS (إذا وجد)
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 بدء تهيئة الموقع (التحميل عند الطلب)");
    
    // تفعيل PDF.js Worker
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    
    // تهيئة نظام التنقل
    const sections = {
        home: document.getElementById('home'),
        'compress-pdf': document.getElementById('compress-pdf'),
        'merge-pdf': document.getElementById('merge-pdf'),
        'password-protect': document.getElementById('password-protect'),
        'decrypt': document.getElementById('decrypt'),
        'image-quality': document.getElementById('image-quality'),
        'image-to-pdf': document.getElementById('image-to-pdf')
    };
    
    // قائمة الأدوات وملفاتها
    const tools = {
        'compress-pdf': '/assets/js/pdf-compressor.js',
        'merge-pdf': '/assets/js/merge-pdf.js',
        'password-protect': '/assets/js/password-protect.js',
        'decrypt': '/assets/js/decrypt.js',
        'image-quality': '/assets/js/image-optimizer.js',
        'image-to-pdf': '/assets/js/image-to-pdf.js'
    };
    
    // تخزين الأدوات التي تم تحميلها
    const loadedTools = {};
    
    // دالة إظهار القسم
    async function showSection(sectionId) {
        console.log("📄 عرض القسم:", sectionId);
        
        // إخفاء جميع الأقسام
        Object.keys(sections).forEach(id => {
            if (sections[id]) sections[id].classList.remove('active');
        });
        
        // إظهار القسم المطلوب
        if (sections[sectionId]) sections[sectionId].classList.add('active');
        
        // إذا كانت أداة ولم يتم تحميلها بعد
        if (sectionId !== 'home' && !loadedTools[sectionId] && tools[sectionId]) {
            console.log(`📥 تحميل أداة: ${sectionId}`);
            try {
                await loadScript(tools[sectionId]);
                loadedTools[sectionId] = true;
                console.log(`✅ تم تحميل أداة: ${sectionId}`);
                
                // تهيئة الأداة بعد التحميل
                setTimeout(() => {
                    if (sectionId === 'compress-pdf' && typeof window.initPDFCompressor === 'function') {
                        window.initPDFCompressor("compress-pdf-container");
                    } else if (sectionId === 'merge-pdf' && typeof window.initMergePDF === 'function') {
                        window.initMergePDF("merge-pdf-container");
                    } else if (sectionId === 'password-protect' && typeof window.initpasswordprotect === 'function') {
                        window.initpasswordprotect("password-protect-container");
                    } else if (sectionId === 'decrypt' && typeof window.initdecrypt === 'function') {
                        window.initdecrypt("decrypt-container");
                    } else if (sectionId === 'image-quality' && typeof window.initimagequality === 'function') {
                        window.initimagequality("image-quality-container");
                    } else if (sectionId === 'image-to-pdf' && typeof window.initImageToPDF === 'function') {
                        window.initImageToPDF("image-to-pdf-container");
                    }
                }, 50);
            } catch (error) {
                console.error(`❌ فشل تحميل أداة: ${sectionId}`, error);
            }
        }
        
        // تحديث عنوان الصفحة
        const titles = {
            home: "الرئيسية - تحويل الصور إلى PDF وضغط PDF",
            'compress-pdf': "ضغط PDF - قلص حجم ملفات PDF مجاناً",
            'merge-pdf': "دمج PDF - ادمج عدة ملفات PDF",
            'image-to-pdf': "تحويل الصور إلى PDF - تحويل JPG و PNG",
            'image-quality': "تحسين جودة الصور - رفع دقة الصور",
            'password-protect': "حماية الصور - تشفير الصور",
            'decrypt': "فك تشفير الصور"
        };
        document.title = (titles[sectionId] || "Smart Image Converter") + " | Smart Image Converter";
    }
    
    // ربط روابط التنقل
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-nav');
            if (sectionId && sections[sectionId]) {
                await showSection(sectionId);
                history.pushState(null, '', '#' + sectionId);
            }
        });
    });
    
    // التعامل مع زر الرجوع
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        showSection(hash && sections[hash] ? hash : 'home');
    });
    
    // العرض الأولي
    const initialHash = window.location.hash.substring(1);
    showSection(initialHash && sections[initialHash] ? initialHash : 'home');
});

console.log("✅ main.js (التحميل الديناميكي) تم تحميله بنجاح");
