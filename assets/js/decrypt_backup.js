document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileUpload');
    const fileLabel = document.getElementById('txt-label');
    const passwordInput = document.getElementById('password');
    const btnDecrypt = document.getElementById('btnDecrypt');
    const statusDiv = document.getElementById('status');
    const resultArea = document.getElementById('resultArea');
    const decryptedImage = document.getElementById('decryptedImage');
    const downloadLink = document.getElementById('downloadLink');

    // إظهار اسم الملف عند الاختيار
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileLabel.innerText = "✅ تم اختيار: " + e.target.files[0].name;
            statusDiv.innerText = "أدخل كلمة المرور لفك التشفير";
        }
    });

    btnDecrypt.addEventListener('click', () => {
        const file = fileInput.files[0];
        const password = passwordInput.value;

        if (!file || !password) {
            statusDiv.innerText = "❌ يرجى اختيار ملف وإدخل كلمة المرور!";
            return;
        }

        statusDiv.innerText = "⏳ جاري فك التشفير...";
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const encryptedContent = e.target.result;
                
                // فك التشفير باستخدام CryptoJS
                const decryptedBytes = CryptoJS.AES.decrypt(encryptedContent, password);
                const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

                if (!decryptedData) throw new Error("Wrong password");

                // عرض النتيجة
                decryptedImage.src = decryptedData;
                downloadLink.href = decryptedData;
                downloadLink.download = "restored_image.png";
                
                resultArea.style.display = "block";
                statusDiv.innerText = "✅ تم فك التشفير بنجاح!";
                statusDiv.style.color = "#00d2d3";
            } catch (error) {
                statusDiv.innerText = "❌ كلمة مرور خاطئة أو ملف تالف!";
                statusDiv.style.color = "#ff6b6b";
                resultArea.style.display = "none";
            }
        };

        reader.readAsText(file); // قراءة الملف النصي المشفر
    });
});
