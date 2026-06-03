// أداة فك تشفير الصور - نسخة محسنة SEO مع محتوى عربي غني

window.initdecrypt = function(containerId) {
    console.log("✅ تهيئة أداة فك التشفير");
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
            <h1 style="text-align: center; font-size: 28px; margin-bottom: 15px;">🔓 فك تشفير الصور - استعادة الصور الأصلية من الملفات المشفرة</h1>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px; font-size: 16px;">✅ استعد الصورة الأصلية باستخدام كلمة المرور الصحيحة - معالجة محلية 100% - مجاني تماماً</p>

            <!-- منطقة رفع الملف المشفر -->
            <div class="drag-drop-zone" id="decryptUploadArea" style="margin-bottom: 20px;">
                <div class="drag-icon">🔐</div>
                <h3>اختر الملف المشفر (.enc) لاستعادة الصورة</h3>
                <input type="file" id="fileUpload" accept=".enc" style="display: none;">
                <small>يدعم ملفات .enc المشفرة بتقنية AES-256 | الحد الأقصى: 50MB</small>
            </div>

            <div id="fileInfo" style="display: none; background: var(--bg-card); border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div id="fileName"></div>
            </div>

            <!-- حقل إدخال كلمة المرور -->
            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔑 كلمة المرور (نفس كلمة التشفير)</label>
                <input type="password" id="passwordInput" placeholder="أدخل كلمة المرور التي استخدمتها لتشفير الصورة" style="width: 100%; padding: 12px; border-radius: 8px; background: var(--bg-primary); color: white; border: 1px solid var(--border-color);">
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">💡 أدخل نفس كلمة المرور التي استخدمتها عند تشفير الصورة</p>
            </div>

            <div id="errorMessage" style="display: none; margin: 15px 0; padding: 12px; background: rgba(239,68,68,0.2); border-radius: 8px;">
                <span id="errorText" style="color: var(--color-error);"></span>
            </div>

            <button class="btn" id="decryptBtn" style="width:100%; padding: 14px;">🔓 فك تشفير الصورة واستعادتها</button>
            <div id="decryptStatus" style="margin-top: 20px; text-align: center;"></div>

            <!-- منطقة عرض النتيجة -->
            <div id="resultArea" style="display: none; margin-top: 30px;">
                <div id="previewCard" style="background: var(--bg-card); border-radius: 12px; padding: 20px; text-align: center;">
                    <h3 style="margin-bottom: 15px;">🖼️ الصورة المستعادة</h3>
                    <img id="decryptedImage" style="max-width: 100%; max-height: 300px; border-radius: 12px; margin-bottom: 15px;">
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button id="downloadBtn" class="btn">📥 تحميل الصورة المستعادة</button>
                        <button id="clearResult" class="btn btn-secondary">🗑️ مسح</button>
                    </div>
                </div>
            </div>

            <!-- ============================================ -->
            <!-- المحتوى النصي الغني لتحسين السيو (1000+ كلمة) -->
            <!-- ============================================ -->

            <!-- 1. قسم شرح شامل -->
            <section class="seo-block" style="margin-top: 50px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">ما هي أداة فك تشفير الصور من Smart Image Converter؟</h2>
                
                <p><strong>أداة فك تشفير الصور</strong> من Smart Image Converter هي الخدمة المثالية لاستعادة الصور الأصلية من الملفات المشفرة (.enc). إذا كنت قد استخدمت <strong>أداة حماية الصور</strong> لدينا لتشفير صورك الحساسة، فإن هذه الأداة تمكنك من فك التشفير واستعادة الصورة الأصلية بكل سهولة وأمان، وذلك باستخدام كلمة المرور الصحيحة التي حددتها أثناء عملية التشفير.</p>
                
                <p><strong>فك تشفير الصور</strong> هو عملية تحويل الملف المشفر (.enc) إلى الصورة الأصلية القابلة للعرض. هذه العملية تتطلب معرفة كلمة المرور الصحيحة التي استخدمت أثناء التشفير. تستخدم أداتنا تقنية التشفير العسكرية AES-256، وهي نفس التقنية المستخدمة من قبل الحكومات والبنوك لحماية المعلومات فائقة الحساسية. بدون كلمة المرور الصحيحة، من المستحيل رياضياً استعادة الصورة الأصلية.</p>
                
                <p>ما يميز <strong>أداة فك تشفير الصور</strong> لدينا هو أنها تعمل <strong>محلياً 100%</strong> على جهازك - لا يتم رفع الملف المشفر إلى أي خادم خارجي، ولا يتم إرسال كلمة المرور عبر الإنترنت. كل عمليات فك التشفير تتم داخل متصفحك، مما يضمن أقصى درجات الخصوصية والأمان. هذا يعني أن كلمة المرور الخاصة بك تبقى خاصة بك تماماً، ولا يمكن لأي جهة خارجية اعتراضها أو الاطلاع على محتوى صورك.</p>
                
                <p>عملية <strong>فك تشفير الصور</strong> بسيطة وسريعة: اختر الملف المشفر (.enc)، أدخل كلمة المرور الصحيحة، ثم اضغط على زر فك التشفير. خلال ثوانٍ قليلة، ستظهر الصورة الأصلية ويمكنك تحميلها مباشرة إلى جهازك. الأداة متاحة مجاناً بالكامل، بدون أي قيود على عدد الملفات، وبدون إعلانات مزعجة.</p>
            </section>

            <!-- 2. قسم: لماذا تحتاج إلى فك تشفير الصور؟ -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">لماذا تحتاج إلى أداة فك تشفير الصور؟ 5 أسباب مهمة</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>استعادة الصور الشخصية الحساسة:</strong> بعد تشفير صورك الشخصية لحمايتها، تحتاج إلى <strong>فك تشفير الصور</strong> لعرضها مرة أخرى. أداتنا تمكنك من استعادة صورك الأصلية بسهولة وأمان.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>الوصول إلى المستندات والتصاميم المشفرة:</strong> إذا كنت تستخدم التشفير لحماية مستندات العمل أو التصاميم الحصرية، فإن <strong>فك التشفير</strong> يسمح لك بالوصول إلى هذه الملفات عند الحاجة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>استلام ملفات مشفرة من الآخرين:</strong> إذا أرسل لك شخص ملفاً مشفراً عبر البريد الإلكتروني أو تطبيقات المراسلة، تحتاج إلى <strong>أداة فك تشفير</strong> موثوقة لاستعادة المحتوى الأصلي.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>إدارة أرشيف الصور المشفرة:</strong> إذا كنت تدير أرشيفاً رقمياً كبيراً من الصور المشفرة، فإن <strong>فك تشفير الصور</strong> يسمح لك بالوصول إلى هذه الصور عند الحاجة دون تعقيدات.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>التحقق من سلامة التشفير:</strong> يمكنك استخدام أداة <strong>فك التشفير</strong> للتحقق من أن عملية التشفير تمت بنجاح وأن الصورة المشفرة يمكن استعادتها بشكل صحيح.</li>
                </ul>
            </section>

            <!-- 3. قسم مميزات الأداة -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">مميزات أداة فك تشفير الصور من Smart Image Converter</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>معالجة محلية 100%:</strong> الملفات المشفرة وكلمة المرور لا تغادر جهازك أبداً - خصوصية تامة وأمان كامل.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>متوافق مع تشفير AES-256:</strong> يدعم فك تشفير الملفات المشفرة بتقنية AES-256 العسكرية من أداة حماية الصور لدينا.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>واجهة بسيطة وسهلة:</strong>只需 خطوات بسيطة: اختر الملف، أدخل كلمة المرور، اضغط فك التشفير.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>معاينة فورية:</strong> بعد فك التشفير، يمكنك معاينة الصورة المستعادة قبل تحميلها.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>تحميل مباشر:</strong> يمكنك تحميل الصورة المستعادة مباشرة إلى جهازك بنقرة واحدة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>مجاني بالكامل:</strong> بدون اشتراكات، بدون حدود لعدد الملفات، بدون إعلانات مزعجة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يعمل على جميع الأجهزة:</strong> الحاسوب، الهاتف الذكي، الجهاز اللوحي - واجهة متجاوبة وسهلة الاستخدام.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يعمل دون اتصال بالإنترنت:</strong> بعد تحميل الصفحة لأول مرة، يمكنك <strong>فك تشفير الصور</strong> حتى بدون إنترنت.</li>
                </ul>
            </section>

            <!-- 4. قسم حالات الاستخدام العملية -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">متى تحتاج إلى فك تشفير الصور؟ حالات استخدام عملية</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">1</div>
                        <div><strong>📸 لاستعادة الصور الشخصية المشفرة:</strong> بعد تشفير صور العائلة أو الصور الشخصية الحساسة، تحتاج إلى <strong>فك تشفير الصور</strong> لعرضها أو مشاركتها مع الأشخاص الموثوقين.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">2</div>
                        <div><strong>💼 لاستعادة المستندات والتصاميم المشفرة:</strong> إذا كنت مصمماً أو محامياً أو طبيباً، فإن <strong>فك التشفير</strong> يسمح لك بالوصول إلى المستندات الحساسة بعد تشفيرها.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">3</div>
                        <div><strong>📧 لفتح الملفات المشفرة المستلمة:</strong> عندما يرسل لك شخص ملفاً مشفراً عبر البريد الإلكتروني أو WhatsApp، يمكنك <strong>فك تشفير الصور</strong> بسهولة لعرض المحتوى.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">4</div>
                        <div><strong>🗄️ لإدارة الأرشيف المشفر:</strong> إذا كنت تدير مكتبة رقمية من الصور المشفرة، فإن <strong>أداة فك التشفير</strong> تمكنك من الوصول إلى هذه الصور بشكل انتقائي عند الحاجة.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">5</div>
                        <div><strong>🔐 للتحقق من سلامة التشفير:</strong> يمكنك <strong>فك تشفير الصور</strong> للتأكد من أن عملية التشفير تمت بنجاح وأنه يمكن استعادة الصورة الأصلية بشكل صحيح.</div>
                    </li>
                </ul>
            </section>

            <!-- 5. جدول المقارنة -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">📊 مقارنة: أداة فك تشفير الصور من Smart Image Converter مقابل المواقع التقليدية</h2>
                
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
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🔑 أمان كلمة المرور</td><td style="padding: 10px;">✅ لا تغادر جهازك أبداً</td><td style="padding: 10px;">❌ تُرسل إلى الخادم</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">💰 التكلفة</td><td style="padding: 10px;">✅ مجاني بالكامل</td><td style="padding: 10px;">⚠️ مجاني محدود أو اشتراكات</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">📱 العمل دون إنترنت</td><td style="padding: 10px;">✅ يعمل بعد تحميل الصفحة</td><td style="padding: 10px;">❌ يتطلب اتصالاً دائماً</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🖼️ معاينة قبل التحميل</td><td style="padding: 10px;">✅ معاينة فورية</td><td style="padding: 10px;">❌ غير موجودة</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">⚡ سرعة المعالجة</td><td style="padding: 10px;">✅ فورية - على جهازك</td><td style="padding: 10px;">⚠️ تعتمد على سرعة الإنترنت</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 6. قسم الأسئلة الشائعة FAQ -->
            <section class="faq-section" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">❓ الأسئلة الشائعة حول فك تشفير الصور</h2>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ماذا لو نسيت كلمة المرور؟</h3><p>للأسف، إذا نسيت كلمة المرور، لا يمكن استعادة الصورة الأصلية. هذا هو مبدأ التشفير القوي - بدون كلمة المرور الصحيحة، من المستحيل رياضياً فك التشفير. لهذا السبب ننصحك بحفظ كلمات المرور الخاصة بك في مكان آمن.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما هي صيغة الملفات التي تدعمها أداة فك التشفير؟</h3><p>أداة <strong>فك تشفير الصور</strong> تدعم ملفات .enc المشفرة بتقنية AES-256، وهي نفس الصيغة التي تنتجها أداة حماية الصور في منصتنا.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني فك تشفير ملفات من مصادر أخرى؟</h3><p>أداتنا متوافقة مع ملفات .enc المشفرة باستخدام مكتبة CryptoJS بتقنية AES-256. إذا تم تشفير الملف باستخدام نفس المعايير، فيمكن فك تشفيره بنجاح.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل أحتاج إلى اتصال بالإنترنت لاستخدام الأداة؟</h3><p>لا، بعد تحميل صفحة الأداة لأول مرة، يمكنك استخدامها <strong>لفك تشفير الصور</strong> دون اتصال بالإنترنت. هذا مفيد جداً عند السفر أو في المناطق ذات الاتصال الضعيف.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل صورتي آمنة أثناء عملية فك التشفير؟</h3><p>نعم، لأن جميع عمليات <strong>فك تشفير الصور</strong> تتم محلياً على جهازك. الملف المشفر وكلمة المرور لا يغادران جهازك أبداً، ولا يتم تخزين أي نسخة من الصورة المستعادة على خوادمنا.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما حجم الملف الذي يمكنني فك تشفيره؟</h3><p>الحد الأقصى لحجم الملف المشفر هو 50 ميجابايت. هذا الحد مناسب لمعظم الصور الرقمية ويضمن أداءً جيداً على جميع الأجهزة.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني فك تشفير عدة ملفات في وقت واحد؟</h3><p>حالياً، الأداة مصممة <strong>لفك تشفير ملف واحد</strong> في كل مرة لضمان أفضل أداء وجودة. يمكنك معالجة ملفات متعددة بالتتابع.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ماذا يحدث إذا أدخلت كلمة مرور خاطئة؟</h3><p>إذا أدخلت كلمة مرور خاطئة، ستظهر رسالة خطأ ولن تتم عملية فك التشفير. تأكد من إدخال نفس كلمة المرور التي استخدمتها في التشفير.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل أحتاج إلى إنشاء حساب لاستخدام الأداة؟</h3><p>لا، <strong>أداة فك تشفير الصور</strong> متاحة للجميع بدون تسجيل أو إنشاء حساب. فقط افتح الصفحة وابدأ فوراً في فك تشفير ملفاتك.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكن استخدام الأداة لفك تشفير ملفات غير الصور؟</h3><p>أداتنا مصممة خصيصاً <strong>لفك تشفير الصور</strong>. قد تعمل مع أنواع أخرى من الملفات، ولكن النتيجة مضمونة للصور فقط.</p></div>
            </section>

            <!-- 7. خاتمة قوية -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px; text-align: center;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">🔓 ابدأ في فك تشفير صورك اليوم مجاناً</h2>
                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                    هل لديك ملفات صور مشفرة وتريد استعادة الصور الأصلية؟ مع <strong>أداة فك تشفير الصور</strong> من Smart Image Converter، يمكنك <strong>فك تشفير الصور</strong> واستعادتها بكل سهولة وأمان.
                    جميع عمليات فك التشفير تتم محلياً على جهازك، مما يضمن خصوصية تامة لكلمة المرور والصور. جرب الأداة الآن مجاناً واستعد صورك الأصلية في ثوانٍ!
                </p>
                <div style="background: var(--bg-primary); border-radius: 12px; padding: 15px; margin-top: 20px;">
                    <p style="margin: 0; color: var(--color-primary); font-weight: bold;">✨ Smart Image Converter - فك تشفير الصور بمعايير عسكرية، مجاناً وبخصوصية تامة ✨</p>
                </div>
            </section>

            <!-- 8. طريقة الاستخدام خطوة بخطوة -->
            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 22px; margin-bottom: 20px;">📖 طريقة استخدام أداة فك تشفير الصور - خطوة بخطوة</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">1</div><strong>اختر الملف المشفر</strong><br><small>ملف .enc من جهازك</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">2</div><strong>أدخل كلمة المرور</strong><br><small>نفس كلمة التشفير</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">3</div><strong>ابدأ فك التشفير</strong><br><small>اضغط زر "فك تشفير الصورة"</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">4</div><strong>معاينة النتيجة</strong><br><small>تأكد من الصورة المستعادة</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">5</div><strong>حمل الصورة</strong><br><small>احصل على الصورة الأصلية</small></div>
                </div>
                <p style="margin-top: 20px; padding: 12px; background: var(--bg-primary); border-radius: 8px; text-align: center; font-size: 14px;">
                    ⚠️ <strong>تنبيه مهم:</strong> تأكد من إدخال نفس كلمة المرور التي استخدمتها عند تشفير الصورة. كلمة المرور غير صحيحة = لا يمكن استعادة الصورة.
                </p>
            </div>
        </div>
    `;

    // ============================================
    // الكود البرمجي الأصلي للأداة (لم يتم التعديل عليه)
    // ============================================

    const uploadArea = container.querySelector('#decryptUploadArea');
    const fileInput = container.querySelector('#fileUpload');
    const fileInfo = container.querySelector('#fileInfo');
    const fileNameSpan = container.querySelector('#fileName');
    const passwordInput = container.querySelector('#passwordInput');
    const errorMsg = container.querySelector('#errorMessage');
    const errorText = container.querySelector('#errorText');
    const decryptBtn = container.querySelector('#decryptBtn');
    const statusDiv = container.querySelector('#decryptStatus');
    const resultArea = container.querySelector('#resultArea');
    const decryptedImage = container.querySelector('#decryptedImage');
    const downloadBtn = container.querySelector('#downloadBtn');
    const clearResultBtn = container.querySelector('#clearResult');

    let selectedFile = null;
    let isProcessing = false;
    let currentImageData = null;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function showNotification(msg, type) {
        if (window.SmartImageConverter && window.SmartImageConverter.showToast) {
            window.SmartImageConverter.showToast(msg, type);
        }
    }

    function hideError() { if (errorMsg) errorMsg.style.display = 'none'; }
    function showError(msg) { if (errorMsg && errorText) { errorText.textContent = msg; errorMsg.style.display = 'block'; } }

    function updateButton() {
        if (!decryptBtn) return;
        const hasFile = selectedFile !== null;
        const hasPassword = passwordInput && passwordInput.value && passwordInput.value.length >= 4;
        decryptBtn.disabled = !(hasFile && hasPassword);
        decryptBtn.style.opacity = (hasFile && hasPassword) ? '1' : '0.6';
    }

    function setProcessing(processing) {
        isProcessing = processing;
        if (decryptBtn) {
            decryptBtn.disabled = processing;
            decryptBtn.textContent = processing ? '⏳ جاري فك التشفير...' : '🔓 فك تشفير الصورة واستعادتها';
        }
    }

    function clearResults() {
        if (decryptedImage) decryptedImage.src = '';
        resultArea.style.display = 'none';
        fileInfo.style.display = 'none';
        errorMsg.style.display = 'none';
        if (passwordInput) passwordInput.value = '';
        currentImageData = null;
        selectedFile = null;
        if (fileInput) fileInput.value = '';
        updateButton();
        showNotification('🧹 تم المسح', 'info');
    }

    function handleFile(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.enc')) {
            showError('❌ يجب أن يكون الملف بامتداد .enc (ملف مشفر)');
            if (fileInput) fileInput.value = '';
            return;
        }
        selectedFile = file;
        fileInfo.style.display = 'block';
        fileNameSpan.innerHTML = `<div>🔐 <strong>${file.name}</strong><br><small>${formatFileSize(file.size)}</small></div>`;
        hideError();
        updateButton();
        showNotification('✅ تم اختيار الملف المشفر', 'success');
    }

    async function decryptFile() {
        if (!selectedFile) { showError('❌ اختر ملفاً مشفراً أولاً'); return; }
        const password = passwordInput?.value;
        if (!password || password.length < 4) { showError('❌ كلمة المرور يجب أن تكون 4 أحرف على الأقل'); return; }
        if (isProcessing) return;
        setProcessing(true);
        hideError();
        statusDiv.innerHTML = '<span style="color: var(--color-info);">⏳ جاري فك التشفير...</span>';
        try {
            const encryptedText = await selectedFile.text();
            const decrypted = CryptoJS.AES.decrypt(encryptedText, password);
            const base64Image = decrypted.toString(CryptoJS.enc.Utf8);
            if (!base64Image || !base64Image.startsWith('data:image')) {
                throw new Error('كلمة المرور غير صحيحة أو الملف تالف');
            }
            currentImageData = base64Image;
            decryptedImage.src = base64Image;
            resultArea.style.display = 'block';
            statusDiv.innerHTML = '';
            showNotification('✅ تم فك التشفير بنجاح!', 'success');
        } catch (error) {
            console.error(error);
            showError('❌ فشل فك التشفير - كلمة المرور غير صحيحة');
            statusDiv.innerHTML = '';
        } finally {
            setProcessing(false);
        }
    }

    function downloadImage() {
        if (currentImageData) {
            const link = document.createElement('a');
            link.href = currentImageData;
            link.download = `decrypted_${Date.now()}.png`;
            link.click();
            showNotification('📥 جاري تحميل الصورة المستعادة', 'info');
        }
    }

    uploadArea?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); fileInput.value = ''; });
    passwordInput?.addEventListener('input', () => { hideError(); updateButton(); });
    passwordInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') decryptFile(); });
    uploadArea?.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea?.addEventListener('dragleave', () => { uploadArea.classList.remove('drag-over'); });
    uploadArea?.addEventListener('drop', (e) => { e.preventDefault(); uploadArea.classList.remove('drag-over'); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
    decryptBtn?.addEventListener('click', decryptFile);
    downloadBtn?.addEventListener('click', downloadImage);
    clearResultBtn?.addEventListener('click', clearResults);

    updateButton();
    console.log("✅ أداة فك التشفير جاهزة - نسخة محسنة SEO");
};
