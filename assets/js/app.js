/* ============================================
    ⚙️ المحرك البرمجي الموحد - إصدار 2026
    (يشمل: نظام الترجمة + التشفير + تحسين الجودة)
=============================================== */

// --- 1. نظام الترجمة المدمج ---

/**
 * تطبيق اللغة المختارة على كافة عناصر الصفحة
 * @param {string} lang - رمز اللغة ('ar' أو 'en')
 */
function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // التأكد من وجود كائن الترجمات من ملف lang.js
    if (typeof translations !== 'undefined') {
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
    }
    localStorage.setItem('preferredLang', lang);
}

/**
 * التبديل بين اللغة العربية والإنجليزية
 */
function changeLanguage() {
    const currentLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
}

// --- 2. وظائف معالجة الملفات ---

/**
 * معاينة الصورة المختارة قبل المعالجة
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

        if (file.type.startsWith('image/') || file.name.endsWith('.enc')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (selectionPreview) {
                    // إذا كان ملف مشفر نعرض أيقونة افتراضية، وإلا نعرض الصورة
                    selectionPreview.src = file.name.endsWith('.enc') ? 'assets/images/favicon.png' : e.target.result;
                    if (previewContainer) previewContainer.style.display = "block";
                }
            }
            reader.readAsDataURL(file);
        }
    }
}

// --- 3. تشغيل المنطق عند تحميل الصفحة ---

document.addEventListener('DOMContentLoaded', () => {
    // تفعيل اللغة المفضلة فور التحميل
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    applyLanguage(savedLang);

    const status = document.getElementById('status');
    const resultArea = document.getElementById('resultArea');
    const downloadLink = document.getElementById('downloadLink');

    // --- منطق تحسين الجودة (Upscale) ---
    const btnUpscale = document.getElementById('btnUpscale');
    if (btnUpscale) {
        btnUpscale.addEventListener('click', () => {
            const fileInput = document.getElementById('fileUpload');
            const file = fileInput.files[0];
            if (!file) { 
                status.innerText = document.documentElement.lang === 'ar' ? "❌ يرجى اختيار صورة أولاً" : "❌ Please select an image first"; 
                return; 
            }
            status.innerText = document.documentElement.lang === 'ar' ? "⏳ جاري المعالجة..." : "⏳ Processing...";
            
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
                    
                    status.innerText = document.documentElement.lang === 'ar' ? "✅ اكتمل التحسين!" : "✅ Upscale Complete!";
                    if (resultArea) resultArea.style.display = "block";
                    if (downloadLink) {
                        downloadLink.href = canvas.toDataURL("image/png");
                        downloadLink.download = "upscaled_" + file.name;
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // --- منطق التشفير (Encrypt) ---
    const btnEncrypt = document.getElementById('btnEncrypt');
    if (btnEncrypt) {
        btnEncrypt.addEventListener('click', () => {
            const fileInput = document.getElementById('fileUpload');
            const passwordInput = document.getElementById('password');
            if (!fileInput.files[0] || !passwordInput.value) {
                status.innerText = document.documentElement.lang === 'ar' ? "❌ اختر صورة وأدخل كلمة مرور!" : "❌ Select image and enter password!";
                return;
            }
            status.innerText = document.documentElement.lang === 'ar' ? "🔐 جاري التشفير..." : "🔐 Encrypting...";
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const encrypted = CryptoJS.AES.encrypt(e.target.result, passwordInput.value).toString();
                    const blob = new Blob([encrypted], { type: 'text/plain' });
                    if (downloadLink) {
                        downloadLink.href = URL.createObjectURL(blob);
                        downloadLink.download = fileInput.files[0].name + ".enc";
                    }
                    if (resultArea) resultArea.style.display = "block";
                    status.innerText = document.documentElement.lang === 'ar' ? "✅ تم التشفير بنجاح!" : "✅ Encrypted successfully!";
                } catch (err) { 
                    status.innerText = "❌ Error!"; 
                }
            };
            reader.readAsDataURL(fileInput.files[0]);
        });
    }

    // --- منطق فك التشفير (Decrypt) ---
    const btnDecrypt = document.getElementById('btnDecrypt');
    if (btnDecrypt) {
        btnDecrypt.addEventListener('click', () => {
            const fileInput = document.getElementById('fileUpload');
            const passwordInput = document.getElementById('password');
            if (!fileInput.files[0] || !passwordInput.value) {
                status.innerText = document.documentElement.lang === 'ar' ? "❌ اختر الملف وأدخل كلمة المرور!" : "❌ Select file and enter password!";
                return;
            }
            status.innerText = document.documentElement.lang === 'ar' ? "🔓 جاري فك التشفير..." : "🔓 Decrypting...";
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const decrypted = CryptoJS.AES.decrypt(e.target.result, passwordInput.value).toString(CryptoJS.enc.Utf8);
                    if (!decrypted) throw new Error();
                    
                    const decryptedImage = document.getElementById('decryptedImage');
                    if (decryptedImage) {
                        decryptedImage.src = decrypted;
                        decryptedImage.style.display = "block";
                    }
                    if (resultArea) resultArea.style.display = "block";
                    if (downloadLink) {
                        downloadLink.href = decrypted;
                        downloadLink.download = "restored_image.png";
                        downloadLink.style.display = "inline-block";
                    }
                    status.innerText = document.documentElement.lang === 'ar' ? "✅ تم فك التشفير!" : "✅ Decrypted successfully!";
                } catch (err) { 
                    status.innerText = document.documentElement.lang === 'ar' ? "❌ كلمة المرور خاطئة!" : "❌ Wrong password!"; 
                }
            };
            reader.readAsText(fileInput.files[0]);
        });
    }
});
