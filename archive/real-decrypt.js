/**
 * نظام فك التشفير الحقيقي - AES-256
 * Real Decryption System - AES-256
 */

'use strict';

class RealDecryptionSystem {
    constructor() {
        this.version = '2.0';
        this.supportedFormats = ['.enc', '.aes', '.crypt'];
        this.maxFileSize = 50 * 1024 * 1024; // 50MB
    }
    
    /**
     * فك تشفير الملف الرئيسي
     * Main decryption function
     */
    async decryptFile(file, password) {
        try {
            console.log('بدء عملية فك التشفير الحقيقية');
            
            // 1. التحقق من صحة المدخلات
            this.validateInputs(file, password);
            
            // 2. قراءة الملف كـ ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();
            
            // 3. استخراج بيانات التشفير من الملف
            const fileData = new Uint8Array(arrayBuffer);
            
            // 4. التحقق من أن الملف مشفر حقاً
            if (!this.isValidEncryptedFile(fileData)) {
                throw new Error('الملف ليس ملفاً مشفراً صالحاً أو تالف');
            }
            
            // 5. استخراج بيانات التشفير
            const encryptedData = this.extractEncryptedData(fileData);
            
            // 6. فك التشفير باستخدام AES-256
            const decryptedData = await this.performAESDecryption(
                encryptedData, 
                password,
                file.name
            );
            
            // 7. التحقق من أن فك التشفير ناجح
            if (!this.isValidDecryptedData(decryptedData)) {
                throw new Error('كلمة المرور خاطئة أو الملف تالف');
            }
            
            // 8. إنشاء Blob من البيانات المفكوكة
            return this.createImageBlob(decryptedData);
            
        } catch (error) {
            console.error('خطأ في فك التشفير:', error);
            throw error;
        }
    }
    
