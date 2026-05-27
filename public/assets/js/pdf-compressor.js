/**
 * محرك ضغط PDF الحقيقي
 * Real PDF Compression Engine
 * يعمل 100% داخل المتصفح
 */

class PDFCompressor {
    constructor() {
        this.pdfjsLib = window.pdfjsLib;
        this.settings = {
            maxFileSize: 50 * 1024 * 1024, // 50MB
            maxPages: 100,
            defaultQuality: 0.8,
            imageFormats: {
                'image/jpeg': { quality: 0.85 },
                'image/png': { compression: 9 },
                'image/webp': { quality: 0.8 }
            }
        };
        
        this.isProcessing = false;
        this.currentProgress = 0;
    }
    
    /**
     * الضغط الرئيسي للملف
     * @param {File} file - ملف PDF
     * @param {number} quality - جودة الضغط (0.1 إلى 1)
     * @param {Function} progressCallback - دالة تحديث التقدم
     * @returns {Promise<Blob>} - ملف PDF المضغوط
     */
    async compressPDF(file, quality = 0.8, progressCallback = null) {
        if (this.isProcessing) {
            throw new Error('عملية ضغط جارية بالفعل');
        }
        
        this.isProcessing = true;
        this.currentProgress = 0;
        
        try {
            // التحقق من صحة الملف
            this.validateFile(file);
            
            // تحميل مستند PDF
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = this.pdfjsLib.getDocument({ data: arrayBuffer });
            const pdfDoc = await loadingTask.promise;
            
            // التحقق من عدد الصفحات
            if (pdfDoc.numPages > this.settings.maxPages) {
                throw new Error(`عدد الصفحات كبير جداً (${pdfDoc.numPages} > ${this.settings.maxPages})`);
            }
            
            // إنشاء Canvas واحد لإعادة الاستخدام
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // مصفوفة لتخزين الصفحات المضغوطة
            const compressedPages = [];
            
            // معالجة كل صفحة
            for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
                if (!this.isProcessing) {
                    throw new Error('تم إلغاء العملية');
                }
                
                // تحديث التقدم
                this.currentProgress = (pageNum / pdfDoc.numPages) * 90;
                if (progressCallback) {
                    progressCallback(this.currentProgress);
                }
                
                // جلب الصفحة
                const page = await pdfDoc.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.0 });
                
                // ضبط حجم Canvas
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                // عرض الصفحة على Canvas
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                await page.render(renderContext).promise;
                
                // ضغط الصورة
                const compressedImage = await this.compressCanvasImage(
                    canvas, 
                    quality,
                    pageNum
                );
                
                compressedPages.push({
                    width: viewport.width,
                    height: viewport.height,
                    imageData: compressedImage
                });
                
