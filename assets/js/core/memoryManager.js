/**
 * Memory Manager - إدارة الذاكرة ومنع التسريبات
 * @version 1.0.0
 */

const MemoryManager = (function() {
    'use strict';
    
    // تخزين المراجع النشطة
    let activeBlobs = [];
    let activeObjectUrls = [];
    let activeWorkers = [];
    
    /**
     * تسجيل Blob للتتبع
     * @param {Blob} blob
     * @returns {Blob}
     */
    function trackBlob(blob) {
        if (blob && !activeBlobs.includes(blob)) {
            activeBlobs.push(blob);
        }
        return blob;
    }
    
    /**
     * تسجيل Object URL للتتبع
     * @param {string} url
     * @returns {string}
     */
    function trackObjectUrl(url) {
        if (url && !activeObjectUrls.includes(url)) {
            activeObjectUrls.push(url);
        }
        return url;
    }
    
    /**
     * تسجيل Worker للتتبع
     * @param {Worker} worker
     * @returns {Worker}
     */
    function trackWorker(worker) {
        if (worker && !activeWorkers.includes(worker)) {
            activeWorkers.push(worker);
        }
        return worker;
    }
    
    /**
     * إزالة Blob من التتبع وتحريره
     * @param {Blob} blob
     */
    function untrackBlob(blob) {
        const index = activeBlobs.indexOf(blob);
        if (index > -1) {
            activeBlobs.splice(index, 1);
        }
    }
    
    /**
     * إزالة Object URL وتحريره
     * @param {string} url
     */
    function revokeObjectUrl(url) {
        const index = activeObjectUrls.indexOf(url);
        if (index > -1) {
            URL.revokeObjectURL(url);
            activeObjectUrls.splice(index, 1);
        }
    }
    
    /**
     * إنهاء Worker وإزالته
     * @param {Worker} worker
     */
    function terminateWorker(worker) {
        const index = activeWorkers.indexOf(worker);
        if (index > -1) {
            worker.terminate();
            activeWorkers.splice(index, 1);
        }
    }
    
    /**
     * تنظيف جميع الموارد
     */
    function cleanupAll() {
        // تنظيف Object URLs
        for (const url of activeObjectUrls) {
            URL.revokeObjectURL(url);
        }
        activeObjectUrls = [];
        
        // تنظيف Workers
        for (const worker of activeWorkers) {
            worker.terminate();
        }
        activeWorkers = [];
        
        // تنظيف Blobs
        activeBlobs = [];
    }
    
    /**
     * الحصول على حالة الذاكرة الحالية
     * @returns {Object}
     */
    function getMemoryStatus() {
        return {
            activeBlobs: activeBlobs.length,
            activeObjectUrls: activeObjectUrls.length,
            activeWorkers: activeWorkers.length
        };
    }
    
    // API عامة
    return {
        trackBlob,
        trackObjectUrl,
        trackWorker,
        untrackBlob,
        revokeObjectUrl,
        terminateWorker,
        cleanupAll,
        getMemoryStatus
    };
})();

// تصدير للاستخدام العام
if (typeof window !== 'undefined') {
    window.MemoryManager = MemoryManager;
}
