/**
 * مكتبة التشفير الموحدة - إصدار التصحيح العميق
 */
const CryptoUtils = {
    async decryptFile(file, password) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let encryptedText = e.target.result.trim();
                    console.log("بداية النص المشفر:", encryptedText.substring(0, 20));

                    // محاولة فك التشفير
                    const decrypted = CryptoJS.AES.decrypt(encryptedText, password.trim());
                    
                    // تحويل النتيجة (جربنا Latin1 و Utf8)
                    let decryptedText = "";
                    try {
                        decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
                        if (!decryptedText) throw new Error();
                    } catch (e) {
                        decryptedText = decrypted.toString(CryptoJS.enc.Latin1);
                    }

                    console.log("بداية النص المفكوك:", decryptedText.substring(0, 30));

                    if (!decryptedText || decryptedText.length < 10) {
                        throw new Error('فشل فك التشفير (بيانات فارغة)');
                    }

                    if (!decryptedText.includes('data:image')) {
                        // إذا لم يجد العلامة، ربما التشفير تم بدونها؟ سنحاول إكمال العملية
                        console.warn("تحذير: لم يتم العثور على data:image، محاولة المعالجة الخام...");
                    }

                    const base64Data = decryptedText.includes(',') ? decryptedText.split(',')[1] : decryptedText;
                    const blob = CryptoUtils.base64ToBlob(base64Data);
                    resolve(blob);
                    
                } catch (error) {
                    console.error("خطأ تقني:", error);
                    reject(new Error('كلمة المرور غير مطابقة للبيانات المشفرة'));
                }
            };
            reader.readAsText(file);
        });
    },

    base64ToBlob(base64) {
        try {
            const byteCharacters = atob(base64.replace(/\s/g, ''));
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) byteNumbers[i] = slice.charCodeAt(i);
                byteArrays.push(new Uint8Array(byteNumbers));
            }
            return new Blob(byteArrays, { type: 'image/jpeg' });
        } catch (e) {
            throw new Error('بيانات الصورة تالفة');
        }
    }
};
window.CryptoUtils = CryptoUtils;