                // تحرير الذاكرة
                page.cleanup();
            }
            
            // إنشاء PDF جديد من الصور المضغوطة
            this.currentProgress = 95;
            if (progressCallback) progressCallback(95);
            
            const finalPDF = await this.createPDFFromImages(compressedPages);
            
            this.currentProgress = 100;
            if (progressCallback) progressCallback(100);
            
            return finalPDF;
            
        } catch (error) {
            throw error;
        } finally {
            this.isProcessing = false;
        }
    }
    
    /**
     * ضغط صورة Canvas
     * @param {HTMLCanvasElement} canvas - العنصر Canvas
     * @param {number} quality - الجودة
     * @returns {Promise<string>} - بيانات الصورة المضغوطة
     */
    async compressCanvasImage(canvas, quality, pageNum) {
        try {
            // تحديد تنسيق الضغط الأمثل
            const format = this.getOptimalImageFormat(quality);
            
            // تحويل Canvas إلى صورة مضغوطة
            let imageData;
            
            if (format === 'image/webp' && this.supportsWebP()) {
                // استخدام WebP إذا كان متاحاً (أفضل ضغط)
                imageData = canvas.toDataURL('image/webp', quality);
            } else if (quality < 0.7) {
                // JPEG للضغط القوي
                imageData = canvas.toDataURL('image/jpeg', quality);
            } else {
                // PNG للجودة العالية
                imageData = canvas.toDataURL('image/png');
            }
            
            // تحسين إضافي للصور الكبيرة
            if (canvas.width * canvas.height > 2000000) { // صور أكبر من 2MP
                imageData = await this.furtherCompressImage(imageData, quality);
            }
            
            return imageData;
            
        } catch (error) {
            console.error(`خطأ في ضغط صفحة ${pageNum}:`, error);
            // استخدم PNG كبديل آمن
            return canvas.toDataURL('image/png');
        }
    }
    
    /**
     * إنشاء PDF من الصور
     * @param {Array} pages - مصفوفة الصفحات
     * @returns {Promise<Blob>} - ملف PDF
     */
    async createPDFFromImages(pages) {
        return new Promise((resolve, reject) => {
            try {
                // استخدام jsPDF إذا كان متاحاً
                if (window.jspdf && window.jspdf.jsPDF) {
                    this.createPDFWithJSPDF(pages).then(resolve).catch(reject);
                } else {
                    // بديل: إنشاء PDF بسيط
                    this.createSimplePDF(pages).then(resolve).catch(reject);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * إنشاء PDF باستخدام jsPDF (إذا تم تحميله)
     */
    async createPDFWithJSPDF(pages) {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [pages[0].width, pages[0].height]
        });
        
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            
            if (i > 0) {
                pdf.addPage([page.width, page.height]);
            }
            
            // إضافة الصورة إلى PDF
            pdf.addImage(
                page.imageData,
                page.imageData.startsWith('data:image/jpeg') ? 'JPEG' : 'PNG',
                0,
                0,
                page.width,
                page.height
            );
        }
        
        // حفظ كمصفوفة بايت
        const pdfBytes = pdf.output('arraybuffer');
        return new Blob([pdfBytes], { type: 'application/pdf' });
    }
    
    /**
     * إنشاء PDF بسيط (بدون مكتبات إضافية)
     */
    async createSimplePDF(pages) {
        // هذا تنفيذ مبسط - في الإصدار الكامل نستخدم مكتبة
        // للتبسيط، نعيد أول صفحة كـ PNG في حاوية PDF وهمية
        const firstPage = pages[0];
        
        // إنشاء PDF بسيط يدعم الصور
        const pdfContent = this.generateSimplePDFContent(pages);
        
        return new Blob([pdfContent], { type: 'application/pdf' });
    }
    
    /**
     * التحقق من دعم WebP
     */
    supportsWebP() {
        const canvas = document.createElement('canvas');
        if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
            return true;
        }
        return false;
    }
    
    /**
     * تحديد تنسيق الصورة الأمثل
     */
    getOptimalImageFormat(quality) {
        if (quality <= 0.5 && this.supportsWebP()) {
            return 'image/webp';
        } else if (quality <= 0.7) {
            return 'image/jpeg';
        } else {
            return 'image/png';
        }
    }
    
    /**
     * ضغط إضافي للصور الكبيرة
     */
    async furtherCompressImage(imageData, quality) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // تقليل الأبعاد للصور الكبيرة جداً
                let scale = 1;
                if (img.width > 2000 || img.height > 2000) {
                    scale = Math.min(2000 / img.width, 2000 / img.height);
                }
                
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // إعادة الضغط
                const compressed = canvas.toDataURL('image/jpeg', quality * 0.9);
                resolve(compressed);
            };
            img.src = imageData;
        });
    }
    
    /**
     * التحقق من صحة الملف
     */
    validateFile(file) {
        // التحقق من النوع
        if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
            throw new Error('الملف ليس من نوع PDF');
        }
        
        // التحقق من الحجم
        if (file.size > this.settings.maxFileSize) {
            throw new Error(`حجم الملف كبير جداً (${this.formatBytes(file.size)} > ${this.formatBytes(this.settings.maxFileSize)})`);
        }
        
        // التحقق من أن الملف ليس فارغاً
        if (file.size === 0) {
            throw new Error('الملف فارغ');
        }
    }
    
    /**
     * تنسيق البايتات
     */
    formatBytes(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return size.toFixed(2) + ' ' + units[unitIndex];
    }
    
    /**
     * إلغاء الضغط
     */
    cancel() {
        this.isProcessing = false;
    }
}

// إنشاء نسخة عامة للاستخدام
window.PDFCompressor = PDFCompressor;

// دالة الضغط الرئيسية للاستخدام المباشر
async function compressPDFReal(file, quality = 80, progressCallback = null) {
    const compressor = new PDFCompressor();
    return compressor.compressPDF(file, quality / 100, progressCallback);
}
