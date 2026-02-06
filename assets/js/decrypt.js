/**
 * نظام فك التشفير المحسّن - AES-256
 * إصدار 4.0 - مع معاينة مباشرة وتحسينات الأداء
 */

'use strict';

class EnhancedDecryptionSystem {
    constructor() {
        this.version = '4.0';
        this.validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        this.maxFileSize = 20 * 1024 * 1024; // 20MB
        this.minPasswordLength = 4;
        this.isProcessing = false;
    }

    /**
     * التحقق من صحة المدخلات
     */
    validateInputs(file, password) {
        if (!file) {
            throw new Error('من فضلك اختر ملفًا مشفرًا');
        }

        if (!password || password.trim().length < this.minPasswordLength) {
            throw new Error(`كلمة المرور يجب أن تكون ${this.minPasswordLength} أحرف على الأقل`);
        }

        if (file.size > this.maxFileSize) {
            throw new Error('حجم الملف كبير جداً (الحد الأقصى 20 ميجابايت)');
        }

        if (file.size === 0) {
            throw new Error('الملف فارغ');
        }

        if (!file.name.toLowerCase().endsWith('.enc')) {
            throw new Error('يجب أن يكون الملف بصيغة .enc');
        }
    }

    /**
     * فك تشفير الملف
     */
    async decryptFile(file, password) {
        try {
            // التحقق من المدخلات
            this.validateInputs(file, password);
            
            // تحضير واجهة المستخدم
            this.showLoadingState();
            
            // قراءة الملف
            const arrayBuffer = await file.arrayBuffer();
            const fileData = new Uint8Array(arrayBuffer);
            const textData = new TextDecoder().decode(fileData);
            
            // تنظيف النص
            const cleanText = textData.trim();
            
            // فك التشفير باستخدام AES
            const decrypted = CryptoJS.AES.decrypt(cleanText, password, {
                format: CryptoJS.format.OpenSSL
            });

            // التحقق من نتيجة فك التشفير
            if (!decrypted || decrypted.sigBytes <= 0) {
                throw new Error('كلمة المرور خاطئة');
            }

            // تحويل إلى نص
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
            
            // التحقق من أن النتيجة هي صورة
            if (!decryptedText.startsWith('data:image')) {
                throw new Error('البيانات المفكوكة ليست صورة صالحة');
            }

            // استخراج بيانات Base64
            const base64Data = decryptedText.split(',')[1];
            if (!base64Data) {
                throw new Error('تنسيق الصورة غير صالح');
            }

            // تحويل إلى Blob وعرض النتيجة
            const blob = await this.createImageBlob(base64Data, file.name);
            await this.displayResult(blob, file.name);
            
            return blob;

        } catch (error) {
            console.error('❌ خطأ في فك التشفير:', error);
            
            // إظهار رسالة خطأ واضحة
            if (error.message === 'كلمة المرور خاطئة') {
                throw new Error('كلمة المرور خاطئة. الرجاء المحاولة مرة أخرى.');
            }
            
            throw error;
        } finally {
            this.hideLoadingState();
        }
    }

    /**
     * إنشاء Blob من بيانات Base64
     */
    async createImageBlob(base64Data, filename) {
        // اكتشاف نوع الصورة
        const mimeType = this.detectMimeType(base64Data);
        
        // التحقق من صحة بيانات Base64
        if (!this.isValidBase64(base64Data)) {
            throw new Error('بيانات الصورة غير صالحة');
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
            
            byteArrays.push(new Uint8Array(byteNumbers));
        }

        const blob = new Blob(byteArrays, { type: mimeType });
        
        // التحقق من حجم الصورة الناتجة
        if (blob.size < 100) {
            throw new Error('حجم الصورة الناتج صغير جداً');
        }

        return blob;
    }

    /**
     * اكتشاف نوع الملف من بيانات Base64
     */
    detectMimeType(base64Data) {
        if (base64Data.startsWith('/9j/') || base64Data.startsWith('data:image/jpeg')) {
            return 'image/jpeg';
        } else if (base64Data.startsWith('iVBORw0KGgo') || base64Data.startsWith('data:image/png')) {
            return 'image/png';
        } else if (base64Data.startsWith('R0lGOD') || base64Data.startsWith('data:image/gif')) {
            return 'image/gif';
        } else if (base64Data.startsWith('UklGR') || base64Data.startsWith('data:image/webp')) {
            return 'image/webp';
        }
        
        return 'image/jpeg'; // افتراضي
    }

    /**
     * التحقق من صحة بيانات Base64
     */
    isValidBase64(str) {
        if (typeof str !== 'string') return false;
        if (str.length % 4 !== 0) return false;
        return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
    }

