// كود دمج ملفات PDF الحقيقي - إصدار 2026
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('pdfImages');
    const fileList = document.getElementById('fileList');
    const status = document.getElementById('status');
    let pdfFiles = [];

    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    function handleFiles(selectedFiles) {
        for (let file of selectedFiles) {
            // التحقق أن الملف PDF حقيقي
            if (file.type !== "application/pdf") {
                alert(`الملف ${file.name} ليس ملف PDF مدعوم.`);
                continue;
            }
            pdfFiles.push(file);
            displayFile(file);
        }
        updateCounter();
    }

    function displayFile(file) {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `
            <div>
                <strong>📄 ${file.name}</strong><br>
                <small>${(file.size / 1024 / 1024).toFixed(2)} MB</small>
            </div>
            <button onclick="removeFile('${file.name}')" style="background:#ff4444; border:none; color:white; cursor:pointer; padding:5px; border-radius:5px;">❌</button>
        `;
        fileList.appendChild(div);
    }

    window.removeFile = (name) => {
        pdfFiles = pdfFiles.filter(f => f.name !== name);
        renderList();
    };

    function renderList() {
        fileList.innerHTML = '';
        pdfFiles.forEach(displayFile);
        updateCounter();
    }

    function updateCounter() {
        const info = document.getElementById('file-info');
        if (info) info.textContent = `عدد الملفات المختارة: ${pdfFiles.length}`;
    }

    // الدالة السحرية للدمج الحقيقي
    window.mergeToPDF = async function() {
        if (pdfFiles.length < 2) {
            alert('يرجى اختيار ملفين PDF على الأقل لدمجهما.');
            return;
        }

        status.textContent = "⏳ جاري دمج الملفات محلياً...";
        
        try {
            const { PDFDocument } = PDFLib;
            const mergedPdf = await PDFDocument.create();

            for (let file of pdfFiles) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `merged_document_${Date.now()}.pdf`;
            link.click();
            
            status.textContent = "✅ تم الدمج والتحميل بنجاح!";
        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء الدمج. تأكد أن الملفات غير محمية بكلمة سر.');
            status.textContent = "❌ فشلت العملية.";
        }
    };

    window.clearAll = () => {
        pdfFiles = [];
        renderList();
        fileInput.value = '';
    };
});
