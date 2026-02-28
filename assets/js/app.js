/* ============================================
    ⚙️ المنسق العام (Orchestrator) - إصدار 2026
    يربط الواجهة بالمحركات الاحترافية (Optimizer & Processor)
=============================================== */

// تجهيز المحركات الاحترافية
const optimizer = new ImageOptimizer();
const processor = new FileProcessor();

/**
 * 1. معاينة الصورة المختارة (تأكد من بقائها لأنها تربط الـ HTML بالمعاينة)
 */
function previewImage(input) {
    const file = input.files[0];
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const previewContainer = document.getElementById('previewContainer');
    const selectionPreview = document.getElementById('selectionPreview');

    if (file) {
        if (fileName) fileName.innerText = file.name;
        if (fileInfo) fileInfo.style.display = "block";

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (selectionPreview) {
                    selectionPreview.src = e.target.result;
                    if (previewContainer) previewContainer.style.display = "block";
                }
            };
            reader.readAsDataURL(file);
        }
    }
}

/**
 * 2. تشغيل المنطق عند تحميل الصفحة
 */
document.addEventListener('DOMContentLoaded', () => {
    const status = document.getElementById('status');
    const resultArea = document.getElementById('resultArea');
    const downloadLink = document.getElementById('downloadLink');

    // --- منطق تحسين الجودة (استدعاء المحرك الاحترافي) ---
    const btnUpscale = document.getElementById('btnUpscale');
    if (btnUpscale) {
        btnUpscale.addEventListener('click', async () => {
            const fileInput = document.getElementById('fileUpload');
            const file = fileInput.files[0];

            if (!file) {
                status.innerText = "❌ يرجى اختيار صورة أولاً";
                return;
            }

            status.innerText = "⏳ جاري التحليل الذكي وتحسين البكسلات...";

            const reader = new FileReader();
            reader.onload = async function(e) {
                const img = new Image();
                img.onload = async function() {
                    const canvas = document.getElementById('upscaledCanvas');
                    const ctx = canvas.getContext('2d');
                    
                    // إعداد الأبعاد الأولية
                    canvas.width = img.width * 2;
                    canvas.height = img.height * 2;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // 🔥 هنا السحر: استدعاء المحرك المتقدم بدلاً من الكود القديم
                    await optimizer.optimizeCanvas(canvas);

                    status.innerText = "✅ اكتمل التحسين الاحترافي!";
                    if (resultArea) resultArea.style.display = "block";
                    if (downloadLink) {
                        downloadLink.href = canvas.toDataURL("image/png");
                        downloadLink.download = "pro_enhanced_" + file.name;
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // ملاحظة: يمكنك إضافة مستمعات التشفير (btnEncrypt) هنا بنفس الطريقة 
    // باستدعاء كود التشفير من ملفاته الخاصة.
});
