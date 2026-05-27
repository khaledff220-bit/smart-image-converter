/**
 * نظام التشفير المحسّن - AES-256
 * Enhanced Encryption System
 */

'use strict';

class EnhancedEncryption {
    constructor() {
        this.version = '3.0';
        this.supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        this.maxFileSize = 20 * 1024 * 1024; // 20MB
    }
    
    /**
     * تشفير الصورة الرئيسي
     */
    async encryptImage(file, password) {
        try {
            console.log('🔐 بدء عملية التشفير المحسّنة');
            
            // 1. التحقق من صحة المدخلات
            this.validateInputs(file, password);
            
            // 2. قراءة الصورة كـ Base64
            const base64Data = await this.fileToBase64(file);
            
            // 3. تشفير البيانات باستخدام AES-256
            const encryptedData = CryptoJS.AES.encrypt(
                base64Data,
                password,
                {
                    format: CryptoJS.format.OpenSSL
                }
            ).toString();
            
            // 4. إضافة معلومات الملف
            const fileInfo = {
                originalName: file.name,
                originalSize: file.size,
                encryptedAt: new Date().toISOString(),
                version: this.version
            };
            
            // 5. إنشاء الملف المشفّر النهائي
            const finalData = JSON.stringify({
                info: fileInfo,
                data: encryptedData
            });
            
            // 6. إنشاء Blob للتحميل
            return this.createEncryptedBlob(finalData, file.name);
            
        } catch (error) {
            console.error('❌ خطأ في التشفير:', error);
            throw error;
        }
    }
    
    /**
     * التحقق من صحة المدخلات
     */
    validateInputs(file, password) {
        if (!file) {
            throw new Error('لم يتم اختيار أي ملف');
        }
        
        // التحقق من نوع الملف
        if (!this.supportedFormats.includes(file.type)) {
            throw new Error('الملف يجب أن يكون صورة (JPEG, PNG, GIF, WebP)');
        }
        
        // التحقق من حجم الملف
        if (file.size > this.maxFileSize) {
            throw new Error(`حجم الصورة كبير جداً (الحد الأقصى ${this.formatBytes(this.maxFileSize)})`);
        }
        
        // التحقق من كلمة المرور
        if (!password || password.length < 4) {
            throw new Error('كلمة المرور يجب أن تكون 4 أحرف على الأقل');
        }
        
        // التحقق من أن الملف ليس فارغاً
        if (file.size === 0) {
            throw new Error('الملف فارغ');
        }
    }
    
    /**
     * تحويل الملف إلى Base64
     */
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    /**
     * إنشاء Blob للملف المشفّر
     */
    createEncryptedBlob(data, originalFilename) {
        const timestamp = new Date().getTime();
        const safeName = originalFilename.replace(/[^a-z0-9.]/gi, '_');
        const encryptedName = `secured_${safeName}_${timestamp}.enc`;
        
        return {
            blob: new Blob([data], { type: 'application/json' }),
            filename: encryptedName
        };
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
}

// تصدير للاستخدام العام
window.EnhancedEncryption = EnhancedEncryption;

// دالة رئيسية للاستخدام المباشر
async function encryptImageEnhanced(file, password) {
    const encryptor = new EnhancedEncryption();
    return encryptor.encryptImage(file, password);
}
