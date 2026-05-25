/**
 * @fileoverview Smart Image Converter - Multilingual System (i18n)
 * @version 2.4.0 (Stable Production Grade)
 * @license MIT
 * 
 * نظام الترجمة متعدد اللغات
 * يدعم: العربية (الافتراضية) + الإنجليزية
 * 
 * الميزات:
 * - كشف تلقائي للغة المتصفح
 * - حفظ التفضيل في localStorage
 * - تغيير اتجاه الصفحة RTL/LTR تلقائياً
 * - دعم الترجمة الديناميكية للعناصر المضافة لاحقاً
 * - دعم ترجمة title, aria-label, alt, placeholder
 * - حماية ضد XSS و Prototype Pollution
 * - إمكانية إعادة تعيين النظام وتنظيفه
 * - منع الحلقات اللانهائية في MutationObserver
 * 
 * متوافق مع: main.js (v3.2.0) + style.css (v3.2.0) + dev-mode.js (v2.0.0)
 * 
 * @author Smart Image Converter Team
 */

(function() {
    'use strict';
    
    // ============================================
    // 1. قاعدة الترجمات (Translation Database)
    // ============================================
    
    /** @const {Object} */
    var TRANSLATIONS = Object.freeze({
        ar: {
            // القائمة الرئيسية - Navigation
            'nav.home': 'الرئيسية',
            'nav.protect': 'حماية الصور',
            'nav.decrypt': 'فك التشفير',
            'nav.quality': 'تحسين الجودة',
            'nav.merge': 'دمج PDF',
            'nav.compress': 'ضغط PDF',
            'nav.image-to-pdf': 'تحويل إلى PDF',
            
            // الهيدر - Header
            'hero.badge': '🚀 معالجة محلية وآمنة',
            'hero.title': 'حول صورك وملفاتك إلى PDF بسهولة',
            'hero.subtitle': 'منصة متكاملة لمعالجة الصور وملفات PDF - تعمل 100% على جهازك مع خصوصية تامة',
            
            // الإحصائيات - Stats
            'stats.tools': 'أدوات متكاملة',
            'stats.local': 'معالجة محلية',
            'stats.free': 'استخدام مجاني',
            'stats.users': 'مستخدم راضي',
            
            // بطاقات الأدوات - Tool Cards
            'tool.protect.title': 'حماية الصور',
            'tool.protect.desc': 'تشفير صورك بكلمة مرور باستخدام تقنية AES-256',
            'tool.decrypt.title': 'فك التشفير',
            'tool.decrypt.desc': 'استعادة الصور الأصلية من الملفات المشفرة',
            'tool.quality.title': 'تحسين الجودة',
            'tool.quality.desc': 'رفع دقة الصور الضبابية وجعلها أكثر وضوحاً',
            'tool.merge.title': 'دمج PDF',
            'tool.merge.desc': 'دمج عدة ملفات PDF في مستند واحد مرتب',
            'tool.compress.title': 'ضغط PDF',
            'tool.compress.desc': 'تقليل حجم ملفات PDF مع الحفاظ على الجودة',
            'tool.image-to-pdf.title': 'تحويل الصور إلى PDF',
            'tool.image-to-pdf.desc': 'تحويل صور JPG، PNG إلى ملف PDF بجودة عالية',
            
            // الأزرار - Buttons
            'btn.start': 'ابدأ الآن',
            'btn.try': 'جرب الأداة',
            'btn.loading': 'جاري المعالجة...',
            'btn.success': 'تم بنجاح',
            'btn.error': 'حدث خطأ',
            
            // قسم كيف يعمل - How It Works
            'how.title': 'كيف تعمل المنصة؟',
            'how.step1.title': 'اختر ملفك',
            'how.step1.desc': 'ارفع الملف الذي تريد معالجته من جهازك',
            'how.step2.title': 'اختر الإعدادات',
            'how.step2.desc': 'حدد الخيارات المناسبة لاحتياجاتك',
            'how.step3.title': 'معالجة محلية',
            'how.step3.desc': 'تتم المعالجة داخل متصفحك - خصوصية كاملة',
            'how.step4.title': 'تحميل النتيجة',
            'how.step4.desc': 'احصل على ملفك النهائي فوراً',
            
            // الأسئلة الشائعة - FAQ
            'faq.title': 'الأسئلة الشائعة',
            'faq.q1': 'هل رفع الملفات آمن؟',
            'faq.a1': 'نعم، جميع المعالجات تتم داخل متصفحك. لا يتم رفع أي ملف إلى أي خادم خارجي.',
            'faq.q2': 'هل الخدمة مجانية؟',
            'faq.a2': 'نعم، جميع الأدوات مجانية بالكامل بدون أي حدود أو إعلانات مزعجة.',
            'faq.q3': 'ما حجم الملفات المسموح؟',
            'faq.a3': 'يحدد حجم الملف حسب قدرات جهازك وذاكرته، لا توجد حدود من الخادم.',
            'faq.q4': 'هل أحتاج إلى اتصال بالإنترنت؟',
            'faq.a4': 'بعد تحميل الصفحة لأول مرة، يمكنك استخدام جميع الأدوات دون اتصال بالإنترنت.',
            
            // الفوتر - Footer
            'footer.copyright': 'جميع الحقوق محفوظة',
            'footer.privacy': 'سياسة الخصوصية',
            'footer.terms': 'الشروط والأحكام',
            'footer.contact': 'اتصل بنا',
            
            // قسم المطورين - Developer Section
            'dev.title': 'للمطورين',
            'dev.desc': 'منصة مفتوحة المصدر مبنية بأحدث تقنيات الويب',
            'dev.docs': 'وثائق المطورين',
            'dev.source': 'الكود المصدري',
            
            // رسائل النظام - System Messages
            'msg.file.too.large': 'الملف كبير جداً',
            'msg.unsupported.type': 'نوع الملف غير مدعوم',
            'msg.processing.error': 'حدث خطأ أثناء المعالجة',
            'msg.success.upload': 'تم رفع الملف بنجاح',
            'msg.processing.complete': 'اكتملت المعالجة بنجاح'
        },
        
        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.protect': 'Protect Images',
            'nav.decrypt': 'Decrypt',
            'nav.quality': 'Enhance Quality',
            'nav.merge': 'Merge PDF',
            'nav.compress': 'Compress PDF',
            'nav.image-to-pdf': 'Convert to PDF',
            
            // Header
            'hero.badge': '🚀 Local & Secure Processing',
            'hero.title': 'Convert Images & Files to PDF Easily',
            'hero.subtitle': 'Complete platform for image and PDF processing - 100% local with full privacy',
            
            // Stats
            'stats.tools': 'Integrated Tools',
            'stats.local': 'Local Processing',
            'stats.free': 'Free Usage',
            'stats.users': 'Satisfied Users',
            
            // Tool Cards
            'tool.protect.title': 'Image Protection',
            'tool.protect.desc': 'Encrypt your images with AES-256 password protection',
            'tool.decrypt.title': 'Decryption',
            'tool.decrypt.desc': 'Restore original images from encrypted files',
            'tool.quality.title': 'Quality Enhancement',
            'tool.quality.desc': 'Upscale blurry images and make them clearer',
            'tool.merge.title': 'Merge PDF',
            'tool.merge.desc': 'Combine multiple PDF files into one document',
            'tool.compress.title': 'Compress PDF',
            'tool.compress.desc': 'Reduce PDF file size while maintaining quality',
            'tool.image-to-pdf.title': 'Images to PDF',
            'tool.image-to-pdf.desc': 'Convert JPG, PNG images to high-quality PDF',
            
            // Buttons
            'btn.start': 'Start Now',
            'btn.try': 'Try Tool',
            'btn.loading': 'Processing...',
            'btn.success': 'Success',
            'btn.error': 'Error',
            
            // How It Works
            'how.title': 'How It Works?',
            'how.step1.title': 'Select File',
            'how.step1.desc': 'Upload your file from your device',
            'how.step2.title': 'Choose Settings',
            'how.step2.desc': 'Select options that fit your needs',
            'how.step3.title': 'Local Processing',
            'how.step3.desc': 'Processing happens in your browser - full privacy',
            'how.step4.title': 'Download Result',
            'how.step4.desc': 'Get your final file instantly',
            
            // FAQ
            'faq.title': 'Frequently Asked Questions',
            'faq.q1': 'Is file upload secure?',
            'faq.a1': 'Yes, all processing happens in your browser. No files are uploaded to any external server.',
            'faq.q2': 'Is the service free?',
            'faq.a2': 'Yes, all tools are completely free with no limits or annoying ads.',
            'faq.q3': 'What is the maximum file size?',
            'faq.a3': 'File size is limited by your device memory, no server-side limits.',
            'faq.q4': 'Do I need internet connection?',
            'faq.a4': 'After the first load, you can use all tools offline.',
            
            // Footer
            'footer.copyright': 'All Rights Reserved',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms & Conditions',
            'footer.contact': 'Contact Us',
            
            // Developer Section
            'dev.title': 'For Developers',
            'dev.desc': 'Open source platform built with modern web technologies',
            'dev.docs': 'Developer Docs',
            'dev.source': 'Source Code',
            
            // System Messages
            'msg.file.too.large': 'File too large',
            'msg.unsupported.type': 'Unsupported file type',
            'msg.processing.error': 'An error occurred during processing',
            'msg.success.upload': 'File uploaded successfully',
            'msg.processing.complete': 'Processing completed successfully'
        }
    });
    
    // ============================================
    // 2. الحالة الداخلية (Internal State)
    // ============================================
    
    var currentLanguage = 'ar';
    var isInitialized = false;
    var dynamicObserver = null;
    var ariaLiveRegion = null;
    
    // ============================================
    // 3. الأدوات المساعدة (Utilities)
    // ============================================
    
    var i18nUtils = {
        /**
         * التحقق من صحة رمز اللغة
         * @param {string} lang
         * @returns {boolean}
         */
        isValidLanguage: function(lang) {
            return lang === 'ar' || lang === 'en';
        },
        
        /**
         * الحصول على اللغة الافتراضية بناءً على تفضيلات المتصفح
         * @returns {string}
         */
        getBrowserLanguage: function() {
            // تأمين المتصفح للمتصفحات القديمة والهواتف
            var nav = window.navigator || {};
            var browserLang = nav.language || nav.userLanguage || 'ar';
            
            // التحقق من وجود اللغة قبل استخدام toLowerCase
            if (!browserLang) return 'ar';
            
            var langCode = browserLang.toLowerCase();
            if (langCode.indexOf('ar') === 0) return 'ar';
            if (langCode.indexOf('en') === 0) return 'en';
            return 'ar';
        },
        
        /**
         * تطبيق اتجاه الصفحة (RTL/LTR) - متوافق مع CSS Logical Properties
         * @param {string} lang
         */
        applyDirection: function(lang) {
            var dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', dir);
            document.documentElement.setAttribute('lang', lang);
        },
        
        /**
         * تحديث نص زر تبديل اللغة
         */
        updateLanguageButton: function() {
            var langBtn = document.getElementById('lang-btn');
            if (langBtn) {
                langBtn.textContent = currentLanguage === 'ar' ? 'English' : 'العربية';
                langBtn.setAttribute('aria-label', currentLanguage === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
            }
        },
        
        /**
         * تنقية النص لمنع XSS (للسمات التي قد تحتوي HTML)
         * @param {string} text
         * @returns {string}
         */
        sanitizeText: function(text) {
            if (!text || typeof text !== 'string') return '';
            // إزالة أي علامات HTML محتملة
            return text.replace(/[<>]/g, function(match) {
                return match === '<' ? '&lt;' : '&gt;';
            });
        },
        
        /**
         * إنشاء منطقة إعلان لقارئات الشاشة
         */
        createAriaLiveRegion: function() {
            if (ariaLiveRegion) return;
            
            ariaLiveRegion = document.createElement('div');
            ariaLiveRegion.setAttribute('aria-live', 'polite');
            ariaLiveRegion.setAttribute('aria-atomic', 'true');
            ariaLiveRegion.setAttribute('class', 'sr-only');
            ariaLiveRegion.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;';
            document.body.appendChild(ariaLiveRegion);
        },
        
        /**
         * إعلان تغيير اللغة لقارئات الشاشة
         * @param {string} lang
         */
        announceLanguageChange: function(lang) {
            if (!ariaLiveRegion) this.createAriaLiveRegion();
            if (ariaLiveRegion) {
                var message = lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English';
                ariaLiveRegion.textContent = message;
                // مسح الرسالة بعد فترة
                setTimeout(function() {
                    if (ariaLiveRegion) ariaLiveRegion.textContent = '';
                }, 1000);
            }
        }
    };
    
    // ============================================
    // 4. نظام الترجمة الأساسي (Core Translation Engine)
    // ============================================
    
    var translationEngine = {
        /**
         * ترجمة مفتاح واحد مع حماية من Prototype Pollution
         * @param {string} key - مفتاح الترجمة
         * @returns {string} النص المترجم أو المفتاح نفسه إذا لم يوجد
         */
        translate: function(key) {
            if (!key || typeof key !== 'string') return '';
            
            // حماية من Prototype Pollution
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                return '';
            }
            
            var translations = TRANSLATIONS[currentLanguage];
            
            // التحقق من وجود الخاصية مباشرة (hasOwnProperty)
            if (translations && Object.prototype.hasOwnProperty.call(translations, key)) {
                return translations[key];
            }
            
            // محاولة الرجوع للغة العربية إذا كان المفتاح غير موجود
            if (currentLanguage !== 'ar' && TRANSLATIONS.ar && 
                Object.prototype.hasOwnProperty.call(TRANSLATIONS.ar, key)) {
                return TRANSLATIONS.ar[key];
            }
            
            // التحقق من وجود window.DEV_MODE بأمان
            var isDevMode = window.DEV_MODE === true && window.location && 
                           window.location.hostname === 'localhost';
            
            if (isDevMode) {
                console.warn('[i18n] Translation missing for key:', key);
            }
            return key;
        },
        
        /**
         * ترجمة جميع العناصر في الصفحة (data-i18n)
         * تدعم: textContent, placeholder, alt, title, aria-label, value
         */
        translatePage: function() {
            var elements = document.querySelectorAll('[data-i18n]');
            if (elements.length === 0) return;
            
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                var key = el.getAttribute('data-i18n');
                
                // حماية من injection
                if (!key) continue;
                
                var translatedText = this.translate(key);
                if (!translatedText) continue;
                
                // تحديد نوع الترجمة بناءً على سمة data-i18n-attr (اختياري)
                var targetAttr = el.getAttribute('data-i18n-attr');
                
                if (targetAttr === 'placeholder') {
                    el.placeholder = translatedText;
                } else if (targetAttr === 'alt') {
                    el.alt = translatedText;
                } else if (targetAttr === 'title') {
                    el.title = i18nUtils.sanitizeText(translatedText);
                } else if (targetAttr === 'aria-label') {
                    el.setAttribute('aria-label', i18nUtils.sanitizeText(translatedText));
                } else if (targetAttr === 'value') {
                    el.value = translatedText;
                } else {
                    // التحقق التلقائي حسب نوع العنصر
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        var inputType = el.getAttribute('type');
                        if (inputType !== 'submit' && inputType !== 'button' && inputType !== 'reset') {
                            el.placeholder = translatedText;
                        } else {
                            el.value = translatedText;
                        }
                    } else if (el.tagName === 'IMG') {
                        el.alt = translatedText;
                    } else if (el.hasAttribute('title')) {
                        el.title = i18nUtils.sanitizeText(translatedText);
                    } else {
                        // استخدام textContent آمن من XSS
                        el.textContent = translatedText;
                    }
                }
            }
        },
        
        /**
         * تحديث سمات HTML الخاصة باللغة
         */
        updateHtmlAttributes: function() {
            i18nUtils.applyDirection(currentLanguage);
            i18nUtils.updateLanguageButton();
        },
        
        /**
         * تطبيق التغييرات الكاملة عند تبديل اللغة
         * @param {string} lang
         * @param {boolean} skipSave - تخطي حفظ التفضيل
         */
        applyLanguage: function(lang, skipSave) {
            if (!i18nUtils.isValidLanguage(lang)) {
                lang = 'ar';
            }
            
            if (currentLanguage === lang && isInitialized) {
                return;
            }
            
            currentLanguage = lang;
            
            // تحديث HTML attributes
            this.updateHtmlAttributes();
            
            // ✅ إيقاف المراقب مؤقتاً لمنع الحلقة المفرغة
            if (dynamicObserver) {
                dynamicObserver.disconnect();
            }
            
            // ترجمة الصفحة
            this.translatePage();
            
            // ✅ إعادة تشغيل المراقب
            if (dynamicObserver && document.body) {
                dynamicObserver.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
            
            // إعلان تغيير اللغة لقارئات الشاشة
            i18nUtils.announceLanguageChange(lang);
            
            // حفظ التفضيل (ما لم يطلب تخطي)
            if (!skipSave) {
                this.savePreference(lang);
            }
            
            var isDevMode = window.DEV_MODE === true && window.location && 
                           window.location.hostname === 'localhost';
            
            if (isDevMode) {
                console.log('[i18n] Language switched to:', lang);
            }
        },
        
        /**
         * حفظ تفضيل اللغة
         * @param {string} lang
         */
        savePreference: function(lang) {
            try {
                localStorage.setItem('smrt_preferred_lang', lang);
            } catch (e) {
                var isDevMode = window.DEV_MODE === true;
                if (isDevMode) console.warn('[i18n] localStorage not available');
            }
        },
        
        /**
         * استرجاع تفضيل اللغة المحفوظ
         * @returns {string|null}
         */
        loadPreference: function() {
            try {
                return localStorage.getItem('smrt_preferred_lang');
            } catch (e) {
                return null;
            }
        },
        
        /**
         * اكتشاف اللغة المناسبة (محفوظة > متصفح > افتراضية)
         * @returns {string}
         */
        detectLanguage: function() {
            // 1. التفضيل المحفوظ
            var saved = this.loadPreference();
            if (saved && i18nUtils.isValidLanguage(saved)) {
                return saved;
            }
            
            // 2. لغة المتصفح
            var browserLang = i18nUtils.getBrowserLanguage();
            if (browserLang) {
                return browserLang;
            }
            
            // 3. اللغة الافتراضية
            return 'ar';
        },
        
        /**
         * الحصول على اللغة الحالية
         * @returns {string}
         */
        getCurrentLanguage: function() {
            return currentLanguage;
        },
        
        /**
         * الحصول على جميع مفاتيح الترجمة المتاحة
         * @returns {Array}
         */
        getAvailableKeys: function() {
            if (!TRANSLATIONS.ar) return [];
            return Object.keys(TRANSLATIONS.ar);
        },
        
        /**
         * إعادة تعيين النظام وتنظيف المراقبين
         */
        destroy: function() {
            if (dynamicObserver) {
                dynamicObserver.disconnect();
                dynamicObserver = null;
            }
            
            if (ariaLiveRegion && ariaLiveRegion.parentNode) {
                ariaLiveRegion.parentNode.removeChild(ariaLiveRegion);
                ariaLiveRegion = null;
            }
            
            isInitialized = false;
            currentLanguage = 'ar';
            
            var isDevMode = window.DEV_MODE === true;
            if (isDevMode) {
                console.log('[i18n] System destroyed');
            }
        }
    };
    
    // ============================================
    // 5. دوال تبديل اللغة (Public API)
    // ============================================
    
    /**
     * تبديل اللغة بين العربية والإنجليزية
     * @param {boolean} showToast - عرض إشعار للمستخدم
     */
    function toggleLanguage(showToast) {
        var newLang = currentLanguage === 'ar' ? 'en' : 'ar';
        translationEngine.applyLanguage(newLang);
        
        // إظهار إشعار للمستخدم (اختياري) - مع التحقق الآمن من وجود الـ API
        if (showToast !== false && window.SmartImageConverter && 
            typeof window.SmartImageConverter.showToast === 'function') {
            var message = newLang === 'ar' ? 'تم التبديل إلى اللغة العربية' : 'Switched to English';
            window.SmartImageConverter.showToast(message, 'info');
        }
        
        var isDevMode = window.DEV_MODE === true && window.location && 
                       window.location.hostname === 'localhost';
        
        if (isDevMode) {
            console.log('[i18n] toggleLanguage ->', newLang);
        }
    }
    
    /**
     * تغيير اللغة مباشرة
     * @param {string} lang - 'ar' أو 'en'
     * @param {boolean} showToast - عرض إشعار للمستخدم
     */
    function setLanguage(lang, showToast) {
        if (lang !== 'ar' && lang !== 'en') return;
        
        var oldLang = currentLanguage;
        translationEngine.applyLanguage(lang);
        
        if (showToast !== false && oldLang !== lang && window.SmartImageConverter && 
            typeof window.SmartImageConverter.showToast === 'function') {
            var message = lang === 'ar' ? 'تم التبديل إلى اللغة العربية' : 'Switched to English';
            window.SmartImageConverter.showToast(message, 'info');
        }
    }
    
    /**
     * ترجمة مفتاح مباشرة (دالة مساعدة)
     * @param {string} key
     * @returns {string}
     */
    function translate(key) {
        return translationEngine.translate(key);
    }
    
    /**
     * إعادة تعيين نظام الترجمة بالكامل
     */
    function destroyI18n() {
        translationEngine.destroy();
    }
    
    // ============================================
    // 6. الترجمة الديناميكية (Mutation Observer)
    // ============================================
    
    /**
     * مراقبة إضافة عناصر جديدة تحتاج ترجمة
     * محسنة للأداء مع منع الحلقات اللانهائية
     */
    function setupDynamicTranslationObserver() {
        if (dynamicObserver) return;
        
        dynamicObserver = new MutationObserver(function(mutations) {
            var needsTranslation = false;
            
            for (var i = 0; i < mutations.length; i++) {
                var addedNodes = mutations[i].addedNodes;
                for (var j = 0; j < addedNodes.length; j++) {
                    var node = addedNodes[j];
                    if (node.nodeType === 1) {
                        if (node.hasAttribute && node.hasAttribute('data-i18n')) {
                            needsTranslation = true;
                            break;
                        }
                        if (node.querySelectorAll && node.querySelectorAll('[data-i18n]').length > 0) {
                            needsTranslation = true;
                            break;
                        }
                    }
                }
                if (needsTranslation) break;
            }
            
            if (needsTranslation) {
                // ✅ إيقاف المراقب مؤقتاً أثناء الترجمة
                if (dynamicObserver) dynamicObserver.disconnect();
                
                requestAnimationFrame(function() {
                    translationEngine.translatePage();
                    
                    // ✅ إعادة تشغيل المراقب بعد الترجمة
                    if (dynamicObserver && document.body) {
                        dynamicObserver.observe(document.body, {
                            childList: true,
                            subtree: true
                        });
                    }
                });
            }
        });
        
        dynamicObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // ============================================
    // 7. التهيئة والتشغيل (Initialization)
    // ============================================
    
    /**
     * تهيئة نظام الترجمة
     */
    function initI18n() {
        if (isInitialized) return;
        
        var detectedLang = translationEngine.detectLanguage();
        translationEngine.applyLanguage(detectedLang, true); // true = تخطي حفظ التفضيل
        
        isInitialized = true;
        
        // إنشاء منطقة إعلان لقارئات الشاشة
        if (document.body) {
            i18nUtils.createAriaLiveRegion();
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                i18nUtils.createAriaLiveRegion();
            });
        }
        
        // تفعيل المراقبة الديناميكية بعد تهيئة الجسم
        if (document.body) {
            setupDynamicTranslationObserver();
        } else {
            document.addEventListener('DOMContentLoaded', setupDynamicTranslationObserver);
        }
        
        var isDevMode = window.DEV_MODE === true && window.location && 
                       window.location.hostname === 'localhost';
        
        if (isDevMode) {
            console.log('[i18n] Initialized with language:', detectedLang);
        }
    }
    
    // ============================================
    // 8. دمج الـ API مع الـ Namespace العام
    // ============================================
    
    /**
     * دمج دوال الترجمة في الـ Namespace العام SmartImageConverter
     * استخدام طريقة مرنة لمنع الأخطاء عند التحميل المزدوج
     */
    function integrateWithGlobalNamespace() {
        // التحقق من وجود الـ Namespace
        if (!window.SmartImageConverter) {
            window.SmartImageConverter = {};
        }
        
        // ✅ طريقة مرنة لمنع الأخطاء عند التحميل المزدوج
        var apis = {
            t: translate,
            setLanguage: setLanguage,
            getLanguage: function() { return currentLanguage; },
            toggleLanguage: toggleLanguage,
            destroyI18n: destroyI18n
        };
        
        for (var key in apis) {
            if (Object.prototype.hasOwnProperty.call(apis, key)) {
                // إضافة الخاصية فقط إذا لم تكن موجودة مسبقاً
                if (!window.SmartImageConverter[key]) {
                    window.SmartImageConverter[key] = apis[key];
                }
            }
        }
        
        var isDevMode = window.DEV_MODE === true && window.location && 
                       window.location.hostname === 'localhost';
        
        if (isDevMode) {
            console.log('[i18n] Integrated with SmartImageConverter namespace');
        }
    }
    
    // ============================================
    // 9. تصدير الدوال للنطاق العام
    // ============================================
    
    // الدوال الرئيسية المطلوبة
    window.toggleLanguage = toggleLanguage;
    window.setLanguage = setLanguage;
    window.__ = translate;  // اسم مستعار قصير للترجمة
    window.destroyI18n = destroyI18n;
    
    // دالة توافقية للخلفية
    if (!window.changeLanguage) {
        window.changeLanguage = toggleLanguage;
    }
    
    // تشغيل التهيئة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initI18n();
            integrateWithGlobalNamespace();
        });
    } else {
        initI18n();
        integrateWithGlobalNamespace();
    }
    
})();
