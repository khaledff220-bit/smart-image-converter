/* ============================================
   ⚙️ المِحرك البرمجي - Smart Image Converter
=============================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. عناصر صفحة التشفير
    const btnEncrypt = document.getElementById('btnEncrypt'); // تأكد من وجود هذا الـ ID في HTML
    const fileUpload = document.getElementById('fileUpload');
    const passwordInput = document.getElementById('password');
    const status = document.getElementById('status');
    const resultArea = document.getElementById('resultArea');
    const downloadLink = document.getElementById('downloadLink');

    // دالة التشفير
    if (btnEncrypt) {
        btnEncrypt.addEventListener('click', async () => {
            const file = fileUpload.files[0];
            const password = passwordInput.value;

            if (!file || !password) {
                status.innerText = document.documentElement.lang === 'ar' ? "❌ يرجى اختيار صورة وادخال كلمة مرور!" : "❌ Please select an image and enter a password!";
                status.style.color = "var(--danger)";
                return;
            }

            status.innerText = document.documentElement.lang === 'ar' ? "⏳ جاري التشفير..." : "⏳ Encrypting...";
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const rawData = e.target.result;
                // تشفير البيانات باستخدام CryptoJS
                const encrypted = CryptoJS.AES.encrypt(rawData, password).toString();
                
                // تجهيز ملف التحميل
                const blob = new Blob([encrypted], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                
                downloadLink.href = url;
                downloadLink.download = file.name + ".enc";
                
                // إظهار النتائج
                status.innerText = document.documentElement.lang === 'ar' ? "✅ تم التشفير بنجاح!" : "✅ Encryption Successful!";
                status.style.color = "var(--neon-blue)";
                resultArea.style.display = "block";
                downloadLink.style.display = "inline-flex";
            };
            reader.readAsDataURL(file);
        });
    }

    // 2. عناصر صفحة فك التشفير
    const btnDecrypt = document.getElementById('btnDecrypt');
    const decryptedImage = document.getElementById('decryptedImage');

    if (btnDecrypt) {
        btnDecrypt.addEventListener('click', () => {
            const file = fileUpload.files[0];
            const password = passwordInput.value;

            if (!file || !password) {
                status.innerText = document.documentElement.lang === 'ar' ? "❌ يرجى رفع الملف المشفر وكلمة المرور" : "❌ Please upload the .enc file and password";
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const encryptedData = e.target.result;
                    const decrypted = CryptoJS.AES.decrypt(encryptedData, password).toString(CryptoJS.enc.Utf8);
                    
                    if (!decrypted) throw new Error();

                    decryptedImage.src = decrypted;
                    decryptedImage.style.display = "block";
                    status.innerText = "✅ تم استعادة الصورة";
                    
                    // إعداد رابط التحميل للصورة المفكوكة
                    downloadLink.href = decrypted;
                    downloadLink.download = "restored_image.png";
                    downloadLink.style.display = "inline-flex";
                } catch (error) {
                    status.innerText = "❌ كلمة مرور خاطئة أو ملف تالف!";
                    status.style.color = "var(--danger)";
                }
            };
            reader.readAsText(file);
        });
    }
});
