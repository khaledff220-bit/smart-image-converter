/**
 * نظام فك التشفير المتقدم - متكامل مع CryptoCore
 * @version 3.0
 */

'use strict';

(function() {
    // التحقق من وجود المكتبات
    if (typeof CryptoJS === 'undefined' || typeof CryptoCore === 'undefined') {
        console.error('❌ المكتبات المطلوبة غير موجودة');
        return;
    }

    class DecryptionUI {
        constructor() {
            this.currentImageUrl = null;
            this.elements = this.cacheElements();
            this.initEventListeners();
            this.initFaqAccordion();
        }

        cacheElements() {
            return {
                fileInput: document.getElementById('fileUpload'),
                uploadArea: document.getElementById('decryptUploadArea'),
                fileInfo: document.getElementById('decryptFileInfo'),
                fileName: document.getElementById('decryptFileName'),
                passwordInput: document.getElementById('passwordInput'),
                decryptBtn: document.getElementById('btnDecrypt'),
                errorMsg: document.getElementById('errorMessage'),
                errorText: document.getElementById('errorText'),
                status: document.getElementById('decryptStatus'),
                previewCard: document.getElementById('previewCard'),
                decryptedImage: document.getElementById('decryptedImage'),
                downloadBtn: document.getElementById('downloadBtn'),
                clearBtn: document.getElementById('clearResult'),
                blurOverlay: document.getElementById('blurOverlay'),
                featureBadge: document.querySelector('.feature-badge')
            };
        }

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

            // حقل كلمة المرور
            if (el.passwordInput) {
                el.passwordInput.addEventListener('input', () => this.updateButtonState());
                el.passwordInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.decryptFile();
                });
            }

            // زر فك التشفير
            if (el.decryptBtn) {
                el.decryptBtn.addEventListener('click', () => this.decryptFile());
            }

            // زر المسح
            if (el.clearBtn) {
                el.clearBtn.addEventListener('click', () => this.clearResults());
            }
        }

        handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.name.toLowerCase().endsWith('.enc')) {
                this.showError('❌ الملف يجب أن يكون بامتداد .enc');
                el.fileInput.value = '';
                return;
            }

            this.displayFileInfo(file);
            this.showNotification('📁 تم اختيار الملف المشفر', 'success');
            
            if (this.elements.featureBadge) {
                this.elements.featureBadge.style.opacity = '0.5';
            }
        }

        displayFileInfo(file) {
            const el = this.elements;
            if (!el.fileInfo || !el.fileName) return;

            const size = (file.size / 1024).toFixed(2);
            el.fileName.innerHTML = `
                <i class="fas fa-lock" style="color: var(--neon-blue);"></i>
                <strong>${file.name}</strong>
                <small style="color: #aaa;">(${size} KB)</small>
            `;
            el.fileInfo.style.display = 'block';
        }

        handleDragOver(e) {
            e.preventDefault();
            const area = this.elements.uploadArea;
            if (area) area.classList.add('dragover');
        }

        handleDragLeave(e) {
            e.preventDefault();
            const area = this.elements.uploadArea;
            if (area) area.classList.remove('dragover');
        }

        handleDrop(e) {
            e.preventDefault();
            const area = this.elements.uploadArea;
            if (area) area.classList.remove('dragover');

            const file = e.dataTransfer.files[0];
            if (file && file.name.toLowerCase().endsWith('.enc')) {
                if (this.elements.fileInput) {
                    this.elements.fileInput.files = e.dataTransfer.files;
                    this.handleFileSelect({ target: { files: [file] } });
                }
            } else {
                this.showError('❌ يجب اختيار ملف .enc صالح');
            }
        }

        updateButtonState() {
            const el = this.elements;
            if (!el.decryptBtn || !el.fileInput || !el.passwordInput) return;

            const hasFile = el.fileInput.files?.length > 0;
            const hasPassword = el.passwordInput.value.length >= 4;

            el.decryptBtn.disabled = !(hasFile && hasPassword);
        }

        async decryptFile() {
            const el = this.elements;

            if (!el.fileInput?.files?.length) {
                this.showError('❌ الرجاء اختيار ملف مشفر');
                return;
            }

            if (!el.passwordInput?.value || el.passwordInput.value.length < 4) {
                this.showError('❌ كلمة المرور يجب أن تكون 4 أحرف على الأقل');
                return;
            }

            this.setProcessingState(true);
            this.hideError();

            try {
                const file = el.fileInput.files[0];
                const password = el.passwordInput.value;

                // فك التشفير باستخدام المكتبة الموحدة
                const decryptedBlob = await CryptoCore.decryptImage(file, password);

                // عرض الصورة
                await this.displayImage(decryptedBlob, file.name);

            } catch (error) {
                console.error('Decryption error:', error);
                
                if (error.message.includes('كلمة المرور')) {
                    this.showError('❌ كلمة المرور غير صحيحة');
                } else {
                    this.showError('❌ ' + error.message);
                }
            } finally {
                this.setProcessingState(false);
            }
        }

        async displayImage(blob, originalFilename) {
            const el = this.elements;

            // تنظيف URL السابق
            if (this.currentImageUrl) {
                URL.revokeObjectURL(this.currentImageUrl);
            }

            // إنشاء URL جديد
            this.currentImageUrl = URL.createObjectURL(blob);

            // إظهار بطاقة المعاينة
            if (el.previewCard) {
                el.previewCard.style.display = 'block';
            }

            // عرض الصورة
            if (el.decryptedImage) {
                el.decryptedImage.src = this.currentImageUrl;
                el.decryptedImage.style.display = 'block';

                // انتظار تحميل الصورة
                await new Promise((resolve) => {
                    el.decryptedImage.onload = resolve;
                });

                // إخفاء تأثير blur
                if (el.blurOverlay) {
                    el.blurOverlay.classList.add('fade-out');
                    setTimeout(() => {
                        el.blurOverlay.style.display = 'none';
                    }, 1000);
                }
            }

            // إعداد زر التحميل
            if (el.downloadBtn) {
                el.downloadBtn.style.display = 'inline-block';
                el.downloadBtn.onclick = () => this.downloadImage(blob, originalFilename);
            }

            // إخفاء السهم
            if (el.featureBadge) {
                el.featureBadge.style.display = 'none';
            }

            this.showNotification('✅ تم فك التشفير بنجاح!', 'success');
        }

        downloadImage(blob, originalFilename) {
            const url = URL.createObjectURL(blob);
            const fileName = originalFilename.replace('.enc', '');
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `مفكوك_${fileName}`;
            link.click();
            
            URL.revokeObjectURL(url);
            this.showNotification('📥 جاري تحميل الصورة', 'info');
        }

        clearResults() {
            const el = this.elements;

            // تنظيف URL
            if (this.currentImageUrl) {
                URL.revokeObjectURL(this.currentImageUrl);
                this.currentImageUrl = null;
            }

            // إخفاء المعاينة
            if (el.decryptedImage) {
                el.decryptedImage.src = '';
                el.decryptedImage.style.display = 'none';
            }

            if (el.previewCard) {
                el.previewCard.style.display = 'none';
            }

            if (el.downloadBtn) {
                el.downloadBtn.style.display = 'none';
            }

            if (el.blurOverlay) {
                el.blurOverlay.style.display = 'flex';
                el.blurOverlay.classList.remove('fade-out');
            }

            if (el.fileInfo) {
                el.fileInfo.style.display = 'none';
            }

            if (el.fileInput) {
                el.fileInput.value = '';
            }

            if (el.passwordInput) {
                el.passwordInput.value = '';
            }

            if (el.featureBadge) {
                el.featureBadge.style.display = 'flex';
                el.featureBadge.style.opacity = '1';
            }

            this.hideError();
            this.updateButtonState();
            this.showNotification('🧹 تم مسح النتائج', 'info');
        }

        setProcessingState(isProcessing) {
            const el = this.elements;

            if (el.decryptBtn) {
                el.decryptBtn.disabled = isProcessing;
                el.decryptBtn.innerHTML = isProcessing ?
                    '<i class="fas fa-spinner fa-spin"></i> جاري فك التشفير...' :
                    '<i class="fas fa-bolt"></i> فك التشفير الآن';
            }

            if (el.fileInput) {
                el.fileInput.disabled = isProcessing;
            }

            if (el.passwordInput) {
                el.passwordInput.disabled = isProcessing;
            }

            if (isProcessing && el.status) {
                el.status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';
            } else if (el.status) {
                el.status.innerHTML = '';
            }
        }

        showError(message) {
            const el = this.elements;
            if (el.errorMsg && el.errorText) {
                el.errorText.textContent = message;
                el.errorMsg.style.display = 'block';
            }
        }

        hideError() {
            const el = this.elements;
            if (el.errorMsg) {
                el.errorMsg.style.display = 'none';
            }
        }

        showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        initFaqAccordion() {
            const questions = document.querySelectorAll('.faq-question');
            
            questions.forEach((q) => {
                q.addEventListener('click', () => {
                    const answer = q.nextElementSibling;
                    const isOpen = answer.style.display === 'block';
                    
                    document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
                    
                    if (!isOpen) {
                        answer.style.display = 'block';
                    }
                });
            });
        }
    }

    // تهيئة الصفحة
    document.addEventListener('DOMContentLoaded', () => {
        window.decryptionUI = new DecryptionUI();
        console.log('✅ نظام فك التشفير جاهز');
    });
})();
