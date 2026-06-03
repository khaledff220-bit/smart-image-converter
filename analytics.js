(function() {
    const GA_ID = 'G-PNHBTPESQT';
    
    // 1. اكتشاف البيئة المحلية وتعطيل التتبع فيها
    if (window.location.hostname === "localhost" || 
        window.location.hostname === "127.0.0.1" || 
        window.location.protocol === "file:") {
        
        window["ga-disable-" + GA_ID] = true;
        console.log("🛠️ تطوير محلي: تم إيقاف Google Analytics");
    }

    // 2. تحميل المكتبة الأساسية من جوجل
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(script);

    // 3. إعداد إرسال البيانات
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_ID, {
        'anonymize_ip': true,
        'cookie_expires': 0 // لا يحفظ كوكيز عند إغلاق المتصفح الخفي
    });
})();
