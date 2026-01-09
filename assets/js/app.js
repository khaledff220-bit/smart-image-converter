/**
 * Smart Image Converter - App Logic 2026
 * نظام التشفير وحماية البيانات محلياً (Client-Side)
 */

document.addEventListener('DOMContentLoaded', () => {
    // تعريف العناصر الأساسية
    const fileInput = document.getElementById('imageUpload');
    const fileLabel = document.getElementById('txt-label');
    const passwordInput = document.getElementById('password');
    const btnEncrypt = document.getElementById('btnEncrypt');
    const statusDiv = document.getElementById('status');

    // 1. مراقب اختيار الملف (إظهار اسم الملف المختار)
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                const fileSize = (e.target.files[0].size / 1024).toFixed(2);
                
                // تحديث النص ليظهر اسم الملف وحجمه
                fileLabel.innerHTML = `✅ تم اختيار: <br><span style="color: #a29bfe;">${fileName} (${fileSize} KB)</span>`;
                statusDiv.innerText = "جاهز للتشفير.. أدخل كلمة المرور واضغط زر التشفير";
                statusDiv.style.color = "#a29bfe";
            }
        });
    }

    // 2. منطق التشفير وتحميل الملف
    if (btnEncrypt) {
        btnEncrypt.addEventListener('click', async () => {
            const file = fileInput.files[0];
            const password = passwordInput.value;
            const encryptionLevel = document.getElementById('encryptionLevel').value;

            // التحقق من المدخلات
            if (!file) {
                alert("يرجى اختيار ملف أولاً!");
                return;
            }
            if (!password || password.length < 4) {
                alert("يرجى إدخال كلمة مرور قوية (4 رموز على الأقل)!");
                return;
            }

            statusDiv.innerText = "⏳ جاري المعالجة والتشفير...";
            statusDiv.style.color = "#ff9f43";

            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const base64Data = event.target.result;
                    
                    // عملية التشفير باستخدام CryptoJS
                    // نستخدم المستوى المختار (AES-256 افتراضياً)
                    const encryptedData = CryptoJS.AES.encrypt(base64Data, password).toString();

                    // إنشاء ملف نصي يحتوي على البيانات المشفرة
                    const blob = new Blob([encryptedData], { type: 'text/plain' });
                    const downloadUrl = URL.createObjectURL(blob);
                    
                    // تنفيذ التحميل التلقائي
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = `protected_${file.name}.enc`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    statusDiv.innerText = "✅ تم التشفير وتحميل الملف بنجاح!";
                    statusDiv.style.color = "#00d2d3";
                } catch (err) {
                    console.error("Encryption Error:", err);
                    statusDiv.innerText = "❌ حدث خطأ أثناء التشفير، حاول مجدداً.";
                    statusDiv.style.color = "#ff6b6b";
                }
            };

            // بدء قراءة الملف
            reader.readAsDataURL(file);
        });
    }
});
