/**
 * نظام فك التشفير المنقح - AES-256
 * Fixed Decryption System - AES-256
 */

'use strict';

class FixedDecryptionSystem {
    constructor() {
        this.version = '3.0';
        this.validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    }
    
    /**
     * فك تشفير الملف الرئيسي
     */
    async decryptFile(file, password) {
        try {
            console.log('🔓 بدء فك التشفير المنقح');
            
            // 1. التحقق الأساسي
            this.validateInputs(file, password);
            
            // 2. قراءة الملف
            const arrayBuffer = await file.arrayBuffer();
            const fileData = new Uint8Array(arrayBuffer);
            
            // 3. محاولة فك التشفير كملف مشفر نصي
            try {
                const textData = new TextDecoder().decode(fileData);
                return await this.decryptTextData(textData, password, file.name);
            } catch (e) {
                console.log('المحاولة الأولى فشلت، جرب طريقة ثنائية');
            }
            
            // 4. محاولة فك التشفير كملف مشفر ثنائي
            return await this.decryptBinaryData(fileData, password, file.name);
            
        } catch (error) {
            console.error('❌ خطأ في فك التشفير:', error);
            throw error;
        }
    }
    
    /**
     * فك تشفير البيانات النصية (Base64 مشفر)
     */
    async decryptTextData(textData, password, filename) {
        try {
            // إزالة أي مسافات أو أسطر جديدة
            const cleanText = textData.trim();
            
            // محاولة فك التشفير باستخدام AES
            const decrypted = CryptoJS.AES.decrypt(cleanText, password, {
                format: CryptoJS.format.OpenSSL
            });
            
            // التحقق من أن فك التشفير ناجح
            if (!decrypted || decrypted.sigBytes <= 0) {
                throw new Error('فشل فك التشفير - كلمة المرور خاطئة');
            }
            
            // تحويل إلى نص
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
            
            // التحقق من أن النتيجة هي صورة Base64
            if (!decryptedText.startsWith('data:image')) {
                throw new Error('البيانات المفكوكة ليست صورة');
            }
            
            // استخراج جزء Base64 من البيانات
            const base64Data = decryptedText.split(',')[1];
            if (!base64Data) {
                throw new Error('تنسيق الصورة غير صالح');
            }
            
            // تحويل Base64 إلى Blob
            return this.base64ToImageBlob(base64Data, filename);
            
        } catch (error) {
            console.error('فشل فك التشفير النصي:', error);
            throw new Error('كلمة المرور خاطئة أو الملف تالف');
        }
    }
    
    /**
     * فك تشفير البيانات الثنائية
     */
    async decryptBinaryData(binaryData, password, filename) {
        try {
            // تحويل البيانات الثنائية إلى Base64
            const base64String = this.arrayBufferToBase64(binaryData.buffer);
            
            // فك التشفير
            const decrypted = CryptoJS.AES.decrypt(base64String, password, {
                format: CryptoJS.format.OpenSSL
            });
            
            // التحقق
            if (!decrypted || decrypted.sigBytes <= 0) {
                throw new Error('فشل فك التشفير - كلمة المرور خاطئة');
            }
            
            // تحويل إلى Blob
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
            return this.base64ToImageBlob(decryptedText, filename);
            
        } catch (error) {
            console.error('فشل فك التشفير الثنائي:', error);
            throw new Error('كلمة المرور خاطئة أو الملف تالف');
        }
    }
    
    /**
     * تحويل Base64 إلى Blob صورة
     */
    base64ToImageBlob(base64Data, filename) {
        try {
            // التحقق من أن البيانات هي Base64 صالحة
            if (!this.isValidBase64(base64Data)) {
                throw new Error('بيانات Base64 غير صالحة');
            }
            
            // تحديد نوع الصورة من Base64
            let mimeType = 'image/jpeg';
            
            if (base64Data.startsWith('/9j/') || base64Data.startsWith('/9j/4AAQ')) {
                mimeType = 'image/jpeg';
            } else if (base64Data.startsWith('iVBORw0KGgo')) {
                mimeType = 'image/png';
            } else if (base64Data.startsWith('R0lGOD')) {
                mimeType = 'image/gif';
            } else if (base64Data.startsWith('UklGR')) {
                mimeType = 'image/webp';
            }
            
            // تحويل Base64 إلى Blob
            const byteCharacters = atob(base64Data);
            const byteArrays = [];
            
            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            
            const blob = new Blob(byteArrays, { type: mimeType });
            
            // التحقق من أن Blob حجمه معقول (أكبر من 100 بايت)
            if (blob.size < 100) {
                throw new Error('حجم الصورة الناتج صغير جداً');
            }
            
            return blob;
            
        } catch (error) {
            console.error('خطأ في تحويل Base64:', error);
            throw new Error('تنسيق الصورة غير مدعوم أو البيانات تالفة');
        }
    }
    
    /**
     * التحقق من Base64 صالح
     */
    isValidBase64(str) {
        if (typeof str !== 'string') return false;
        
        // يجب أن يكون طول Base64 مضاعفاً لـ 4
        if (str.length % 4 !== 0) return false;
        
        // يجب أن يحتوي على أحرف Base64 فقط
        const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
        if (!base64Regex.test(str)) return false;
        
        return true;
    }
    
    /**
     * التحقق من المدخلات
     */
    validateInputs(file, password) {
        if (!file) throw new Error('لم يتم اختيار أي ملف');
        if (!password || password.length < 4) {
            throw new Error('كلمة المرور يجب أن تكون 4 أحرف على الأقل');
        }
        
        // التحقق من حجم الملف (20MB حد أقصى)
        if (file.size > 20 * 1024 * 1024) {
            throw new Error('حجم الملف كبير جداً (الحد الأقصى 20MB)');
        }
        
        // التحقق من أن الملف ليس فارغاً
        if (file.size === 0) {
            throw new Error('الملف فارغ');
        }
    }
    
    /**
     * ArrayBuffer إلى Base64
     */
    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        
        return btoa(binary);
    }
}

// إنشاء نسخة عامة
window.FixedDecryption = FixedDecryptionSystem;

// دالة رئيسية للاستخدام
async function decryptFileFixed(file, password) {
    const decryptor = new FixedDecryptionSystem();
    return decryptor.decryptFile(file, password);
}
