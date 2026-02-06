/**
 * نظام فك التشفير المنقح مع عرض وتحميل مباشر - AES-256
 */

'use strict';

class FixedDecryptionSystem {
    constructor() {
        this.version = '3.1';
        this.validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    }

    async decryptFile(file, password) {
        try {
            this.validateInputs(file, password);
            const arrayBuffer = await file.arrayBuffer();
            const fileData = new Uint8Array(arrayBuffer);

            // المحاولة الأولى: نصي
            try {
    const textData = new TextDecoder().decode(fileData);
    const result = await this.decryptTextData(textData, password, file.name);

    // 🔒 تأكيد النتيجة
    if (!(result instanceof Blob) || result.size < 1024) {
        throw new Error('INVALID_PASSWORD');
    }

    return result;

} catch (err) {
    // ❌ نوقف هنا – مفيش محاولة تانية
    throw new Error('INVALID_PASSWORD');
}

        } catch (error) {
            console.error('❌ خطأ في فك التشفير:', error);
            throw error;
        }
    }

    async decryptTextData(textData, password, filename) {
        const cleanText = textData.trim();
        const decrypted = CryptoJS.AES.decrypt(cleanText, password, {
            format: CryptoJS.format.OpenSSL
        });

        if (!decrypted || decrypted.sigBytes <= 0) throw new Error('كلمة المرور خاطئة');

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedText.startsWith('data:image')) throw new Error('البيانات المفكوكة ليست صورة');

        const base64Data = decryptedText.split(',')[1];
        if (!base64Data) throw new Error('تنسيق الصورة غير صالح');

        return this.finalizeBlob(base64Data, filename);
    }

    async decryptBinaryData(binaryData, password, filename) {
        const base64String = this.arrayBufferToBase64(binaryData.buffer);
        const decrypted = CryptoJS.AES.decrypt(base64String, password, {
            format: CryptoJS.format.OpenSSL
        });

        if (!decrypted || decrypted.sigBytes <= 0) throw new Error('كلمة المرور خاطئة');

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        return this.finalizeBlob(decryptedText, filename);
    }

    finalizeBlob(base64Data, filename) {
        if (!this.isValidBase64(base64Data)) throw new Error('بيانات Base64 غير صالحة');

        let mimeType = 'image/jpeg';
        if (base64Data.startsWith('/9j/')) mimeType = 'image/jpeg';
        else if (base64Data.startsWith('iVBORw0KGgo')) mimeType = 'image/png';
        else if (base64Data.startsWith('R0lGOD')) mimeType = 'image/gif';
        else if (base64Data.startsWith('UklGR')) mimeType = 'image/webp';

        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) byteNumbers[i] = slice.charCodeAt(i);
            byteArrays.push(new Uint8Array(byteNumbers));
        }

        const blob = new Blob(byteArrays, { type: mimeType });
        if (blob.size < 100) throw new Error('حجم الصورة الناتج صغير جداً');

        // ✅ عرض الصورة مباشرة إذا فيه عنصر img بالصفحة
        const imgPreview = document.getElementById('imgPreview');
        if (imgPreview) {
            const url = URL.createObjectURL(blob);
            imgPreview.src = url;

            // تحميل تلقائي
            const a = document.createElement('a');
            a.href = url;
            a.download = filename.replace('.enc', '');
            a.click();
        }

        return blob;
    }

    isValidBase64(str) {
        if (typeof str !== 'string') return false;
        if (str.length % 4 !== 0) return false;
        return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
    }

    validateInputs(file, password) {
        if (!file) throw new Error('لم يتم اختيار أي ملف');
        if (!password || password.length < 4) throw new Error('كلمة المرور يجب أن تكون 4 أحرف على الأقل');
        if (file.size > 20 * 1024 * 1024) throw new Error('حجم الملف كبير جداً (الحد الأقصى 20MB)');
        if (file.size === 0) throw new Error('الملف فارغ');
    }

    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        return btoa(binary);
    }
}

window.FixedDecryption = FixedDecryptionSystem;

async function decryptFileFixed(file, password) {
    const decryptor = new FixedDecryptionSystem();
    return decryptor.decryptFile(file, password);
}



document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnDecrypt");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        const fileInput = document.getElementById("fileUpload");
        const passwordInput = document.getElementById("passwordInput");

        if (!fileInput?.files?.length) {
            alert("من فضلك اختر ملفًا");
            return;
        }

        if (!passwordInput?.value) {
            alert("من فضلك أدخل كلمة المرور");
            return;
        }

        await decryptFileFixed(fileInput.files[0], passwordInput.value);
    });
});
