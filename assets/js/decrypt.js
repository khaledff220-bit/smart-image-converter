/**
 * نظام فك التشفير المحسّن - AES-256
 * إصدار 4.5 - مع التصميم الزجاجي وتجربة مستخدم متكاملة
 */

'use strict';

// تأثير الجسيمات المتحركة المحسّن
function createParticles() {
    const container = document.querySelector('.background-animation');
    if (!container) return;

    // تنظيف أي جسيمات سابقة
    const existingParticles = container.querySelectorAll('.particle');
    existingParticles.forEach(p => p.remove());

    // إنشاء جسيمات جديدة
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // أحجام مختلفة للجسيمات
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // مواقع عشوائية
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // شفافية عشوائية
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // حركات مختلفة
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

class EnhancedDecryptionSystem {
    constructor() {
        this.version = '4.5';
        this.validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        this.maxFileSize = 20 * 1024 * 1024; // 20MB
        this.minPasswordLength = 4;
        this.isProcessing = false;
        this.currentImageUrl = null;
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
                this.showError('كلمة المرور خاطئة. الرجاء المحاولة مرة أخرى.');
            } else {
                this.showError(error.message);
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
        // تحقق من البادئات الشائعة
        if (base64Data.startsWith('/9j/') || base64Data.startsWith('/9j//')) {
            return 'image/jpeg';
        } else if (base64Data.startsWith('iVBORw0KGgo') || base64Data.startsWith('iV')) {
            return 'image/png';
        } else if (base64Data.startsWith('R0lGOD') || base64Data.startsWith('R0l')) {
            return 'image/gif';
        } else if (base64Data.startsWith('UklGR') || base64Data.startsWith('Ukl')) {
            return 'image/webp';
        }

        // التحقق من ترويسات البيانات
        const signatures = {
            'data:image/jpeg': 'image/jpeg',
            'data:image/png': 'image/png',
            'data:image/gif': 'image/gif',
            'data:image/webp': 'image/webp'
        };

        for (const [signature, mime] of Object.entries(signatures)) {
            if (base64Data.includes(signature)) {
                return mime;
            }
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
        // تنظيف أي روابط سابقة
        if (this.currentImageUrl) {
            URL.revokeObjectURL(this.currentImageUrl);
        }

        // إنشاء URL للصورة
        this.currentImageUrl = URL.createObjectURL(blob);

        // تحديث عناصر الصفحة
        const imgElement = document.getElementById('decryptedImage');
        const previewCard = document.getElementById('previewCard');
        const downloadBtn = document.getElementById('downloadBtn');
        const guideArrow = document.getElementById('guideArrow');
        const blurOverlay = document.getElementById('blurOverlay');
        const clearResultBtn = document.getElementById('clearResult');

        // إظهار بطاقة المعاينة مع تأثير
        previewCard.style.display = 'block';
        previewCard.classList.add('glass-card', 'hover-glow');

        // إظهار سهم التوجيه مع تأثير
        if (guideArrow) {
            guideArrow.style.display = 'block';
            guideArrow.classList.add('animate__animated', 'animate__pulse');
        }

        // إعداد الصورة مع تأثيرات التحميل
        if (imgElement) {
            // إضافة تأثير تحميل مؤقت
            imgElement.classList.add('image-loading');
            imgElement.style.display = 'block';
            imgElement.src = this.currentImageUrl;
            
            // الانتظار حتى تحميل الصورة
            await new Promise((resolve, reject) => {
                imgElement.onload = () => {
                    imgElement.classList.remove('image-loading');
                    imgElement.classList.add('loaded');
                    resolve();
                };
                
                imgElement.onerror = () => {
                    imgElement.classList.remove('image-loading');
                    reject(new Error('فشل تحميل الصورة'));
                };
                
                // مهلة أمان (10 ثواني)
                setTimeout(() => {
                    if (!imgElement.complete) {
                        reject(new Error('مهلة تحميل الصورة'));
                    }
                }, 10000);
            });
        }

        // إضافة تأثير إزالة Blur تدريجيًا
        if (blurOverlay) {
            blurOverlay.classList.add('fade-out');
            setTimeout(() => {
                blurOverlay.style.display = 'none';
            }, 1500);
        }

        // إعداد زر التحميل مع تأثيرات
        if (downloadBtn) {
            downloadBtn.style.display = 'inline-block';
            downloadBtn.classList.add('btn', 'btn-success', 'btn-lg');
            
            // إعداد حدث التحميل
            downloadBtn.onclick = (e) => {
                e.preventDefault();
                this.downloadImage(originalFilename);
            };
            
            // إضافة تأثير النبض
            downloadBtn.classList.add('animate__animated', 'animate__pulse');
        }

        // إعداد زر المسح
        if (clearResultBtn) {
            clearResultBtn.style.display = 'inline-block';
            clearResultBtn.onclick = () => {
                this.clearResults();
            };
        }

        // تمرير إلى الأعلى لرؤية النتيجة
        previewCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
        });
        
        // إظهار إشعار نجاح
        this.showSuccess('تم فك التشفير بنجاح! يمكنك الآن تحميل الصورة.');
    }

    /**
     * تحميل الصورة
     */
    downloadImage(originalFilename) {
        if (!this.currentImageUrl) return;
        
        const link = document.createElement('a');
        link.href = this.currentImageUrl;
        
        // إنشاء اسم ملف مناسب
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const extension = this.getFileExtension(originalFilename);
        const cleanName = originalFilename
            .replace('.enc', '')
            .replace(/[^a-zA-Z0-9\u0600-\u06FF\s_-]/g, '')
            .trim();
        
        link.download = `مفكوك_${cleanName}_${timestamp}${extension}`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // إظهار رسالة تأكيد
        this.showSuccess(`جاري تحميل الصورة: ${link.download}`);
    }

    /**
     * الحصول على امتداد الملف
     */
    getFileExtension(filename) {
        const match = filename.match(/\.([a-zA-Z0-9]+)$/);
        return match ? `.${match[1].toLowerCase()}` : '.jpg';
    }

    /**
     * إظهار حالة التحميل
     */
    showLoadingState() {
        this.isProcessing = true;
        
        const btn = document.getElementById('btnDecrypt');
        const errorMessage = document.getElementById('errorMessage');
        const fileUpload = document.getElementById('fileUpload');
        const passwordInput = document.getElementById('passwordInput');

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري فك التشفير...';
            btn.classList.add('pulse');
        }

        if (errorMessage) {
            errorMessage.classList.add('d-none');
        }

        // تعطيل الحقول أثناء المعالجة
        if (fileUpload) fileUpload.disabled = true;
        if (passwordInput) passwordInput.disabled = true;

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
        const fileUpload = document.getElementById('fileUpload');
        const passwordInput = document.getElementById('passwordInput');

        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-bolt me-2"></i>فك التشفير الآن';
            btn.classList.remove('pulse');
        }

        // تمكين الحقول بعد المعالجة
        if (fileUpload) fileUpload.disabled = false;
        if (passwordInput) passwordInput.disabled = false;
    }

    /**
     * إظهار رسالة خطأ
     */
    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');

        if (errorMessage && errorText) {
            errorText.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
            errorMessage.classList.remove('d-none');
            errorMessage.classList.add('animate__animated', 'animate__shakeX');
            
            // إزالة الرسوم المتحركة بعد الانتهاء
            setTimeout(() => {
                errorMessage.classList.remove('animate__animated', 'animate__shakeX');
            }, 1000);
            
            errorMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        } else {
            // استخدام التنبيه كبديل
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-danger glass-card';
            alertDiv.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
            alertDiv.style.position = 'fixed';
            alertDiv.style.top = '20px';
            alertDiv.style.right = '20px';
            alertDiv.style.zIndex = '9999';
            alertDiv.style.maxWidth = '400px';
            
            document.body.appendChild(alertDiv);
            
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }
    }

    /**
     * إظهار رسالة نجاح
     */
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success glass-card animate__animated animate__fadeInDown';
        successDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
        successDiv.style.position = 'fixed';
        successDiv.style.top = '20px';
        successDiv.style.right = '20px';
        successDiv.style.zIndex = '9999';
        successDiv.style.maxWidth = '400px';
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.classList.remove('animate__fadeInDown');
            successDiv.classList.add('animate__fadeOutUp');
            setTimeout(() => successDiv.remove(), 1000);
        }, 3000);
    }

    /**
     * مسح النتائج
     */
    clearResults() {
        // تحرير URL الصورة
        if (this.currentImageUrl) {
            URL.revokeObjectURL(this.currentImageUrl);
            this.currentImageUrl = null;
        }

        // إعادة تعيين عناصر الصفحة
        const imgElement = document.getElementById('decryptedImage');
        const previewCard = document.getElementById('previewCard');
        const downloadBtn = document.getElementById('downloadBtn');
        const guideArrow = document.getElementById('guideArrow');
        const blurOverlay = document.getElementById('blurOverlay');
        const errorMessage = document.getElementById('errorMessage');

        if (imgElement) {
            imgElement.src = '';
            imgElement.style.display = 'none';
            imgElement.classList.remove('loaded', 'image-loading');
        }

        if (previewCard) {
            previewCard.style.display = 'none';
            previewCard.classList.remove('glass-card', 'hover-glow');
        }

        if (downloadBtn) {
            downloadBtn.style.display = 'none';
            downloadBtn.classList.remove('animate__animated', 'animate__pulse');
        }

        if (guideArrow) {
            guideArrow.style.display = 'none';
            guideArrow.classList.remove('animate__animated', 'animate__pulse');
        }

        if (blurOverlay) {
            blurOverlay.style.display = 'flex';
            blurOverlay.classList.remove('fade-out');
        }

        if (errorMessage) {
            errorMessage.classList.add('d-none');
        }

        // إعادة تعيين حقول الإدخال
        const fileUpload = document.getElementById('fileUpload');
        const passwordInput = document.getElementById('passwordInput');

        if (fileUpload) fileUpload.value = '';
        if (passwordInput) passwordInput.value = '';

        // إظهار رسالة تأكيد
        this.showSuccess('تم مسح النتائج بنجاح.');
    }

    /**
     * تحسين عرض اسم الملف
     */
    updateFileNameDisplay(file) {
        const fileNameSpan = document.getElementById('fileNameDisplay');
        if (!fileNameSpan) return;

        if (file) {
            const name = file.name.length > 30 
                ? file.name.substring(0, 27) + '...' 
                : file.name;
            
            const size = this.formatFileSize(file.size);
            
            fileNameSpan.innerHTML = `
                <i class="fas fa-file me-2"></i>
                <strong>${name}</strong>
                <small class="text-muted ms-2">(${size})</small>
            `;
            fileNameSpan.classList.remove('d-none');
        } else {
            fileNameSpan.classList.add('d-none');
        }
    }

    /**
     * تنسيق حجم الملف
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 بايت';
        
        const k = 1024;
        const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// إنشاء نسخة عامة من النظام
window.DecryptionSystem = new EnhancedDecryptionSystem();

/**
 * تهيئة الصفحة
 */
