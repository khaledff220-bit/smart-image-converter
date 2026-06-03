// أداة دمج PDF - نسخة محسنة SEO مع محتوى عربي غني ومتوافقة مع الصفحة الرئيسية

window.initMergePDF = function(containerId) {
    console.log("✅ تهيئة أداة دمج PDF");
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (typeof PDFLib === 'undefined') {
        container.innerHTML = '<div class="tool-container"><p style="color:red">❌ خطأ في تحميل مكتبة PDF-Lib</p></div>';
        return;
    }

    container.innerHTML = `
        <div class="tool-container">
            <!-- شارة الثقة والأمان -->
            <div class="trust-badge" style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.15)); border-radius: 60px; padding: 12px 24px; margin-bottom: 25px; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;">🔒 100% خصوصية</span>
                    <span style="background: #3b82f6; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;">⚡ معالجة فورية</span>
                    <span style="background: #4f46e5; color: white; padding: 4px 12px; border-radius: 30px; font-size: 12px;">🛡️ بدون رفع ملفات</span>
                    <span style="background: #f59e0b; color: #1a1a2e; padding: 4px 12px; border-radius: 30px; font-size: 12px;">💯 مجاني بالكامل</span>
                </div>
                <p style="margin-top: 12px; font-size: 14px; color: var(--text-secondary);">🔐 ملفاتك لا تترك جهازك أبداً - معالجة محلية 100%</p>
            </div>

            <!-- عنوان H1 احترافي -->
            <h1 style="text-align: center; font-size: 28px; margin-bottom: 15px;">📑 دمج PDF - اجمع عدة ملفات PDF في مستند واحد مرتب</h1>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px; font-size: 16px;">✅ دمج ملفات PDF متعددة في ملف واحد - معالجة محلية 100% - مجاني تماماً</p>

            <!-- منطقة رفع الملفات -->
            <div class="drag-drop-zone" id="mergeDropArea" style="margin-bottom: 20px;">
                <div class="drag-icon">📁</div>
                <h3>اختر ملفات PDF لدمجها</h3>
                <input type="file" id="pdfInput" accept=".pdf,application/pdf" multiple style="display: none;">
                <small>يمكنك اختيار عدة ملفات (حتى 20 ملفاً) | كل ملف بحد أقصى 50 ميجابايت</small>
            </div>

            <div class="file-info" id="fileInfo" style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
                <span>📄 عدد الملفات: <span id="fileCount">0</span></span>
                <button id="clearAllBtn" style="background: var(--color-error); border: none; color: white; padding: 5px 15px; border-radius: 8px; cursor: pointer;">🗑️ مسح الكل</button>
            </div>

            <div id="fileList" style="background: var(--bg-card); border-radius: 12px; padding: 15px; max-height: 300px; overflow-y: auto;"></div>

            <button class="btn" id="mergeActionBtn" style="width:100%; margin-top: 20px; padding: 14px;">📑 دمج الملفات الآن</button>
            <div id="mergeStatus" style="margin-top: 20px; text-align: center;"></div>

            <!-- ============================================ -->
            <!-- المحتوى النصي الغني لتحسين السيو (1000+ كلمة) -->
            <!-- ============================================ -->

            <!-- 1. قسم شرح شامل -->
            <section class="seo-block" style="margin-top: 50px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">ما هي أداة دمج PDF من Smart Image Converter؟</h2>
                
                <p><strong>أداة دمج PDF</strong> من Smart Image Converter هي خدمة مجانية بالكامل تتيح لك <strong>دمج ملفات PDF</strong> متعددة في مستند واحد مرتب ومنظم. سواء كنت طالباً تحتاج إلى دمج أبحاثك ومشاريعك، أو موظفاً تريد تجميع تقارير العمل، أو أي شخص يتعامل مع مستندات PDF بشكل يومي، فإن أداة <strong>دمج PDF</strong> لدينا توفر لك الحل الأسهل والأسرع والأكثر أماناً.</p>
                
                <p>ما يميز <strong>أداة دمج PDF</strong> لدينا هو أنها تعمل <strong>محلياً 100%</strong> داخل متصفحك - لا يتم رفع ملفاتك إلى أي خادم خارجي، مما يعني أن مستنداتك الحساسة تبقى آمنة تماماً على جهازك الخاص. يمكنك <strong>دمج ملفات PDF</strong> بكل ثقة وأمان، مع العلم أن بياناتك لا تغادر جهازك أبداً.</p>
                
                <p><strong>دمج ملفات PDF</strong> هو عملية جمع عدة مستندات PDF منفصلة في ملف PDF واحد متكامل. يمكنك ترتيب الصفحات حسب رغبتك، وإعادة تنظيم الملفات قبل الدمج، والحصول على ملف PDF نهائي يحتوي على جميع المحتويات التي اخترتها. الأداة تدعم دمج ما يصل إلى 20 ملفاً في المرة الواحدة، مع حد أقصى 50 ميجابايت لكل ملف.</p>
                
                <p>سواء كنت تحتاج إلى <strong>دمج PDF</strong> لتقديم مشروع جامعي، أو تجميع فصول كتاب، أو دمج عقود متعددة في ملف واحد، أو إنشاء ملف PDF واحد من عدة تقارير، فإن أداتنا توفر لك المرونة والسهولة التي تحتاجها. كل ذلك مجاناً تماماً، بدون إعلانات مزعجة، وبدون حدود لعدد مرات الاستخدام.</p>
            </section>

            <!-- 2. قسم: لماذا تحتاج إلى دمج PDF؟ -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">لماذا تحتاج إلى دمج ملفات PDF؟ 5 أسباب مهمة</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>تجميع المستندات المتفرقة:</strong> بدلاً من إرسال عدة ملفات منفصلة، يمكنك <strong>دمج PDF</strong> في ملف واحد منظم يسهل مشاركته وإدارته.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>تسهيل عرض العروض التقديمية:</strong> عند تقديم مشروع أو عرض عمل، من الأفضل أن يكون كل شيء في ملف PDF واحد بدلاً من التنقل بين عدة ملفات.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>تنظيم السيرة الذاتية مع المرفقات:</strong> يمكنك <strong>دمج ملفات PDF</strong> لتجميع سيرتك الذاتية مع الشهادات والخبرات في ملف واحد متكامل.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>تجميع الفواتير والإيصالات:</strong> بدلاً من حفظ عشرات الفواتير المنفصلة، يمكنك دمجها في ملف PDF واحد لتسهيل الأرشفة والبحث.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>إنشاء كتب إلكترونية (E-books):</strong> يمكنك <strong>دمج ملفات PDF</strong> متعددة لإنشاء كتاب إلكتروني واحد يحتوي على جميع الفصول.</li>
                </ul>
            </section>

            <!-- 3. قسم مميزات الأداة -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">مميزات أداة دمج PDF من Smart Image Converter</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>خصوصية تامة 100%:</strong> معالجة محلية - ملفاتك لا ترفع للخادم مطلقاً، تبقى آمنة على جهازك.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>سرعة فائقة في الدمج:</strong> معالجة فورية داخل المتصفح دون انتظار رفع أو تحميل من خوادم بعيدة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>إمكانية ترتيب الملفات:</strong> يمكنك إضافة وإزالة الملفات بسهولة، وترتيبها حسب الرغبة قبل الدمج.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>دعم حتى 20 ملفاً:</strong> يمكنك <strong>دمج ملفات PDF</strong> متعددة في المرة الواحدة (حتى 20 ملفاً).</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>معاينة الملفات:</strong> عرض قائمة بجميع الملفات المختارة مع إمكانية إزالة أي ملف قبل الدمج.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>مجاني بالكامل:</strong> بدون اشتراكات، بدون حدود لعدد مرات الاستخدام، بدون إعلانات مزعجة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يعمل على جميع الأجهزة:</strong> الحاسوب، الهاتف الذكي، الجهاز اللوحي - واجهة متجاوبة وسهلة الاستخدام.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يعمل دون اتصال بالإنترنت:</strong> بعد تحميل الصفحة لأول مرة، يمكنك <strong>دمج PDF</strong> حتى بدون إنترنت.</li>
                </ul>
            </section>

            <!-- 4. قسم حالات الاستخدام العملية -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">متى تحتاج إلى دمج ملفات PDF؟ حالات استخدام عملية</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">1</div>
                        <div><strong>📚 للطلاب والباحثين:</strong> <strong>دمج PDF</strong> للأبحاث والمشاريع والكتب الجامعية لتسهيل تقديمها وتسليمها.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">2</div>
                        <div><strong>💼 للموظفين والشركات:</strong> <strong>دمج ملفات PDF</strong> للتقارير والعقود والعروض التقديمية لتسهيل مشاركتها مع العملاء والزملاء.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">3</div>
                        <div><strong>📄 للباحثين عن عمل:</strong> <strong>دمج PDF</strong> للسيرة الذاتية مع الشهادات والخبرات والمشاريع السابقة في ملف واحد متكامل.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">4</div>
                        <div><strong>📖 للكتّاب والناشرين:</strong> <strong>دمج ملفات PDF</strong> لتجميع فصول كتاب أو مجموعة مقالات في كتاب إلكتروني واحد.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">5</div>
                        <div><strong>🏠 للاستخدام الشخصي:</strong> <strong>دمج PDF</strong> للفواتير والإيصالات والوثائق الشخصية لتسهيل أرشفتها وإدارتها.</div>
                    </li>
                </ul>
            </section>

            <!-- 5. جدول المقارنة -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">📊 مقارنة: أداة دمج PDF من Smart Image Converter مقابل المواقع التقليدية</h2>
                
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; background: var(--bg-primary); border-radius: 12px; overflow: hidden;">
                        <thead>
                            <tr style="background: var(--color-primary); color: white;">
                                <th style="padding: 12px; text-align: center;">الميزة</th>
                                <th style="padding: 12px; text-align: center;">Smart Image Converter</th>
                                <th style="padding: 12px; text-align: center;">المواقع التقليدية</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🔒 خصوصية الملفات</td><td style="padding: 10px;">✅ معالجة محلية - لا ترفع للخادم</td><td style="padding: 10px;">❌ يتم رفع الملفات للخادم</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">💰 التكلفة</td><td style="padding: 10px;">✅ مجاني بالكامل</td><td style="padding: 10px;">⚠️ مجاني محدود أو اشتراكات</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">⚡ سرعة الدمج</td><td style="padding: 10px;">✅ فورية - بدون انتظار</td><td style="padding: 10px;">⚠️ تعتمد على سرعة الإنترنت</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">📱 العمل دون إنترنت</td><td style="padding: 10px;">✅ يعمل بعد تحميل الصفحة</td><td style="padding: 10px;">❌ يتطلب اتصالاً دائماً</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">📄 عدد الملفات للدمج</td><td style="padding: 10px;">✅ حتى 20 ملفاً</td><td style="padding: 10px;">⚠️ غالباً 5-10 ملفات فقط</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🛡️ الإعلانات</td><td style="padding: 10px;">✅ بدون إعلانات مزعجة</td><td style="padding: 10px;">❌ إعلانات ونوافذ منبثقة</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 6. قسم الأسئلة الشائعة FAQ -->
            <section class="faq-section" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">❓ الأسئلة الشائعة حول دمج ملفات PDF</h2>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني دمج ملفات PDF مختلفة الأحجام؟</h3><p>نعم، يمكنك <strong>دمج ملفات PDF</strong> بأحجام مختلفة. الحد الأقصى لكل ملف هو 50 ميجابايت، ويمكنك دمج ما يصل إلى 20 ملفاً في المرة الواحدة.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني ترتيب ترتيب الصفحات قبل الدمج؟</h3><p>يمكنك ترتيب ترتيب الملفات عن طريق إزالة وإضافة الملفات بالترتيب المطلوب. يمكنك أيضاً إزالة أي ملف غير مرغوب فيه قبل عملية الدمج.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يؤثر دمج PDF على جودة الملفات الأصلية؟</h3><p>لا، <strong>دمج ملفات PDF</strong> يحافظ على الجودة الأصلية لكل صفحة. يتم دمج الصفحات كما هي دون أي ضغط أو فقدان للجودة.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني دمج ملفات PDF محمية بكلمة مرور؟</h3><p>للأسف، لا يمكن <strong>دمج ملفات PDF</strong> المحمية بكلمة مرور باستخدام هذه الأداة. يجب إزالة الحماية أولاً باستخدام أداة فك التشفير المتوفرة في موقعنا.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما عدد الملفات التي يمكنني دمجها دفعة واحدة؟</h3><p>يمكنك <strong>دمج ملفات PDF</strong> حتى 20 ملفاً في المرة الواحدة، مع حد أقصى 50 ميجابايت لكل ملف.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل أحتاج إلى اتصال بالإنترنت لاستخدام أداة دمج PDF؟</h3><p>بعد تحميل الصفحة لأول مرة، يمكنك استخدام <strong>أداة دمج PDF</strong> دون اتصال بالإنترنت لأن جميع العمليات تتم محلياً على جهازك.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل أداة دمج PDF مجانية حقاً؟</h3><p>نعم، <strong>دمج PDF</strong> عبر منصتنا مجاني بالكامل ولا توجد أي رسوم خفية أو اشتراكات شهرية.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ كيف تتم المعالجة المحلية عند دمج PDF؟</h3><p>جميع عمليات <strong>دمج PDF</strong> تتم داخل متصفحك باستخدام مكتبة PDF-Lib. لا يتم إرسال ملفاتك إلى أي خادم خارجي، مما يضمن أمان وخصوصية مستنداتك.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل تعمل أداة دمج PDF على الهاتف المحمول؟</h3><p>نعم، <strong>أداة دمج PDF</strong> مصممة لتكون متجاوبة بالكامل وتعمل بشكل ممتاز على جميع الهواتف الذكية والأجهزة اللوحية.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني دمج ملفات PDF من مصادر مختلفة؟</h3><p>نعم، يمكنك <strong>دمج ملفات PDF</strong> من أي مصدر - جهازك المحلي، التخزين السحابي (بعد تحميلها)، أو أي مكان آخر على جهازك.</p></div>
            </section>

            <!-- 7. خاتمة قوية -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px; text-align: center;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">📑 ابدأ في دمج ملفات PDF اليوم مجاناً</h2>
                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                    لا تتعامل مع ملفات PDF المتفرقة بعد الآن. مع <strong>أداة دمج PDF</strong> من Smart Image Converter، يمكنك <strong>دمج ملفات PDF</strong> بسهولة وأمان تام.
                    جميع عمليات الدمج تتم محلياً على جهازك، مما يضمن خصوصية تامة لمستنداتك. جرب الأداة الآن مجاناً واستمتع بتجربة دمج سريعة وآمنة!
                </p>
                <div style="background: var(--bg-primary); border-radius: 12px; padding: 15px; margin-top: 20px;">
                    <p style="margin: 0; color: var(--color-primary); font-weight: bold;">✨ Smart Image Converter - دمج PDF بجودة عالية، بخصوصية تامة، مجاناً ودون قيود ✨</p>
                </div>
            </section>

            <!-- 8. طريقة الاستخدام خطوة بخطوة -->
            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 22px; margin-bottom: 20px;">📖 طريقة استخدام أداة دمج PDF - خطوة بخطوة</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">1</div><strong>اختر ملفات PDF</strong><br><small>اختر ملفات PDF من جهازك</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">2</div><strong>رتب الملفات</strong><br><small>يمكنك إزالة أي ملف غير مرغوب فيه</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">3</div><strong>ابدأ الدمج</strong><br><small>اضغط زر "دمج الملفات الآن"</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">4</div><strong>حمل النتيجة</strong><br><small>احصل على ملف PDF المدمج فوراً</small></div>
                </div>
            </div>
        </div>
    `;

    // ============================================
    // الكود البرمجي الأصلي للأداة (لم يتم التعديل عليه)
    // ============================================

    const pdfInput = container.querySelector('#pdfInput');
    const mergeDropArea = container.querySelector('#mergeDropArea');
    const fileListDiv = container.querySelector('#fileList');
    const fileCountSpan = container.querySelector('#fileCount');
    const clearAllBtn = container.querySelector('#clearAllBtn');
    const mergeBtn = container.querySelector('#mergeActionBtn');
    const statusDiv = container.querySelector('#mergeStatus');

    let pdfFiles = [];
    let isProcessing = false;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function updateFileList() {
        if (pdfFiles.length === 0) {
            fileListDiv.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-muted);">📂 لا توجد ملفات. اختر ملفات PDF لدمجها</div>';
            fileCountSpan.textContent = '0';
            return;
        }
        fileListDiv.innerHTML = '';
        pdfFiles.forEach((file, index) => {
            const div = document.createElement('div');
            div.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid var(--border-color);';
            div.innerHTML = `<div><strong>📄 ${file.name}</strong><br><small>${formatFileSize(file.size)}</small></div><button class="remove-file" data-index="${index}" style="background: var(--color-error); border: none; color: white; padding: 5px 12px; border-radius: 6px; cursor: pointer;">❌ إزالة</button>`;
            fileListDiv.appendChild(div);
        });
        fileCountSpan.textContent = pdfFiles.length;
        document.querySelectorAll('.remove-file').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                pdfFiles.splice(idx, 1);
                updateFileList();
            });
        });
    }

    function setLoading(loading) {
        isProcessing = loading;
        mergeBtn.disabled = loading;
        mergeBtn.textContent = loading ? '⏳ جاري دمج الملفات...' : '📑 دمج الملفات الآن';
    }

    function handleFiles(files) {
        const valid = [];
        for (let f of files) {
            if (f.type !== 'application/pdf') {
                statusDiv.innerHTML = `<span style="color: var(--color-error);">❌ ${f.name} ليس ملف PDF</span>`;
                continue;
            }
            if (f.size > 50 * 1024 * 1024) {
                statusDiv.innerHTML = `<span style="color: var(--color-error);">❌ ${f.name} حجمه كبير جداً (الحد الأقصى 50 ميجابايت)</span>`;
                continue;
            }
            valid.push(f);
        }
        if (valid.length) {
            pdfFiles.push(...valid);
            updateFileList();
            statusDiv.innerHTML = `<span style="color: var(--color-success);">✅ تمت إضافة ${valid.length} ملفات بنجاح</span>`;
            setTimeout(() => statusDiv.innerHTML = '', 2000);
        }
    }

    async function mergePDFs() {
        if (pdfFiles.length < 2) {
            statusDiv.innerHTML = '<span style="color: var(--color-error);">⚠️ اختر ملفين على الأقل لدمجهما</span>';
            return;
        }
        if (isProcessing) return;
        setLoading(true);
        statusDiv.innerHTML = '<span style="color: var(--color-info);">⏳ جاري دمج ملفات PDF...</span>';
        try {
            const mergedPdf = await PDFLib.PDFDocument.create();
            for (let file of pdfFiles) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
                const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                pages.forEach(page => mergedPdf.addPage(page));
            }
            const pdfBytes = await mergedPdf.save({ useObjectStreams: true });
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `merged_${Date.now()}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
            statusDiv.innerHTML = '<span style="color: var(--color-success);">✅ تم دمج PDF بنجاح! تم تحميل الملف تلقائياً.</span>';
        } catch (error) {
            console.error(error);
            statusDiv.innerHTML = '<span style="color: var(--color-error);">❌ حدث خطأ أثناء دمج الملفات</span>';
        } finally {
            setLoading(false);
        }
    }

    function clearAll() {
        pdfFiles = [];
        updateFileList();
        pdfInput.value = '';
        statusDiv.innerHTML = '';
        statusDiv.innerHTML = '<span style="color: var(--color-info);">🧹 تم مسح جميع الملفات</span>';
        setTimeout(() => statusDiv.innerHTML = '', 2000);
    }

    mergeDropArea.addEventListener('click', () => pdfInput.click());
    pdfInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFiles(Array.from(e.target.files));
        pdfInput.value = '';
    });
    mergeDropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        mergeDropArea.classList.add('drag-over');
    });
    mergeDropArea.addEventListener('dragleave', () => {
        mergeDropArea.classList.remove('drag-over');
    });
    mergeDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        mergeDropArea.classList.remove('drag-over');
        if (e.dataTransfer.files.length) handleFiles(Array.from(e.dataTransfer.files));
    });
    mergeBtn.addEventListener('click', mergePDFs);
    clearAllBtn.addEventListener('click', clearAll);

    updateFileList();
    console.log("✅ أداة دمج PDF جاهزة - نسخة محسنة SEO");
};
