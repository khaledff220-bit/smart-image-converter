/**
 * محرك ضغط PDF الحقيقي - النسخة النهائية مع تحسينات SEO و UX
 * Real PDF Compression Engine - Final SEO & UX Optimized Version
 * يعمل 100% داخل المتصفح - معالجة محلية بخصوصية تامة
 * @version 4.0.0
 */

class PDFCompressor {
    constructor() {
        this.pdfjsLib = window.pdfjsLib;
        this.settings = {
            maxFileSize: 50 * 1024 * 1024,
            maxPages: 100,
            defaultQuality: 0.55,
            minFileSizeToCompress: 500 * 1024,
            maxWidth: 1400,
            maxHeight: 2000,
            compressionLevels: {
                low: { quality: 0.70, scale: 0.90, label: 'منخفض' },
                medium: { quality: 0.45, scale: 0.75, label: 'متوسط' },
                high: { quality: 0.25, scale: 0.60, label: 'عالي' }
            }
        };
        this.isProcessing = false;
        this.currentProgress = 0;
    }

    async compressPDF(file, quality = 0.55, progressCallback = null) {
        if (this.isProcessing) {
            throw new Error('عملية ضغط جارية بالفعل');
        }
        if (file.size < this.settings.minFileSizeToCompress) {
            console.log(`📊 الملف صغير جداً (${this.formatBytes(file.size)})، سيتم إرجاعه كما هو`);
            return file;
        }
        this.isProcessing = true;
        this.currentProgress = 0;
        try {
            this.validateFile(file);
            const originalSize = file.size;
            console.log(`📊 بدء ضغط الملف: ${file.name}`);
            console.log(`📊 الحجم الأصلي: ${this.formatBytes(originalSize)}`);
            console.log(`📊 جودة الضغط: ${Math.round(quality * 100)}%`);
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = this.pdfjsLib.getDocument({ data: arrayBuffer });
            const pdfDoc = await loadingTask.promise;
            console.log(`📊 عدد الصفحات: ${pdfDoc.numPages}`);
            if (pdfDoc.numPages > this.settings.maxPages) {
                throw new Error(`عدد الصفحات كبير جداً (${pdfDoc.numPages} > ${this.settings.maxPages})`);
            }
            const compressionLevel = this.getCompressionLevel(quality);
            console.log(`📊 مستوى الضغط: ${compressionLevel.label} (Scale: ${compressionLevel.scale}, Quality: ${compressionLevel.quality})`);
            const compressedPages = [];
            let totalPageSize = 0;
            for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
                if (!this.isProcessing) {
                    throw new Error('تم إلغاء العملية');
                }
                this.currentProgress = (pageNum / pdfDoc.numPages) * 90;
                if (progressCallback) {
                    progressCallback(this.currentProgress);
                }
                const page = await pdfDoc.getPage(pageNum);
                let viewport = page.getViewport({ scale: compressionLevel.scale });
                const scaleFactor = Math.min(
                    this.settings.maxWidth / viewport.width,
                    this.settings.maxHeight / viewport.height,
                    1
                );
                if (scaleFactor < 1) {
                    viewport = page.getViewport({ scale: compressionLevel.scale * scaleFactor });
                }
                const canvas = document.createElement('canvas');
                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                const ctx = canvas.getContext('2d');
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                await page.render(renderContext).promise;
                const compressedImage = await this.compressCanvasImageWithBlob(
                    canvas,
                    compressionLevel.quality,
                    pageNum
                );
                const pageSize = Math.round(compressedImage.length / 1024);
                totalPageSize += compressedImage.length;
                console.log(`📄 صفحة ${pageNum}: ${pageSize} KB`);
                compressedPages.push({
                    width: viewport.width,
                    height: viewport.height,
                    imageData: compressedImage
                });
                page.cleanup();
            }
            console.log(`📊 إجمالي حجم الصور: ${this.formatBytes(totalPageSize)}`);
            this.currentProgress = 95;
            if (progressCallback) progressCallback(95);
            const finalPDF = await this.createPDFFromImages(compressedPages);
            const compressedSize = finalPDF.size;
            const savings = Math.round((1 - (compressedSize / originalSize)) * 100);
            console.log(`📊 الحجم بعد الضغط: ${this.formatBytes(compressedSize)}`);
            console.log(`📊 نسبة التوفير: ${savings}%`);
            this.currentProgress = 100;
            if (progressCallback) progressCallback(100);
            if (compressedSize >= originalSize) {
                console.warn(`⚠️ الملف المضغوط أكبر من الأصلي، سيتم إرجاع الملف الأصلي`);
                return file;
            }
            return finalPDF;
        } catch (error) {
            console.error('PDF compression error:', error);
            throw error;
        } finally {
            this.isProcessing = false;
        }
    }

    getCompressionLevel(quality) {
        if (quality <= 0.35) {
            return this.settings.compressionLevels.high;
        } else if (quality <= 0.6) {
            return this.settings.compressionLevels.medium;
        } else {
            return this.settings.compressionLevels.low;
        }
    }

    async compressCanvasImageWithBlob(canvas, quality, pageNum) {
        return new Promise((resolve, reject) => {
            try {
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        reject(new Error('فشل تحويل Canvas إلى Blob'));
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve(e.target.result);
                    };
                    reader.onerror = () => {
                        reject(new Error('فشل تحويل Blob إلى DataURL'));
                    };
                    reader.readAsDataURL(blob);
                }, 'image/jpeg', quality);
            } catch (error) {
                console.error(`خطأ في ضغط صفحة ${pageNum}:`, error);
                resolve(canvas.toDataURL('image/jpeg', quality));
            }
        });
    }

    async createPDFFromImages(pages) {
        return new Promise((resolve, reject) => {
            try {
                if (window.jspdf && window.jspdf.jsPDF) {
                    this.createPDFWithJSPDF(pages).then(resolve).catch(reject);
                } else {
                    console.error("❌ jsPDF غير متاح");
                    reject(new Error('مكتبة إنشاء PDF غير متاحة'));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async createPDFWithJSPDF(pages) {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: pages[0].width > pages[0].height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [pages[0].width, pages[0].height]
        });
        pdf.setProperties({
            title: '',
            subject: '',
            author: '',
            creator: 'Smart Image Converter',
            keywords: ''
        });
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            if (i > 0) {
                pdf.addPage([page.width, page.height]);
            }
            pdf.addImage(
                page.imageData,
                'JPEG',
                0,
                0,
                page.width,
                page.height,
                undefined,
                'FAST'
            );
        }
        const pdfBytes = pdf.output('arraybuffer');
        return new Blob([pdfBytes], { type: 'application/pdf' });
    }

    validateFile(file) {
        if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
            throw new Error('الملف ليس من نوع PDF');
        }
        if (file.size > this.settings.maxFileSize) {
            throw new Error(`حجم الملف كبير جداً (${this.formatBytes(file.size)} > ${this.formatBytes(this.settings.maxFileSize)})`);
        }
        if (file.size === 0) {
            throw new Error('الملف فارغ');
        }
    }

    formatBytes(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return size.toFixed(2) + ' ' + units[unitIndex];
    }

    cancel() {
        this.isProcessing = false;
    }
}

