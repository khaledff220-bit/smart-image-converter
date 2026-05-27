/**
 * المكتبة الأساسية للتشفير الموحد - AES-256
 * @version 2.0 - تم إصلاح مشكلة التشفير
 */

'use strict';

const CryptoCore = (function() {
    const CONFIG = {
        KEY_SIZE: 256 / 32,
        ITERATIONS: 10000,
        SALT_SIZE: 16,
        IV_SIZE: 16,
        MIN_PASSWORD: 4,
        MAX_FILE_SIZE: 50 * 1024 * 1024
    };

    function validatePassword(password) {
        if (!password || typeof password !== 'string') {
            throw new Error('كلمة المرور مطلوبة');
        }
        if (password.length < CONFIG.MIN_PASSWORD) {
            throw new Error(`كلمة المرور يجب أن تكون ${CONFIG.MIN_PASSWORD} أحرف على الأقل`);
        }
        return password.trim();
    }

    function validateFile(file, isEncrypted = false) {
        if (!file) throw new Error('الملف مطلوب');
        if (file.size > CONFIG.MAX_FILE_SIZE) {
            throw new Error('حجم الملف كبير جداً (الحد الأقصى 50 ميجابايت)');
        }
        if (file.size === 0) throw new Error('الملف فارغ');
        if (isEncrypted && !file.name.toLowerCase().endsWith('.enc')) {
            throw new Error('الملف المشفر يجب أن يكون بامتداد .enc');
        }
        return file;
    }

    /**
     * تحويل File إلى DataURL
     */
    function fileToDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = () => reject(new Error('فشل قراءة الملف'));
            reader.readAsDataURL(file);
        });
    }

    /**
     * تحويل DataURL إلى Blob
     */
    function dataURLToBlob(dataURL) {
        const [header, base64] = dataURL.split(',');
        const mimeType = header.match(/:(.*?);/)[1];
        const byteString = atob(base64);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        
        return new Blob([uint8Array], { type: mimeType });
    }

    /**
     * تشفير صورة - الطريقة الصحيحة
     */
    async function encryptImage(imageFile, password) {
        try {
            validateFile(imageFile);
            const validPassword = validatePassword(password);

            // 1. تحويل الصورة إلى DataURL
            const dataURL = await fileToDataURL(imageFile);
            
            // 2. إنشاء salt عشوائي
            const salt = CryptoJS.lib.WordArray.random(CONFIG.SALT_SIZE);
            
            // 3. إنشاء مفتاح باستخدام PBKDF2
            const key = CryptoJS.PBKDF2(validPassword, salt, {
                keySize: CONFIG.KEY_SIZE,
                iterations: CONFIG.ITERATIONS
            });
            
            // 4. إنشاء IV عشوائي
            const iv = CryptoJS.lib.WordArray.random(CONFIG.IV_SIZE);
            
            // 5. تشفير النص (وليس البيانات الثنائية)
            const encrypted = CryptoJS.AES.encrypt(dataURL, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            
            // 6. بناء الهيكل النهائي: SALT + IV + CIPHERTEXT
            const ciphertext = encrypted.ciphertext;
            const result = salt.clone().concat(iv).concat(ciphertext);
            
            // 7. تحويل إلى Base64 للعرض
            const base64Result = CryptoJS.enc.Base64.stringify(result);
            
            // 8. إنشاء Blob
            return new Blob([base64Result], { type: 'application/octet-stream' });
            
        } catch (error) {
            console.error('Encryption error:', error);
            throw new Error('فشل في تشفير الصورة: ' + error.message);
        }
    }

    /**
     * فك تشفير ملف - الطريقة الصحيحة
     */
    async function decryptImage(encryptedFile, password) {
        try {
            validateFile(encryptedFile, true);
            const validPassword = validatePassword(password);

            // 1. قراءة الملف المشفر كنص
            const encryptedText = await readFileAsText(encryptedFile);
            
            // 2. تحويل Base64 إلى WordArray
            const encryptedData = CryptoJS.enc.Base64.parse(encryptedText.trim());
            
            // 3. استخراج الأجزاء
            const wordArray = encryptedData;
            const totalWords = wordArray.words.length;
            
            const saltWords = CONFIG.SALT_SIZE / 4;
            const ivWords = CONFIG.IV_SIZE / 4;
            
            const salt = CryptoJS.lib.WordArray.create(wordArray.words.slice(0, saltWords));
            const iv = CryptoJS.lib.WordArray.create(wordArray.words.slice(saltWords, saltWords + ivWords));
            const ciphertext = CryptoJS.lib.WordArray.create(wordArray.words.slice(saltWords + ivWords));
            
            // 4. إعادة بناء المفتاح
            const key = CryptoJS.PBKDF2(validPassword, salt, {
                keySize: CONFIG.KEY_SIZE,
                iterations: CONFIG.ITERATIONS
            });
            
            // 5. إعداد معلمات فك التشفير
            const cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: ciphertext
            });
            
            // 6. فك التشفير
            const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            
            // 7. التحقق من النتيجة
            if (!decrypted || decrypted.sigBytes <= 0) {
                throw new Error('كلمة المرور خاطئة');
            }
            
            // 8. تحويل إلى نص
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
            
            // 9. التحقق من أن النص يبدأ بـ data:image
            if (!decryptedText || !decryptedText.startsWith('data:image')) {
                throw new Error('الملف تالف أو كلمة المرور خاطئة');
            }
            
            // 10. تحويل DataURL إلى Blob
            return dataURLToBlob(decryptedText);
            
        } catch (error) {
            console.error('Decryption error:', error);
            if (error.message.includes('كلمة المرور')) {
                throw error;
            }
            throw new Error('فشل في فك التشفير: ' + error.message);
        }
    }

    function readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = () => reject(new Error('فشل قراءة الملف'));
            reader.readAsText(file);
        });
    }

    function analyzePasswordStrength(password) {
        if (!password) return { score: 0, text: 'أدخل كلمة مرور', color: '#aaa' };
        
        let score = 0;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 2;
        
        const levels = [
            { max: 2, text: 'ضعيفة جداً', color: '#f44336' },
            { max: 3, text: 'ضعيفة', color: '#ff9800' },
            { max: 4, text: 'متوسطة', color: '#ffc107' },
            { max: 5, text: 'جيدة', color: '#4caf50' },
            { max: 6, text: 'قوية', color: '#2e7d32' },
            { max: 7, text: 'قوية جداً', color: '#1b5e20' }
        ];
        
        const level = levels.find(l => score <= l.max) || levels[levels.length - 1];
        
        return {
            score: score,
            text: level.text,
            color: level.color,
            percentage: Math.min(100, Math.round((score / 7) * 100))
        };
    }

    function generateSafeFileName(originalName, prefix) {
        const timestamp = Date.now();
        const cleanName = originalName
            .replace(/\.[^/.]+$/, '')
            .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')
            .substring(0, 30);
        
        return `${prefix}_${cleanName}_${timestamp}.enc`;
    }

    return {
        encryptImage,
        decryptImage,
        analyzePasswordStrength,
        generateSafeFileName,
        validateFile,
        validatePassword,
        CONFIG
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CryptoCore;
} else {
    window.CryptoCore = CryptoCore;
}
