// أداة تحويل الصور إلى PDF - مع دعم الترجمة الكامل

window.initimagetopdf = function(containerId) {
    console.log("✅ تهيئة أداة تحويل الصور إلى PDF");

    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof PDFLib === 'undefined') {
        container.innerHTML = '<div class="tool-container"><p style="color:red">❌ خطأ في تحميل المكتبة</p></div>';
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

            <h2 style="text-align: center;">🖼️➡️📄 تحويل الصور إلى PDF</h2>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px;">✅ حوّل صورك إلى PDF بجودة عالية</p>

            <div class="drag-drop-zone" id="uploadArea" style="margin-bottom: 20px;">
                <div class="drag-icon">🖼️</div>
                <h3 data-i18n="howto.step1.title">اختر الصور</h3>
                <input type="file" id="fileInput" accept="image/jpeg,image/png,image/webp,image/gif" multiple style="display: none;">
                <small>اختر عدة صور (حتى 20 صورة)</small>
            </div>

            <div id="filesInfo" style="display: none; background: var(--bg-card); border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <span>📄 عدد الصور: <span id="imageCount">0</span></span>
                    <button id="clearFilesBtn" style="background: var(--color-error); border: none; color: white; padding: 5px 15px; border-radius: 8px; cursor: pointer;">🗑️ مسح الكل</button>
                </div>
                <div id="imagesPreview" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; max-height: 200px; overflow-y: auto;"></div>
            </div>

            <div style="margin: 20px 0;">
                <h3>⚙️ إعدادات PDF</h3>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <label><span>اتجاه الصفحة:</span>
                        <select id="orientation" style="padding: 8px; border-radius: 8px; background: var(--bg-primary); color: white;">
                            <option value="portrait">عمودي</option>
                            <option value="landscape">أفقي</option>
                            <option value="auto">تلقائي</option>
                        </select>
                    </label>
                    <label><span>حجم الصفحة:</span>
                        <select id="pageSize" style="padding: 8px; border-radius: 8px; background: var(--bg-primary); color: white;">
                            <option value="A4">A4</option>
                            <option value="Letter">Letter</option>
                            <option value="Legal">Legal</option>
                        </select>
                    </label>
                    <label><input type="checkbox" id="fitToPage" checked> تكييف الصورة</label>
                </div>
            </div>

            <div class="progress-bar" id="progressBar" style="display: none; margin: 20px 0;">
                <div id="progressFill" style="width: 0%; height: 4px; background: var(--color-primary); border-radius: 2px;"></div>
                <p id="progressText" style="font-size: 12px; margin-top: 8px; text-align: center;">جاري التحويل...</p>
            </div>

            <button class="btn" id="convertBtn" style="width:100%; padding: 14px;" data-i18n="btn.start">🔄 تحويل إلى PDF</button>
            <div id="status" style="margin-top: 20px; text-align: center;"></div>

            <div id="resultArea" style="display: none; margin-top: 30px; padding: 20px; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--color-success); text-align: center;">
                <div id="resultIcon" style="font-size: 48px;">✅</div>
                <h3>تم التحويل!</h3>
                <p>تم تحويل <span id="convertedCount">0</span> صورة</p>
                <a href="#" id="downloadLink" class="btn" data-i18n="btn.download">📥 تحميل PDF</a>
                <button id="newConvertBtn" class="btn btn-secondary" data-i18n="btn.new">🔄 تحويل جديد</button>
            </div>

            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h3 data-i18n="howto.title">📖 طريقة الاستخدام</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">1</div><strong data-i18n="howto.step1.title">اختر الصور</strong><br><small>اختر صوراً متعددة</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">2</div><strong>اختر الإعدادات</strong><br><small>اتجاه وحجم الصفحة</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">3</div><strong data-i18n="howto.step3.title">ابدأ التحويل</strong><br><small>اضغط زر التحويل</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">4</div><strong data-i18n="howto.step4.title">حمل PDF</strong><br><small>احصل على ملف PDF</small></div>
                </div>
            </div>
        </div>
    `;

    if (window.SmartImageConverter && window.SmartImageConverter.refreshTranslations) {
        window.SmartImageConverter.refreshTranslations(container);
    }

    const uploadArea = container.querySelector('#uploadArea');
    const fileInput = container.querySelector('#fileInput');
    const filesInfo = container.querySelector('#filesInfo');
    const imageCountSpan = container.querySelector('#imageCount');
    const imagesPreview = container.querySelector('#imagesPreview');
    const clearFilesBtn = container.querySelector('#clearFilesBtn');
    const orientation = container.querySelector('#orientation');
    const pageSizeSelect = container.querySelector('#pageSize');
    const fitToPage = container.querySelector('#fitToPage');
    const convertBtn = container.querySelector('#convertBtn');
    const statusDiv = container.querySelector('#status');
    const resultArea = container.querySelector('#resultArea');
    const downloadLink = container.querySelector('#downloadLink');
    const convertedCountSpan = container.querySelector('#convertedCount');
    const newConvertBtn = container.querySelector('#newConvertBtn');
    const progressBar = container.querySelector('#progressBar');
    const progressFill = container.querySelector('#progressFill');
    const progressText = container.querySelector('#progressText');

    let selectedImages = [];
    let currentDownloadUrl = null;
    let isProcessing = false;

    const pageSizes = { A4: [595, 842], Letter: [612, 792], Legal: [612, 1008] };
    const MAX_DIM = 3000;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function showNotification(msg, type) {
        if (window.SmartImageConverter && window.SmartImageConverter.showToast) {
            window.SmartImageConverter.showToast(msg, type);
        }
    }

    function revokeUrl() { if (currentDownloadUrl) { URL.revokeObjectURL(currentDownloadUrl); currentDownloadUrl = null; } }
    function updateProgress(p, text) { if (progressFill) progressFill.style.width = p + '%'; if (progressText) progressText.textContent = text || `جاري التحويل... ${p}%`; }

    function updatePreview() {
        const cnt = selectedImages.length;
        if (cnt === 0) { filesInfo.style.display = 'none'; imageCountSpan.textContent = '0'; return; }
        filesInfo.style.display = 'block';
        imageCountSpan.textContent = cnt;
        imagesPreview.innerHTML = '';
        selectedImages.forEach((img, idx) => {
            const div = document.createElement('div');
            div.style.cssText = 'position: relative; width: 80px; height: 80px; border-radius: 8px; overflow: hidden; background: var(--bg-primary);';
            div.innerHTML = `<img src="${img.dataUrl}" style="width:100%;height:100%;object-fit:cover;"><button data-index="${idx}" style="position:absolute; top:-5px; right:-5px; background:var(--color-error); border:none; color:white; border-radius:50%; width:22px; height:22px; cursor:pointer; font-size:12px;">✕</button>`;
            imagesPreview.appendChild(div);
        });
        imagesPreview.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                selectedImages.splice(idx, 1);
                updatePreview();
                if (selectedImages.length === 0) resultArea.style.display = 'none';
            });
        });
    }

    function setProcessing(processing) {
        isProcessing = processing;
        if (convertBtn) {
            convertBtn.disabled = processing;
            convertBtn.textContent = processing ? '⏳ جاري التحويل...' : '🔄 تحويل إلى PDF';
        }
        if (progressBar) progressBar.style.display = processing ? 'block' : 'none';
    }

    function resetTool() {
        selectedImages = [];
        revokeUrl();
        fileInput.value = '';
        updatePreview();
        resultArea.style.display = 'none';
        statusDiv.innerHTML = '';
        updateProgress(0, '');
    }

    async function embedImageSmart(pdfDoc, img) {
        const mime = img.file.type.toLowerCase();
        if (mime === 'image/png') return await pdfDoc.embedPng(img.dataUrl);
        if (mime === 'image/jpeg' || mime === 'image/jpg') return await pdfDoc.embedJpg(img.dataUrl);
        let tempImg = new Image();
        await new Promise((resolve, reject) => { tempImg.onload = resolve; tempImg.onerror = reject; tempImg.src = img.dataUrl; });
        let w = tempImg.width, h = tempImg.height;
        if (w > MAX_DIM || h > MAX_DIM) { const r = Math.min(MAX_DIM / w, MAX_DIM / h); w = Math.floor(w * r); h = Math.floor(h * r); }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0, w, h);
        const pngData = canvas.toDataURL('image/png', 0.92);
        tempImg.src = '';
        return await pdfDoc.embedPng(pngData);
    }

    function handleFiles(files) {
        const remaining = 20 - selectedImages.length;
        const valid = [];
        for (let f of files) {
            if (valid.length >= remaining) break;
            if (!f.type.startsWith('image/')) { showNotification(`❌ ${f.name} ليس صورة`, 'error'); continue; }
            valid.push(f);
        }
        if (!valid.length) return;
        let processed = 0;
        valid.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    selectedImages.push({ file, dataUrl: e.target.result, name: file.name, width: img.width, height: img.height });
                    processed++;
                    if (processed === valid.length) updatePreview();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
        showNotification(`✅ تمت إضافة ${valid.length} صور`, 'success');
    }

    async function convertToPdf() {
        if (!selectedImages.length) { showNotification('❌ اختر صوراً أولاً', 'error'); return; }
        if (isProcessing) return;
        setProcessing(true);
        statusDiv.innerHTML = '<span style="color: var(--color-info);">⏳ جاري التحويل...</span>';
        resultArea.style.display = 'none';
        revokeUrl();

        try {
            const orientVal = orientation.value;
            const sizeKey = pageSizeSelect.value;
            const fit = fitToPage.checked;
            const [pw, ph] = pageSizes[sizeKey];
            const pdfDoc = await PDFLib.PDFDocument.create();
            const total = selectedImages.length;

            for (let i = 0; i < total; i++) {
                const img = selectedImages[i];
                updateProgress(Math.round((i / total) * 100), `تحويل الصورة ${i+1} من ${total}...`);
                let finalOrient = orientVal;
                if (orientVal === 'auto') finalOrient = img.width > img.height ? 'landscape' : 'portrait';
                let fw = pw, fh = ph;
                if (finalOrient === 'landscape') [fw, fh] = [fh, fw];
                let x = 0, y = 0, dw = fw, dh = fh;
                if (fit) {
                    const ir = img.width / img.height;
                    const pr = fw / fh;
                    if (ir > pr) { dw = fw; dh = fw / ir; y = (fh - dh) / 2; }
                    else { dh = fh; dw = fh * ir; x = (fw - dw) / 2; }
                } else {
                    const s = Math.min(fw / img.width, fh / img.height);
                    dw = img.width * s; dh = img.height * s;
                    x = (fw - dw) / 2; y = (fh - dh) / 2;
                }
                const embedded = await embedImageSmart(pdfDoc, img);
                const page = pdfDoc.addPage([fw, fh]);
                page.drawImage(embedded, { x, y, width: dw, height: dh });
                await new Promise(r => setTimeout(r, 10));
            }

            updateProgress(95, 'جاري الحفظ...');
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            currentDownloadUrl = URL.createObjectURL(blob);
            downloadLink.href = currentDownloadUrl;
            downloadLink.download = `converted_${Date.now()}.pdf`;
            convertedCountSpan.textContent = total;
            resultArea.style.display = 'block';
            statusDiv.innerHTML = '';
            updateProgress(100, 'اكتمل!');
            showNotification('✅ تم التحويل!', 'success');
        } catch (error) {
            console.error(error);
            statusDiv.innerHTML = '<span style="color: var(--color-error);">❌ حدث خطأ</span>';
            showNotification('❌ حدث خطأ', 'error');
            updateProgress(0, '');
        } finally {
            setProcessing(false);
        }
    }

    uploadArea?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => { if (e.target.files.length) handleFiles(Array.from(e.target.files)); fileInput.value = ''; });
    clearFilesBtn?.addEventListener('click', resetTool);
    convertBtn?.addEventListener('click', convertToPdf);
    newConvertBtn?.addEventListener('click', resetTool);

    uploadArea?.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea?.addEventListener('dragleave', () => { uploadArea.classList.remove('drag-over'); });
    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        if (e.dataTransfer.files.length) handleFiles(Array.from(e.dataTransfer.files));
    });

    console.log("✅ أداة تحويل الصور إلى PDF جاهزة");
};
