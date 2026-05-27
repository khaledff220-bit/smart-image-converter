/**
 * Image Worker - معالجة الصور في خيط منفصل
 * @version 1.0.0
 */

// استقبال الرسائل من الـ Main Thread
self.addEventListener('message', async function(e) {
    const { type, imageData, scale, taskId, quality = 0.95 } = e.data;
    
    if (type === 'upscale') {
        try {
            // إرسال بدء المعالجة
            self.postMessage({ type: 'progress', value: 10, text: 'جاري تحميل الصورة...', taskId });
            
            // إنشاء صورة من البيانات
            const img = await createImageFromData(imageData);
            
            self.postMessage({ type: 'progress', value: 30, text: `جاري تكبير الصورة ${scale}x...`, taskId });
            
            // حساب الأبعاد الجديدة
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;
            
            // إنشاء Canvas للمعالجة
            const canvas = new OffscreenCanvas(newWidth, newHeight);
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                throw new Error('لا يمكن إنشاء سياق الرسم');
            }
            
            // تطبيق إعدادات الجودة العالية
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            self.postMessage({ type: 'progress', value: 60, text: 'جاري معالجة الصورة وتحسين الجودة...', taskId });
            
            // رسم الصورة بالأبعاد الجديدة
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            
            self.postMessage({ type: 'progress', value: 85, text: 'جاري حفظ الصورة المحسنة...', taskId });
            
            // تحويل إلى Blob
            const blob = await canvas.convertToBlob({
                type: 'image/jpeg',
                quality: quality
            });
            
            // تحويل Blob إلى ArrayBuffer للإرسال
            const arrayBuffer = await blob.arrayBuffer();
            
            self.postMessage({ 
                type: 'complete', 
                result: arrayBuffer,
                width: newWidth,
                height: newHeight,
                size: blob.size,
                taskId 
            });
            
            // تنظيف الذاكرة
            img.close();
            canvas.close();
            
        } catch (error) {
            self.postMessage({
                type: 'error',
                error: error.message || 'حدث خطأ أثناء معالجة الصورة',
                taskId
            });
        }
    }
});

// دالة مساعدة لتحويل البيانات إلى صورة
function createImageFromData(imageData) {
    return new Promise((resolve, reject) => {
        const blob = new Blob([imageData], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('فشل تحميل الصورة'));
        };
        
        img.src = url;
    });
}
