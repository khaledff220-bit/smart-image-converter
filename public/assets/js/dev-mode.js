/**
 * Developer Mode - Professional Analytics Blocking System
 * Version: 2.0.0 (Enterprise Grade)
 * 
 * نظام احترافي لمنع احتساب زيارات المطورين في أدوات التحليلات
 * يدعم: GA4, gtag, Matomo, Clarity, Hotjar, Mixpanel, Segment, DoubleClick
 * 
 * Author: Smart Image Converter Team
 * License: MIT
 */

(function() {
    'use strict';
    
    // ============================================
    // 🔐 الإعدادات الأساسية (محمية ضد التعديل)
    // ============================================
    
    const CONFIG = Object.freeze({
        // مدة صلاحية وضع المطور (8 ساعات)
        EXPIRE_TIME: 8 * 60 * 60 * 1000,
        
        // نطاقات التحليلات الممنوعة (شاملة)
        BLOCKED_DOMAINS: [
            'google-analytics.com',
            'googletagmanager.com',
            'gtag',
            'analytics',
            'matomo',
            'clarity',
            'hotjar',
            'mixpanel',
            'segment',
            'doubleclick',
            'pagead',
            'adsystem',
            'adnxs',
            'facebook.com/tr',
            'amplitude',
            'fullstory',
            'logrocket'
        ],
        
        // معاملات URL المسموحة (بدون مفتاح سري لا يعمل)
        DEV_PARAMS: ['dev', 'developer', 'debug', 'test', 'local'],
        
        // مفتاح التخزين
        STORAGE_KEY: 'smrt_dev_mode_v2',
        
        // علامات الحماية من Double Wrapping
        FETCH_WRAPPED_FLAG: '__smrt_fetch_wrapped__',
        XHR_WRAPPED_FLAG: '__smrt_xhr_wrapped__'
    });
    
    // ============================================
    // 🛡️ دوال الكشف عن وضع المطور
    // ============================================
    
    /**
     * التحقق من وجود مفتاح سري صالح
     * ملاحظة: المفتاح السري الحقيقي يجب أن يكون من build-time أو env
     * هذا المفتاح هو مجرد مثال، يمكن تغييره أثناء البناء
     */
    function isValidSecretKey(key) {
        if (!key || typeof key !== 'string') return false;
        
        // المفتاح الأساسي (يجب تغييره في بيئة الإنتاج)
        // يمكن استبداله من خلال متغير بيئة أثناء البناء
        const defaultKey = window.__DEV_SECRET_KEY__ || 'smrt_dev_2025_secure';
        
        // مفتاح مخصص من localStorage (للمطورين المتقدمين)
        const customKey = localStorage.getItem('smrt_dev_custom_key');
        
        // التحقق من المفاتيح
        return key === defaultKey || (customKey && key === customKey);
    }
    
    /**
     * التحقق من أن المضيف هو مضيف تطوير محلي
     */
    function isLocalHost() {
        const hostname = window.location.hostname;
        return hostname === 'localhost' || 
               hostname === '127.0.0.1' ||
               hostname.startsWith('192.168.') ||
               hostname.startsWith('10.') ||
               hostname.endsWith('.local');
    }
    
    /**
     * استخراج معاملات dev من URL مع التحقق من المفتاح السري
     */
    function getDevParamFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        
        for (const param of CONFIG.DEV_PARAMS) {
            const value = urlParams.get(param);
            if (value !== null) {
                // يجب أن يكون هناك مفتاح سري صالح
                // ?dev بدون مفتاح لا يعمل
                if (value === '' || value === 'true' || value === '1') {
                    // لا مفتاح - غير مسموح
                    console.debug('Dev mode requires a secret key. Use ?dev=YOUR_KEY');
                    return null;
                }
                
                // التحقق من صحة المفتاح السري
                if (isValidSecretKey(value)) {
                    return { param, value };
                }
            }
        }
        return null;
    }
    
    /**
     * التحقق من وضع المطور من التخزين مع صلاحية
     */
    function getStoredDevMode() {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (!stored) return false;
            
            const data = JSON.parse(stored);
            
            // التحقق من صلاحية الوقت
            if (data.expires && Date.now() > data.expires) {
                localStorage.removeItem(CONFIG.STORAGE_KEY);
                return false;
            }
            
            return data.active === true;
        } catch {
            return false;
        }
    }
    
    /**
     * حفظ وضع المطور في التخزين مع صلاحية
     */
    function setStoredDevMode(active, secretKey = null) {
        const data = {
            active: active,
            expires: Date.now() + CONFIG.EXPIRE_TIME,
            timestamp: Date.now(),
            hostname: window.location.hostname
        };
        
        if (secretKey && typeof secretKey === 'string') {
            data.secretKeyHash = btoa(secretKey.substring(0, 10));
        }
        
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
    }
    
    /**
     * تعطيل وضع المطور بالكامل
     */
    function disableDevMode() {
        localStorage.removeItem(CONFIG.STORAGE_KEY);
        localStorage.removeItem('smrt_dev_custom_key');
        console.log('%c🔧 Developer Mode Disabled - Reloading...', 'color: #ff9800;');
        window.location.reload();
    }
    
    /**
     * الدالة الرئيسية للكشف عن وضع المطور
     * تخزن النتيجة في متغير ثابت لتجنب التكرار
     */
    function detectDevMode() {
        // 1. التحقق من المضيف المحلي (تلقائي)
        if (isLocalHost()) {
            setStoredDevMode(true);
            return true;
        }
        
        // 2. التحقق من URL مع مفتاح سري صالح (مطلوب)
        const urlParam = getDevParamFromURL();
        if (urlParam) {
            setStoredDevMode(true, urlParam.value);
            cleanDeveloperParams();
            return true;
        }
        
        // 3. التحقق من التخزين
        return getStoredDevMode();
    }
    
    /**
     * تنظيف معاملات المطور من URL
     */
    function cleanDeveloperParams() {
        if (!window.history?.replaceState) return;
        
        const url = new URL(window.location.href);
        let changed = false;
        
        for (const param of CONFIG.DEV_PARAMS) {
            if (url.searchParams.has(param)) {
                url.searchParams.delete(param);
                changed = true;
            }
        }
        
        if (changed) {
            window.history.replaceState({}, document.title, url.toString());
        }
    }
    
    // ============================================
    // 🚫 منع طلبات التحليلات (Spec-Compliant)
    // ============================================
    
    let isBlockingActive = false;
    
    /**
     * التحقق مما إذا كان الرابط من نطاق تحليلات
     */
    function isAnalyticsUrl(url) {
        if (!url || typeof url !== 'string') return false;
        
        const lowerUrl = url.toLowerCase();
        
        return CONFIG.BLOCKED_DOMAINS.some(domain => {
            return lowerUrl.includes(domain);
        });
    }
    
    /**
     * منع طلبات التحليلات عبر fetch (مع حماية Double Wrapping)
     */
    function blockFetchRequests() {
        // منع التغليف المزدوج
        if (window.fetch[CONFIG.FETCH_WRAPPED_FLAG]) return;
        
        const originalFetch = window.fetch;
        
        window.fetch = function(...args) {
            const url = args[0];
            const urlString = typeof url === 'string' ? url : url?.url;
            
            if (isBlockingActive && isAnalyticsUrl(urlString)) {
                console.debug('🔧 Dev Mode: Blocked fetch request to', urlString);
                // إرجاع استجابة صالحة ومتوافقة مع المواصفات
                return Promise.resolve(new Response('{}', {
                    status: 200,
                    statusText: 'OK',
                    headers: { 'Content-Type': 'application/json' }
                }));
            }
            
            return originalFetch.apply(this, args);
        };
        
        // إضافة علامة لمنع التغليف المزدوج
        window.fetch[CONFIG.FETCH_WRAPPED_FLAG] = true;
        window.fetch._original = originalFetch;
    }
    
    /**
     * منع طلبات التحليلات عبر XMLHttpRequest (مع حماية Double Wrapping)
     */
    function blockXHRRequests() {
        // منع التغليف المزدوج
        if (XMLHttpRequest.prototype[CONFIG.XHR_WRAPPED_FLAG]) return;
        
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(method, url, ...rest) {
            this._url = url;
            this._blocked = isBlockingActive && isAnalyticsUrl(url);
            
            if (this._blocked) {
                console.debug('🔧 Dev Mode: Blocked XHR request to', url);
                return originalOpen.call(this, method, 'about:blank', ...rest);
            }
            
            return originalOpen.call(this, method, url, ...rest);
        };
        
        XMLHttpRequest.prototype.send = function(...args) {
            if (this._blocked) {
                // إكمال الطلب بشكل صحيح متوافق مع المواصفات
                this.dispatchEvent(new Event('loadstart'));
                this.readyState = 1;
                this.dispatchEvent(new Event('loadend'));
                this.readyState = 4;
                this.status = 200;
                this.statusText = 'OK';
                this.response = '{}';
                this.responseText = '{}';
                this.responseType = '';
                this.responseURL = '';
                this.dispatchEvent(new Event('load'));
                this.dispatchEvent(new Event('loadend'));
                return;
            }
            return originalSend.call(this, ...args);
        };
        
        // إضافة علامة لمنع التغليف المزدوج
        XMLHttpRequest.prototype[CONFIG.XHR_WRAPPED_FLAG] = true;
    }
    
    /**
     * تعطيل navigator.sendBeacon
     */
    function disableSendBeacon() {
        if (!navigator.sendBeacon) return;
        
        const originalSendBeacon = navigator.sendBeacon.bind(navigator);
        
        navigator.sendBeacon = function(url, ...args) {
            if (isBlockingActive && isAnalyticsUrl(url)) {
                console.debug('🔧 Dev Mode: Blocked sendBeacon to', url);
                return true;
            }
            return originalSendBeacon(url, ...args);
        };
    }
    
    /**
     * تعطيل Google Analytics GA4 وجميع متغيراته
     */
    function disableGA4() {
        // تعطيل GA4 بجميع صيغه
        window['ga-disable'] = true;
        window['ga-disable-G-'] = true;
        window['ga-disable-UA-'] = true;
        
        // تعطيل جميع معاملات gtag الممكنة
        if (typeof gtag !== 'undefined' && gtag) {
            const originalGtag = gtag;
            window.gtag = function() {
                const args = Array.from(arguments);
                const command = args[0];
                
                // منع config و event و send
                if (command === 'config' || command === 'event' || command === 'send') {
                    console.debug('🔧 Dev Mode: Blocked gtag', args);
                    return;
                }
                
                return originalGtag.apply(this, args);
            };
            window.gtag._original = originalGtag;
        }
        
        // تعطيل dataLayer
        if (window.dataLayer) {
            window.dataLayer = [];
            window.dataLayer.push = function() {
                const args = Array.from(arguments);
                console.debug('🔧 Dev Mode: Blocked dataLayer push', args);
                return 0;
            };
        }
    }
    
    /**
     * منع تحميل Scripts الخاصة بالتحليلات (MutationObserver)
     */
    function preventTrackingScripts() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
                        const src = node.src || '';
                        if (isAnalyticsUrl(src)) {
                            console.debug('🔧 Dev Mode: Blocked analytics script', src);
                            node.remove();
                        }
                    }
                });
            });
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        
        return observer;
    }
    
    /**
     * تفعيل نظام منع التتبع بالكامل
     */
    function enableBlocking() {
        isBlockingActive = true;
        
        // منع الطلبات
        blockFetchRequests();
        blockXHRRequests();
        disableSendBeacon();
        disableGA4();
        
        // منع تحميل scripts
        const scriptObserver = preventTrackingScripts();
        
        // إضافة class على html (لأن body قد لا يكون موجوداً بعد)
        document.documentElement.classList.add('dev-mode');
        
        // حفظ المراجع للاستخدام لاحقاً
        window.__DEV_MODE_OBSERVER__ = scriptObserver;
    }
    
    // ============================================
    // 🎨 الواجهة البصرية (تضاف بعد تحميل DOM)
    // ============================================
    
    /**
     * إضافة شريط إعلامي بوضع المطور
     */
    function addDevModeBar() {
        // التأكد من وجود body
        if (!document.body) {
            setTimeout(addDevModeBar, 100);
            return;
        }
        
        // تجنب إضافة الشريط مرتين
        if (document.getElementById('smrt-dev-bar')) return;
        
        const bar = document.createElement('div');
        bar.id = 'smrt-dev-bar';
        bar.innerHTML = `
            🔧 Developer Mode Active | 
            Analytics are disabled | 
            <button id="smrt-dev-disable" style="background: none; border: 1px solid; padding: 2px 10px; border-radius: 4px; cursor: pointer; margin-left: 8px;">Exit</button>
        `;
        bar.style.cssText = `
            position: fixed;
            bottom: 12px;
            left: 12px;
            background: linear-gradient(135deg, #ff9800, #f57c00);
            color: #1a1a2e;
            padding: 8px 16px;
            border-radius: 40px;
            font-size: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-weight: 500;
            z-index: 99999;
            backdrop-filter: blur(8px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            pointer-events: auto;
            direction: ltr;
        `;
        
        document.body.appendChild(bar);
        
        const disableBtn = document.getElementById('smrt-dev-disable');
        if (disableBtn) {
            disableBtn.addEventListener('click', (e) => {
                e.preventDefault();
                disableDevMode();
            });
        }
    }
    
    /**
     * إضافة متغير عام للمطورين للمساعدة في debugging
     */
    function exposeGlobalDevAPI() {
        if (window.__DEV_MODE__) return;
        
        Object.defineProperty(window, '__DEV_MODE__', {
            value: DEV_MODE,
            writable: false,
            configurable: false,
            enumerable: true
        });
        
        window.__DEV_MODE_API__ = {
            isActive: () => DEV_MODE,
            disable: disableDevMode,
            getConfig: () => ({ ...CONFIG }),
            getStorageData: () => {
                try {
                    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || 'null');
                } catch {
                    return null;
                }
            }
        };
    }
    
    // ============================================
    // 🚀 التهيئة النهائية (مرة واحدة فقط)
    // ============================================
    
    // تخزين النتيجة النهائية في متغير ثابت (Performance)
    const DEV_MODE = detectDevMode();
    
    // تصدير للاستخدام العام
    window.DEV_MODE = DEV_MODE;
    window.isDevMode = () => DEV_MODE;
    window.disableDevMode = disableDevMode;
    
    // الكشف عن وضع المطور للمكتبات الأخرى
    exposeGlobalDevAPI();
    
    // تفعيل الحظر إذا كان وضع المطور مفعلاً
    if (DEV_MODE) {
        enableBlocking();
        
        // إضافة الشريط البصري بعد تحميل DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addDevModeBar);
        } else {
            addDevModeBar();
        }
        
        // رسالة في الكونسول للمطور
        console.log('%c🔧 Developer Mode Active', 'color: #ff9800; font-size: 14px; font-weight: bold;');
        console.log('%c⚠️ Analytics & Tracking are completely disabled', 'color: #ff9800; font-size: 12px;');
        console.log('%c✅ Your visits will NOT be recorded', 'color: #4caf50; font-size: 12px;');
    } else {
        // لا نطبع أي شيء في Production (SEO Clean)
        // فقط في حالة التصحيح
        if (window.location.hostname === 'localhost') {
            console.log('📊 Normal mode - Analytics enabled (localhost)');
        }
    }
})();
