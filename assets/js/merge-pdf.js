// كود لصفحة دمج PDF
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة دمج PDF جاهزة!');
    
    // العناصر الأساسية
    const fileInput = document.getElementById('pdfImages');
    const fileList = document.getElementById('fileList');
    const dropArea = document.getElementById('dropArea');
    let files = [];
    
    // حدث رفع الملفات
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and Drop
    dropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropArea.style.borderColor = '#45a049';
        dropArea.style.background = '#f0f9f0';
    });
    
    dropArea.addEventListener('dragleave', function(e) {
        dropArea.style.borderColor = '#4CAF50';
        dropArea.style.background = 'white';
    });
    
    dropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        dropArea.style.borderColor = '#4CAF50';
        dropArea.style.background = 'white';
        
        const droppedFiles = e.dataTransfer.files;
        handleFiles(droppedFiles);
    });
    
    // دالة معالجة الملفات
    function handleFileSelect(e) {
        const selectedFiles = e.target.files;
        handleFiles(selectedFiles);
    }
    
    function handleFiles(selectedFiles) {
        const maxFiles = 20;
        
        if (files.length + selectedFiles.length > maxFiles) {
            alert(`يمكنك رفع ${maxFiles} صورة كحد أقصى`);
            return;
        }
        
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            
            // التحقق من نوع الملف
            if (!file.type.match('image.*')) {
                alert('الرجاء رفع ملفات صور فقط');
                continue;
            }
            
            files.push(file);
            displayFile(file);
        }
        
        // تحديث عداد الملفات
        updateFileCounter();
    }
    
    // دالة عرض الملف في القائمة
    function displayFile(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div>
                <strong>📷 ${file.name}</strong>
                <br>
                <small>${formatFileSize(file.size)}</small>
            </div>
            <button onclick="removeFile('${file.name}')" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">
                ❌
            </button>
        `;
        
        fileList.appendChild(fileItem);
    }
    
    // دالة تحديث عداد الملفات
    function updateFileCounter() {
        const counter = document.querySelector('.file-info');
        if (counter) {
            counter.textContent = `${files.length} من 20 صورة`;
        }
    }
    
    // دالة تنسيق حجم الملف
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // جعل الدوال متاحة عالمياً
    window.removeFile = function(fileName) {
        files = files.filter(file => file.name !== fileName);
        
        // تحديث العرض
        fileList.innerHTML = '';
        files.forEach(displayFile);
        updateFileCounter();
    };
    
    window.mergeToPDF = function() {
        if (files.length === 0) {
            alert('الرجاء رفع صور أولاً');
            return;
        }
        
        // رسالة تجريبية
        alert(`🚀 جاري دمج ${files.length} صورة في ملف PDF...
هذه نسخة تجريبية. في النسخة الكاملة سيتم تنزيل ملف PDF حقيقي.

الميزات التي سيتم تطبيقها:
1. اتجاه الصفحة: ${document.querySelector('input[name="orientation"]:checked').value}
2. حجم الصفحة: ${document.getElementById('pageSize').value}
3. أرقام الصفحات: ${document.getElementById('addPageNumbers').checked ? 'نعم' : 'لا'}
4. علامة مائية: ${document.getElementById('addWatermark').checked ? 'نعم' : 'لا'}

سيتم تنزيل الملف خلال 3 ثوانٍ...`);
        
        // محاكاة عملية الدمج
        setTimeout(() => {
            alert('✅ تم إنشاء ملف PDF بنجاح!\nسيبدأ التنزيل الآن...');
            // في النسخة الحقيقية هنا سيتم إنشاء وتنزيل PDF
        }, 3000);
    };
    
    window.clearAll = function() {
        if (confirm('هل تريد مسح جميع الصور؟')) {
            files = [];
            fileList.innerHTML = '';
            fileInput.value = '';
            updateFileCounter();
            alert('تم مسح جميع الصور');
        }
    };
});
