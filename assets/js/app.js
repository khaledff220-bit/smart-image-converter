/**
 * Smart Image Converter - Full App Logic 2026
 * يتضمن: التشفير، تحسين الجودة، ودمج PDF
 */

document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.getElementById('status');

    // --- 1. أداة حماية الصور (Encryption) ---
    const imageUpload = document.getElementById('imageUpload');
    const btnEncrypt = document.getElementById('btnEncrypt');
    const passwordInput = document.getElementById('password');

    if (imageUpload && btnEncrypt) {
        btnEncrypt.addEventListener('click', () => {
            const file = imageUpload.files[0];
            const pass = passwordInput.value;
            if (!file || !pass) return alert("اختر صورة وكلمة مرور!");

            statusDiv.innerText = "⏳ جاري التشفير...";
            const reader = new FileReader();
            reader.onload = (e) => {
                const encrypted = CryptoJS.AES.encrypt(e.target.result, pass).toString();
                const blob = new Blob([encrypted], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `protected_${file.name}.enc`;
                link.click();
                statusDiv.innerText = "✅ تم التشفير بنجاح!";
            };
            reader.readAsDataURL(file);
        });
    }

    // --- 2. أداة تحسين الجودة (Quality Enhance) ---
    const qualityUpload = document.getElementById('qualityUpload');
    const btnImprove = document.getElementById('btnImprove');
    const imagePreview = document.getElementById('imagePreview');
    const previewContainer = document.getElementById('previewContainer');

    if (qualityUpload) {
        qualityUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    imagePreview.src = ev.target.result;
                    previewContainer.style.display = 'block';
                    statusDiv.innerText = "الصورة جاهزة للتحسين ✅";
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
                canvas.width = img.width;
                canvas.height = img.height;
                // تطبيق فلاتر المعالجة الرقمية
                ctx.filter = 'contrast(1.1) saturate(1.1) brightness(1.02)';
                ctx.drawImage(img, 0, 0);
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg', 0.95);
                link.download = "enhanced_image.jpg";
                link.click();
                statusDiv.innerText = "✅ تم التحسين والتحميل!";
            };
        });
    }

    // --- 3. أداة دمج PDF (PDF Merge) ---
    const pdfInput = document.getElementById('pdfInput');
    const fileList = document.getElementById('fileList');
    const fileListContainer = document.getElementById('fileListContainer');
    // ملاحظة: الزر يستخدم onclick="mergePDFs()" في الـ HTML لذا سنعرف الوظيفة عالمياً

    if (pdfInput) {
        pdfInput.addEventListener('change', (e) => {
            if (fileList) fileList.innerHTML = '';
            if (e.target.files.length > 0) {
                if (fileListContainer) fileListContainer.style.display = 'block';
                Array.from(e.target.files).forEach(file => {
                    const li = document.createElement('li');
                    li.innerText = `📄 ${file.name}`;
                    if (fileList) fileList.appendChild(li);
                });
                statusDiv.innerText = "الملفات جاهزة للدمج ✅";
            }
        });
    }

    window.mergePDFs = async function() {
        const files = pdfInput.files;
        if (files.length < 2) return alert("يرجى اختيار ملفين على الأقل!");
        
        statusDiv.innerText = "⏳ جاري دمج ملفات PDF...";
        try {
            const { PDFDocument } = PDFLib;
            const mergedPdf = await PDFDocument.create();
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach(page => mergedPdf.addPage(page));
            }
            const pdfBytes = await mergedPdf.save();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
            link.download = "merged_document.pdf";
            link.click();
            statusDiv.innerText = "✅ تم الدمج بنجاح!";
        } catch (err) {
            statusDiv.innerText = "❌ خطأ أثناء الدمج!";
            console.error(err);
        }
    };
});
