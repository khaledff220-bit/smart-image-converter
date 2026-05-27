// أضف في compress-pdf-real.html
const performanceTips = {
    // استخدم Web Workers للملفات الكبيرة
    useWorkers: function() {
        if (window.Worker) {
            const worker = new Worker('assets/js/pdf-worker.js');
            return worker;
        }
        return null;
    },
    
    // معالجة تدريجية للملفات الكبيرة
    progressiveProcessing: true,
    
    // خيارات الذاكرة
    memoryManagement: {
        releaseCanvas: true,
        chunkProcessing: true,
        garbageCollection: true
    }
};
