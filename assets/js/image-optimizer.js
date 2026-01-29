/**
 * محسن الصور المتقدم
 * Advanced Image Optimizer
 */

class ImageOptimizer {
    constructor() {
        this.techniques = {
            resize: true,
            quantize: true,
            stripMeta: true,
            adaptiveCompression: true
        };
    }
    
    /**
     * تحسين صورة Canvas
     */
    async optimizeCanvas(canvas, targetQuality = 0.8) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // 1. تقليل الألوان للصور البسيطة
        if (this.isSimpleImage(imageData)) {
            this.reduceColorPalette(imageData, 128);
        }
        
        // 2. إزالة البيانات الوصفية
        this.stripMetadata(imageData);
        
        // 3. ضغط محدد حسب نوع المحتوى
        if (this.isTextHeavy(imageData)) {
            // للصور التي تحتوي نصوص: الحفاظ على الجودة
            targetQuality = Math.max(targetQuality, 0.9);
        }
        
        // 4. إعادة الصورة إلى Canvas
        ctx.putImageData(imageData, 0, 0);
        
        return canvas;
    }
    
    /**
     * التحقق إذا كانت الصورة بسيطة (رسميات/أيقونات)
     */
    isSimpleImage(imageData) {
        const data = imageData.data;
        let uniqueColors = new Set();
        
        // عد الألوان الفريدة
        for (let i = 0; i < data.length; i += 4) {
            const color = (data[i] << 16) | (data[i+1] << 8) | data[i+2];
            uniqueColors.add(color);
            
            if (uniqueColors.size > 256) {
                return false; // الكثير من الألوان
            }
        }
        
        return uniqueColors.size <= 256;
    }
    
    /**
     * تقليل لوحة الألوان
     */
    reduceColorPalette(imageData, maxColors = 256) {
        // خوارزمية مبسطة لتقليل الألوان
        const data = imageData.data;
        
        // تجميع الألوان المتشابهة
        for (let i = 0; i < data.length; i += 4) {
            // تقريب قنوات الألوان
            data[i] = Math.round(data[i] / 8) * 8;     // الأحمر
            data[i+1] = Math.round(data[i+1] / 8) * 8; // الأخضر
            data[i+2] = Math.round(data[i+2] / 8) * 8; // الأزرق
        }
    }
    
    /**
     * التحقق إذا كانت الصورة تحتوي نصوص كثيفة
     */
    isTextHeavy(imageData) {
        // خوارزمية مبسطة للكشف عن النصوص
        const data = imageData.data;
        let edgeCount = 0;
        let pixelCount = 0;
        
        // عد الحواف (التغيرات السريعة في اللون)
        for (let y = 1; y < imageData.height; y++) {
            for (let x = 1; x < imageData.width; x++) {
                const idx = (y * imageData.width + x) * 4;
                const prevIdx = ((y-1) * imageData.width + (x-1)) * 4;
                
                // حساب التغير في اللون
                const colorDiff = Math.abs(data[idx] - data[prevIdx]) +
                                 Math.abs(data[idx+1] - data[prevIdx+1]) +
                                 Math.abs(data[idx+2] - data[prevIdx+2]);
                
                if (colorDiff > 50) { // حد اكتشاف الحافة
                    edgeCount++;
                }
                pixelCount++;
            }
        }
        
        // إذا كان هناك الكثير من الحواف، قد تكون نصاً
        return (edgeCount / pixelCount) > 0.3;
    }
    
    /**
     * إزالة البيانات الوصفية
     */
    stripMetadata(imageData) {
        // في Canvas، البيانات الوصفية قليلة
        // هذه الدالة للمستقبل إذا أضفنا معالجة EXIF
        console.log('إزالة البيانات الوصفية من الصورة');
    }
}

// تصدير للاستخدام
window.ImageOptimizer = ImageOptimizer;
