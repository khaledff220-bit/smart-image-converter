// أداة فك تشفير الصور - مع دعم الترجمة الكامل

window.initdecrypt = function(containerId) {
    console.log("✅ تهيئة أداة فك التشفير");

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

            <h2 style="text-align: center;">🔓 فك تشفير الصور</h2>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px;">✅ استعد الصورة الأصلية باستخدام كلمة المرور الصحيحة</p>

            <div class="drag-drop-zone" id="decryptUploadArea" style="margin-bottom: 20px;">
                <div class="drag-icon">🔐</div>
                <h3 data-i18n="howto.step1.title">اختر الملف المشفر</h3>
                <input type="file" id="fileUpload" accept=".enc" style="display: none;">
                <small>يدعم ملفات .enc المشفرة</small>
            </div>

            <div id="fileInfo" style="display: none; background: var(--bg-card); border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div id="fileName"></div>
            </div>

            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔑 كلمة المرور</label>
                <input type="password" id="passwordInput" placeholder="أدخل كلمة المرور" style="width: 100%; padding: 12px; border-radius: 8px; background: var(--bg-primary); color: white; border: 1px solid var(--border-color);">
            </div>

            <div id="errorMessage" style="display: none; margin: 15px 0; padding: 12px; background: rgba(239,68,68,0.2); border-radius: 8px;">
                <span id="errorText" style="color: var(--color-error);"></span>
            </div>

            <button class="btn" id="decryptBtn" style="width:100%; padding: 14px;" data-i18n="btn.start">🔓 فك التشفير</button>
            <div id="decryptStatus" style="margin-top: 20px; text-align: center;"></div>

            <div id="resultArea" style="display: none; margin-top: 30px;">
                <div id="previewCard" style="background: var(--bg-card); border-radius: 12px; padding: 20px; text-align: center;">
                    <img id="decryptedImage" style="max-width: 100%; max-height: 300px; border-radius: 12px; margin-bottom: 15px;">
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button id="downloadBtn" class="btn" data-i18n="btn.download">📥 تحميل الصورة</button>
                        <button id="clearResult" class="btn btn-secondary" data-i18n="btn.clear">🗑️ مسح</button>
                    </div>
                </div>
            </div>

            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h3 data-i18n="howto.title">📖 طريقة الاستخدام</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">1</div><strong data-i18n="howto.step1.title">اختر الملف</strong><br><small>ملف .enc المشفر</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">2</div><strong>أدخل كلمة المرور</strong><br><small>نفس كلمة التشفير</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">3</div><strong data-i18n="howto.step3.title">فك التشفير</strong><br><small>اضغط زر فك التشفير</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">4</div><strong data-i18n="howto.step4.title">حمل الصورة</strong><br><small>احصل على الصورة الأصلية</small></div>
                </div>
            </div>

            <div class="seo-content" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--border-color);">
                <h2 data-i18n="seo.what.title">ما هي أداة فك التشفير؟</h2>
                <p data-i18n="seo.what.desc">أداة فك التشفير تتيح لك استعادة الصور الأصلية من الملفات المشفرة.</p>
                <h2 data-i18n="faq.title">الأسئلة الشائعة</h2>
                <div class="faq-grid"><div class="faq-item"><h4>ماذا لو نسيت كلمة المرور؟</h4><p>لا يمكن استعادة الصورة بدون كلمة المرور الصحيحة.</p></div></div>
            </div>
        </div>
    `;

    if (window.SmartImageConverter && window.SmartImageConverter.refreshTranslations) {
        window.SmartImageConverter.refreshTranslations(container);
    }

    const uploadArea = container.querySelector('#decryptUploadArea');
    const fileInput = container.querySelector('#fileUpload');
    const fileInfo = container.querySelector('#fileInfo');
    const fileNameSpan = container.querySelector('#fileName');
    const passwordInput = container.querySelector('#passwordInput');
    const errorMsg = container.querySelector('#errorMessage');
    const errorText = container.querySelector('#errorText');
    const decryptBtn = container.querySelector('#decryptBtn');
    const statusDiv = container.querySelector('#decryptStatus');
    const resultArea = container.querySelector('#resultArea');
    const decryptedImage = container.querySelector('#decryptedImage');
    const downloadBtn = container.querySelector('#downloadBtn');
    const clearResultBtn = container.querySelector('#clearResult');

    let selectedFile = null;
    let isProcessing = false;
    let currentImageData = null;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function showNotification(msg, type) {
        if (window.SmartImageConverter && window.SmartImageConverter.showToast) {
            window.SmartImageConverter.showToast(msg, type);
        }
    }

    function hideError() { if (errorMsg) errorMsg.style.display = 'none'; }
    function showError(msg) { if (errorMsg && errorText) { errorText.textContent = msg; errorMsg.style.display = 'block'; } }

    function updateButton() {
        if (!decryptBtn) return;
        const hasFile = selectedFile !== null;
        const hasPassword = passwordInput && passwordInput.value && passwordInput.value.length >= 4;
        decryptBtn.disabled = !(hasFile && hasPassword);
        decryptBtn.style.opacity = (hasFile && hasPassword) ? '1' : '0.6';
    }

    function setProcessing(processing) {
        isProcessing = processing;
        if (decryptBtn) {
            decryptBtn.disabled = processing;
            decryptBtn.textContent = processing ? '⏳ جاري فك التشفير...' : '🔓 فك التشفير';
        }
    }

    function clearResults() {
        if (decryptedImage) decryptedImage.src = '';
        resultArea.style.display = 'none';
        fileInfo.style.display = 'none';
        errorMsg.style.display = 'none';
        if (passwordInput) passwordInput.value = '';
        currentImageData = null;
        selectedFile = null;
        if (fileInput) fileInput.value = '';
        updateButton();
        showNotification('🧹 تم المسح', 'info');
    }

    function handleFile(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.enc')) {
            showError('❌ يجب أن يكون الملف بامتداد .enc');
            if (fileInput) fileInput.value = '';
            return;
        }
        selectedFile = file;
        fileInfo.style.display = 'block';
        fileNameSpan.innerHTML = `<div>🔐 <strong>${file.name}</strong><br><small>${formatFileSize(file.size)}</small></div>`;
        hideError();
        updateButton();
        showNotification('✅ تم اختيار الملف', 'success');
    }

    async function decryptFile() {
        if (!selectedFile) { showError('❌ اختر ملفاً مشفراً أولاً'); return; }
        const password = passwordInput?.value;
        if (!password || password.length < 4) { showError('❌ كلمة المرور يجب أن تكون 4 أحرف'); return; }
        if (isProcessing) return;

        setProcessing(true);
        hideError();
        statusDiv.innerHTML = '<span style="color: var(--color-info);">⏳ جاري فك التشفير...</span>';

        try {
            const encryptedText = await selectedFile.text();
            const decrypted = CryptoJS.AES.decrypt(encryptedText, password);
            const base64Image = decrypted.toString(CryptoJS.enc.Utf8);

            if (!base64Image || !base64Image.startsWith('data:image')) {
                throw new Error('كلمة المرور غير صحيحة');
            }

            currentImageData = base64Image;
            decryptedImage.src = base64Image;
            resultArea.style.display = 'block';
            statusDiv.innerHTML = '';
            showNotification('✅ تم فك التشفير!', 'success');
        } catch (error) {
            console.error(error);
            showError('❌ كلمة المرور غير صحيحة');
            statusDiv.innerHTML = '';
        } finally {
            setProcessing(false);
        }
    }

    function downloadImage() {
        if (currentImageData) {
            const link = document.createElement('a');
            link.href = currentImageData;
            link.download = `decrypted_${Date.now()}.png`;
            link.click();
            showNotification('📥 جاري التحميل', 'info');
        }
    }

    uploadArea?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); fileInput.value = ''; });
    passwordInput?.addEventListener('input', () => { hideError(); updateButton(); });
    passwordInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') decryptFile(); });

    uploadArea?.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea?.addEventListener('dragleave', () => { uploadArea.classList.remove('drag-over'); });
    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    decryptBtn?.addEventListener('click', decryptFile);
    downloadBtn?.addEventListener('click', downloadImage);
    clearResultBtn?.addEventListener('click', clearResults);

    updateButton();
    console.log("✅ أداة فك التشفير جاهزة");
};
