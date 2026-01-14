/* ============================================
    ⚙️ المِحرك البرمجي الموحد (إصدار الدمج النهائي)
=============================================== */

// 1. دالة معاينة الصورة (عالمية)
function previewImage(input) {
    const file = input.files[0];
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const previewContainer = document.getElementById('previewContainer');
    const selectionPreview = document.getElementById('selectionPreview');

    if (file) {
        if (fileName) fileName.innerText = file.name;
        if (fileInfo) fileInfo.style.display = "block";

        if (file.type.startsWith('image/') || file.name.endsWith('.enc')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (selectionPreview) {
                    // إذا كان ملف مشفر لا نعرض صورة بل أيقونة قفل
                    selectionPreview.src = file.name.endsWith('.enc') ? 'assets/images/favicon.png' : e.target.result;
                    if (previewContainer) previewContainer.style.display = "block";
                }
            }
            reader.readAsDataURL(file);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const status = document.getElementById('status');
    const resultArea = document.getElementById('resultArea');
    const downloadLink = document.getElementById('downloadLink');

    // --- 2. منطق تحسين الجودة (Upscale) ---
    const btnUpscale = document.getElementById('btnUpscale');
    if (btnUpscale) {
        btnUpscale.addEventListener('click', () => {
            const fileInput = document.getElementById('fileUpload');
            const file = fileInput.files[0];
            if (!file) { status.innerText = "❌ يرجى اختيار صورة أولاً"; return; }
            status.innerText = "⏳ جاري المعالجة...";
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.getElementById('upscaledCanvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width * 2;
                    canvas.height = img.height * 2;
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    status.innerText = "✅ اكتمل التحسين!";
                    resultArea.style.display = "block";
                    downloadLink.href = canvas.toDataURL("image/png");
                    downloadLink.download = "upscaled_" + file.name;
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // --- 3. منطق التشفير (Encrypt) ---
    const btnEncrypt = document.getElementById('btnEncrypt');
    if (btnEncrypt) {
        btnEncrypt.addEventListener('click', () => {
            const fileInput = document.getElementById('fileUpload');
            const passwordInput = document.getElementById('password');
            if (!fileInput.files[0] || !passwordInput.value) {
                status.innerText = "❌ اختر صورة وأدخل كلمة مرور!";
                return;
            }
            status.innerText = "🔐 جاري التشفير...";
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const encrypted = CryptoJS.AES.encrypt(e.target.result, passwordInput.value).toString();
                    const blob = new Blob([encrypted], { type: 'text/plain' });
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = fileInput.files[0].name + ".enc";
                    resultArea.style.display = "block";
                    status.innerText = "✅ تم التشفير بنجاح!";
                } catch (err) { status.innerText = "❌ خطأ في التشفير!"; }
            };
            reader.readAsDataURL(fileInput.files[0]);
        });
    }

    // --- 4. منطق فك التشفير (Decrypt) ---
    const btnDecrypt = document.getElementById('btnDecrypt');
    if (btnDecrypt) {
        btnDecrypt.addEventListener('click', () => {
            const fileInput = document.getElementById('fileUpload');
            const passwordInput = document.getElementById('password');
            if (!fileInput.files[0] || !passwordInput.value) {
                status.innerText = "❌ اختر الملف وأدخل كلمة المرور!";
                return;
            }
            status.innerText = "🔓 جاري فك التشفير...";
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const decrypted = CryptoJS.AES.decrypt(e.target.result, passwordInput.value).toString(CryptoJS.enc.Utf8);
                    if (!decrypted) throw new Error();
                    const decryptedImage = document.getElementById('decryptedImage');
                    decryptedImage.src = decrypted;
                    decryptedImage.style.display = "block";
                    resultArea.style.display = "block";
                    downloadLink.href = decrypted;
                    downloadLink.download = "restored_image.png";
                    downloadLink.style.display = "inline-block";
                    status.innerText = "✅ تم فك التشفير!";
                } catch (err) { status.innerText = "❌ كلمة المرور خاطئة أو الملف معطوب!"; }
            };
            reader.readAsText(fileInput.files[0]);
        });
    }
});