    /**
     * التحقق من صحة المدخلات
     * Validate inputs
     */
    validateInputs(file, password) {
        // التحقق من الملف
        if (!file) {
            throw new Error('لم يتم اختيار أي ملف');
        }
        
        // التحقق من اسم الملف
        const isEncrypted = this.supportedFormats.some(format => 
            file.name.toLowerCase().endsWith(format)
        );
        
        if (!isEncrypted) {
            throw new Error('الملف يجب أن يكون من النوع: ' + this.supportedFormats.join(', '));
        }
        
        // التحقق من حجم الملف
        if (file.size > this.maxFileSize) {
            throw new Error(`حجم الملف كبير جداً (الحد الأقصى ${this.formatBytes(this.maxFileSize)})`);
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
     * التحقق من أن الملف مشفر حقاً
     * Check if file is properly encrypted
     */
    isValidEncryptedFile(fileData) {
        // يجب أن يحتوي الملف المشفر على ترويسة خاصة
        if (fileData.length < 20) return false;
        
        // تحقق من وجود علامة التشفير
        const header = new TextDecoder().decode(fileData.slice(0, 8));
        const hasEncryptionHeader = header.includes('ENC') || 
                                   header.includes('AES') ||
                                   this.isBinaryEncrypted(fileData);
        
        return hasEncryptionHeader;
    }
    
    /**
     * استخراج البيانات المشفرة
     * Extract encrypted data
     */
    extractEncryptedData(fileData) {
        // في الملفات المشفرة الحقيقية، هناك ترويسة ومعلومات إضافية
        // هذا مثال مبسط
        
        // تخطي الترويسة (افتراضياً 16 بايت)
        const headerSize = 16;
        
        if (fileData.length <= headerSize) {
            throw new Error('الملف المشفّر تالف أو غير مكتمل');
        }
        
        // استخراج البيانات المشفرة (باستثناء الترويسة)
        return fileData.slice(headerSize);
    }
    
    /**
     * تنفيذ فك تشفير AES
     * Perform AES decryption
     */
    async performAESDecryption(encryptedData, password, filename) {
        try {
            // استخدام CryptoJS لفك التشفير
            if (typeof CryptoJS === 'undefined') {
                throw new Error('مكتبة التشفير غير متوفرة');
            }
            
            // تحويل البيانات المشفرة إلى تنسيق قابل للاستخدام
            const encryptedBase64 = this.arrayBufferToBase64(encryptedData);
            
            // فك التشفير باستخدام AES
            const decrypted = CryptoJS.AES.decrypt(
                encryptedBase64,
                password,
                {
                    format: CryptoJS.format.OpenSSL
                }
            );
            
            // التحقق من نجاح فك التشفير
            if (!decrypted || decrypted.sigBytes <= 0) {
                throw new Error('فشل فك التشفير - كلمة المرور خاطئة');
            }
            
            // تحويل إلى تنسيق UTF-8 للصور
            const decryptedUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
            
            // إذا كانت بيانات الصورة (Base64)
            if (decryptedUtf8.startsWith('data:image')) {
                return this.base64ToArrayBuffer(decryptedUtf8.split(',')[1]);
            }
            
            // إذا كانت بيانات ثنائية
            return this.stringToArrayBuffer(decryptedUtf8);
            
        } catch (error) {
            // إذا كان هناك خطأ، فالكلمة السرية خاطئة
            throw new Error('كلمة المرور خاطئة أو الملف تالف');
        }
    }
    
    /**
     * التحقق من صحة البيانات المفكوكة
     * Validate decrypted data
     */
    isValidDecryptedData(data) {
        if (!data || data.byteLength === 0) {
            return false;
        }
        
        // التحقق من أنها تبدو كبيانات صورة
        const uint8Array = new Uint8Array(data.slice(0, 4));
        
        // توقيعات ملفات الصور المعروفة
        const imageSignatures = {
            'jpeg': [0xFF, 0xD8, 0xFF],
            'png': [0x89, 0x50, 0x4E, 0x47],
            'gif': [0x47, 0x49, 0x46, 0x38]
        };
        
        // تحقق من التوقيعات
        for (const [format, signature] of Object.entries(imageSignatures)) {
            let match = true;
            for (let i = 0; i < signature.length; i++) {
                if (uint8Array[i] !== signature[i]) {
                    match = false;
                    break;
                }
            }
            if (match) return true;
        }
        
        return false;
    }
    
    /**
     * إنشاء Blob للصورة
     * Create image blob
     */
    createImageBlob(arrayBuffer) {
        // محاولة تحديد نوع الصورة
        const uint8Array = new Uint8Array(arrayBuffer.slice(0, 4));
        let mimeType = 'image/jpeg'; // افتراضي
        
        // تحديد نوع MIME بناءً على التوقيع
        if (uint8Array[0] === 0x89 && uint8Array[1] === 0x50) {
            mimeType = 'image/png';
        } else if (uint8Array[0] === 0x47 && uint8Array[1] === 0x49) {
            mimeType = 'image/gif';
        } else if (uint8Array[0] === 0xFF && uint8Array[1] === 0xD8) {
            mimeType = 'image/jpeg';
        }
        
        return new Blob([arrayBuffer], { type: mimeType });
    }
    
    /**
     * التحقق من التشفير الثنائي
     * Check binary encryption
     */
    isBinaryEncrypted(data) {
        // تحليل بسيط للملف الثنائي
        const entropy = this.calculateEntropy(data);
        
        // الملفات المشفرة لها إنتروبيا عالية
        return entropy > 7.5;
    }
    
    /**
     * حساب إنتروبيا البيانات
     * Calculate data entropy
     */
    calculateEntropy(data) {
        const frequency = new Array(256).fill(0);
        const total = data.length;
        
        // حساب تردد البايتات
        for (let i = 0; i < total; i++) {
            frequency[data[i]]++;
        }
        
        // حساب الإنتروبيا
        let entropy = 0;
        for (let i = 0; i < 256; i++) {
            if (frequency[i] > 0) {
                const probability = frequency[i] / total;
                entropy -= probability * Math.log2(probability);
            }
        }
        
        return entropy;
    }
    
    /**
     * تحويل ArrayBuffer إلى Base64
     * ArrayBuffer to Base64
     */
    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        
        return btoa(binary);
    }
    
    /**
     * تحويل Base64 إلى ArrayBuffer
     * Base64 to ArrayBuffer
     */
    base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        return bytes.buffer;
    }
    
    /**
     * تحويل String إلى ArrayBuffer
     * String to ArrayBuffer
     */
    stringToArrayBuffer(str) {
        const encoder = new TextEncoder();
        return encoder.encode(str).buffer;
    }
    
    /**
     * تنسيق البايتات
     * Format bytes
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

// إنشاء نسخة عامة
window.RealDecryption = RealDecryptionSystem;

// دالة فك التشفير الرئيسية للاستخدام المباشر
async function decryptFileReal(file, password, progressCallback = null) {
    const decryptor = new RealDecryptionSystem();
    return decryptor.decryptFile(file, password);
}
