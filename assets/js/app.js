// دالة حماية الصورة باستخدام مكتبة CryptoJS
function protectImage() {
    const password = document.getElementById('password').value;
    const fileInput = document.getElementById('imageUpload');
    
    if (!fileInput.files[0]) {
        alert('الرجاء اختيار صورة أولاً');
        return;
    }
    
    if (!password) {
        alert('الرجاء إدخال كلمة المرور');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const rawData = e.target.result;
        // تشفير البيانات باستخدام AES
        const encrypted = CryptoJS.AES.encrypt(rawData, password).toString();
        
        // إنشاء ملف نصي يحتوي على البيانات المشفرة
        const blob = new Blob([encrypted], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'protected_image.enc';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        alert('تمت حماية الصورة بنجاح! تم تحميل ملف مشفر (.enc). لا يمكن فتحه إلا بكلمة المرور عبر الموقع.');
    };

    reader.readAsDataURL(file);
}

// دالة تحسين الجودة (محاكاة تحسين باستخدام Canvas)
function improveQuality() {
    const fileInput = document.getElementById('qualityUpload');
    
    if (!fileInput.files[0]) {
        alert('الرجاء اختيار صورة أولاً');
        return;
    }

    alert('جاري تحسين جودة الصورة... يرجى الانتظار');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // زيادة الأبعاد قليلاً لمحاكاة التحسين
            canvas.width = img.width * 1.2;
            canvas.height = img.height * 1.2;
            
            // رسم الصورة مع تفعيل تنعيم الصور
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // تحميل الصورة المحسنة
            const enhancedUrl = canvas.toDataURL('image/jpeg', 0.9);
            const a = document.createElement('a');
            a.href = enhancedUrl;
            a.download = 'enhanced_image.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            alert('تم تحسين الجودة وتحميل الصورة بنجاح!');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}


async function mergePDFFiles() {
    const fileInput = document.getElementById('pdfUpload');
    if (fileInput.files.length < 2) {
        alert('الرجاء اختيار ملفين PDF على الأقل للدمج');
        return;
    }

    const mergedPdf = await PDFLib.PDFDocument.create();
    
    for (const file of fileInput.files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'merged_document.pdf';
    link.click();
}
