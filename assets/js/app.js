// ==========================================
// 1. وظيفة مساعدة موحدة للتحميل (لضمان عملها في كل المتصفحات)
// ==========================================
function downloadFile(data, name, type) {
    const blob = new Blob([data], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link); // إضافة الرابط للصفحة مؤقتاً
    link.click();
    document.body.removeChild(link); // حذفه بعد الضغط
    URL.revokeObjectURL(url); // تنظيف الذاكرة
}

// ==========================================
// 2. دالة حماية الصورة (تشفير)
// ==========================================
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
        downloadFile([encrypted], 'protected_image.enc', 'text/plain');
        alert('تم التشفير والتحميل بنجاح!');
    };
    reader.readAsDataURL(fileInput.files[0]);
}

// ==========================================
// 3. دالة فك تشفير الصورة
// ==========================================
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
            alert('فشل فك التشفير: كلمة المرور خاطئة أو الملف تالف');
        }
    };
    reader.readAsText(fileInput.files[0]);
}

// ==========================================
// 4. دالة تحسين جودة الصور (التي كانت مفقودة)
// ==========================================
function improveQuality() {
    const fileInput = document.getElementById('qualityUpload');
    const status = document.getElementById('status');

    if (!fileInput || !fileInput.files[0]) {
        alert('الرجاء اختيار صورة أولاً');
        return;
    }

    if(status) status.innerText = "⏳ جاري المعالجة... يرجى الانتظار";

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // زيادة الأبعاد لتحسين الكثافة النقطية
            canvas.width = img.width * 2;
            canvas.height = img.height * 2;

            // تطبيق الفلاتر البرمجية للوضوح
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.filter = 'contrast(1.05) brightness(1.03) saturate(1.05)';
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // التحميل بصيغة عالية الجودة
            canvas.toBlob(function(blob) {
                downloadFile([blob], 'enhanced_image.jpg', 'image/jpeg');
                if(status) status.innerText = "✅ اكتمل التحسين والتحميل!";
            }, 'image/jpeg', 0.95);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
}

// ==========================================
// 5. دالة دمج PDF
// ==========================================
async function mergePDFFiles() {
    const fileInput = document.getElementById('pdfUpload');
    if (fileInput.files.length < 2) {
        alert('اختر ملفين على الأقل');
        return;
    }
    try {
        const mergedPdf = await PDFLib.PDFDocument.create();
        for (const file of fileInput.files) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach(page => mergedPdf.addPage(page));
        }
        const pdfBytes = await mergedPdf.save();
        downloadFile(pdfBytes, 'merged_document.pdf', 'application/pdf');
    } catch (e) {
        alert('حدث خطأ أثناء دمج الملفات');
    }
}

// ==========================================
// 6. دالة ضغط PDF
// ==========================================
async function compressPDF() {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');

    if (!fileInput.files[0]) {
        alert('الرجاء اختيار ملف PDF');
        return;
    }

    if(status) status.innerText = "⏳ جاري الضغط... قد يستغرق وقتاً";

    try {
        const arrayBuffer = await fileInput.files[0].arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

        const pdfBytes = await pdfDoc.save({
            useObjectStreams: true,
            addDefaultPage: false,
            updateMetadata: false
        });

        downloadFile(pdfBytes, 'compressed_document.pdf', 'application/pdf');
        if(status) status.innerText = "✅ تم الضغط بنجاح!";
    } catch (error) {
        if(status) status.innerText = "❌ فشل الضغط: الملف قد يكون محمياً";
    }
}
