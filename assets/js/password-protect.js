// أداة حماية الصور - نسخة محسنة SEO مع محتوى عربي غني

window.initpasswordprotect = function(containerId) {
    console.log("✅ تهيئة أداة حماية الصور");
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (typeof CryptoJS === 'undefined') {
        container.innerHTML = '<div class="tool-container"><p style="color:red">❌ خطأ في تحميل مكتبة التشفير</p></div>';
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
            <h1 style="text-align: center; font-size: 28px; margin-bottom: 15px;">🔒 حماية الصور وتشفيرها - تشفير صورك بتقنية AES-256 العسكرية</h1>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px; font-size: 16px;">✅ تشفير صورك بكلمة مرور قوية - معالجة محلية 100% - مجاني تماماً</p>

            <!-- منطقة رفع الملف -->
            <div class="drag-drop-zone" id="uploadArea" style="margin-bottom: 20px;">
                <div class="drag-icon">🖼️</div>
                <h3>اختر الصورة لحمايتها وتشفيرها</h3>
                <input type="file" id="fileUpload" accept="image/jpeg,image/png,image/gif,image/webp" style="display: none;">
                <small>الحد الأقصى: 50MB | يدعم JPG, PNG, GIF, WEBP</small>
            </div>

            <div id="fileInfo" style="display: none; background: var(--bg-card); border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div id="fileName"></div>
            </div>

            <div id="previewContainer" style="display: none; text-align: center; margin: 20px 0;">
                <img id="selectionPreview" style="max-width: 100%; max-height: 200px; border-radius: 12px;">
            </div>

            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔑 كلمة المرور لتشفير الصورة</label>
                <input type="password" id="password" placeholder="أدخل كلمة مرور قوية (4 أحرف على الأقل)" style="width: 100%; padding: 12px; border-radius: 8px; background: var(--bg-primary); color: white; border: 1px solid var(--border-color);">
                <div id="passwordStrength" style="margin-top: 8px; font-size: 12px;"></div>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">💡 نصيحة: استخدم كلمة مرور تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز للحصول على حماية أقوى</p>
            </div>

            <button class="btn" id="encryptBtn" style="width:100%; padding: 14px;">🔒 تشفير الصورة وحمايتها</button>
            <div id="status" style="margin-top: 20px; text-align: center;"></div>

            <div id="resultArea" style="display: none; margin-top: 30px; padding: 20px; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--color-success);">
                <div id="encryptionInfo"></div>
                <a href="#" id="downloadLink" class="btn" style="display: inline-block; margin-top: 15px;">📥 تحميل الملف المشفر</a>
            </div>

            <!-- ============================================ -->
            <!-- المحتوى النصي الغني لتحسين السيو (1000+ كلمة) -->
            <!-- ============================================ -->

            <!-- 1. قسم شرح شامل -->
            <section class="seo-block" style="margin-top: 50px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">ما هي أداة حماية الصور وتشفيرها من Smart Image Converter؟</h2>
                
                <p>في عصر الرقمنة والاعتماد المتزايد على التخزين السحابي ومشاركة الملفات عبر الإنترنت، أصبحت <strong>حماية الصور</strong> و<strong>تشفير الصور</strong> ضرورة ملحة لحماية خصوصيتك وأمانك الرقمي. <strong>أداة حماية الصور</strong> من Smart Image Converter توفر لك طريقة سهلة وآمنة تماماً <strong>لتشفير صورك</strong> وحمايتها بكلمة مرور قوية باستخدام تقنية التشفير العسكرية AES-256، وهي نفس التقنية المستخدمة من قبل الحكومات والبنوك حول العالم لحماية المعلومات فائقة الحساسية.</p>
                
                <p>ما يميز <strong>أداة حماية الصور وتشفيرها</strong> لدينا هو أنها تعمل <strong>محلياً 100%</strong> على جهازك - لا يتم رفع صورك إلى أي خادم خارجي، مما يعني أن كلمة المرور والصور المشفرة تبقى خاصة بك تماماً. لا أحد يستطيع الوصول إلى محتواها بدون كلمة المرور التي أنت فقط من يعرفها. هذا يضمن أقصى درجات الخصوصية والأمان لصورك الشخصية أو التجارية أو الحساسة.</p>
                
                <p><strong>تشفير الصور</strong> هو عملية تحويل الصورة الأصلية إلى شكل مشفر غير قابل للقراءة من قبل أي شخص لا يملك مفتاح فك التشفير (كلمة المرور). عند استخدام <strong>أداة حماية الصور</strong> لدينا، يتم تحويل صورتك إلى ملف مشفر بصيغة خاصة (.enc) لا يمكن لأي برنامج عادي فتحه. لفك التشفير واستعادة الصورة الأصلية، يحتاج المستخدم إلى استخدام أداة فك التشفير المتوفرة في منصتنا وإدخال كلمة المرور الصحيحة.</p>
                
                <p>تقنية AES-256 (Advanced Encryption Standard) هي معيار التشفير المتقدم الذي اعتمدته الحكومة الأمريكية لحماية المعلومات السرية للغاية. تعتبر هذه التقنية غير قابلة للاختراق عملياً، حيث أن محاولة فك التشفير بالقوة الغاشمة (تجربة جميع الاحتمالات) ستستغرق ملايين السنين حتى مع أسرع أجهزة الكمبيوتر في العالم. هذا يعني أن <strong>حماية الصور</strong> بكلمة مرور عبر أداتنا توفر لك أماناً عسكرياً حقيقياً.</p>
            </section>

            <!-- 2. قسم: لماذا تحتاج إلى حماية الصور؟ -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">لماذا تحتاج إلى حماية الصور وتشفيرها؟ 5 أسباب مهمة</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>حماية الخصوصية الشخصية:</strong> الصور الشخصية، خاصة صور العائلة والأطفال والوثائق الشخصية، تحتاج إلى حماية إضافية. <strong>حماية الصور</strong> بكلمة مرور تمنع وصول أي شخص غير مصرح له إلى هذه الصور الحساسة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>أمان الملفات التجارية والسرية:</strong> إذا كنت مصمماً أو صاحب عمل، فإن صور المنتجات والتصاميم الحصرية والعقود الممسوحة ضوئياً تحتاج إلى <strong>تشفير الصور</strong> لمنع سرقتها أو استخدامها بدون إذن.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>الأمان أثناء التخزين السحابي:</strong> عند تخزين صورك في السحابة (Google Drive، Dropbox، iCloud)، فإن <strong>تشفير الصور</strong> مسبقاً يضمن أن حتى مزود الخدمة لا يستطيع الوصول إلى محتواها.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>الحماية أثناء مشاركة الملفات:</strong> عند إرسال الصور عبر البريد الإلكتروني أو تطبيقات المراسلة، <strong>حماية الصور</strong> بكلمة مرور تضمن أن المستلم فقط (الذي يعرف كلمة المرور) يمكنه فتحها.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>الامتثال للوائح الخصوصية:</strong> بعض الصناعات تتطلب تشفير البيانات الحساسة للامتثال للوائح مثل HIPAA للرعاية الصحية أو GDPR في أوروبا.</li>
                </ul>
            </section>

            <!-- 3. قسم مميزات الأداة -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">مميزات أداة حماية الصور وتشفيرها من Smart Image Converter</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>تشفير عسكري AES-256:</strong> نستخدم أقوى خوارزمية تشفير في العالم، نفس التقنية التي تستخدمها الحكومات والجيوش لحماية أسرارها.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>معالجة محلية 100%:</strong> صورك وكلمة المرور لا تغادر جهازك أبداً - خصوصية تامة وأمان كامل.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>مجاني بالكامل:</strong> بدون اشتراكات، بدون حدود لعدد الصور، بدون إعلانات مزعجة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يدعم جميع صيغ الصور:</strong> JPG, PNG, GIF, WEBP - يمكنك <strong>تشفير الصور</strong> مهما كانت صيغتها الأصلية.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>تحليل قوة كلمة المرور:</strong> الأداة تحلل قوة كلمة المرور التي أدخلتها وتخبرك إذا كانت ضعيفة أم متوسطة أم قوية.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>معاينة الصورة قبل التشفير:</strong> يمكنك رؤية الصورة التي ستقوم <strong>بحمايتها</strong> قبل البدء في عملية التشفير.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يعمل على جميع الأجهزة:</strong> الحاسوب، الهاتف الذكي، الجهاز اللوحي - واجهة متجاوبة وسهلة الاستخدام.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يعمل دون اتصال بالإنترنت:</strong> بعد تحميل الصفحة لأول مرة، يمكنك <strong>تشفير الصور</strong> حتى بدون إنترنت.</li>
                </ul>
            </section>

            <!-- 4. قسم حالات الاستخدام العملية -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">متى تحتاج إلى حماية الصور وتشفيرها؟ حالات استخدام عملية</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">1</div>
                        <div><strong>📸 للصور الشخصية الحساسة:</strong> <strong>تشفير الصور</strong> العائلية، صور الهوية، المستندات الشخصية الممسوحة ضوئياً لحمايتها من الوصول غير المصرح به.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">2</div>
                        <div><strong>🎨 للمصممين والفنانين:</strong> <strong>حماية الصور</strong> الخاصة بالتصاميم الحصرية والأعمال الفنية الأصلية قبل مشاركتها مع العملاء أو نشرها عبر الإنترنت.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">3</div>
                        <div><strong>🏢 للشركات والمؤسسات:</strong> <strong>تشفير الصور</strong> التي تحتوي على معلومات حساسة مثل العقود الموقعة، الفواتير، أو صور المنتجات قبل إطلاقها رسمياً.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">4</div>
                        <div><strong>🏥 للمجال الطبي:</strong> <strong>حماية الصور</strong> الطبية والأشعة والوصفات الطبية للامتثال لمعايير الخصوصية الطبية مثل HIPAA.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">5</div>
                        <div><strong>🔐 للاستخدام الشخصي العام:</strong> عند إرسال صور خاصة عبر البريد الإلكتروني أو تطبيقات المراسلة، تأكد من <strong>تشفير الصور</strong> أولاً لضمان وصولها فقط للشخص المقصود.</div>
                    </li>
                </ul>
            </section>

            <!-- 5. جدول المقارنة -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">📊 مقارنة: أداة حماية الصور من Smart Image Converter مقابل المواقع التقليدية</h2>
                
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
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🔒 تقنية التشفير</td><td style="padding: 10px;">✅ AES-256 (عسكري)</td><td style="padding: 10px;">⚠️ تشفير ضعيف أو غير موجود</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🛡️ خصوصية الصور</td><td style="padding: 10px;">✅ معالجة محلية - لا ترفع للخادم</td><td style="padding: 10px;">❌ يتم رفع الصور للخادم</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">💰 التكلفة</td><td style="padding: 10px;">✅ مجاني بالكامل</td><td style="padding: 10px;">⚠️ مجاني محدود أو اشتراكات</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">📱 العمل دون إنترنت</td><td style="padding: 10px;">✅ يعمل بعد تحميل الصفحة</td><td style="padding: 10px;">❌ يتطلب اتصالاً دائماً</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">📊 تحليل قوة كلمة المرور</td><td style="padding: 10px;">✅ موجود</td><td style="padding: 10px;">❌ غير موجود</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🖼️ معاينة قبل التشفير</td><td style="padding: 10px;">✅ موجودة</td><td style="padding: 10px;">❌ غير موجودة</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 6. قسم الأسئلة الشائعة FAQ -->
            <section class="faq-section" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">❓ الأسئلة الشائعة حول حماية الصور وتشفيرها</h2>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما هي تقنية AES-256 المستخدمة في تشفير الصور؟</h3><p>AES-256 هي أقوى خوارزمية تشفير في العالم، تستخدمها الحكومات والبنوك والجيوش لحماية أسرارها. تعني أن مفتاح التشفير بطول 256 بت، مما يجعل فك التشفير بالقوة الغاشمة مستحيلاً عملياً - حتى أسرع حاسوب في العالم سيحتاج إلى ملايين السنين لتجربة جميع الاحتمالات.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ كيف يمكنني فك تشفير الصورة المشفرة؟</h3><p>لفك تشفير الصورة، تحتاج إلى استخدام أداة "فك التشفير" المتوفرة في منصتنا (نفس الموقع). اختر الملف المشفر (.enc)، أدخل نفس كلمة المرور التي استخدمتها في التشفير، وستستعيد الصورة الأصلية فوراً.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكن استعادة الصورة بدون كلمة المرور؟</h3><p>لا، هذا هو مبدأ التشفير القوي. بدون كلمة المرور الصحيحة، من المستحيل رياضياً استعادة الصورة الأصلية. لهذا السبب من المهم جداً حفظ كلمة المرور الخاصة بك في مكان آمن.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل من الآمن رفع صورتي إلى الخادم للتشفير؟</h3><p>مع أداتنا، لا يتم رفع صورك إلى أي خادم خارجي. كل عمليات <strong>تشفير الصور</strong> تتم محلياً داخل متصفحك. هذا يعني أن صورك وكلمة المرور تبقى على جهازك فقط، ولا يمكن لأي جهة خارجية الوصول إليها.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما حجم الصورة الذي يمكنني تشفيره؟</h3><p>الحد الأقصى لحجم الصورة هو 50 ميجابايت. هذا الحد مناسب لمعظم الصور الرقمية ويضمن أداءً جيداً على جميع الأجهزة.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني تشفير عدة صور في وقت واحد؟</h3><p>حالياً، الأداة مصممة <strong>لتشفير صورة واحدة</strong> في كل مرة لضمان أفضل أداء وجودة. يمكنك تشفير صور متعددة بالتتابع - بعد الانتهاء من صورة، قم باختيار صورة جديدة وكرر العملية.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما هي صيغ الصور المدعومة للتشفير؟</h3><p><strong>أداة حماية الصور</strong> تدعم جميع الصيغ الشائعة: JPG, JPEG, PNG, GIF, و WEBP. يمكنك تشفير أي صورة بهذه الصيغ بسهولة وسرعة.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل أحتاج إلى اتصال بالإنترنت لاستخدام الأداة؟</h3><p>لا، بعد تحميل صفحة الأداة لأول مرة، يمكنك استخدامها <strong>لتشفير الصور</strong> دون اتصال بالإنترنت. هذا مفيد جداً في الأماكن ذات الاتصال الضعيف أو عند السفر.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل أحتاج إلى إنشاء حساب لاستخدام الأداة؟</h3><p>لا، <strong>أداة حماية الصور</strong> متاحة للجميع بدون تسجيل أو إنشاء حساب. فقط افتح الصفحة وابدأ فوراً في تشفير صورك دون أي تعقيدات.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني استخدام الأداة لحماية صوري التجارية؟</h3><p>نعم، يمكنك استخدام <strong>أداة تشفير الصور</strong> لأغراض تجارية مثل حماية تصاميم المنتجات، الصور الحصرية، أو أي محتوى تجاري تريد حمايته من السرقة أو الاستخدام غير المصرح به.</p></div>
            </section>

            <!-- 7. خاتمة قوية -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px; text-align: center;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">🛡️ ابدأ في حماية وتشفير صورك اليوم مجاناً</h2>
                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                    لا تترك صورك الحساسة عرضة للاختراق أو الوصول غير المصرح به. مع <strong>أداة حماية الصور وتشفيرها</strong> من Smart Image Converter، يمكنك <strong>تشفير صورك</strong> وحمايتها بكلمة مرور قوية باستخدام تقنية AES-256 العسكرية.
                    جميع عمليات التشفير تتم محلياً على جهازك، مما يضمن خصوصية تامة وأمان كامل. جرب الأداة الآن مجاناً وتمتع براحة البال!
                </p>
                <div style="background: var(--bg-primary); border-radius: 12px; padding: 15px; margin-top: 20px;">
                    <p style="margin: 0; color: var(--color-primary); font-weight: bold;">✨ Smart Image Converter - حماية وتشفير الصور بمعايير عسكرية، مجاناً وبخصوصية تامة ✨</p>
                </div>
            </section>

            <!-- 8. طريقة الاستخدام خطوة بخطوة -->
            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 22px; margin-bottom: 20px;">📖 طريقة استخدام أداة حماية الصور وتشفيرها - خطوة بخطوة</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">1</div><strong>اختر الصورة</strong><br><small>اسحب الصورة أو اضغط للاختيار</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">2</div><strong>أدخل كلمة المرور</strong><br><small>استخدم كلمة مرور قوية (4+ أحرف)</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">3</div><strong>راجع قوة كلمة المرور</strong><br><small>تأكد من أن كلمة المرور قوية</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">4</div><strong>ابدأ التشفير</strong><br><small>اضغط زر "تشفير الصورة وحمايتها"</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">5</div><strong>حمل الملف المشفر</strong><br><small>احصل على ملف .enc المشفر</small></div>
                </div>
                <p style="margin-top: 20px; padding: 12px; background: var(--bg-primary); border-radius: 8px; text-align: center; font-size: 14px;">
                    ⚠️ <strong>تنبيه مهم:</strong> احفظ كلمة المرور الخاصة بك في مكان آمن! بدون كلمة المرور، لا يمكن استعادة الصورة الأصلية.
                </p>
            </div>
        </div>
    `;

    // الكود البرمجي الأصلي للأداة (لم يتم التعديل عليه)
    const uploadArea = container.querySelector('#uploadArea');
    const fileInput = container.querySelector('#fileUpload');
    const fileInfo = container.querySelector('#fileInfo');
    const fileNameSpan = container.querySelector('#fileName');
    const previewContainer = container.querySelector('#previewContainer');
    const previewImage = container.querySelector('#selectionPreview');
    const passwordInput = container.querySelector('#password');
    const strengthText = container.querySelector('#passwordStrength');
    const encryptBtn = container.querySelector('#encryptBtn');
    const statusDiv = container.querySelector('#status');
    const resultArea = container.querySelector('#resultArea');
    const encryptionInfo = container.querySelector('#encryptionInfo');
    const downloadLink = container.querySelector('#downloadLink');

    let selectedImageData = null;
    let selectedFileName = null;
    let selectedFileSize = null;
    let isProcessing = false;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function analyzePassword(pwd) {
        if (!pwd) return { text: '', color: 'var(--text-muted)' };
        let strength = 0;
        if (pwd.length >= 4) strength += 20;
        if (pwd.length >= 6) strength += 20;
        if (pwd.length >= 8) strength += 20;
        if (/[0-9]/.test(pwd)) strength += 15;
        if (/[a-z]/.test(pwd)) strength += 15;
        if (/[A-Z]/.test(pwd)) strength += 10;
        if (/[^a-zA-Z0-9]/.test(pwd)) strength += 10;
        if (strength < 30) return { text: 'ضعيفة', color: 'var(--color-error)' };
        if (strength < 60) return { text: 'متوسطة', color: 'var(--color-warning)' };
        return { text: 'قوية', color: 'var(--color-success)' };
    }

    function updateButton() {
        if (!encryptBtn) return;
        const hasFile = selectedImageData !== null;
        const hasPassword = passwordInput && passwordInput.value && passwordInput.value.length >= 4;
        encryptBtn.disabled = !(hasFile && hasPassword);
        encryptBtn.style.opacity = (hasFile && hasPassword) ? '1' : '0.6';
    }

    function setProcessing(processing) {
        isProcessing = processing;
        if (encryptBtn) {
            encryptBtn.disabled = processing;
            encryptBtn.textContent = processing ? '⏳ جاري التشفير...' : '🔒 تشفير الصورة وحمايتها';
        }
    }

    function showNotification(msg, type) {
        if (window.SmartImageConverter && window.SmartImageConverter.showToast) {
            window.SmartImageConverter.showToast(msg, type);
        }
    }

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            showNotification('❌ اختر صورة صالحة', 'error');
            return;
        }
        if (file.size > 50 * 1024 * 1024) {
            showNotification('❌ حجم الصورة كبير', 'error');
            return;
        }
        selectedFileName = file.name;
        selectedFileSize = file.size;
        fileInfo.style.display = 'block';
        fileNameSpan.innerHTML = `<div><strong>${file.name}</strong><br><small>${formatFileSize(file.size)}</small></div>`;
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImageData = e.target.result;
            previewImage.src = selectedImageData;
            previewContainer.style.display = 'block';
            statusDiv.innerHTML = '';
            updateButton();
            showNotification('✅ تم اختيار الصورة', 'success');
        };
        reader.onerror = () => showNotification('❌ فشل قراءة الصورة', 'error');
        reader.readAsDataURL(file);
    }

    async function encryptImage() {
        if (!selectedImageData) { showNotification('❌ اختر صورة أولاً', 'error'); return; }
        const password = passwordInput?.value?.trim();
        if (!password || password.length < 4) { showNotification('❌ كلمة المرور يجب أن تكون 4 أحرف على الأقل', 'error'); return; }
        if (isProcessing) return;
        setProcessing(true);
        statusDiv.innerHTML = '<span style="color: var(--color-info);">⏳ جاري التشفير...</span>';
        resultArea.style.display = 'none';
        try {
            const encrypted = CryptoJS.AES.encrypt(selectedImageData, password).toString();
            const blob = new Blob([encrypted], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = `protected_${selectedFileName || 'image'}.enc`;
            encryptionInfo.innerHTML = `
                <div style="text-align:right;">
                    <p style="color: var(--color-success);">✅ تم تشفير الصورة بنجاح!</p>
                    <p>📁 حجم الصورة الأصلي: ${(selectedFileSize / 1024).toFixed(2)} KB</p>
                    <p>🔐 حجم الملف المشفر: ${(blob.size / 1024).toFixed(2)} KB</p>
                    <p style="color:#ffc107;">⚠️ احفظ كلمة المرور في مكان آمن - لا يمكن استعادة الصورة بدونها!</p>
                </div>`;
            resultArea.style.display = 'block';
            statusDiv.innerHTML = '';
            showNotification('✅ تم تشفير الصورة بنجاح!', 'success');
        } catch (error) {
            console.error(error);
            statusDiv.innerHTML = '<span style="color: var(--color-error);">❌ فشل التشفير</span>';
            showNotification('❌ فشل التشفير', 'error');
        } finally {
            setProcessing(false);
        }
    }

    uploadArea?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); fileInput.value = ''; });
    uploadArea?.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea?.addEventListener('dragleave', () => { uploadArea.classList.remove('drag-over'); });
    uploadArea?.addEventListener('drop', (e) => { e.preventDefault(); uploadArea.classList.remove('drag-over'); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
    passwordInput?.addEventListener('input', () => {
        const analysis = analyzePassword(passwordInput.value);
        strengthText.textContent = analysis.text;
        strengthText.style.color = analysis.color;
        updateButton();
    });
    encryptBtn?.addEventListener('click', encryptImage);
    updateButton();
    console.log("✅ أداة حماية الصور جاهزة - نسخة محسنة SEO");
};
