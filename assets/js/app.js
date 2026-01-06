// ==========================================
// 1. وظيفة مساعدة موحدة للتحميل
// ==========================================
function downloadFile(data, name, type) {
    const blob = new Blob([data], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
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
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert('فشل فك التشفير: كلمة المرور خاطئة');
        }
    };
    reader.readAsText(fileInput.files[0]);
}

// ==========================================
// 4. دالة تحسين جودة الصور (الإصدار المصحح)
// ==========================================
function improveQuality() {
    const fileInput = document.getElementById('qualityUpload');
    const status = document.getElementById('status');

    if (!fileInput || !fileInput.files[0]) {
        alert('الرجاء اختيار صورة أولاً');
        return;
    }

    if(status) status.innerText = "⏳ جاري التحسين... يرجى الانتظار";

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // مضاعفة الأبعاد لتحسين الكثافة
            canvas.width = img.width * 2;
            canvas.height = img.height * 2;

            // تطبيق فلاتر المعالجة بصيغة متوافقة
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.filter = 'contrast(1.08) brightness(1.02) saturate(1.05)';
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // التحميل بصيغة DataURL لضمان العرض الصحيح على الموبايل
            const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'enhanced_' + fileInput.files[0].name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if(status) status.innerText = "✅ اكتمل التحسين والتحميل!";
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
        alert('حدث خطأ أثناء الدمج');
    }
}

// ==========================================
// 6. دالة ضغط PDF
// ==========================================

async function compressPDF() {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');
    if (!fileInput.files[0]) { alert('الرجاء اختيار ملف PDF'); return; }

    if(status) status.innerText = "⏳ جاري الضغط وتقليل الحجم...";

    try {
        const arrayBuffer = await fileInput.files[0].arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        
        // تقنيات تقليل الحجم: إزالة البيانات الوصفية وضغط الجداول
        pdfDoc.setTitle("");
        pdfDoc.setAuthor("");
        
        const pdfBytes = await pdfDoc.save({
            useObjectStreams: true, // ضغط الكائنات الداخلية
            addDefaultPage: false
        });

        downloadFile(pdfBytes, 'compressed_2026.pdf', 'application/pdf');
        if(status) status.innerText = "✅ تم الضغط (تم تقليل البيانات الزائدة)";
    } catch (error) {
        if(status) status.innerText = "❌ فشل الضغط";
    }
}

// ==========================================
// 7. ربط الدوال بالأزرار (المحرك)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // زر حماية الصور
    const protectBtn = document.querySelector('a[href="password-protect.html"] + .btn, .btn-protect'); 
    // ملاحظة: يفضل إضافة id="btnProtect" للزر في ملف HTML واستخدامه هنا
    const btnProtect = document.getElementById('btnProtect');
    if (btnProtect) btnProtect.addEventListener('click', (e) => { e.preventDefault(); protectImage(); });

    // زر تحسين الجودة
    const btnImprove = document.getElementById('btnImprove');
    if (btnImprove) btnImprove.addEventListener('click', (e) => { e.preventDefault(); improveQuality(); });

    // زر فك التشفير
    const btnDecrypt = document.getElementById('btnDecrypt');
    if (btnDecrypt) btnDecrypt.addEventListener('click', (e) => { e.preventDefault(); decryptImage(); });
});
