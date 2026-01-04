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


async function decryptImage() {
    const fileInput = document.getElementById('imageUpload');
    const password = document.getElementById('password').value;
    
    if (fileInput.files.length === 0 || !password) {
        alert('الرجاء اختيار الملف المشفر وإدخال كلمة المرور');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            // فك التشفير باستخدام CryptoJS
            const encryptedData = e.target.result;
            const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
            const originalBase64 = decrypted.toString(CryptoJS.enc.Utf8);

            if (!originalBase64) throw new Error();

            // إظهار الصورة على الصفحة أو تحميلها
            const link = document.createElement('a');
            link.href = originalBase64;
            link.download = "original_image.png";
            link.click();
            alert('تم فك التشفير بنجاح!');
        } catch (error) {
            alert('كلمة المرور خاطئة أو الملف غير صالح!');
        }
    };
    reader.readAsText(file);
}




async function compressPDF() {
    const fileInput = document.getElementById('pdfInput');
    const status = document.getElementById('status');
    
    if (fileInput.files.length === 0) {
        alert('الرجاء اختيار ملف PDF أولاً');
        return;
    }

    status.innerText = "جاري معالجة وضغط الملف... يرجى الانتظار";
    
    try {
        const file = fileInput.files[0];
        const arrayBuffer = await file.arrayBuffer();
        
        // تحميل ملف PDF
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        
        // حفظ الملف مع خيار الحفظ المضغوط (Linearization/Optimization)
        const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

        // تحميل الملف الناتج
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "compressed_document.pdf";
        link.click();
        
        status.innerText = "تم ضغط الملف وتحميله بنجاح!";
    } catch (error) {
        console.error(error);
        status.innerText = "حدث خطأ أثناء محاولة ضغط الملف.";
    }
}
