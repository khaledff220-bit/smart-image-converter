/**
 * نظام تشفير الصور الحقيقي - AES-256
 * Real Image Encryption System - AES-256
 */

'use strict';

class RealEncryptionSystem {
    constructor() {
        this.version = '2.0';
        this.encryptionHeader = 'ENCv2.0'; // ترويسة الملف المشفر
    }
    
    /**
     * تشفير الصورة الرئيسي
     * Main encryption function
     */
    async encryptImage(file, password) {
        try {
            console.log('بدء عملية التشفير الحقيقية');
            
            // 1. التحقق من صحة المدخلات
            this.validateInputs(file, password);
            
            // 2. قراءة الصورة كـ ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();
            
            // 3. تشفير البيانات باستخدام AES-256
            const encryptedData = await this.performAESEncryption(
                arrayBuffer, 
                password,
                file.name
            );
            
            // 4. إضافة ترويسة الملف المشفر
            const finalData = this.addEncryptionHeader(encryptedData);
            
            // 5. إنشاء Blob للملف المشفر
            return this.createEncryptedBlob(finalData, file.name);
            
        } catch (error) {
            console.error('خطأ في التشفير:', error);
            throw error;
        }
    }
    
    /**
     * تنفيذ تشفير AES
     * Perform AES encryption
     */
    async performAESEncryption(data, password, filename) {
        if (typeof CryptoJS === 'undefined') {
            throw new Error('مكتبة التشفير غير متوفرة');
        }
        
        // تحويل ArrayBuffer إلى Base64
        const base64Data = this.arrayBufferToBase64(data);
        
        // تشفير باستخدام AES-256
        const encrypted = CryptoJS.AES.encrypt(
            base64Data,
            password,
            {
                format: CryptoJS.format.OpenSSL
            }
        );
        
        // تحويل النتيجة إلى سلسلة
        return encrypted.toString();
    }
    
    /**
     * إضافة ترويسة الملف المشفر
     * Add encryption header
     */
    addEncryptionHeader(encryptedData) {
        // إنشاء ترويسة تحتوي على:
        // 1. توقيع الملف المشفر
        // 2. نسخة التشفير
        // 3. الطول الإجمالي
        
        const header = new TextEncoder().encode(this.encryptionHeader);
        const data = new TextEncoder().encode(encryptedData);
        
        // إنشاء ArrayBuffer نهائي
        const finalBuffer = new ArrayBuffer(header.length + data.length);
        const finalView = new Uint8Array(finalBuffer);
        
        // نسخ الترويسة والبيانات
        finalView.set(header, 0);
        finalView.set(data, header.length);
        
        return finalBuffer;
    }
    
    /**
     * إنشاء Blob للملف المشفر
     * Create encrypted file blob
     */
    createEncryptedBlob(data, originalFilename) {
        const timestamp = new Date().getTime();
        const encryptedName = `encrypted_${timestamp}.enc`;
        
        return {
            blob: new Blob([data], { type: 'application/octet-stream' }),
            filename: encryptedName
        };
    }
    
    /**
     * التحقق من صحة المدخلات
     * Validate inputs
     */
    validateInputs(file, password) {
        if (!file) {
            throw new Error('لم يتم اختيار أي ملف');
        }
        
        // التحقق من نوع الملف (يجب أن يكون صورة)
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            throw new Error('الملف يجب أن يكون صورة (JPEG, PNG, GIF, WebP)');
        }
        
        // التحقق من حجم الملف (10MB حد أقصى)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error(`حجم الصورة كبير جداً (الحد الأقصى ${this.formatBytes(maxSize)})`);
        }
        
        // التحقق من كلمة المرور
        if (!password || password.length < 4) {
            throw new Error('كلمة المرور يجب أن تكون 4 أحرف على الأقل');
        }
    }
    
    /**
     * تحويل ArrayBuffer إلى Base64
     */
    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        
        return btoa(binary);
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

// إنشاء نسخة عامة
window.RealEncryption = RealEncryptionSystem;

// دالة التشفير الرئيسية للاستخدام المباشر
async function encryptImageReal(file, password) {
    const encryptor = new RealEncryptionSystem();
    return encryptor.encryptImage(file, password);
}
