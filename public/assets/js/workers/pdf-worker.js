/**
 * PDF Worker - Encryption & Decryption Web Worker
 * يقوم بتشفير وفك تشفير ملفات PDF في خيط منفصل
 * @version 1.1.0
 */

importScripts('../libs/pdf-lib.min.js');

self.addEventListener('message', async function(e) {
    const { type, fileBuffer, password, taskId } = e.data;
    
    try {
        if (type === 'encrypt') {
            // تشفير PDF
            self.postMessage({ type: 'progress', value: 10, text: 'جاري تحميل الملف...', taskId });
            
            const pdfDoc = await PDFLib.PDFDocument.load(fileBuffer);
            
            self.postMessage({ type: 'progress', value: 30, text: 'جاري تطبيق التشفير (AES-256)...', taskId });
            
            pdfDoc.encrypt({
                userPassword: password,
                ownerPassword: password,
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: true,
                    documentAssembly: false
                }
            });
            
            self.postMessage({ type: 'progress', value: 70, text: 'جاري حفظ الملف المشفر...', taskId });
            
            const protectedBytes = await pdfDoc.save({
                useObjectStreams: true,
                addDefaultPage: false,
                objectsPerTick: 50
            });
            
            self.postMessage({ type: 'progress', value: 90, text: 'جاري تجهيز الملف للتحميل...', taskId });
            self.postMessage({ type: 'complete', result: protectedBytes, taskId });
            
        } else if (type === 'decrypt') {
            // فك تشفير PDF - ✅ تمرير كلمة المرور بشكل صحيح
            self.postMessage({ type: 'progress', value: 10, text: 'جاري تحميل الملف المحمي...', taskId });
            
            const pdfDoc = await PDFLib.PDFDocument.load(fileBuffer, { 
                password: password,  // ✅ تمرير كلمة المرور هنا
                updateMetadata: false 
            });
            
            self.postMessage({ type: 'progress', value: 50, text: 'جاري فك التشفير...', taskId });
            
            const decryptedBytes = await pdfDoc.save({
                useObjectStreams: true,
                addDefaultPage: false,
                objectsPerTick: 50
            });
            
            self.postMessage({ type: 'progress', value: 90, text: 'جاري تجهيز الملف للتحميل...', taskId });
            self.postMessage({ type: 'complete', result: decryptedBytes, taskId });
        }
        
    } catch (error) {
        let errorMessage = error.message || 'حدث خطأ أثناء المعالجة';
        
        // رسائل خطأ مفهومة للمستخدم
        if (errorMessage.includes('password')) {
            errorMessage = 'كلمة المرور غير صحيحة';
        } else if (errorMessage.includes('corrupt')) {
            errorMessage = 'الملف تالف أو غير صالح';
        } else if (errorMessage.includes('encrypted')) {
            errorMessage = 'الملف محمي بكلمة مرور';
        }
        
        self.postMessage({
            type: 'error',
            error: errorMessage,
            taskId
        });
    }
});