window.PDFCompressor = PDFCompressor;

// ============================================
// دالة تهيئة واجهة المستخدم
// ============================================
window.initPDFCompressor = function(containerId) {
    console.log("✅ تهيئة أداة ضغط PDF المحسنة");
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("❌ الحاوية غير موجودة:", containerId);
        return;
    }

    container.innerHTML = `
        <div class="tool-container">
            <div class="trust-badge" style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.15)); border-radius: 60px; padding: 12px 24px; margin-bottom: 25px; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;">🔒 100% خصوصية</span>
                    <span style="background: #3b82f6; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;">⚡ معالجة فورية</span>
                    <span style="background: #4f46e5; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;">🛡️ بدون رفع ملفات</span>
                    <span style="background: #f59e0b; color: #1a1a2e; padding: 4px 12px; border-radius: 30px; font-size: 12px;">💯 مجاني بالكامل</span>
                </div>
                <p style="margin-top: 12px; font-size: 14px; color: var(--text-secondary);">🔐 ملفاتك لا تترك جهازك أبداً - معالجة محلية 100%</p>
            </div>

            <h1 style="text-align: center; font-size: 28px; margin-bottom: 15px;">🗜️ ضغط PDF - قلّص حجم ملفاتك بضغطة زر وبجودة عالية</h1>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px; font-size: 16px;">✅ ضغط حقيقي للصور بنسبة تصل إلى 70% - معالجة محلية 100% - مجاني تماماً</p>

            <div class="drag-drop-zone" id="uploadAreaPDF" style="margin-bottom: 20px;">
                <div class="drag-icon">📄</div>
                <h3>اختر ملف PDF أو اسحبه هنا</h3>
                <input type="file" id="pdfInput" accept=".pdf" style="display: none;">
                <small>يدعم جميع أنواع PDF | الحد الأقصى 50 ميجابايت</small>
            </div>

            <div id="fileInfoPDF" style="display: none; background: var(--bg-card); border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div id="fileNamePDF"></div>
            </div>

            <div style="margin: 20px 0;">
                <h2 style="font-size: 22px; margin-bottom: 15px;">⚙️ إعدادات ضغط PDF</h2>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;" id="levelContainer">
                    <div class="level-card" data-level="low" data-quality="0.85">📗 ضغط منخفض (جودة عالية)</div>
                    <div class="level-card selected" data-level="medium" data-quality="0.6">📘 ضغط متوسط (توازن مثالي)</div>
                    <div class="level-card" data-level="high" data-quality="0.35">📕 ضغط عالي (أصغر حجم)</div>
                </div>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">⚠️ الضغط العالي يقلل حجم الملف بشكل كبير ولكن قد يؤثر قليلاً على جودة الصور داخل الملف.</p>
            </div>

            <div style="margin: 20px 0;">
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <label><input type="checkbox" id="optimizeImages" checked> 🖼️ تحسين وضغط الصور داخل الملف</label>
                    <label><input type="checkbox" id="removeMetadata"> 🏷️ إزالة البيانات الوصفية (Metadata)</label>
                </div>
            </div>

            <button class="btn" id="compressBtnPDF" style="width:100%; padding: 14px;">🗜️ بدء ضغط PDF الآن</button>

            <div id="progressArea" style="display: none; margin-top: 20px;">
                <div class="progress-bar" style="width: 100%; height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden;">
                    <div id="progressFill" style="width: 0%; height: 100%; background: var(--color-primary); transition: width 0.3s;"></div>
                </div>
                <p id="progressText" style="text-align: center; margin-top: 10px; font-size: 14px;">جاري ضغط PDF...</p>
            </div>

            <div id="statusPDF" style="margin-top: 20px; text-align: center;"></div>

            <div id="resultAreaPDF" style="display: none; margin-top: 30px;">
                <div style="background: var(--bg-card); border-radius: 12px; padding: 20px;">
                    <h3>📊 نتيجة ضغط PDF</h3>
                    <div id="resultInfoPDF"></div>
                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                        <a href="#" id="downloadLinkPDF" class="btn">📥 تحميل PDF المضغوط</a>
                        <button id="clearResultPDF" class="btn btn-secondary">🔄 ملف جديد</button>
                    </div>
                </div>
            </div>

            <section class="seo-block" style="margin-top: 50px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">ما هي أداة ضغط PDF من Smart Image Converter؟</h2>
                <p><strong>أداة ضغط PDF</strong> من Smart Image Converter هي خدمة مجانية بالكامل تتيح لك <strong>تقليل حجم ملفات PDF</strong> مع الحفاظ على الجودة الأصلية للنصوص والصور. تتم المعالجة محلياً 100% داخل متصفحك، مما يعني أن ملفاتك لا تُرفع إلى أي خادم خارجي، بل تبقى آمنة على جهازك الخاص.</p>
            </section>

            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 22px; margin-bottom: 20px;">📖 طريقة استخدام أداة ضغط PDF</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">1</div><strong>اختر ملف PDF</strong><br><small>اضغط على منطقة الرفع أو اسحب الملف</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">2</div><strong>اختر مستوى الضغط</strong><br><small>حدد الخيار المناسب لك</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">3</div><strong>ابدأ ضغط PDF</strong><br><small>اضغط زر "بدء الضغط"</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">4</div><strong>حمل الملف المضغوط</strong><br><small>احصل على ملف PDF الجديد فوراً</small></div>
                </div>
            </div>
        </div>
    `;

    // جلب العناصر من DOM
    const uploadArea = container.querySelector('#uploadAreaPDF');
    const fileInput = container.querySelector('#pdfInput');
    const fileInfo = container.querySelector('#fileInfoPDF');
    const fileNameSpan = container.querySelector('#fileNamePDF');
    const compressBtn = container.querySelector('#compressBtnPDF');
    const progressArea = container.querySelector('#progressArea');
    const progressFill = container.querySelector('#progressFill');
    const progressText = container.querySelector('#progressText');
    const statusDiv = container.querySelector('#statusPDF');
    const resultArea = container.querySelector('#resultAreaPDF');
    const resultInfo = container.querySelector('#resultInfoPDF');
    const downloadLink = container.querySelector('#downloadLinkPDF');
    const clearResultBtn = container.querySelector('#clearResultPDF');
    const levelCards = container.querySelectorAll('.level-card');

    // متغيرات الحالة
    let selectedFile = null;
    let currentQuality = 0.6;
    let compressor = null;

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function showNotification(msg, type) {
        console.log(`📢 إشعار: ${msg} (${type})`);
        if (window.SmartImageConverter && window.SmartImageConverter.showToast) {
            window.SmartImageConverter.showToast(msg, type);
        }
    }

    function handleFile(file) {
        console.log("📁 تم اختيار ملف:", file.name);
        if (!file || !file.type.includes('pdf')) {
            showNotification('❌ اختر ملف PDF صالحاً', 'error');
            return;
        }
        if (file.size > 50 * 1024 * 1024) {
            showNotification('❌ حجم الملف كبير جداً (الحد الأقصى 50 ميجابايت)', 'error');
            return;
        }
        selectedFile = file;
        fileInfo.style.display = 'block';
        fileNameSpan.innerHTML = `<div><strong>${file.name}</strong><br><small>${formatBytes(file.size)}</small></div>`;
        statusDiv.innerHTML = '';
        showNotification('✅ تم اختيار الملف بنجاح', 'success');
    }

    function updateProgress(progress) {
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (progressText) {
            progressText.textContent = `جاري ضغط PDF... ${Math.round(progress)}%`;
        }
    }

    async function compressFile() {
        console.log("🔘 زر الضغط تم الضغط عليه");
        if (!selectedFile) {
            showNotification('❌ اختر ملف PDF أولاً', 'error');
            return;
        }

        progressArea.style.display = 'block';
        compressBtn.disabled = true;
        compressBtn.textContent = '⏳ جاري الضغط...';
        statusDiv.innerHTML = '';

        try {
            compressor = new PDFCompressor();
            const compressedBlob = await compressor.compressPDF(selectedFile, currentQuality, updateProgress);

            const originalSize = selectedFile.size;
            const compressedSize = compressedBlob.size;
            const savings = Math.round((1 - (compressedSize / originalSize)) * 100);

            const url = URL.createObjectURL(compressedBlob);
            downloadLink.href = url;
            downloadLink.download = `compressed_${selectedFile.name}`;

            resultInfo.innerHTML = `
                <p>✅ تم ضغط PDF بنجاح!</p>
                <p>📊 الحجم الأصلي: ${formatBytes(originalSize)}</p>
                <p>📉 الحجم بعد الضغط: ${formatBytes(compressedSize)}</p>
                <p>🎯 نسبة التوفير: ${savings}%</p>
                <p>⚙️ مستوى الضغط: ${currentQuality <= 0.35 ? 'عالي' : (currentQuality <= 0.6 ? 'متوسط' : 'منخفض')}</p>
            `;

            resultArea.style.display = 'block';
            progressArea.style.display = 'none';
            showNotification(`✅ تم ضغط PDF بنجاح! توفير ${savings}%`, 'success');

        } catch (error) {
            console.error("❌ خطأ:", error);
            statusDiv.innerHTML = `<span style="color: var(--color-error);">❌ ${error.message || 'حدث خطأ أثناء ضغط PDF'}</span>`;
            progressArea.style.display = 'none';
            showNotification('❌ حدث خطأ أثناء المعالجة', 'error');
        } finally {
            compressBtn.disabled = false;
            compressBtn.textContent = '🗜️ بدء ضغط PDF الآن';
        }
    }

    function clearResults() {
        selectedFile = null;
        fileInfo.style.display = 'none';
        resultArea.style.display = 'none';
        statusDiv.innerHTML = '';
        progressArea.style.display = 'none';
        if (downloadLink.href) {
            URL.revokeObjectURL(downloadLink.href);
            downloadLink.href = '';
        }
        if (compressor) {
            compressor.cancel();
            compressor = null;
        }
        showNotification('🧹 تم مسح الملف الحالي', 'info');
    }

    // ربط الأحداث
    if (compressBtn) {
        compressBtn.addEventListener('click', compressFile);
        console.log("✅ تم ربط زر الضغط");
    }

    if (clearResultBtn) {
        clearResultBtn.addEventListener('click', clearResults);
        console.log("✅ تم ربط زر مسح النتائج");
    }

    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
            }
            fileInput.value = '';
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFile(e.dataTransfer.files[0]);
            }
        });
        console.log("✅ تم ربط منطقة رفع الملف");
    }

    if (levelCards && levelCards.length > 0) {
        levelCards.forEach(card => {
            card.addEventListener('click', function() {
                levelCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                currentQuality = parseFloat(this.dataset.quality);
                console.log(`✅ تم تغيير مستوى الضغط إلى: ${this.dataset.level} (${currentQuality})`);
            });
        });
        console.log(`✅ تم ربط ${levelCards.length} من مستويات الضغط`);
    }

    console.log("✅ أداة ضغط PDF جاهزة بالكامل");
};
