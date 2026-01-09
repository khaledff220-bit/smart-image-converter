// --- منطق ضغط PDF ---
const pdfCompressInput = document.getElementById('pdfInput');
const originalSizeLabel = document.getElementById('originalSize');
const compressedSizeLabel = document.getElementById('compressedSize');
const compressInfoContainer = document.getElementById('compressInfoContainer');
const afterCompressDiv = document.getElementById('afterCompress');

if (pdfCompressInput) {
    pdfCompressInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            compressInfoContainer.style.display = 'block';
            originalSizeLabel.innerText = (file.size / 1024 / 1024).toFixed(2) + " MB";
            afterCompressDiv.style.display = 'none';
        }
    });
}

window.compressPDF = async function() {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');
    
    if (!fileInput.files[0]) return alert("يرجى اختيار ملف!");

    status.innerText = "⏳ جاري تقليل حجم الملف...";
    
    try {
        const arrayBuffer = await fileInput.files[0].arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        
        // تقنية الضغط: تجريد الميتا داتا غير الضرورية وضغط الموارد
        // في pdf-lib يتم الضغط تلقائياً عند الحفظ باستخدام UseObjectStreams
        const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "compressed_smart_doc.pdf";
        link.click();

        // تحديث معلومات الحجم بعد الضغط
        afterCompressDiv.style.display = 'block';
        compressedSizeLabel.innerText = (blob.size / 1024 / 1024).toFixed(2) + " MB";
        status.innerText = "✅ تم الضغط والتحميل!";
    } catch (err) {
        console.error(err);
        status.innerText = "❌ فشل الضغط، تأكد من سلامة الملف.";
    }
};