    /**
     * عرض نتيجة فك التشفير
     */
    async displayResult(blob, originalFilename) {
        // إنشاء URL للصورة
        const imageUrl = URL.createObjectURL(blob);
        
        // تحديث عناصر الصفحة
        const imgElement = document.getElementById('decryptedImage');
        const previewCard = document.getElementById('previewCard');
        const downloadBtn = document.getElementById('downloadBtn');
        const guideArrow = document.getElementById('guideArrow');
        const blurOverlay = document.getElementById('blurOverlay');
        
        // إظهار بطاقة المعاينة
        previewCard.style.display = 'block';
        
        // إظهار سهم التوجيه
        if (guideArrow) guideArrow.style.display = 'block';
        
        // تحميل الصورة
        imgElement.src = imageUrl;
        imgElement.style.display = 'block';
        
        // الانتظار حتى تحميل الصورة
        await new Promise((resolve) => {
            imgElement.onload = resolve;
            imgElement.onerror = () => {
                throw new Error('فشل تحميل الصورة');
            };
        });
        
        // إضافة تأثير إزالة Blur تدريجيًا
        if (blurOverlay) {
            blurOverlay.classList.add('fade-out');
            setTimeout(() => {
                blurOverlay.style.display = 'none';
            }, 1500);
        }
        
        // إعداد زر التحميل
        downloadBtn.style.display = 'inline-block';
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `مفكوك_${originalFilename.replace('.enc', '')}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
        // تمرير إلى الأعلى لرؤية النتيجة
        previewCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * إظهار حالة التحميل
     */
    showLoadingState() {
        this.isProcessing = true;
        const btn = document.getElementById('btnDecrypt');
        const errorMessage = document.getElementById('errorMessage');
        
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري فك التشفير...';
        }
        
        if (errorMessage) {
            errorMessage.classList.add('d-none');
        }
        
        // إظهار تأثير Blur
        const blurOverlay = document.getElementById('blurOverlay');
        if (blurOverlay) {
            blurOverlay.style.display = 'flex';
            blurOverlay.classList.remove('fade-out');
        }
    }

    /**
     * إخفاء حالة التحميل
     */
    hideLoadingState() {
        this.isProcessing = false;
        const btn = document.getElementById('btnDecrypt');
        
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-bolt me-2"></i>فك التشفير الآن';
        }
    }

    /**
     * إظهار رسالة خطأ
     */
    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        
        if (errorMessage && errorText) {
            errorText.textContent = message;
            errorMessage.classList.remove('d-none');
            errorMessage.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert(message);
        }
    }

    /**
     * مسح النتائج
     */
    clearResults() {
        const imgElement = document.getElementById('decryptedImage');
        const previewCard = document.getElementById('previewCard');
        const downloadBtn = document.getElementById('downloadBtn');
        const guideArrow = document.getElementById('guideArrow');
        const blurOverlay = document.getElementById('blurOverlay');
        const errorMessage = document.getElementById('errorMessage');
        
        // إعادة تعيين الصورة
        if (imgElement) {
            imgElement.src = '';
            imgElement.style.display = 'none';
        }
        
        // إخفاء بطاقة المعاينة
        if (previewCard) previewCard.style.display = 'none';
        
        // إخفاء زر التحميل
        if (downloadBtn) downloadBtn.style.display = 'none';
        
        // إخفاء سهم التوجيه
        if (guideArrow) guideArrow.style.display = 'none';
        
        // إعادة تعيين تأثير Blur
        if (blurOverlay) {
            blurOverlay.style.display = 'flex';
            blurOverlay.classList.remove('fade-out');
        }
        
        // إخفاء رسائل الخطأ
        if (errorMessage) errorMessage.classList.add('d-none');
        
        // إعادة تعيين حقل كلمة المرور
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) passwordInput.value = '';
    }
}

// إنشاء نسخة عامة من النظام
window.DecryptionSystem = new EnhancedDecryptionSystem();

/**
 * تهيئة الصفحة
 */
document.addEventListener("DOMContentLoaded", () => {
    const btnDecrypt = document.getElementById("btnDecrypt");
    const clearResultBtn = document.getElementById("clearResult");
    const fileUpload = document.getElementById("fileUpload");
    const passwordInput = document.getElementById("passwordInput");
    
    // زر فك التشفير
    if (btnDecrypt) {
        btnDecrypt.addEventListener("click", async () => {
            // التحقق من وجود الملف وكلمة المرور
            if (!fileUpload?.files?.length) {
                window.DecryptionSystem.showError('من فضلك اختر ملفًا مشفرًا');
                return;
            }

            if (!passwordInput?.value) {
                window.DecryptionSystem.showError('من فضلك أدخل كلمة المرور');
                return;
            }

            try {
                await window.DecryptionSystem.decryptFile(
                    fileUpload.files[0], 
                    passwordInput.value
                );
            } catch (error) {
                window.DecryptionSystem.showError(error.message);
            }
        });
    }
    
    // زر مسح النتائج
    if (clearResultBtn) {
        clearResultBtn.addEventListener("click", () => {
            window.DecryptionSystem.clearResults();
        });
    }
    
    // تحسين تجربة المستخدم: فك التشفير عند الضغط على Enter
    if (passwordInput) {
        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === 'Enter' && fileUpload?.files?.length) {
                btnDecrypt.click();
            }
        });
    }
    
    // إظهار اسم الملف المختار
    if (fileUpload) {
        fileUpload.addEventListener("change", function() {
            const fileName = this.files[0]?.name || 'لم يتم اختيار ملف';
            this.nextElementSibling?.textContent !== fileName;
        });
    }
});
