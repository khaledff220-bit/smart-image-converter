/**
 * نظام حماية الصور المتقدم - Smart Image Converter
 * @version 2.1 - تم إصلاح مشكلة التشفير
 */

'use strict';

(function() {
    // التحقق من وجود المكتبات المطلوبة
    if (typeof CryptoJS === 'undefined') {
        console.error('❌ مكتبة CryptoJS غير موجودة');
        return;
    }
    
    if (typeof CryptoCore === 'undefined') {
        console.error('❌ مكتبة CryptoCore غير موجودة');
        return;
    }

    // فئة إدارة واجهة المستخدم
    class EncryptionUI {
        constructor() {
            this.selectedFile = null;
            this.elements = this.cacheElements();
            this.initEventListeners();
            this.initFaqAccordion();
            this.initScrollReveal();
            this.addStyles();
        }

        // تخزين عناصر الصفحة
        cacheElements() {
            return {
                fileInput: document.getElementById('fileUpload'),
                uploadArea: document.getElementById('uploadArea'),
                fileInfo: document.getElementById('fileInfo'),
                fileName: document.getElementById('fileName'),
                previewContainer: document.getElementById('previewContainer'),
                previewImage: document.getElementById('selectionPreview'),
                passwordInput: document.getElementById('password'),
                strengthText: document.getElementById('passwordStrength'),
                strengthFill: document.getElementById('strengthFill'),
                encryptBtn: document.getElementById('btnEncrypt'),
                status: document.getElementById('status'),
                resultArea: document.getElementById('resultArea'),
                downloadLink: document.getElementById('downloadLink'),
                encryptionInfo: document.getElementById('encryptionInfo'),
                featureBadge: document.querySelector('.feature-badge')
            };
        }

        // إضافة الأنماط الأساسية
        addStyles() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideDown {
                    from { opacity: 0; transform: translate(-50%, -100%); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }
                @keyframes slideUp {
                    from { opacity: 1; transform: translate(-50%, 0); }
                    to { opacity: 0; transform: translate(-50%, -100%); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .notification {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 15px 25px;
                    border-radius: 50px;
                    color: white;
                    font-weight: bold;
                    backdrop-filter: blur(10px);
                    z-index: 9999;
                    animation: slideDown 0.3s ease;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    direction: rtl;
                }
                .notification.success { background: rgba(16, 185, 129, 0.9); }
                .notification.error { background: rgba(239, 68, 68, 0.9); }
                .notification.warning { background: rgba(245, 158, 11, 0.9); }
                .notification.info { background: rgba(59, 130, 246, 0.9); }
            `;
            document.head.appendChild(style);
        }

        // تهيئة مستمعات الأحداث
        initEventListeners() {
            const el = this.elements;

            // اختيار الملف
            if (el.fileInput) {
                el.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
            }

            // منطقة السحب والإفلات
            if (el.uploadArea) {
                el.uploadArea.addEventListener('click', () => el.fileInput?.click());
                el.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
                el.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
                el.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
            }

            // تحليل قوة كلمة المرور
            if (el.passwordInput) {
                el.passwordInput.addEventListener('input', () => this.analyzePassword());
            }

            // زر التشفير
            if (el.encryptBtn) {
                el.encryptBtn.addEventListener('click', () => this.encryptImage());
            }

            // مراقبة التغييرات لتمكين/تعطيل الزر
            document.addEventListener('input', () => this.updateButtonState());
        }

        // معالجة اختيار الملف
        handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;

            // التحقق من أن الملف صورة
            if (!file.type.startsWith('image/')) {
                this.showNotification('❌ يرجى اختيار ملف صورة صالح (JPG, PNG, GIF, WebP)', 'error');
                this.elements.fileInput.value = '';
                return;
            }

            this.selectedFile = file;
            this.displayFileInfo(file);
            this.previewImage(file);
            this.showNotification('📁 تم اختيار الملف بنجاح', 'success');
            
            // إخفاء السهم بعد اختيار الملف
            if (this.elements.featureBadge) {
                this.elements.featureBadge.style.opacity = '0.5';
            }
        }

        // عرض معلومات الملف
        displayFileInfo(file) {
            const el = this.elements;
            if (!el.fileInfo || !el.fileName) return;

            const size = (file.size / 1024).toFixed(2);
            const type = file.type.split('/')[1]?.toUpperCase() || 'غير معروف';
            
            el.fileName.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px;">
                    <i class="fas fa-check-circle" style="color: var(--neon-green); font-size: 1.2em;"></i>
                    <div style="text-align: right;">
                        <div><strong>${file.name}</strong></div>
                        <small style="color: #aaa;">الحجم: ${size} KB | النوع: ${type}</small>
                    </div>
                </div>
            `;
            el.fileInfo.style.display = 'block';
        }

        // معاينة الصورة
        previewImage(file) {
            const el = this.elements;
            if (!el.previewContainer || !el.previewImage) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                el.previewImage.src = e.target.result;
                el.previewContainer.style.display = 'block';
                
                // إضافة تأثير ظهور
                el.previewImage.style.animation = 'none';
                el.previewImage.offsetHeight;
                el.previewImage.style.animation = 'glowPulse 2s infinite';
            };
            reader.readAsDataURL(file);
        }

        // معالجة السحب
        handleDragOver(e) {
            e.preventDefault();
            const area = this.elements.uploadArea;
            if (area) {
                area.classList.add('dragover');
                area.style.borderColor = 'var(--neon-green)';
            }
        }

        handleDragLeave(e) {
            e.preventDefault();
            const area = this.elements.uploadArea;
            if (area) {
                area.classList.remove('dragover');
                area.style.borderColor = 'var(--neon-blue)';
            }
        }

        handleDrop(e) {
            e.preventDefault();
            const area = this.elements.uploadArea;
            if (area) {
                area.classList.remove('dragover');
                area.style.borderColor = 'var(--neon-blue)';
            }

            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                if (this.elements.fileInput) {
                    this.elements.fileInput.files = e.dataTransfer.files;
                    this.handleFileSelect({ target: { files: [file] } });
                }
            } else {
                this.showNotification('❌ يرجى اختيار ملف صورة صالح', 'error');
            }
        }

        // تحليل قوة كلمة المرور
        analyzePassword() {
            const el = this.elements;
            if (!el.passwordInput || !el.strengthText) return;

            const password = el.passwordInput.value;
            const analysis = CryptoCore.analyzePasswordStrength(password);

            // تحديث النص
            el.strengthText.textContent = analysis.text;
            el.strengthText.style.color = analysis.color;

            // تحديث شريط القوة
            if (el.strengthFill) {
                el.strengthFill.style.width = `${analysis.percentage}%`;
                el.strengthFill.style.background = analysis.color;
            }

            this.updateButtonState();
        }

        // تحديث حالة زر التشفير
        updateButtonState() {
            const el = this.elements;
            if (!el.encryptBtn || !el.passwordInput) return;

            const hasFile = this.selectedFile !== null;
            const hasPassword = el.passwordInput.value.length >= 4;

            el.encryptBtn.disabled = !(hasFile && hasPassword);
            
            if (!hasFile) {
                el.encryptBtn.title = 'الرجاء اختيار صورة أولاً';
            } else if (!hasPassword) {
                el.encryptBtn.title = 'كلمة المرور يجب أن تكون 4 أحرف على الأقل';
            } else {
                el.encryptBtn.title = '';
            }
        }

        /**
         * تشفير الصورة - الإصدار المحسن
         */
        async encryptImage() {
            const el = this.elements;
            
            if (!this.selectedFile) {
                this.showNotification('❌ الرجاء اختيار صورة أولاً', 'error');
                return;
            }

            const password = el.passwordInput?.value;
            if (!password || password.length < 4) {
                this.showNotification('❌ كلمة المرور يجب أن تكون 4 أحرف على الأقل', 'error');
                return;
            }

            this.setProcessingState(true);

            try {
                // عرض رسالة التحميل
                if (el.status) {
                    el.status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تشفير الصورة...';
                }

                // تشفير الصورة باستخدام المكتبة الموحدة
                const encryptedBlob = await CryptoCore.encryptImage(this.selectedFile, password);

                // التحقق من حجم الملف المشفر
                if (encryptedBlob.size < 100) {
                    throw new Error('الملف المشفر الناتج صغير جداً - فشل التشفير');
                }

                // إنشاء رابط التحميل
                const downloadUrl = URL.createObjectURL(encryptedBlob);
                const fileName = CryptoCore.generateSafeFileName(this.selectedFile.name, 'protected');

                if (el.downloadLink) {
                    el.downloadLink.href = downloadUrl;
                    el.downloadLink.download = fileName;
                }

                // عرض معلومات التشفير
                if (el.encryptionInfo) {
                    const originalSize = (this.selectedFile.size / 1024).toFixed(2);
                    const encryptedSize = (encryptedBlob.size / 1024).toFixed(2);
                    const ratio = ((encryptedBlob.size / this.selectedFile.size) * 100).toFixed(1);
                    
                    el.encryptionInfo.innerHTML = `
                        <div style="text-align: right; background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 10px;">
                            <p style="color: var(--neon-green); font-size: 1.2em; margin-bottom: 10px;">
                                <i class="fas fa-check-circle"></i> تم التشفير بنجاح!
                            </p>
                            <p><strong>📁 الملف الأصلي:</strong> ${originalSize} KB</p>
                            <p><strong>🔐 الملف المشفر:</strong> ${encryptedSize} KB (${ratio}%)</p>
                            <p><strong>🔑 كلمة المرور:</strong> <span style="color: #ffc107;">${'•'.repeat(password.length)}</span></p>
                            <p style="color: #ffc107; margin-top: 15px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
                                <i class="fas fa-exclamation-triangle"></i> احفظ كلمة المرور في مكان آمن - لا يمكن استعادة الملف بدونها
                            </p>
                        </div>
                    `;
                }

                // إظهار منطقة النتيجة
                if (el.resultArea) {
                    el.resultArea.style.display = 'block';
                    
                    // اختبار فك التشفير للتأكد
                    try {
                        const testBlob = await CryptoCore.decryptImage(encryptedBlob, password);
                        console.log('✅ اختبار فك التشفير ناجح! حجم الصورة:', testBlob.size);
                    } catch (testError) {
                        console.warn('⚠️ تحذير: اختبار فك التشفير فشل', testError);
                    }
                    
                    this.showNotification('✅ تم تشفير الصورة بنجاح!', 'success');
                    
                    // التمرير إلى النتيجة
                    setTimeout(() => {
                        el.resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }

                // إخفاء السهم
                if (el.featureBadge) {
                    el.featureBadge.style.display = 'none';
                }

                if (el.status) {
                    el.status.innerHTML = '';
                }

            } catch (error) {
                console.error('Encryption error:', error);
                this.showNotification('❌ ' + error.message, 'error');
                
                if (el.status) {
                    el.status.innerHTML = '';
                }
            } finally {
                this.setProcessingState(false);
            }
        }

        // تغيير حالة المعالجة
        setProcessingState(isProcessing) {
            const el = this.elements;
            
            if (el.encryptBtn) {
                el.encryptBtn.disabled = isProcessing;
                el.encryptBtn.innerHTML = isProcessing ? 
                    '<i class="fas fa-spinner fa-spin me-2"></i>جاري التشفير...' : 
                    '<span style="font-size: 1.3em; margin-left: 10px;">⚡</span>بدء عملية التشفير';
            }

            if (el.passwordInput) {
                el.passwordInput.disabled = isProcessing;
            }

            if (el.fileInput) {
                el.fileInput.disabled = isProcessing;
            }

            if (el.uploadArea) {
                if (isProcessing) {
                    el.uploadArea.style.pointerEvents = 'none';
                    el.uploadArea.style.opacity = '0.7';
                } else {
                    el.uploadArea.style.pointerEvents = 'all';
                    el.uploadArea.style.opacity = '1';
                }
            }
        }

        // إظهار إشعار
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 4000);
        }

        // تهيئة الأسئلة الشائعة
        initFaqAccordion() {
            const questions = document.querySelectorAll('.faq-question');
            
            questions.forEach((question) => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const isActive = question.classList.contains('active');
                    
                    // إغلاق الكل
                    questions.forEach(q => {
                        q.classList.remove('active');
                        if (q.nextElementSibling) {
                            q.nextElementSibling.style.display = 'none';
                        }
                    });
                    
                    // فتح الحالي إذا لم يكن نشطاً
                    if (!isActive) {
                        question.classList.add('active');
                        if (answer) {
                            answer.style.display = 'block';
                            
                            // إضافة تأثير ظهور
                            answer.style.animation = 'none';
                            answer.offsetHeight;
                            answer.style.animation = 'slideUp 0.3s ease';
                        }
                    }
                });
            });
        }

        // تهيئة تأثير الكشف عند التمرير
        initScrollReveal() {
            const elements = document.querySelectorAll('.scroll-reveal');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elements.forEach(el => observer.observe(el));
        }
    }

    // تهيئة الصفحة عند التحميل
    document.addEventListener('DOMContentLoaded', () => {
        // إنشاء كائن واجهة المستخدم
        window.encryptionUI = new EncryptionUI();
        
        // إضافة تأثيرات النجوم المتحركة
        createStars();
        
        console.log('✅ نظام حماية الصور جاهز - الإصدار 2.1');
    });

    // إنشاء خلفية النجوم المتحركة
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        if (!starsContainer) return;

        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }

    // إضافة أنماط النجوم
    const starStyles = document.createElement('style');
    starStyles.textContent = `
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }
        
        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 2s infinite;
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(starStyles);
})();
