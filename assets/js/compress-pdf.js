// أداة ضغط PDF - مع دعم الترجمة الكامل (جميع النصوص مترجمة)

window.initcompresspdf = function(containerId) {
    console.log("✅ تهيئة أداة ضغط PDF");

    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof PDFLib === 'undefined') {
        container.innerHTML = '<div class="tool-container"><p style="color:red">❌ خطأ في تحميل المكتبة</p></div>';
        return;
    }

    const hasRealCompressor = typeof PDFCompressor !== 'undefined';

    // دالة مساعدة للحصول على الترجمة
    const t = window.t || function(key) { return key; };

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

            <h1 style="text-align: center; font-size: 28px; margin-bottom: 15px;" data-i18n="pdf.title">🗜️ ضغط PDF - قلل حجم ملفاتك بضغطة زر</h1>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px; font-size: 16px;" data-i18n="pdf.subtitle">${hasRealCompressor ? '✅ ضغط حقيقي للصور بنسبة تصل إلى 70% - معالجة محلية 100%' : '✅ تقليل حجم ملفات PDF مع الحفاظ على الجودة الأصلية'}</p>

            <!-- منطقة الرفع -->
            <div class="drag-drop-zone" id="pdfDropArea" style="margin-bottom: 20px;">
                <div class="drag-icon">📁</div>
                <h3 data-i18n="upload.title">اختر ملف PDF أو اسحبه هنا</h3>
                <input type="file" id="pdfFile" accept=".pdf,application/pdf" style="display: none;">
                <small data-i18n="upload.note">يدعم جميع أنواع PDF | الحد الأقصى 50 ميجابايت</small>
            </div>

            <!-- معلومات الملف -->
            <div class="file-info" id="pdfInfo" style="display: none; background: var(--bg-card); border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                    <span>📄 <strong id="fileName">-</strong></span>
                    <span><span data-i18n="file.original">الحجم الأصلي:</span> <span id="originalSizeText">-</span></span>
                    <span><span data-i18n="file.compressed">الحجم بعد الضغط:</span> <span id="compressedSizeText">-</span></span>
                    <span><span data-i18n="file.savings">نسبة التوفير:</span> <span id="savingsText">-</span></span>
                </div>
            </div>

            <!-- إعدادات الضغط -->
            <div style="margin: 20px 0;">
                <h2 style="font-size: 20px; margin-bottom: 15px;" data-i18n="settings.title">⚙️ إعدادات الضغط</h2>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <div class="level-card" data-level="low" data-quality="0.85" data-i18n="settings.low">📗 ضغط منخفض (جودة عالية)</div>
                    <div class="level-card selected" data-level="medium" data-quality="0.6" data-i18n="settings.medium">📘 ضغط متوسط (توازن مثالي)</div>
                    <div class="level-card" data-level="high" data-quality="0.35" data-i18n="settings.high">📕 ضغط عالي (أصغر حجم)</div>
                </div>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 10px;" data-i18n="settings.warning">⚠️ الضغط العالي يقلل حجم الملف بشكل كبير ولكن قد يؤثر قليلاً على جودة الصور</p>
            </div>

            <!-- خيارات إضافية -->
            <div style="margin: 20px 0;">
                <label><input type="checkbox" id="optimizeImages" checked> <span data-i18n="option.optimize">🖼️ تحسين وضغط الصور داخل الملف</span></label>
                <label style="margin-left: 15px;"><input type="checkbox" id="removeMetadata"> <span data-i18n="option.metadata">🏷️ إزالة البيانات الوصفية (Metadata)</span></label>
            </div>

            <!-- زر المعالجة -->
            <button class="btn" id="compressActionBtn" style="width:100%; padding: 14px; font-size: 16px;">${t('btn.start')}</button>
            <div id="status" style="margin-top: 20px; text-align: center; font-size: 14px;"></div>
            <div class="progress-bar" id="progressBar" style="display: none; margin-top: 15px;">
                <div id="progressFill" style="width: 0%; height: 4px; background: var(--color-primary); border-radius: 2px;"></div>
            </div>

            <!-- شرح الاستخدام -->
            <div class="how-to-use" style="margin-top: 50px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 24px; margin-bottom: 20px; text-align: center;" data-i18n="howto.title">📖 طريقة استخدام أداة ضغط PDF</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between;">
                    <div style="flex: 1; min-width: 180px; text-align: center;">
                        <div style="background: var(--color-primary); width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; font-size: 20px; font-weight: bold;">1</div>
                        <h3 style="font-size: 16px; margin-bottom: 8px;" data-i18n="howto.step1.title">اختر ملف PDF</h3>
                        <p style="font-size: 13px; color: var(--text-muted);" data-i18n="howto.step1.desc">اضغط على منطقة الرفع أو اسحب ملف PDF</p>
                    </div>
                    <div style="flex: 1; min-width: 180px; text-align: center;">
                        <div style="background: var(--color-primary); width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; font-size: 20px; font-weight: bold;">2</div>
                        <h3 style="font-size: 16px; margin-bottom: 8px;" data-i18n="howto.step2.title">اختر مستوى الضغط</h3>
                        <p style="font-size: 13px; color: var(--text-muted);" data-i18n="howto.step2.desc">حدد مستوى الضغط المناسب لاحتياجاتك</p>
                    </div>
                    <div style="flex: 1; min-width: 180px; text-align: center;">
                        <div style="background: var(--color-primary); width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; font-size: 20px; font-weight: bold;">3</div>
                        <h3 style="font-size: 16px; margin-bottom: 8px;" data-i18n="howto.step3.title">ابدأ الضغط</h3>
                        <p style="font-size: 13px; color: var(--text-muted);" data-i18n="howto.step3.desc">اضغط زر "بدء الضغط" وانتظر قليلاً</p>
                    </div>
                    <div style="flex: 1; min-width: 180px; text-align: center;">
                        <div style="background: var(--color-primary); width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; font-size: 20px; font-weight: bold;">4</div>
                        <h3 style="font-size: 16px; margin-bottom: 8px;" data-i18n="howto.step4.title">حمل الملف المضغوط</h3>
                        <p style="font-size: 13px; color: var(--text-muted);" data-i18n="howto.step4.desc">احصل على ملف PDF المضغوط فوراً</p>
                    </div>
                </div>
            </div>

            <!-- محتوى SEO -->
            <div class="seo-content" style="margin-top: 50px; padding-top: 30px; border-top: 1px solid var(--border-color);">
                <h2 style="font-size: 24px; margin-bottom: 20px;" data-i18n="seo.what.title">📄 ما هي أداة ضغط PDF من Smart Image Converter؟</h2>
                <p style="line-height: 1.8; margin-bottom: 20px;" data-i18n="seo.what.desc">أداة ضغط PDF من Smart Image Converter هي خدمة مجانية بالكامل تتيح لك تقليل حجم ملفات PDF مع الحفاظ على الجودة الأصلية للنصوص والصور. تتم المعالجة محلياً 100% داخل متصفحك، مما يعني أن ملفاتك لا تُرفع إلى أي خادم خارجي، بل تبقى آمنة على جهازك الخاص.</p>
                <p style="line-height: 1.8; margin-bottom: 20px;" data-i18n="seo.what.desc2">سواء كنت تحتاج إلى ضغط ملف PDF لإرساله عبر البريد الإلكتروني، أو لتحسين سرعة تحميله على موقعك، أو لتوفير مساحة التخزين على جهازك، فإن أداتنا توفر لك حلاً سريعاً وآمناً ومجانياً.</p>
                
                <h2 style="font-size: 24px; margin-bottom: 20px;" data-i18n="seo.features.title">✨ مميزات أداة ضغط PDF</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <div style="background: var(--bg-card); padding: 20px; border-radius: 12px;">
                        <div style="font-size: 32px; margin-bottom: 10px;">🔒</div>
                        <h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="feature.privacy.title">خصوصية تامة 100%</h3>
                        <p style="font-size: 14px; color: var(--text-muted);" data-i18n="feature.privacy.desc">ملفاتك لا تترك جهازك أبداً. المعالجة تتم محلياً في متصفحك دون أي رفع لخوادم خارجية.</p>
                    </div>
                    <div style="background: var(--bg-card); padding: 20px; border-radius: 12px;">
                        <div style="font-size: 32px; margin-bottom: 10px;">⚡</div>
                        <h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="feature.speed.title">سرعة فائقة</h3>
                        <p style="font-size: 14px; color: var(--text-muted);" data-i18n="feature.speed.desc">معالجة فورية داخل المتصفح دون انتظار رفع أو تحميل من خوادم بعيدة.</p>
                    </div>
                    <div style="background: var(--bg-card); padding: 20px; border-radius: 12px;">
                        <div style="font-size: 32px; margin-bottom: 10px;">🎯</div>
                        <h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="feature.levels.title">ثلاث مستويات للضغط</h3>
                        <p style="font-size: 14px; color: var(--text-muted);" data-i18n="feature.levels.desc">اختر بين الضغط المنخفض (جودة عالية)، المتوسط (توازن)، أو العالي (أصغر حجم).</p>
                    </div>
                    <div style="background: var(--bg-card); padding: 20px; border-radius: 12px;">
                        <div style="font-size: 32px; margin-bottom: 10px;">🖼️</div>
                        <h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="feature.images.title">تحسين الصور</h3>
                        <p style="font-size: 14px; color: var(--text-muted);" data-i18n="feature.images.desc">ضغط الصور داخل ملف PDF بشكل ذكي لتقليل الحجم دون فقدان الجودة المرئية.</p>
                    </div>
                    <div style="background: var(--bg-card); padding: 20px; border-radius: 12px;">
                        <div style="font-size: 32px; margin-bottom: 10px;">📱</div>
                        <h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="feature.mobile.title">متوافق مع الجوال</h3>
                        <p style="font-size: 14px; color: var(--text-muted);" data-i18n="feature.mobile.desc">واجهة مستخدم محسنة للشاشات الصغيرة مع أزرار كبيرة وسهلة اللمس.</p>
                    </div>
                    <div style="background: var(--bg-card); padding: 20px; border-radius: 12px;">
                        <div style="font-size: 32px; margin-bottom: 10px;">💯</div>
                        <h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="feature.free.title">مجاني بالكامل</h3>
                        <p style="font-size: 14px; color: var(--text-muted);" data-i18n="feature.free.desc">لا توجد رسوم خفية أو اشتراكات. جميع الميزات متاحة مجاناً.</p>
                    </div>
                </div>
                
                <h2 style="font-size: 24px; margin-bottom: 20px;" data-i18n="seo.tips.title">💡 نصائح للحصول على أفضل نتائج ضغط</h2>
                <ul style="margin-bottom: 30px; padding-right: 20px;">
                    <li style="margin-bottom: 10px;" data-i18n="tip1">📌 استخدم الضغط العالي للملفات التي تحتوي على صور ممسوحة ضوئياً - يمكن أن يقلل الحجم بنسبة تصل إلى 70%.</li>
                    <li style="margin-bottom: 10px;" data-i18n="tip2">📌 استخدم الضغط المنخفض للملفات النصية - يحافظ على جودة النصوص والخطوط.</li>
                    <li style="margin-bottom: 10px;" data-i18n="tip3">📌 فعّل خيار "إزالة البيانات الوصفية" لتقليل الحجم بشكل إضافي بإزالة معلومات غير ضرورية.</li>
                    <li style="margin-bottom: 10px;" data-i18n="tip4">📌 إذا كان الملف مضغوطاً بالفعل، قد لا يتغير حجمه بشكل ملحوظ - وهذا طبيعي.</li>
                    <li style="margin-bottom: 10px;" data-i18n="tip5">📌 جرب مستويات الضغط المختلفة لتحقيق التوازن المثالي بين الحجم والجودة.</li>
                </ul>
                
                <h2 style="font-size: 24px; margin-bottom: 20px;" data-i18n="seo.security.title">🔐 الخصوصية والأمان في أداة ضغط PDF</h2>
                <p style="line-height: 1.8; margin-bottom: 20px;" data-i18n="security.desc">نحن ندرك أن ملفات PDF قد تحتوي على معلومات حساسة. لذلك، صممنا أداتنا لتكون محلية بالكامل (Client-Side). هذا يعني:</p>
                <ul style="margin-bottom: 30px; padding-right: 20px;">
                    <li style="margin-bottom: 8px;" data-i18n="security.point1">✅ لا يتم رفع ملفاتك لأي خادم خارجي - المعالجة تتم داخل متصفحك فقط.</li>
                    <li style="margin-bottom: 8px;" data-i18n="security.point2">✅ لا يتم تخزين أي نسخة من ملفاتك - بعد إغلاق الصفحة، تختفي جميع البيانات.</li>
                    <li style="margin-bottom: 8px;" data-i18n="security.point3">✅ لا نحتاج إلى تسجيل الدخول أو إنشاء حساب - استخدم الأداة فوراً بدون تعقيدات.</li>
                    <li style="margin-bottom: 8px;" data-i18n="security.point4">✅ لا توجد إعلانات مزعجة أو نوافذ منبثقة - تجربة مستخدم نظيفة وآمنة.</li>
                </ul>
                
                <h2 style="font-size: 24px; margin-bottom: 20px;" data-i18n="seo.compare.title">📊 مقارنة مع أدوات ضغط PDF التقليدية</h2>
                <div style="overflow-x: auto; margin-bottom: 30px;">
                    <table style="width: 100%; border-collapse: collapse; background: var(--bg-card); border-radius: 12px; overflow: hidden;">
                        <thead>
                            <tr style="background: var(--color-primary);">
                                <th style="padding: 12px; text-align: center;" data-i18n="compare.feature">الميزة</th>
                                <th style="padding: 12px; text-align: center;" data-i18n="compare.our">أداتنا</th>
                                <th style="padding: 12px; text-align: center;" data-i18n="compare.cloud">الأدوات السحابية</th>
                              </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;" data-i18n="compare.privacy">🔒 خصوصية الملفات</td><td style="padding: 10px;" data-i18n="compare.privacy.our">✅ معالجة محلية</td><td style="padding: 10px;" data-i18n="compare.privacy.cloud">❌ رفع للخادم</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;" data-i18n="compare.speed">⚡ سرعة المعالجة</td><td style="padding: 10px;" data-i18n="compare.speed.our">✅ فورية</td><td style="padding: 10px;" data-i18n="compare.speed.cloud">⚠️ تعتمد على سرعة الإنترنت</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;" data-i18n="compare.size">💾 حد حجم الملف</td><td style="padding: 10px;" data-i18n="compare.size.our">✅ 50 ميجابايت</td><td style="padding: 10px;" data-i18n="compare.size.cloud">⚠️ محدود (غالباً أقل)</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;" data-i18n="compare.cost">💯 التكلفة</td><td style="padding: 10px;" data-i18n="compare.cost.our">✅ مجاني بالكامل</td><td style="padding: 10px;" data-i18n="compare.cost.cloud">⚠️ غالباً محدود أو مدفوع</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;" data-i18n="compare.offline">📱 العمل دون إنترنت</td><td style="padding: 10px;" data-i18n="compare.offline.our">✅ نعم</td><td style="padding: 10px;" data-i18n="compare.offline.cloud">❌ لا</td></tr>
                        </tbody>
                     </table>
                </div>
                
                <h2 style="font-size: 24px; margin-bottom: 20px;" data-i18n="seo.faq.title">❓ الأسئلة الشائعة حول ضغط PDF</h2>
                <div class="faq-grid" style="display: grid; gap: 15px;">
                    <div class="faq-item" style="background: var(--bg-card); border-radius: 12px; padding: 20px;"><h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="faq.q1">❓ هل ضغط PDF يؤثر على جودة الملف الأصلي؟</h3><p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;" data-i18n="faq.a1">لا، أداة ضغط PDF تحافظ على جودة النصوص والرسومات. يتم ضغط الصور فقط (إذا اخترت تحسين الصور)، مما يقلل الحجم دون تأثير ملحوظ على الجودة.</p></div>
                    <div class="faq-item" style="background: var(--bg-card); border-radius: 12px; padding: 20px;"><h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="faq.q2">❓ هل يمكنني ضغط ملف PDF محمي بكلمة مرور؟</h3><p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;" data-i18n="faq.a2">للأسف، لا يمكن ضغط ملفات PDF المحمية بكلمة مرور. يجب إزالة الحماية أولاً باستخدام أداة فك التشفير في موقعنا.</p></div>
                    <div class="faq-item" style="background: var(--bg-card); border-radius: 12px; padding: 20px;"><h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="faq.q3">❓ ما حجم الملف الذي يمكنني ضغطه؟</h3><p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;" data-i18n="faq.a3">الحد الأقصى هو 50 ميجابايت. هذا الحد مناسب لمعظم الملفات ويضمن أداءً جيداً على جميع الأجهزة.</p></div>
                    <div class="faq-item" style="background: var(--bg-card); border-radius: 12px; padding: 20px;"><h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="faq.q4">❓ هل أحتاج إلى اتصال بالإنترنت لاستخدام الأداة؟</h3><p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;" data-i18n="faq.a4">بعد تحميل الصفحة لأول مرة، يمكنك استخدام الأداة دون اتصال بالإنترنت لأن جميع العمليات تتم محلياً على جهازك.</p></div>
                    <div class="faq-item" style="background: var(--bg-card); border-radius: 12px; padding: 20px;"><h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="faq.q5">❓ هل الأداة مجانية حقاً؟</h3><p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;" data-i18n="faq.a5">نعم، الأداة مجانية بالكامل ولا توجد أي رسوم خفية. يمكنك استخدامها لضغط عدد غير محدود من الملفات.</p></div>
                    <div class="faq-item" style="background: var(--bg-card); border-radius: 12px; padding: 20px;"><h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="faq.q6">❓ كيف تتم المعالجة المحلية؟</h3><p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;" data-i18n="faq.a6">جميع عمليات الضغط تتم داخل متصفحك باستخدام تقنيات JavaScript المتقدمة. لا يتم إرسال ملفاتك إلى أي خادم خارجي.</p></div>
                    <div class="faq-item" style="background: var(--bg-card); border-radius: 12px; padding: 20px;"><h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="faq.q7">❓ ما الفرق بين مستويات الضغط المختلفة؟</h3><p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;" data-i18n="faq.a7">الضغط المنخفض يحافظ على جودة عالية مع تقليل بسيط للحجم. الضغط المتوسط يوفر توازناً مثالياً بين الحجم والجودة. الضغط العالي يقلل الحجم بشكل كبير مع تأثير طفيف على جودة الصور.</p></div>
                    <div class="faq-item" style="background: var(--bg-card); border-radius: 12px; padding: 20px;"><h3 style="font-size: 18px; margin-bottom: 10px;" data-i18n="faq.q8">❓ هل تعمل الأداة على الهاتف المحمول؟</h3><p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;" data-i18n="faq.a8">نعم، الأداة مصممة لتكون متجاوبة بالكامل وتعمل بشكل ممتاز على جميع الهواتف الذكية والأجهزة اللوحية.</p></div>
                </div>
                
                <h2 style="font-size: 24px; margin-bottom: 20px; margin-top: 30px;" data-i18n="seo.links.title">🔗 أدوات قد تهمك أيضاً</h2>
                <div class="internal-links" style="display: flex; flex-wrap: wrap; gap: 12px;">
                    <a href="#merge-pdf" data-i18n="link.merge">📑 دمج PDF</a>
                    <a href="#image-to-pdf" data-i18n="link.imagepdf">🖼️ تحويل الصور إلى PDF</a>
                    <a href="#password-protect" data-i18n="link.protect">🔒 حماية PDF</a>
                    <a href="#decrypt" data-i18n="link.decrypt">🔓 فك تشفير PDF</a>
                    <a href="#image-quality" data-i18n="link.quality">✨ تحسين جودة الصور</a>
                </div>
                
                <p style="margin-top: 30px; font-size: 12px; color: var(--text-muted); text-align: center; padding-top: 20px;" data-i18n="seo.keywords">الكلمات المفتاحية: ضغط PDF، تقليل حجم PDF، ضغط ملفات PDF، أداة ضغط PDF مجانية، compress PDF online free</p>
            </div>
        </div>
    `;

    // ترجمة المحتوى فوراً بعد الحقن
    if (window.SmartImageConverter && window.SmartImageConverter.refreshTranslations) {
        window.SmartImageConverter.refreshTranslations(container);
    }

    // ============================================
    // العناصر والمنطق البرمجي
    // ============================================
    const pdfFileInput = container.querySelector('#pdfFile');
    const pdfDropArea = container.querySelector('#pdfDropArea');
    const pdfInfo = container.querySelector('#pdfInfo');
    const compressionCards = container.querySelectorAll('.level-card');
    const statusDiv = container.querySelector('#status');
    const compressBtn = container.querySelector('#compressActionBtn');
    const progressBar = container.querySelector('#progressBar');
    const progressFill = container.querySelector('#progressFill');

    let selectedFile = null;
    let selectedLevel = 'medium';
    let selectedQuality = 0.6;
    let isProcessing = false;
    let realCompressor = null;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function updatePreview() {
        if (!selectedFile) return;
        const originalSpan = container.querySelector('#originalSizeText');
        const compressedSpan = container.querySelector('#compressedSizeText');
        const savingsSpan = container.querySelector('#savingsText');
        if (originalSpan) originalSpan.textContent = formatFileSize(selectedFile.size);
        let ratio = selectedLevel === 'high' ? 0.5 : (selectedLevel === 'medium' ? 0.75 : 0.9);
        if (compressedSpan) compressedSpan.textContent = formatFileSize(selectedFile.size * ratio);
        if (savingsSpan) savingsSpan.textContent = Math.round((1 - ratio) * 100) + '%';
    }

    function updateUIForLanguage() {
        if (compressBtn) {
            compressBtn.textContent = isProcessing ? window.t('btn.processing') : window.t('btn.start');
        }
    }

    function setLoading(loading) {
        isProcessing = loading;
        if (compressBtn) {
            compressBtn.disabled = loading;
            compressBtn.textContent = loading ? window.t('btn.processing') : window.t('btn.start');
        }
        progressBar.style.display = loading ? 'block' : 'none';
        if (!loading && progressFill) progressFill.style.width = '0%';
    }

    function updateProgress(percent) {
        if (progressFill) progressFill.style.width = percent + '%';
    }

    function updateStatusMessage(type, savings = null) {
        if (!statusDiv) return;
        switch(type) {
            case 'invalid':
                statusDiv.innerHTML = `<span style="color: var(--color-error);">${window.t('status.invalid')}</span>`;
                break;
            case 'large':
                statusDiv.innerHTML = `<span style="color: var(--color-error);">${window.t('status.large')}</span>`;
                break;
            case 'select':
                statusDiv.innerHTML = `<span style="color: var(--color-error);">${window.t('status.select')}</span>`;
                break;
            case 'processing':
                statusDiv.innerHTML = `<span style="color: var(--color-info);">${window.t('status.processing')}</span>`;
                break;
            case 'success':
                statusDiv.innerHTML = `<span style="color: var(--color-success);">${window.t('status.success')} ${savings}%</span>`;
                break;
            case 'saved':
                statusDiv.innerHTML = `<span style="color: var(--color-info);">${window.t('status.saved')}</span>`;
                break;
            case 'error':
                statusDiv.innerHTML = `<span style="color: var(--color-error);">${window.t('status.error')}</span>`;
                break;
            default:
                statusDiv.innerHTML = '';
        }
    }

    function handleFile(file) {
        if (!file || file.type !== 'application/pdf') {
            updateStatusMessage('invalid');
            return;
        }
        if (file.size > 50 * 1024 * 1024) {
            updateStatusMessage('large');
            return;
        }
        selectedFile = file;
        const nameSpan = container.querySelector('#fileName');
        if (nameSpan) nameSpan.textContent = file.name;
        pdfInfo.style.display = 'block';
        statusDiv.innerHTML = '';
        updatePreview();
    }

    compressionCards.forEach(card => {
        card.addEventListener('click', function() {
            compressionCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedLevel = this.dataset.level;
            selectedQuality = parseFloat(this.dataset.quality);
            if (selectedFile) updatePreview();
        });
    });

    pdfDropArea.addEventListener('click', () => pdfFileInput.click());
    pdfFileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) handleFile(e.target.files[0]);
        pdfFileInput.value = '';
    });

    pdfDropArea.addEventListener('dragover', (e) => { e.preventDefault(); pdfDropArea.classList.add('drag-over'); });
    pdfDropArea.addEventListener('dragleave', () => { pdfDropArea.classList.remove('drag-over'); });
    pdfDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        pdfDropArea.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    async function compressPDF() {
        if (!selectedFile) { updateStatusMessage('select'); return; }
        if (isProcessing) return;
        setLoading(true);
        updateStatusMessage('processing');

        try {
            let compressedBlob, compressedSize, savings;
            const originalSize = selectedFile.size;

            if (hasRealCompressor && typeof PDFCompressor !== 'undefined') {
                realCompressor = new PDFCompressor();
                compressedBlob = await realCompressor.compressPDF(selectedFile, selectedQuality, updateProgress);
                compressedSize = compressedBlob.size;
                savings = Math.round((1 - (compressedSize / originalSize)) * 100);
            } else {
                const arrayBuffer = await selectedFile.arrayBuffer();
                const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
                const removeMeta = container.querySelector('#removeMetadata')?.checked || false;
                if (removeMeta) {
                    pdfDoc.setTitle(''); pdfDoc.setAuthor(''); pdfDoc.setCreator(''); pdfDoc.setProducer('');
                }
                const pdfBytes = await pdfDoc.save({ useObjectStreams: true, addDefaultPage: false });
                compressedSize = pdfBytes.length;
                savings = Math.round((1 - (compressedSize / originalSize)) * 100);
                compressedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            }

            const compressedSpan = container.querySelector('#compressedSizeText');
            const savingsSpan = container.querySelector('#savingsText');
            if (compressedSpan) compressedSpan.textContent = formatFileSize(compressedSize);
            if (savingsSpan) savingsSpan.textContent = savings + '%';

            const url = URL.createObjectURL(compressedBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `compressed_${selectedFile.name}`;
            link.click();
            URL.revokeObjectURL(url);

            updateStatusMessage('success', savings);
        } catch (error) {
            console.error(error);
            updateStatusMessage('error');
        } finally {
            setLoading(false);
            realCompressor = null;
        }
    }

    compressBtn.addEventListener('click', compressPDF);

    // الاستماع لتغيير اللغة لتحديث الأزرار الديناميكية
    window.addEventListener('languageChanged', function() {
        updateUIForLanguage();
        if (statusDiv && statusDiv.innerHTML.includes('تم الضغط')) {
            updateStatusMessage('success', 0);
        }
    });

    console.log("✅ أداة ضغط PDF جاهزة");
};
