// أداة حماية الصور - مع دعم الترجمة الكامل

window.initpasswordprotect = function(containerId) {
    console.log("✅ تهيئة أداة حماية الصور");

    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof CryptoJS === 'undefined') {
        container.innerHTML = '<div class="tool-container"><p style="color:red">❌ خطأ في تحميل مكتبة التشفير</p></div>';
        return;
    }

    container.innerHTML = `
        <div class="tool-container">
            <div class="trust-badge" style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.15)); border-radius: 60px; padding: 12px 24px; margin-bottom: 25px; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;" data-i18n="trust.private">🔒 100% خصوصية</span>
                    <span style="background: #3b82f6; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;" data-i18n="trust.fast">⚡ معالجة فورية</span>
                    <span style="background: #4f46e5; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;" data-i18n="trust.secure">🛡️ بدون رفع ملفات</span>
                    <span style="background: #f59e0b; color: #1a1a2e; padding: 4px 12px; border-radius: 30px; font-size: 12px;" data-i18n="trust.free">💯 مجاني بالكامل</span>
                </div>
                <p style="margin-top: 12px; font-size: 14px; color: var(--text-secondary);" data-i18n="trust.message">🔐 ملفاتك لا تترك جهازك أبداً - معالجة محلية 100%</p>
            </div>

            <h2 style="text-align: center;">🔒 حماية الصور</h2>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px;">✅ تشفير صورك بتقنية AES-256 العسكرية</p>

            <div class="drag-drop-zone" id="uploadArea" style="margin-bottom: 20px;">
                <div class="drag-icon">🖼️</div>
                <h3 data-i18n="howto.step1.title">اختر الصورة</h3>
                <input type="file" id="fileUpload" accept="image/jpeg,image/png,image/gif,image/webp" style="display: none;">
                <small>الحد الأقصى: 50MB</small>
            </div>

            <div id="fileInfo" style="display: none; background: var(--bg-card); border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div id="fileName"></div>
            </div>

            <div id="previewContainer" style="display: none; text-align: center; margin: 20px 0;">
                <img id="selectionPreview" style="max-width: 100%; max-height: 200px; border-radius: 12px;">
            </div>

            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔑 كلمة المرور</label>
                <input type="password" id="password" placeholder="أدخل كلمة مرور قوية" style="width: 100%; padding: 12px; border-radius: 8px; background: var(--bg-primary); color: white; border: 1px solid var(--border-color);">
                <div id="passwordStrength" style="margin-top: 8px; font-size: 12px;"></div>
            </div>

            <button class="btn" id="encryptBtn" style="width:100%; padding: 14px;" data-i18n="btn.start">🔒 تشفير الصورة</button>
            <div id="status" style="margin-top: 20px; text-align: center;"></div>

            <div id="resultArea" style="display: none; margin-top: 30px; padding: 20px; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--color-success);">
                <div id="encryptionInfo"></div>
                <a href="#" id="downloadLink" class="btn" style="display: inline-block; margin-top: 15px;" data-i18n="btn.download">📥 تحميل الملف المشفر</a>
            </div>

            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h3 data-i18n="howto.title">📖 طريقة الاستخدام</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">1</div><strong data-i18n="howto.step1.title">اختر الصورة</strong><br><small>اسحب أو اضغط</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">2</div><strong>أدخل كلمة المرور</strong><br><small>كلمة مرور قوية</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">3</div><strong data-i18n="howto.step3.title">ابدأ التشفير</strong><br><small>اضغط زر التشفير</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">4</div><strong data-i18n="howto.step4.title">حمل النتيجة</strong><br><small>احصل على الملف المشفر</small></div>
                </div>
            </div>

            <div class="seo-content" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--border-color);">
                <h2 data-i18n="seo.what.title">ما هي أداة حماية الصور؟</h2>
                <p data-i18n="seo.what.desc">أداة حماية الصور تتيح لك تشفير صورك بكلمة مرور قوية باستخدام تقنية AES-256 العسكرية.</p>
                <h2 data-i18n="seo.benefits.title">لماذا تستخدم هذه الأداة؟</h2>
                <ul><li>🔒 تشفير AES-256</li><li data-i18n="trust.private">🔒 خصوصية تامة</li><li data-i18n="trust.free">💯 مجاني</li></ul>
                <h2 data-i18n="faq.title">الأسئلة الشائعة</h2>
                <div class="faq-grid"><div class="faq-item"><h4 data-i18n="faq.q1">هل التشفير آمن؟</h4><p data-i18n="faq.a1">نعم، AES-256 غير قابل للاختراق</p></div></div>
            </div>
        </div>
    `;

    if (window.SmartImageConverter && window.SmartImageConverter.refreshTranslations) {
        window.SmartImageConverter.refreshTranslations(container);
    }

    const uploadArea = container.querySelector('#uploadArea');
    const fileInput = container.querySelector('#fileUpload');
    const fileInfo = container.querySelector('#fileInfo');
    const fileNameSpan = container.querySelector('#fileName');
    const previewContainer = container.querySelector('#previewContainer');
    const previewImage = container.querySelector('#selectionPreview');
    const passwordInput = container.querySelector('#password');
    const strengthText = container.querySelector('#passwordStrength');
    const encryptBtn = container.querySelector('#encryptBtn');
    const statusDiv = container.querySelector('#status');
    const resultArea = container.querySelector('#resultArea');
    const encryptionInfo = container.querySelector('#encryptionInfo');
    const downloadLink = container.querySelector('#downloadLink');

    let selectedImageData = null;
    let selectedFileName = null;
    let selectedFileSize = null;
    let isProcessing = false;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function analyzePassword(pwd) {
        if (!pwd) return { text: '', color: 'var(--text-muted)' };
        let strength = 0;
        if (pwd.length >= 4) strength += 20;
        if (pwd.length >= 6) strength += 20;
        if (pwd.length >= 8) strength += 20;
        if (/[0-9]/.test(pwd)) strength += 15;
        if (/[a-z]/.test(pwd)) strength += 15;
        if (/[A-Z]/.test(pwd)) strength += 10;
        if (/[^a-zA-Z0-9]/.test(pwd)) strength += 10;
        if (strength < 30) return { text: 'ضعيفة', color: 'var(--color-error)' };
        if (strength < 60) return { text: 'متوسطة', color: 'var(--color-warning)' };
        return { text: 'قوية', color: 'var(--color-success)' };
    }

    function updateButton() {
        if (!encryptBtn) return;
        const hasFile = selectedImageData !== null;
        const hasPassword = passwordInput && passwordInput.value && passwordInput.value.length >= 4;
        encryptBtn.disabled = !(hasFile && hasPassword);
        encryptBtn.style.opacity = (hasFile && hasPassword) ? '1' : '0.6';
    }

    function setProcessing(processing) {
        isProcessing = processing;
        if (encryptBtn) {
            encryptBtn.disabled = processing;
            encryptBtn.textContent = processing ? '⏳ جاري التشفير...' : '🔒 تشفير الصورة';
        }
    }

    function showNotification(msg, type) {
        if (window.SmartImageConverter && window.SmartImageConverter.showToast) {
            window.SmartImageConverter.showToast(msg, type);
        }
    }

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            showNotification('❌ اختر صورة صالحة', 'error');
            return;
        }
        if (file.size > 50 * 1024 * 1024) {
            showNotification('❌ حجم الصورة كبير', 'error');
            return;
        }
        selectedFileName = file.name;
        selectedFileSize = file.size;
        fileInfo.style.display = 'block';
        fileNameSpan.innerHTML = `<div><strong>${file.name}</strong><br><small>${formatFileSize(file.size)}</small></div>`;

        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImageData = e.target.result;
            previewImage.src = selectedImageData;
            previewContainer.style.display = 'block';
            statusDiv.innerHTML = '';
            updateButton();
            showNotification('✅ تم اختيار الصورة', 'success');
        };
        reader.onerror = () => showNotification('❌ فشل قراءة الصورة', 'error');
        reader.readAsDataURL(file);
    }

    async function encryptImage() {
        if (!selectedImageData) { showNotification('❌ اختر صورة أولاً', 'error'); return; }
        const password = passwordInput?.value?.trim();
        if (!password || password.length < 4) { showNotification('❌ كلمة المرور يجب أن تكون 4 أحرف', 'error'); return; }
        if (isProcessing) return;

        setProcessing(true);
        statusDiv.innerHTML = '<span style="color: var(--color-info);">⏳ جاري التشفير...</span>';
        resultArea.style.display = 'none';

        try {
            const encrypted = CryptoJS.AES.encrypt(selectedImageData, password).toString();
            const blob = new Blob([encrypted], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            downloadLink.href = url;
            downloadLink.download = `protected_${selectedFileName || 'image'}.enc`;

            encryptionInfo.innerHTML = `
                <div style="text-align:right;"><p style="color: var(--color-success);">✅ تم التشفير!</p>
                <p>📁 الأصلي: ${(selectedFileSize / 1024).toFixed(2)} KB</p>
                <p>🔐 المشفر: ${(blob.size / 1024).toFixed(2)} KB</p>
                <p style="color:#ffc107;">⚠️ احفظ كلمة المرور</p></div>`;
            
            resultArea.style.display = 'block';
            statusDiv.innerHTML = '';
            showNotification('✅ تم التشفير بنجاح!', 'success');
        } catch (error) {
            console.error(error);
            statusDiv.innerHTML = '<span style="color: var(--color-error);">❌ فشل التشفير</span>';
            showNotification('❌ فشل التشفير', 'error');
        } finally {
            setProcessing(false);
        }
    }

    uploadArea?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); fileInput.value = ''; });
    uploadArea?.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea?.addEventListener('dragleave', () => { uploadArea.classList.remove('drag-over'); });
    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    passwordInput?.addEventListener('input', () => {
        const analysis = analyzePassword(passwordInput.value);
        strengthText.textContent = analysis.text;
        strengthText.style.color = analysis.color;
        updateButton();
    });
    encryptBtn?.addEventListener('click', encryptImage);

    updateButton();
    console.log("✅ أداة حماية الصور جاهزة");
};
