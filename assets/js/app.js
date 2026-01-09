document.addEventListener('DOMContentLoaded', () => {
    // --- 1. إعدادات عامة ---
    const statusDiv = document.getElementById('status');

    // --- 2. منطق دمج PDF (جديد) ---
    const pdfInput = document.getElementById('pdfInput');
    const fileList = document.getElementById('fileList');
    const fileListContainer = document.getElementById('fileListContainer');
    const btnMerge = document.getElementById('btnMerge');

    if (pdfInput) {
        pdfInput.addEventListener('change', function(e) {
            fileList.innerHTML = '';
            if (e.target.files.length > 0) {
                fileListContainer.style.display = 'block';
                Array.from(e.target.files).forEach(file => {
                    const li = document.createElement('li');
                    li.innerText = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
                    fileList.appendChild(li);
                });
                if(statusDiv) statusDiv.innerText = "ملفات جاهزة للدمج ✅";
            }
        });
    }

    // وظيفة الدمج
    window.mergePDFs = async function() {
        const files = pdfInput.files;
        if (files.length < 2) {
            const msg = document.documentElement.lang === 'ar' ? "يرجى اختيار ملفين على الأقل!" : "Select at least 2 files!";
            alert(msg);
            return;
        }

        statusDiv.innerText = "⏳ جاري دمج الملفات... يرجى الانتظار";
        
        try {
            const { PDFDocument } = PDFLib;
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "merged_document.pdf";
            link.click();

            statusDiv.innerText = "✅ تم دمج الملفات وتحميلها بنجاح!";
        } catch (err) {
            console.error(err);
            statusDiv.innerText = "❌ حدث خطأ أثناء الدمج.";
        }
    };

    // --- 3. منطق تحسين الجودة (تأكيد التفعيل) ---
    const qualityUpload = document.getElementById('qualityUpload');
    const btnImprove = document.getElementById('btnImprove');
    const imagePreview = document.getElementById('imagePreview');
    const previewContainer = document.getElementById('previewContainer');

    if (qualityUpload) {
        qualityUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    imagePreview.src = ev.target.result;
                    previewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnImprove) {
        btnImprove.addEventListener('click', () => {
            if (!imagePreview.src) return;
            statusDiv.innerText = "⏳ جاري تحسين الجودة...";
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = imagePreview.src;
            img.onload = () => {
                canvas.width = img.width; canvas.height = img.height;
                ctx.filter = 'contrast(1.1) sharpness(1.5)';
                ctx.drawImage(img, 0, 0);
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg');
                link.download = "enhanced.jpg";
                link.click();
                statusDiv.innerText = "✅ تم التحسين!";
            };
        });
    }

    // --- 4. منطق التشفير (ابقاء الكود السابق) ---
    const fileInput = document.getElementById('imageUpload');
    const btnEncrypt = document.getElementById('btnEncrypt');
    if (btnEncrypt) {
        btnEncrypt.addEventListener('click', () => {
             // ... كود التشفير الذي يعمل لديك حالياً ...
             // (تأكد من بقاء منطق التشفير في ملفك)
        });
    }
});