document.addEventListener("DOMContentLoaded", () => {
    // إنشاء الجسيمات المتحركة
    createParticles();
    
    // إعادة إنشاء الجسيمات عند تغيير حجم النافذة
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createParticles, 250);
    });

    // ربط العناصر
    const btnDecrypt = document.getElementById("btnDecrypt");
    const clearResultBtn = document.getElementById("clearResult");
    const fileUpload = document.getElementById("fileUpload");
    const passwordInput = document.getElementById("passwordInput");

    // إنشاء عنصر عرض اسم الملف إذا لم يكن موجودًا
    if (fileUpload && !document.getElementById('fileNameDisplay')) {
        const fileContainer = fileUpload.parentElement;
        const fileNameDisplay = document.createElement('div');
        fileNameDisplay.id = 'fileNameDisplay';
        fileNameDisplay.className = 'mt-2 p-2 rounded bg-light d-none';
        fileContainer.appendChild(fileNameDisplay);
    }

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
                // يتم عرض الخطأ داخل النظام
                console.error('فشل العملية:', error);
            }
        });
    }

    // زر مسح النتائج
    if (clearResultBtn) {
        clearResultBtn.addEventListener("click", (e) => {
            e.preventDefault();
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

    // تحديث عرض اسم الملف عند الاختيار
    if (fileUpload) {
        fileUpload.addEventListener("change", function() {
            window.DecryptionSystem.updateFileNameDisplay(this.files[0]);
            
            // إخفاء النتائج القديمة عند اختيار ملف جديد
            window.DecryptionSystem.clearResults();
        });
    }

    // تحسين تجربة الإدخال
    if (passwordInput) {
        passwordInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focus');
        });
        
        passwordInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focus');
        });
    }

    // إضافة تأثيرات للبطاقات عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);

    // مراقبة جميع البطاقات
    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });

    // إضافة زر التمرير لأعلى
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'btn btn-primary btn-lg scroll-top-btn glass-card';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.left = '20px';
    scrollTopBtn.style.zIndex = '1000';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.width = '60px';
    scrollTopBtn.style.height = '60px';
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollTopBtn);

    // إظهار/إخفاء زر التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
            scrollTopBtn.classList.add('animate__animated', 'animate__fadeIn');
        } else {
            scrollTopBtn.classList.remove('animate__animated', 'animate__fadeIn');
            scrollTopBtn.classList.add('animate__animated', 'animate__fadeOut');
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 500);
        }
    });
});

// إضافة مكتبة الرسوم المتحركة إذا لم تكن موجودة
if (!document.querySelector('link[href*="animate.css"]')) {
    const animateCSS = document.createElement('link');
    animateCSS.rel = 'stylesheet';
    animateCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    document.head.appendChild(animateCSS);
}



// لضمان فتح نافذة اختيار الملفات عند الضغط على المربع
const dropZone = document.getElementById('fileDropZone');
const inputField = document.getElementById('fileUpload');
if(dropZone && inputField) {
    dropZone.onclick = () => inputField.click();
}

