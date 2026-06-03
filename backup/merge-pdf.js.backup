// أداة دمج PDF - مع دعم الترجمة الكامل

window.initmergepdf = function(containerId) {
    console.log("✅ تهيئة أداة دمج PDF");

    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof PDFLib === 'undefined') {
        container.innerHTML = '<div class="tool-container"><p style="color:red">❌ خطأ في تحميل المكتبة</p></div>';
        return;
    }

    container.innerHTML = `
        <div class="tool-container">
            <!-- شارة الثقة -->
            <div class="trust-badge" style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.15)); border-radius: 60px; padding: 12px 24px; margin-bottom: 25px; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;" data-i18n="trust.private">🔒 100% خصوصية</span>
                    <span style="background: #3b82f6; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;" data-i18n="trust.fast">⚡ معالجة فورية</span>
                    <span style="background: #4f46e5; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;" data-i18n="trust.secure">🛡️ بدون رفع ملفات</span>
                    <span style="background: #f59e0b; color: #1a1a2e; padding: 4px 12px; border-radius: 30px; font-size: 12px;" data-i18n="trust.free">💯 مجاني بالكامل</span>
                </div>
                <p style="margin-top: 12px; font-size: 14px; color: var(--text-secondary);" data-i18n="trust.message">🔐 ملفاتك لا تترك جهازك أبداً - معالجة محلية 100%</p>
            </div>

            <h2 style="text-align: center;">📑 دمج PDF</h2>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px;">✅ دمج عدة ملفات PDF في مستند واحد</p>

            <div class="drag-drop-zone" id="mergeDropArea" style="margin-bottom: 20px;">
                <div class="drag-icon">📁</div>
                <h3 data-i18n="howto.step1.title">اختر ملفات PDF</h3>
                <input type="file" id="pdfInput" accept=".pdf,application/pdf" multiple style="display: none;">
                <small>يمكنك اختيار عدة ملفات (حتى 20 ملفاً)</small>
            </div>

            <div class="file-info" id="fileInfo" style="margin: 20px 0;">
                <span>📄 عدد الملفات: <span id="fileCount">0</span></span>
                <button id="clearAllBtn" style="background: var(--color-error); border: none; color: white; padding: 5px 15px; border-radius: 8px; cursor: pointer; margin-left: 10px;">🗑️ مسح الكل</button>
            </div>

            <div id="fileList" style="background: var(--bg-card); border-radius: 12px; padding: 15px; max-height: 300px; overflow-y: auto;"></div>

            <button class="btn" id="mergeActionBtn" style="width:100%; margin-top: 20px; padding: 14px;" data-i18n="btn.start">📑 دمج الملفات</button>
            <div id="mergeStatus" style="margin-top: 20px; text-align: center;"></div>

            <!-- شرح الاستخدام -->
            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h3 data-i18n="howto.title">📖 طريقة الاستخدام</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">1</div><strong data-i18n="howto.step1.title">اختر الملفات</strong><br><small>اختر ملفات PDF</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">2</div><strong data-i18n="howto.step2.title">رتب الملفات</strong><br><small>يمكنك ترتيبها حسب الرغبة</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">3</div><strong data-i18n="howto.step3.title">ابدأ الدمج</strong><br><small>اضغط زر الدمج</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">4</div><strong data-i18n="howto.step4.title">حمل النتيجة</strong><br><small>احصل على الملف المدمج</small></div>
                </div>
            </div>

            <!-- محتوى SEO -->
            <div class="seo-content" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--border-color);">
                <h2 data-i18n="seo.what.title">ما هي أداة دمج PDF؟</h2>
                <p data-i18n="seo.what.desc">أداة دمج PDF تتيح لك جمع عدة ملفات PDF في مستند واحد مرتب بسهولة وسرعة.</p>
                <h2 data-i18n="seo.benefits.title">لماذا تستخدم هذه الأداة؟</h2>
                <ul><li data-i18n="trust.private">🔒 خصوصية تامة</li><li data-i18n="trust.fast">⚡ سرعة فائقة</li><li data-i18n="trust.free">💯 مجاني بالكامل</li></ul>
                <h2 data-i18n="faq.title">الأسئلة الشائعة</h2>
                <div class="faq-grid"><div class="faq-item"><h4 data-i18n="faq.q1">هل رفع الملفات آمن؟</h4><p data-i18n="faq.a1">نعم، جميع المعالجات تتم داخل متصفحك.</p></div></div>
            </div>
        </div>
    `;

    if (window.SmartImageConverter && window.SmartImageConverter.refreshTranslations) {
        window.SmartImageConverter.refreshTranslations(container);
    }

    const pdfInput = container.querySelector('#pdfInput');
    const mergeDropArea = container.querySelector('#mergeDropArea');
    const fileListDiv = container.querySelector('#fileList');
    const fileCountSpan = container.querySelector('#fileCount');
    const clearAllBtn = container.querySelector('#clearAllBtn');
    const mergeBtn = container.querySelector('#mergeActionBtn');
    const statusDiv = container.querySelector('#mergeStatus');

    let pdfFiles = [];
    let isProcessing = false;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function updateFileList() {
        if (pdfFiles.length === 0) {
            fileListDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-muted);">📂 لا توجد ملفات</div>';
            fileCountSpan.textContent = '0';
            return;
        }
        fileListDiv.innerHTML = '';
        pdfFiles.forEach((file, index) => {
            const div = document.createElement('div');
            div.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid var(--border-color);';
            div.innerHTML = `<div><strong>📄 ${file.name}</strong><br><small>${formatFileSize(file.size)}</small></div><button class="remove-file" data-index="${index}" style="background: var(--color-error); border: none; color: white; padding: 5px 12px; border-radius: 6px; cursor: pointer;">❌ إزالة</button>`;
            fileListDiv.appendChild(div);
        });
        fileCountSpan.textContent = pdfFiles.length;
        document.querySelectorAll('.remove-file').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                pdfFiles.splice(idx, 1);
                updateFileList();
            });
        });
    }

    function setLoading(loading) {
        isProcessing = loading;
        mergeBtn.disabled = loading;
        mergeBtn.textContent = loading ? '⏳ جاري الدمج...' : '📑 دمج الملفات';
    }

    function handleFiles(files) {
        const valid = [];
        for (let f of files) {
            if (f.type !== 'application/pdf') {
                statusDiv.innerHTML = `<span style="color: var(--color-error);">❌ ${f.name} ليس PDF</span>`;
                continue;
            }
            if (f.size > 50 * 1024 * 1024) {
                statusDiv.innerHTML = `<span style="color: var(--color-error);">❌ ${f.name} حجمه كبير</span>`;
                continue;
            }
            valid.push(f);
        }
        if (valid.length) {
            pdfFiles.push(...valid);
            updateFileList();
            statusDiv.innerHTML = `<span style="color: var(--color-success);">✅ تمت إضافة ${valid.length} ملفات</span>`;
            setTimeout(() => statusDiv.innerHTML = '', 2000);
        }
    }

    async function mergePDFs() {
        if (pdfFiles.length < 2) { statusDiv.innerHTML = '<span style="color: var(--color-error);">⚠️ اختر ملفين على الأقل</span>'; return; }
        if (isProcessing) return;
        setLoading(true);
        statusDiv.innerHTML = '<span style="color: var(--color-info);">⏳ جاري الدمج...</span>';
        try {
            const mergedPdf = await PDFLib.PDFDocument.create();
            for (let file of pdfFiles) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
                const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                pages.forEach(page => mergedPdf.addPage(page));
            }
            const pdfBytes = await mergedPdf.save({ useObjectStreams: true });
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `merged_${Date.now()}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
            statusDiv.innerHTML = '<span style="color: var(--color-success);">✅ تم الدمج بنجاح!</span>';
        } catch (error) {
            console.error(error);
            statusDiv.innerHTML = '<span style="color: var(--color-error);">❌ حدث خطأ</span>';
        } finally {
            setLoading(false);
        }
    }

    function clearAll() {
        pdfFiles = [];
        updateFileList();
        pdfInput.value = '';
        statusDiv.innerHTML = '';
    }

    mergeDropArea.addEventListener('click', () => pdfInput.click());
    pdfInput.addEventListener('change', (e) => { if (e.target.files.length) handleFiles(Array.from(e.target.files)); pdfInput.value = ''; });
    mergeDropArea.addEventListener('dragover', (e) => { e.preventDefault(); mergeDropArea.classList.add('drag-over'); });
    mergeDropArea.addEventListener('dragleave', () => { mergeDropArea.classList.remove('drag-over'); });
    mergeDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        mergeDropArea.classList.remove('drag-over');
        if (e.dataTransfer.files.length) handleFiles(Array.from(e.dataTransfer.files));
    });
    mergeBtn.addEventListener('click', mergePDFs);
    clearAllBtn.addEventListener('click', clearAll);

    updateFileList();
    console.log("✅ أداة دمج PDF جاهزة");
};
