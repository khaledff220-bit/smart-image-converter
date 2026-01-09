/**
 * Smart Image Converter - App Logic 2026
 * نظام التشفير وتحسين الجودة محلياً
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- أولاً: منطق حماية الصور (التشفير) ---
    const fileInput = document.getElementById('imageUpload');
    const fileLabel = document.getElementById('txt-label');
    const passwordInput = document.getElementById('password');
    const btnEncrypt = document.getElementById('btnEncrypt');
    const statusDiv = document.getElementById('status');

    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                const fileSize = (e.target.files[0].size / 1024).toFixed(2);
                fileLabel.innerHTML = `✅ تم اختيار: <br><span style="color: #a29bfe;">${fileName} (${fileSize} KB)</span>`;
            }
        });
    }

    if (btnEncrypt) {
        btnEncrypt.addEventListener('click', async () => {
            const file = fileInput.files[0];
            const password = passwordInput.value;
            if (!file || !password) { alert("يرجى اختيار ملف وكلمة مرور!"); return; }

            statusDiv.innerText = "⏳ جاري التشفير...";
            const reader = new FileReader();
            reader.onload = (event) => {
                const encrypted = CryptoJS.AES.encrypt(event.target.result, password).toString();
                const blob = new Blob([encrypted], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `protected_${file.name}.enc`;
                link.click();
                statusDiv.innerText = "✅ تم التشفير والتحميل!";
            };
            reader.readAsDataURL(file);
        });
    }

    // --- ثانياً: محرك تحسين الجودة (تم نقله للداخل ليتم تفعيله) ---
    const qualityUpload = document.getElementById('qualityUpload');
    const btnImprove = document.getElementById('btnImprove');
    const imagePreview = document.getElementById('imagePreview');
    const previewContainer = document.getElementById('previewContainer');

    if (qualityUpload) {
        qualityUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.src = event.target.result;
                    previewContainer.style.display = 'block'; // إظهار حاوية المعاينة
                    if(statusDiv) statusDiv.innerText = "تم تحميل الصورة بنجاح ✅";
                }
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnImprove) {
        btnImprove.addEventListener('click', function() {
            if (!imagePreview || !imagePreview.src || imagePreview.src.includes('window.location.href')) {
                alert("يرجى اختيار صورة أولاً!");
                return;
            }

            if(statusDiv) statusDiv.innerText = "⏳ جاري المعالجة الرقمية للصور...";

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = imagePreview.src;

            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                
                // تطبيق فلاتر التحسين (Contrast & Sharpness)
                ctx.filter = 'contrast(1.1) brightness(1.05) saturate(1.1)';
                ctx.drawImage(img, 0, 0);
                
                const improvedUrl = canvas.toDataURL('image/jpeg', 1.0);
                const link = document.createElement('a');
                link.href = improvedUrl;
                link.download = "improved_image.jpg";
                link.click();
                
                if(statusDiv) statusDiv.innerText = "✅ اكتمل التحسين! تم تحميل الصورة.";
            };
        });
    }
});
