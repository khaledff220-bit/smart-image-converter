// كود لصفحة ضغط PDF
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة ضغط PDF جاهزة!');
    
    // العناصر الأساسية
    const pdfFileInput = document.getElementById('pdfFile');
    const pdfDropArea = document.getElementById('pdfDropArea');
    const pdfInfo = document.getElementById('pdfInfo');
    const compressionCards = document.querySelectorAll('.level-card');
    
    let selectedFile = null;
    let selectedLevel = 'high';
    
    // اختيار مستوى الضغط
    compressionCards.forEach(card => {
        card.addEventListener('click', function() {
            // إزالة التحديد من الكل
            compressionCards.forEach(c => c.classList.remove('selected'));
            
            // تحديد العنصر الحالي
            this.classList.add('selected');
            selectedLevel = this.dataset.level;
            
            // تحديث المعاينة
            updatePreview();
        });
    });
    
    // تحديد المستوى الأول افتراضياً
    document.querySelector('.level-card[data-level="high"]').classList.add('selected');
    
    // Drag and Drop للملفات
    pdfDropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#FF9800';
        this.style.background = '#FFF3E0';
    });
    
    pdfDropArea.addEventListener('dragleave', function(e) {
        this.style.borderColor = '#4CAF50';
        this.style.background = 'white';
    });
    
    pdfDropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#4CAF50';
        this.style.background = 'white';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handlePDFFile(file);
        } else {
            alert('الرجاء رفع ملف PDF فقط');
        }
    });
    
    // حدث اختيار الملف
    pdfFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handlePDFFile(file);
        }
    });
    
    // دالة معالجة ملف PDF
    function handlePDFFile(file) {
        // التحقق من حجم الملف (50MB كحد أقصى)
        const maxSize = 50 * 1024 * 1024; // 50MB بالبايت
        if (file.size > maxSize) {
            alert('حجم الملف كبير جداً! الحد الأقصى 50 ميجابايت');
            return;
        }
        
        selectedFile = file;
        
        // عرض معلومات الملف
        document.getElementById('fileName').textContent = `الاسم: ${file.name}`;
        document.getElementById('fileSize').textContent = `الحجم: ${formatFileSize(file.size)}`;
        
        // تقدير عدد الصفحات (تخمين)
        const estimatedPages = Math.max(1, Math.floor(file.size / 50000));
        document.getElementById('filePages').textContent = `عدد الصفحات: ${estimatedPages} صفحة`;
        
        // إظهار معلومات الملف
        pdfInfo.style.display = 'block';
        
        // تحديث المعاينة
        updatePreview();
    }
    
    // دالة تحديث معاينة النتيجة
    function updatePreview() {
        if (!selectedFile) return;
        
        const originalSize = selectedFile.size;
        let compressionRate;
        
        // تحديد نسبة الضغط بناءً على المستوى
        switch (selectedLevel) {
            case 'high':
                compressionRate = 0.85; // تخفيض 85%
                break;
            case 'medium':
                compressionRate = 0.6; // تخفيض 60%
                break;
            case 'low':
                compressionRate = 0.3; // تخفيض 30%
                break;
        }
        
        // حساب الحجم بعد الضغط
        const compressedSize = Math.floor(originalSize * (1 - compressionRate));
        
        // تحديث العرض
        document.getElementById('originalSizeText').textContent = formatFileSize(originalSize);
        document.getElementById('compressedSizeText').textContent = formatFileSize(compressedSize);
        
        // تحديث الأشرطة
        const originalBar = document.getElementById('originalBar');
        const compressedBar = document.getElementById('compressedBar');
        
        // تقدير نسبي للعرض
        originalBar.style.width = '100%';
        compressedBar.style.width = `${(compressedSize / originalSize) * 100}%`;
        
        // تحديث نسبة التوفير
        const savings = Math.floor(compressionRate * 100);
        document.getElementById('savingsText').textContent = `${savings}%`;
    }
    
    // دالة تنسيق حجم الملف
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // دالة ضغط PDF
    window.compressPDF = function() {
        if (!selectedFile) {
            alert('الرجاء رفع ملف PDF أولاً');
            return;
        }
        
        // جمع الخيارات
        const options = {
            level: selectedLevel,
            optimizeImages: document.getElementById('optimizeImages').checked,
            removeMetadata: document.getElementById('removeMetadata').checked,
            compressFonts: document.getElementById('compressFonts').checked
        };
        
        // رسالة تجريبية
        alert(`⚡ جاري ضغط ملف PDF...
        
اسم الملف: ${selectedFile.name}
الحجم الأصلي: ${formatFileSize(selectedFile.size)}
مستوى الضغط: ${selectedLevel === 'high' ? 'عالي' : selectedLevel === 'medium' ? 'متوسط' : 'منخفض'}
التوفير المتوقع: ${document.getElementById('savingsText').textContent}

الخيارات المحددة:
${options.optimizeImages ? '✓ تحسين الصور\n' : ''}
${options.removeMetadata ? '✓ إزالة البيانات الوصفية\n' : ''}
${options.compressFonts ? '✓ ضغط الخطوط\n' : ''}

سيتم تنزيل الملف خلال 5 ثوانٍ...`);
        
        // محاكاة عملية الضغط
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            console.log(`جاري الضغط... ${progress}%`);
            
            if (progress >= 100) {
                clearInterval(interval);
                alert('✅ تم ضغط PDF بنجاح!\nسيبدأ تنزيل الملف الآن...');
                // في النسخة الحقيقية هنا سيتم إنشاء وتنزيل PDF المضغوط
            }
        }, 1000);
    };
    
    // دالة إعادة التعيين
    window.resetTool = function() {
        if (confirm('هل تريد إعادة تعيين جميع الإعدادات؟')) {
            selectedFile = null;
            pdfFileInput.value = '';
            pdfInfo.style.display = 'none';
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            alert('تم إعادة التعيين');
        }
    };
});
