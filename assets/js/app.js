// 1. دالة حماية الصورة
function protectImage() {
    const password = document.getElementById('password').value;
    const fileInput = document.getElementById('imageUpload');

    if (!fileInput.files[0] || !password) {
        alert('الرجاء اختيار صورة وإدخال كلمة المرور');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const encrypted = CryptoJS.AES.encrypt(e.target.result, password).toString();
        const blob = new Blob([encrypted], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'protected_image.enc';
        a.click();
    };
    reader.readAsDataURL(fileInput.files[0]);
}

// 2. دالة فك التشفير
async function decryptImage() {
    const fileInput = document.getElementById('imageUpload');
    const password = document.getElementById('password').value;

    if (!fileInput.files[0] || !password) {
        alert('الرجاء اختيار الملف وإدخال كلمة المرور');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const decrypted = CryptoJS.AES.decrypt(e.target.result, password);
            const originalBase64 = decrypted.toString(CryptoJS.enc.Utf8);
            if (!originalBase64) throw new Error();
            const link = document.createElement('a');
            link.href = originalBase64;
            link.download = "restored_image.png";
            link.click();
        } catch (error) {
            alert('فشل فك التشفير: كلمة المرور خاطئة');
        }
    };
    reader.readAsText(fileInput.files[0]);
}

// 3. دالة دمج PDF
async function mergePDFFiles() {
    const fileInput = document.getElementById('pdfUpload');
    if (fileInput.files.length < 2) {
        alert('اختر ملفين على الأقل');
        return;
    }
    const mergedPdf = await PDFLib.PDFDocument.create();
    for (const file of fileInput.files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
    }
    const pdfBytes = await mergedPdf.save();
    downloadFile(pdfBytes, 'merged.pdf', 'application/pdf');
}

// 4. دالة ضغط PDF (المحسنة)
async function compressPDF() {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');

    if (!fileInput.files[0]) {
        alert('الرجاء اختيار ملف PDF');
        return;
    }

    status.innerText = "⏳ جاري الضغط... يرجى الانتظار";

    try {
        const arrayBuffer = await fileInput.files[0].arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        
        // تقنية الضغط عبر إعادة بناء الملف لتقليل الفائض (Redundancy)
        const pdfBytes = await pdfDoc.save({
            useObjectStreams: true,
            addDefaultPage: false,
            updateMetadata: false
        });

        downloadFile(pdfBytes, 'compressed.pdf', 'application/pdf');
        status.innerText = "✅ تم الضغط بنجاح!";
    } catch (error) {
        status.innerText = "❌ حدث خطأ أثناء الضغط";
    }
}

// وظيفة مساعدة للتحميل
function downloadFile(data, name, type) {
    const blob = new Blob([data], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
}
