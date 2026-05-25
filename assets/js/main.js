/**
 * @fileoverview Smart Image Converter - Main Application Framework
 * @version 3.2.0 (Enterprise Production Grade - Fully Patched)
 * @license MIT
 * 
 * نظام إدارة واجهة المستخدم الأساسي
 * مصمم لمنع Layout Thrashing، دعم Core Web Vitals، وحماية كاملة ضد XSS
 * 
 * @author Smart Image Converter Team
 */

(function() {
    'use strict';
    
    // ============================================
    // 1. الثوابت والتكوين (Immutable Configuration)
    // ============================================
    
    const CONFIG = Object.freeze({
        STYLE_ID: 'smrt-core-styles-v4',
        NAMESPACE: 'SmartImageConverter',
        MAX_NOTIFICATIONS: 3,
        TOAST_DURATION: 3000,
        ANIMATION_THRESHOLD: 0.1,
        OBSERVER_ROOT_MARGIN: '0px 0px -30px 0px',
        LCP_SAFE_IMAGES: 2  // عدد الصور المستثناة من lazy loading لحماية LCP
    });
    
    /**
     * @enum {string}
     */
    const NotificationType = {
        SUCCESS: 'success',
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info'
    };
    
    // ============================================
    // 2. الحالة الداخلية (Encapsulated State)
    // ============================================
    
    let isInitialized = false;
    let activeObserver = null;
    let activeNotifications = [];
    let notificationContainer = null;
    
    // ============================================
    // 3. الأدوات المساعدة (Safe Utilities)
    // ============================================
    
    const utils = {
        /**
         * التحقق من تفضيل المستخدم لتقليل الحركة
         * @returns {boolean}
         */
        prefersReducedMotion: function() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        },
        
        /**
         * دالة Debounce معزولة بالكامل (Closure-based)
         * كل استدعاء ينتج مؤقتاً خاصاً به لمنع التداخل
         * @param {Function} fn - الدالة المراد تنفيذها
         * @param {number} delay - وقت التأخير بالمللي ثانية
         * @returns {Function}
         */
        debounce: function(fn, delay) {
            var timer = null;
            return function() {
                var context = this;
                var args = arguments;
                if (timer) clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay || 100);
            };
        },
        
        /**
         * التحقق من وجود العنصر في viewport (بدون forced reflow)
         * @param {Element} el
         * @returns {boolean}
         */
        isInViewport: function(el) {
            if (!el) return false;
            var rect = el.getBoundingClientRect();
            var buffer = 100;
            return rect.top < (window.innerHeight + buffer) && rect.bottom > -buffer;
        },
        
        /**
         * إضافة class آمنة للعنصر
         * @param {Element} el
         * @param {string} className
         */
        addClass: function(el, className) {
            if (el && className && !el.classList.contains(className)) {
                el.classList.add(className);
            }
        },
        
        /**
         * إزالة class آمنة من العنصر
         * @param {Element} el
         * @param {string} className
         */
        removeClass: function(el, className) {
            if (el && className && el.classList.contains(className)) {
                el.classList.remove(className);
            }
        }
    };
    
    // ============================================
    // 4. نظام الإشعارات (XSS-Proof Notification System)
    // ============================================
    
    const notificationManager = {
        /**
         * إنشاء أو استرجاع حاوية الإشعارات
         * @returns {HTMLElement|null}
         */
        getContainer: function() {
            if (notificationContainer && document.body.contains(notificationContainer)) {
                return notificationContainer;
            }
            
            notificationContainer = document.getElementById('smrt-notification-container');
            if (notificationContainer) return notificationContainer;
            
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'smrt-notification-container';
            notificationContainer.setAttribute('aria-live', 'polite');
            notificationContainer.setAttribute('aria-atomic', 'true');
            notificationContainer.setAttribute('role', 'status');
            
            if (document.body) {
                document.body.appendChild(notificationContainer);
            }
            
            return notificationContainer;
        },
        
        /**
         * إزالة إشعار مع تنظيف الذاكرة
         * @param {HTMLElement} toast
         */
        dismiss: function(toast) {
            if (!toast || !toast.parentNode) return;
            
            // إزالة من المصفوفة النشطة
            var index = activeNotifications.indexOf(toast);
            if (index > -1) activeNotifications.splice(index, 1);
            
            toast.classList.add('smrt-toast-leave');
            
            var onAnimationEnd = function() {
                toast.removeEventListener('animationend', onAnimationEnd);
                if (toast.parentNode) toast.remove();
                
                var container = document.getElementById('smrt-notification-container');
                if (container && container.children.length === 0 && container.parentNode) {
                    container.remove();
                    notificationContainer = null;
                }
            };
            
            toast.addEventListener('animationend', onAnimationEnd, { once: true });
        },
        
        /**
         * عرض إشعار جديد - آمن 100% (بدون innerHTML)
         * @param {string} message
         * @param {string} type
         */
        show: function(message, type) {
            if (!message || typeof message !== 'string') return;
            
            var container = this.getContainer();
            if (!container) return;
            
            // إدارة قائمة الانتظار - إزالة أقدم إشعار إذا تجاوزنا الحد
            if (activeNotifications.length >= CONFIG.MAX_NOTIFICATIONS) {
                var oldest = activeNotifications.shift();
                if (oldest) this.dismiss(oldest);
            }
            
            // بناء عناصر الإشعار باستخدام DOM APIs فقط (لا innerHTML)
            var toast = document.createElement('div');
            toast.className = 'smrt-toast smrt-toast-' + type;
            toast.setAttribute('role', 'alert');
            
            var messageSpan = document.createElement('span');
            messageSpan.className = 'smrt-toast-msg';
            messageSpan.textContent = message;  // آمن ضد XSS
            
            var closeBtn = document.createElement('button');
            closeBtn.className = 'smrt-toast-close';
            closeBtn.setAttribute('aria-label', 'إغلاق الإشعار');
            closeBtn.textContent = '✕';
            
            toast.appendChild(messageSpan);
            toast.appendChild(closeBtn);
            
            // حدث الإغلاق اليدوي
            closeBtn.addEventListener('click', function() {
                notificationManager.dismiss(toast);
            }, { once: true });
            
            container.appendChild(toast);
            activeNotifications.push(toast);
            
            // الإغلاق التلقائي
            setTimeout(function() {
                notificationManager.dismiss(toast);
            }, CONFIG.TOAST_DURATION);
        },
        
        /**
         * إزالة جميع الإشعارات النشطة
         */
        clearAll: function() {
            var notifications = activeNotifications.slice();
            for (var i = 0; i < notifications.length; i++) {
                this.dismiss(notifications[i]);
            }
        }
    };
    
    // ============================================
    // 5. مدير الواجهة والتحريكات (UI Manager)
    // ============================================
    
    const uiManager = {
        /**
         * إعداد التمرير السلس مع دعم reduced motion
         */
        setupSmoothScroll: function() {
            document.addEventListener('click', function(e) {
                var anchor = e.target.closest('a[href^="#"]');
                if (!anchor) return;
                
                var targetId = anchor.getAttribute('href');
                if (!targetId || targetId === '#') return;
                
                var target = document.querySelector(targetId);
                if (!target) return;
                
                e.preventDefault();
                
                var behavior = utils.prefersReducedMotion() ? 'auto' : 'smooth';
                target.scrollIntoView({ behavior: behavior, block: 'start' });
            });
        },
        
        /**
         * إعداد تحميل الصور المتأخر
         * محسن لـ LCP: الصور الأولى لا تطبق عليها lazy loading
         */
        setupLazyLoading: function() {
            // التحقق من دعم المتصفح
            if (!('loading' in HTMLImageElement.prototype)) return;
            
            var images = document.querySelectorAll('img');
            var safeCount = 0;
            
            for (var i = 0; i < images.length; i++) {
                var img = images[i];
                
                // حماية LCP: أول N صور لا نطبق عليها lazy loading
                if (safeCount < CONFIG.LCP_SAFE_IMAGES && utils.isInViewport(img)) {
                    safeCount++;
                    if (!img.hasAttribute('decoding')) {
                        img.setAttribute('decoding', 'async');
                    }
                    continue;
                }
                
                // تطبيق lazy loading للصور البعيدة
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                if (!img.hasAttribute('decoding')) {
                    img.setAttribute('decoding', 'async');
                }
            }
        },
        
        /**
         * إعداد تأثيرات الظهور عند التمرير
         * مع دعم reduced motion ومنع Layout Thrashing
         */
        setupScrollAnimations: function() {
            var elements = document.querySelectorAll('.fade-on-scroll');
            if (elements.length === 0) return;
            
            // إذا كان المستخدم يفضل تقليل الحركة - نضيف كلاس مباشرة (بدون تعديل inline styles)
            if (utils.prefersReducedMotion()) {
                for (var i = 0; i < elements.length; i++) {
                    utils.addClass(elements[i], 'is-visible');
                }
                return;
            }
            
            // تنظيف الـ Observer القديم إن وجد
            if (activeObserver) {
                activeObserver.disconnect();
                activeObserver = null;
            }
            
            activeObserver = new IntersectionObserver(function(entries) {
                // استخدام requestAnimationFrame لمنع Layout Thrashing
                requestAnimationFrame(function() {
                    for (var i = 0; i < entries.length; i++) {
                        var entry = entries[i];
                        if (entry.isIntersecting) {
                            utils.addClass(entry.target, 'is-visible');
                            activeObserver.unobserve(entry.target);
                        }
                    }
                });
            }, {
                threshold: CONFIG.ANIMATION_THRESHOLD,
                rootMargin: CONFIG.OBSERVER_ROOT_MARGIN
            });
            
            for (var j = 0; j < elements.length; j++) {
                activeObserver.observe(elements[j]);
            }
        },
        
        /**
         * تنظيف جميع الموارد والمراقبين
         */
        cleanup: function() {
            if (activeObserver) {
                activeObserver.disconnect();
                activeObserver = null;
            }
            notificationManager.clearAll();
        }
    };
    
    // ============================================
    // 6. نظام حقن الأنماط (Style Injection)
    // ============================================
    
    /**
     * حقن أنماط CSS الأساسية في الـ head
     * @returns {boolean}
     */
    function injectFrameworkStyles() {
        if (!document.head) return false;
        
        if (document.getElementById(CONFIG.STYLE_ID)) return true;
        
        var style = document.createElement('style');
        style.id = CONFIG.STYLE_ID;
        style.textContent = [
            '.tool-card {',
            '  will-change: transform;',
            '  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);',
            '  backface-visibility: hidden;',
            '}',
            '@media (hover: hover) and (prefers-reduced-motion: no-preference) {',
            '  .tool-card:hover { transform: translateY(-5px); }',
            '}',
            '.fade-on-scroll {',
            '  opacity: 0;',
            '  transform: translateY(20px);',
            '  transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);',
            '  will-change: opacity, transform;',
            '}',
            '.fade-on-scroll.is-visible {',
            '  opacity: 1;',
            '  transform: translateY(0);',
            '}',
            '#smrt-notification-container {',
            '  position: fixed;',
            '  bottom: 20px;',
            '  right: 20px;',
            '  left: 20px;',
            '  z-index: 2147483647;',
            '  display: flex;',
            '  flex-direction: column;',
            '  gap: 10px;',
            '  pointer-events: none;',
            '  direction: rtl;',
            '}',
            '@media (min-width: 640px) {',
            '  #smrt-notification-container {',
            '    left: auto;',
            '    right: 20px;',
            '    width: 350px;',
            '  }',
            '}',
            '.smrt-toast {',
            '  pointer-events: auto;',
            '  display: flex;',
            '  align-items: center;',
            '  justify-content: space-between;',
            '  gap: 12px;',
            '  padding: 14px 18px;',
            '  border-radius: 12px;',
            '  font-family: system-ui, -apple-system, sans-serif;',
            '  font-size: 14px;',
            '  font-weight: 500;',
            '  color: #ffffff;',
            '  box-shadow: 0 4px 16px rgba(0,0,0,0.12);',
            '  animation: smrtSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;',
            '  will-change: transform, opacity;',
            '}',
            '.smrt-toast-success { background: linear-gradient(135deg, #10b981, #059669); border-right: 4px solid #047857; }',
            '.smrt-toast-error { background: linear-gradient(135deg, #ef4444, #dc2626); border-right: 4px solid #b91c1c; }',
            '.smrt-toast-warning { background: linear-gradient(135deg, #f59e0b, #d97706); border-right: 4px solid #b45309; }',
            '.smrt-toast-info { background: linear-gradient(135deg, #3b82f6, #2563eb); border-right: 4px solid #1d4ed8; }',
            '.smrt-toast-msg { flex: 1; word-break: break-word; }',
            '.smrt-toast-close {',
            '  background: rgba(255, 255, 255, 0.2);',
            '  border: none;',
            '  border-radius: 50%;',
            '  width: 24px;',
            '  height: 24px;',
            '  color: inherit;',
            '  font-size: 14px;',
            '  cursor: pointer;',
            '  display: flex;',
            '  align-items: center;',
            '  justify-content: center;',
            '  transition: all 0.2s;',
            '}',
            '.smrt-toast-close:hover { background: rgba(255, 255, 255, 0.3); transform: scale(1.05); }',
            '.smrt-toast-leave { animation: smrtSlideOut 0.2s ease forwards; }',
            '@keyframes smrtSlideIn { from { transform: translateY(15px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
            '@keyframes smrtSlideOut { from { transform: translateY(0); opacity: 1; } to { transform: translateY(15px); opacity: 0; } }'
        ].join('');
        
        document.head.appendChild(style);
        return true;
    }
    
    // ============================================
    // 7. نظام التهيئة الأساسي (Bootstrapper)
    // ============================================
    
    /**
     * تهيئة التطبيق بالكامل
     * يتم استدعاؤها مرة واحدة فقط
     */
    function bootstrap() {
        // منع التهيئة المزدوجة
        if (isInitialized) return;
        
        try {
            // حقن الأنماط
            if (!injectFrameworkStyles()) {
                if (window.DEV_MODE) console.warn('Failed to inject styles');
            }
            
            // تهيئة مكونات الواجهة
            uiManager.setupSmoothScroll();
            uiManager.setupLazyLoading();
            uiManager.setupScrollAnimations();
            
            isInitialized = true;
            
            // رسالة التهيئة في وضع التطوير فقط
            if (window.DEV_MODE && window.location.hostname === 'localhost') {
                console.log('✅ SmartImageConverter initialized successfully');
            }
        } catch (error) {
            console.error('SmartImageConverter: Bootstrap failed', error);
        }
    }
    
    // ============================================
    // 8. الـ API المحمي (Protected Namespace)
    // ============================================
    
    /**
     * إنشاء API محمي ومجمد بالكامل
     */
    var api = Object.create(null);
    
    Object.defineProperties(api, {
        showToast: {
            value: function(message, type) {
                notificationManager.show(message, type || NotificationType.INFO);
            },
            writable: false,
            configurable: false
        },
        showSuccess: {
            value: function(message) {
                notificationManager.show(message, NotificationType.SUCCESS);
            },
            writable: false,
            configurable: false
        },
        showError: {
            value: function(message) {
                notificationManager.show(message, NotificationType.ERROR);
            },
            writable: false,
            configurable: false
        },
        showWarning: {
            value: function(message) {
                notificationManager.show(message, NotificationType.WARNING);
            },
            writable: false,
            configurable: false
        },
        showInfo: {
            value: function(message) {
                notificationManager.show(message, NotificationType.INFO);
            },
            writable: false,
            configurable: false
        },
        clearNotifications: {
            value: function() {
                notificationManager.clearAll();
            },
            writable: false,
            configurable: false
        },
        isReady: {
            value: function() {
                return isInitialized;
            },
            writable: false,
            configurable: false
        },
        destroy: {
            value: function() {
                uiManager.cleanup();
                var styleEl = document.getElementById(CONFIG.STYLE_ID);
                if (styleEl) styleEl.remove();
                if (notificationContainer) notificationContainer.remove();
                isInitialized = false;
                activeNotifications = [];
                notificationContainer = null;
            },
            writable: false,
            configurable: false
        }
    });
    
    // تجميد الـ API بالكامل
    var frozenAPI = Object.freeze(api);
    
    // إنشاء الـ Namespace العام
    if (!window[CONFIG.NAMESPACE]) {
        window[CONFIG.NAMESPACE] = frozenAPI;
    }
    
    // دالة توافقية للخلفية (Backward Compatibility)
    if (!window.showMessage) {
        window.showMessage = function(message, type) {
            frozenAPI.showToast(message, type);
        };
    }
    
    // ============================================
    // 9. التشغيل التلقائي (Auto Bootstrap)
    // ============================================
    
    // استخدام DOMContentLoaded بدلاً من requestIdleCallback
    // لضمان استجابة فورية للواجهة دون تأخير
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
    } else {
        bootstrap();
    }
    
    // ============================================
    // 10. التنظيف عند إغلاق الصفحة
    // ============================================
    
    window.addEventListener('beforeunload', function() {
        if (activeObserver) {
            activeObserver.disconnect();
            activeObserver = null;
        }
    });
    
})();
