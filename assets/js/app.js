// --- 1. منطق حماية الصور (Encryption) ---
const btnEncrypt = document.getElementById('btnEncrypt');
if (btnEncrypt) {
    btnEncrypt.addEventListener('click', async () => {
        const imageInput = document.getElementById('imageUpload');
        const passwordInput = document.getElementById('password');
        const status = document.getElementById('status');

        if (!imageInput.files[0] || !passwordInput.value) {
            alert("يرجى اختيار صورة وإدخال كلمة مرور!");
            return;
        }

        status.innerText = "⏳ جاري التشفير والحماية...";
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            // استخدام مكتبة CryptoJS للتشفير
            const encrypted = CryptoJS.AES.encrypt(imageData, passwordInput.value).toString();
            
            const blob = new Blob([encrypted], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = imageInput.files[0].name + ".enc";
            link.click();
            
            status.innerText = "✅ تم التشفير والتحميل بنجاح!";
        };
        reader.readAsDataURL(imageInput.files[0]);
    });
}

// --- 2. منطق ضغط PDF (كودك السابق مع تحسين) ---
const pdfCompressInput = document.getElementById('pdfInput');
if (pdfCompressInput) {
    const originalSizeLabel = document.getElementById('originalSize');
    const compressedSizeLabel = document.getElementById('compressedSize');
    const compressInfoContainer = document.getElementById('compressInfoContainer');
    const afterCompressDiv = document.getElementById('afterCompress');

    pdfCompressInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            compressInfoContainer.style.display = 'block';
            originalSizeLabel.innerText = (file.size / 1024 / 1024).toFixed(2) + " MB";
            if (afterCompressDiv) afterCompressDiv.style.display = 'none';
        }
    });
}

window.compressPDF = async function() {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');

    if (!fileInput || !fileInput.files[0]) return alert("يرجى اختيار ملف!");

    status.innerText = "⏳ جاري تقليل حجم الملف...";

    try {
        const arrayBuffer = await fileInput.files[0].arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "compressed_smart_doc.pdf";
        link.click();

        if (document.getElementById('afterCompress')) {
            document.getElementById('afterCompress').style.display = 'block';
            document.getElementById('compressedSize').innerText = (blob.size / 1024 / 1024).toFixed(2) + " MB";
        }
        status.innerText = "✅ تم الضغط والتحميل!";
    } catch (err) {
        console.error(err);
        status.innerText = "❌ فشل الضغط، تأكد من سلامة الملف.";
    }
};
