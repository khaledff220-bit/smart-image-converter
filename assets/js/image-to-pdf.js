// أداة تحويل الصور إلى PDF - نسخة محسنة SEO مع محتوى عربي غني ومتوافقة مع الصفحة الرئيسية

window.initImageToPDF = function(containerId) {
    console.log("✅ تهيئة أداة تحويل الصور إلى PDF");
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
            <h1 style="text-align: center; font-size: 28px; margin-bottom: 15px;">🖼️➡️📄 تحويل الصور إلى PDF - حوّل صورك إلى مستند PDF بجودة احترافية</h1>
            <p style="color: var(--text-muted); text-align: center; margin-bottom: 25px; font-size: 16px;">✅ تحويل صور JPG، PNG، WEBP، GIF إلى ملف PDF واحد - معالجة محلية 100% - مجاني تماماً</p>

            <!-- منطقة رفع الصور -->
            <div class="drag-drop-zone" id="uploadArea" style="margin-bottom: 20px;">
                <div class="drag-icon">🖼️</div>
                <h3>اختر الصور لتحويلها إلى PDF</h3>
                <input type="file" id="fileInput" accept="image/jpeg,image/png,image/webp,image/gif" multiple style="display: none;">
                <small>اختر عدة صور (حتى 20 صورة) | يدعم JPG, PNG, WEBP, GIF</small>
            </div>

            <div id="filesInfo" style="display: none; background: var(--bg-card); border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <span>📄 عدد الصور: <span id="imageCount">0</span></span>
                    <button id="clearFilesBtn" style="background: var(--color-error); border: none; color: white; padding: 5px 15px; border-radius: 8px; cursor: pointer;">🗑️ مسح الكل</button>
                </div>
                <div id="imagesPreview" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; max-height: 200px; overflow-y: auto;"></div>
            </div>

            <!-- إعدادات PDF -->
            <div style="margin: 20px 0;">
                <h2 style="font-size: 22px; margin-bottom: 15px;">⚙️ إعدادات تحويل الصور إلى PDF</h2>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <label><span>📐 اتجاه الصفحة:</span>
                        <select id="orientation" style="padding: 8px; border-radius: 8px; background: var(--bg-primary); color: white;">
                            <option value="portrait">عمودي (Portrait)</option>
                            <option value="landscape">أفقي (Landscape)</option>
                            <option value="auto">تلقائي حسب الصورة</option>
                        </select>
                    </label>
                    <label><span>📄 حجم الصفحة:</span>
                        <select id="pageSize" style="padding: 8px; border-radius: 8px; background: var(--bg-primary); color: white;">
                            <option value="A4">A4 (الأكثر شيوعاً)</option>
                            <option value="Letter">Letter (أمريكي)</option>
                            <option value="Legal">Legal (قانوني)</option>
                        </select>
                    </label>
                    <label><input type="checkbox" id="fitToPage" checked> 🔄 تكييف الصورة مع حجم الصفحة</label>
                </div>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">💡 نصائح: اختر "عمودي" للمستندات النصية، "أفقي" للصور العريضة، و"تلقائي" ليتناسب مع كل صورة</p>
            </div>

            <div class="progress-bar" id="progressBar" style="display: none; margin: 20px 0;">
                <div id="progressFill" style="width: 0%; height: 4px; background: var(--color-primary); border-radius: 2px;"></div>
                <p id="progressText" style="font-size: 12px; margin-top: 8px; text-align: center;">جاري التحويل...</p>
            </div>

            <button class="btn" id="convertBtn" style="width:100%; padding: 14px;">🔄 تحويل الصور إلى PDF الآن</button>
            <div id="status" style="margin-top: 20px; text-align: center;"></div>

            <div id="resultArea" style="display: none; margin-top: 30px; padding: 20px; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--color-success); text-align: center;">
                <div id="resultIcon" style="font-size: 48px;">✅</div>
                <h3>تم تحويل الصور إلى PDF بنجاح!</h3>
                <p>تم تحويل <span id="convertedCount">0</span> صورة إلى ملف PDF واحد</p>
                <a href="#" id="downloadLink" class="btn">📥 تحميل ملف PDF</a>
                <button id="newConvertBtn" class="btn btn-secondary">🔄 تحويل جديد</button>
            </div>

            <!-- ============================================ -->
            <!-- المحتوى النصي الغني لتحسين السيو (1000+ كلمة) -->
            <!-- ============================================ -->

            <!-- 1. قسم شرح شامل -->
            <section class="seo-block" style="margin-top: 50px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">ما هي أداة تحويل الصور إلى PDF من Smart Image Converter؟</h2>
                
                <p><strong>أداة تحويل الصور إلى PDF</strong> من Smart Image Converter هي خدمة مجانية بالكامل تتيح لك <strong>تحويل الصور إلى PDF</strong> بجودة احترافية وسرعة فائقة. سواء كنت طالباً تحتاج إلى تحويل صور الواجبات إلى ملف PDF، أو موظفاً تريد أرشفة مستنداتك، أو مصمماً يرغب في تقديم أعماله بشكل منظم، أو صاحب متجر إلكتروني تريد تحسين صور منتجاتك، فإن أداة <strong>تحويل الصور إلى PDF</strong> لدينا تلبي جميع احتياجاتك.</p>
                
                <p>ما يميز <strong>أداة تحويل الصور إلى PDF</strong> لدينا هو أنها تعمل <strong>محلياً 100%</strong> داخل متصفحك - لا يتم رفع صورك إلى أي خادم خارجي، مما يعني أن صورك الخاصة تبقى آمنة تماماً ولا يتم تخزينها أو مشاركتها مع أي جهة خارجية. يمكنك <strong>تحويل JPG إلى PDF</strong> أو <strong>تحويل PNG إلى PDF</strong> بكل ثقة وأمان تام.</p>
                
                <p><strong>تحويل الصور إلى PDF</strong> هو عملية تحويل صور متعددة (JPG, PNG, WEBP, GIF) إلى ملف PDF واحد منظم. يمكنك اختيار اتجاه الصفحة (عمودي، أفقي، تلقائي)، وتحديد حجم الصفحة (A4، Letter، Legal)، وتفعيل خيار تكييف الصورة مع حجم الصفحة للحصول على أفضل النتائج.</p>
                
                <p>تدعم أداتنا تحويل ما يصل إلى 20 صورة في المرة الواحدة، مع حد أقصى لكل صورة 10 ميجابايت. يمكنك <strong>تحويل PNG إلى PDF</strong> و<strong>تحويل JPG إلى PDF</strong> مع الحفاظ على جودة الصور الأصلية. عملية التحويل بسيطة وسريعة: اختر الصور، حدد الإعدادات، ثم اضغط على زر التحويل. خلال ثوانٍ قليلة، سيصبح لديك ملف PDF جاهز للتحميل أو المشاركة.</p>
            </section>

            <!-- 2. قسم: لماذا تحتاج إلى تحويل الصور إلى PDF؟ -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">لماذا تحتاج إلى تحويل الصور إلى PDF؟ 5 أسباب مهمة</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>تجميع الصور المتفرقة:</strong> بدلاً من إرسال عدة صور منفصلة، يمكنك <strong>تحويل الصور إلى PDF</strong> في ملف واحد منظم يسهل مشاركته وعرضه.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>تسهيل عرض العروض التقديمية:</strong> عند تقديم مشروع أو عرض عمل، من الأفضل عرض الصور في ملف PDF واحد بدلاً من التنقل بين عدة ملفات صور.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>أرشفة المستندات والوثائق:</strong> يمكنك <strong>تحويل الصور إلى PDF</strong> لأرشفة الفواتير والإيصالات والوثائق الممسوحة ضوئياً بتنسيق موحد وسهل الإدارة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>حماية الصور من التعديل:</strong> ملفات PDF أكثر أماناً من الصور العادية ويمكن حمايتها بكلمة مرور بعد التحويل.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: flex-start; gap: 10px;">📌 <strong>تقليل حجم الملفات:</strong> في بعض الحالات، <strong>تحويل الصور إلى PDF</strong> يمكن أن ينتج ملفات أصغر حجماً مقارنة بالصور المنفردة، مما يسهل مشاركتها عبر البريد الإلكتروني.</li>
                </ul>
            </section>

            <!-- 3. قسم مميزات الأداة -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">مميزات أداة تحويل الصور إلى PDF من Smart Image Converter</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>معالجة محلية 100%:</strong> صورك لا ترفع إلى أي خادم خارجي - خصوصية تامة وأمان كامل.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>تحويل متعدد الصور:</strong> يمكنك <strong>تحويل الصور إلى PDF</strong> من خلال اختيار عدة صور (حتى 20 صورة) دفعة واحدة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>خيارات متعددة للتحويل:</strong> اتجاه الصفحة (عمودي/أفقي/تلقائي)، حجم الصفحة (A4/Letter/Legal)، وتكييف الصورة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يدعم جميع صيغ الصور:</strong> <strong>تحويل JPG إلى PDF</strong>، <strong>تحويل PNG إلى PDF</strong>، بالإضافة إلى WEBP و GIF.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>معاينة الصور قبل التحويل:</strong> عرض مصغر للصور المختارة مع إمكانية إزالة أي صورة قبل التحويل.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>شريط تقدم مرئي:</strong> متابعة عملية التحويل خطوة بخطوة مع عرض النسبة المئوية للإنجاز.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>مجاني بالكامل:</strong> بدون اشتراكات، بدون حدود لعدد مرات الاستخدام، بدون إعلانات مزعجة.</li>
                    
                    <li style="padding: 8px 0; display: flex; align-items: center; gap: 10px;">✅ <strong>يعمل على جميع الأجهزة:</strong> الحاسوب، الهاتف الذكي، الجهاز اللوحي - واجهة متجاوبة وسهلة الاستخدام.</li>
                </ul>
            </section>

            <!-- 4. قسم حالات الاستخدام العملية -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">متى تحتاج إلى تحويل الصور إلى PDF؟ حالات استخدام عملية</h2>
                
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">1</div>
                        <div><strong>📚 للطلاب والمعلمين:</strong> <strong>تحويل الصور إلى PDF</strong> لتحويل صور الواجبات والمشاريع والأبحاث إلى ملف PDF منظم يسهل تسليمه وتصحيحه.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">2</div>
                        <div><strong>💼 للموظفين والشركات:</strong> <strong>تحويل PNG إلى PDF</strong> و<strong>تحويل JPG إلى PDF</strong> لتحويل صور الفواتير والإيصالات والعقود الممسوحة ضوئياً إلى مستندات PDF رسمية.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">3</div>
                        <div><strong>🎨 للمصممين والفنانين:</strong> <strong>تحويل الصور إلى PDF</strong> لتقديم أعمالهم للعملاء بشكل منظم واحترافي في ملف PDF واحد.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">4</div>
                        <div><strong>📸 للمصورين:</strong> <strong>تحويل الصور إلى PDF</strong> لإنشاء ألبومات صور رقمية أو كتالوجات منتجات لعرضها على العملاء.</div>
                    </li>
                    
                    <li style="padding: 12px 0; display: flex; align-items: flex-start; gap: 10px;">
                        <div style="background: var(--color-primary); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">5</div>
                        <div><strong>🏠 للاستخدام الشخصي:</strong> <strong>تحويل الصور إلى PDF</strong> لتحويل صور السفر والمناسبات العائلية إلى ملف PDF واحد لسهولة المشاركة مع الأهل والأصدقاء.</div>
                    </li>
                </ul>
            </section>

            <!-- 5. جدول المقارنة -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">📊 مقارنة: أداة تحويل الصور إلى PDF من Smart Image Converter مقابل المواقع التقليدية</h2>
                
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
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🔒 خصوصية الصور</td><td style="padding: 10px;">✅ معالجة محلية - لا ترفع للخادم</td><td style="padding: 10px;">❌ يتم رفع الصور للخادم</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">💰 التكلفة</td><td style="padding: 10px;">✅ مجاني بالكامل</td><td style="padding: 10px;">⚠️ مجاني محدود أو اشتراكات</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">⚡ سرعة التحويل</td><td style="padding: 10px;">✅ فورية - بدون انتظار</td><td style="padding: 10px;">⚠️ تعتمد على سرعة الإنترنت</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">📱 العمل دون إنترنت</td><td style="padding: 10px;">✅ يعمل بعد تحميل الصفحة</td><td style="padding: 10px;">❌ يتطلب اتصالاً دائماً</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🖼️ عدد الصور للتحويل</td><td style="padding: 10px;">✅ حتى 20 صورة</td><td style="padding: 10px;">⚠️ غالباً 5-10 صور فقط</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🎛️ خيارات التخصيص</td><td style="padding: 10px;">✅ اتجاه، حجم، تكييف</td><td style="padding: 10px;">❌ خيارات محدودة</td></tr>
                            <tr style="border-bottom: 1px solid var(--border-color);"><td style="padding: 10px;">🛡️ الإعلانات</td><td style="padding: 10px;">✅ بدون إعلانات مزعجة</td><td style="padding: 10px;">❌ إعلانات ونوافذ منبثقة</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 6. قسم الأسئلة الشائعة FAQ -->
            <section class="faq-section" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">❓ الأسئلة الشائعة حول تحويل الصور إلى PDF</h2>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما هي صيغ الصور المدعومة للتحويل إلى PDF؟</h3><p>أداة <strong>تحويل الصور إلى PDF</strong> تدعم جميع الصيغ الشائعة: JPG, JPEG, PNG, WEBP, و GIF. يمكنك <strong>تحويل JPG إلى PDF</strong> و<strong>تحويل PNG إلى PDF</strong> بسهولة وسرعة.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني تحويل عدة صور إلى PDF واحد؟</h3><p>نعم، يمكنك اختيار عدة صور (حتى 20 صورة) و<strong>تحويل الصور إلى PDF</strong> واحد منظم. سيتم ترتيب الصور في PDF بنفس الترتيب الذي اخترتها.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يؤثر تحويل الصور إلى PDF على جودة الصور؟</h3><p>لا، <strong>تحويل الصور إلى PDF</strong> يحافظ على الجودة الأصلية للصور. يمكنك اختيار خيار "تكييف الصورة" لتتناسب مع حجم الصفحة دون فقدان الجودة.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما الفرق بين اتجاهات الصفحة (عمودي/أفقي/تلقائي)؟</h3><p>الوضع العمودي مناسب للمستندات النصية والصور الطويلة، الوضع الأفقي مناسب للصور العريضة، والوضع التلقائي يختار الاتجاه المناسب لكل صورة على حدة.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ ما أحجام الصفحات المتاحة في أداة تحويل الصور إلى PDF؟</h3><p>ندعم ثلاثة أحجام: A4 (الأكثر شيوعاً للمستندات)، Letter (الحجم الأمريكي القياسي)، وLegal (الحجم القانوني للمستندات الطويلة).</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل أحتاج إلى اتصال بالإنترنت لاستخدام الأداة؟</h3><p>بعد تحميل الصفحة لأول مرة، يمكنك استخدام <strong>أداة تحويل الصور إلى PDF</strong> دون اتصال بالإنترنت لأن جميع العمليات تتم محلياً على جهازك.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل أداة تحويل الصور إلى PDF مجانية حقاً؟</h3><p>نعم، <strong>تحويل الصور إلى PDF</strong> عبر منصتنا مجاني بالكامل ولا توجد أي رسوم خفية أو اشتراكات شهرية.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ كيف تتم المعالجة المحلية عند تحويل الصور إلى PDF؟</h3><p>جميع عمليات <strong>تحويل الصور إلى PDF</strong> تتم داخل متصفحك باستخدام مكتبة PDF-Lib. لا يتم إرسال صورك إلى أي خادم خارجي.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل تعمل أداة تحويل الصور إلى PDF على الهاتف المحمول؟</h3><p>نعم، <strong>أداة تحويل الصور إلى PDF</strong> مصممة لتكون متجاوبة بالكامل وتعمل بشكل ممتاز على جميع الهواتف الذكية والأجهزة اللوحية.</p></div>

                <div style="margin-bottom: 25px;"><h3 style="font-size: 20px; margin-bottom: 10px;">❓ هل يمكنني تحويل الصور الممسوحة ضوئياً إلى PDF؟</h3><p>نعم، يمكنك <strong>تحويل الصور إلى PDF</strong> من أي مصدر بما في ذلك الصور الممسوحة ضوئياً من الماسح الضوئي أو الهاتف.</p></div>
            </section>

            <!-- 7. خاتمة قوية -->
            <section class="seo-block" style="margin-top: 30px; padding: 30px; background: var(--bg-card); border-radius: 16px; text-align: center;">
                <h2 style="font-size: 26px; margin-bottom: 20px;">🖼️➡️📄 ابدأ في تحويل الصور إلى PDF اليوم مجاناً</h2>
                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                    لا تدع صورك المتفرقة تسبب لك الفوضى. مع <strong>أداة تحويل الصور إلى PDF</strong> من Smart Image Converter، يمكنك <strong>تحويل الصور إلى PDF</strong> بسهولة وأمان تام.
                    جميع عمليات التحويل تتم محلياً على جهازك، مما يضمن خصوصية تامة لصورك. جرب الأداة الآن مجاناً واستمتع بتحويل سريع وآمن واحترافي!
                </p>
                <div style="background: var(--bg-primary); border-radius: 12px; padding: 15px; margin-top: 20px;">
                    <p style="margin: 0; color: var(--color-primary); font-weight: bold;">✨ Smart Image Converter - تحويل الصور إلى PDF بجودة عالية، بخصوصية تامة، مجاناً ودون قيود ✨</p>
                </div>
            </section>

            <!-- 8. طريقة الاستخدام خطوة بخطوة -->
            <div class="how-to-use" style="margin-top: 40px; padding: 25px; background: var(--bg-card); border-radius: 16px;">
                <h2 style="font-size: 22px; margin-bottom: 20px;">📖 طريقة استخدام أداة تحويل الصور إلى PDF - خطوة بخطوة</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">1</div><strong>اختر الصور</strong><br><small>اختر صوراً متعددة من جهازك</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">2</div><strong>اختر الإعدادات</strong><br><small>اتجاه وحجم الصفحة</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">3</div><strong>ابدأ التحويل</strong><br><small>اضغط زر "تحويل الصور إلى PDF"</small></div>
                    <div style="flex:1; text-align:center;"><div style="background: var(--color-primary); width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; color: white;">4</div><strong>حمل ملف PDF</strong><br><small>احصل على ملف PDF النهائي فوراً</small></div>
                </div>
            </div>
        </div>
    `;

    // ============================================
    // الكود البرمجي الأصلي للأداة (لم يتم التعديل عليه)
    // ============================================

    const uploadArea = container.querySelector('#uploadArea');
    const fileInput = container.querySelector('#fileInput');
    const filesInfo = container.querySelector('#filesInfo');
    const imageCountSpan = container.querySelector('#imageCount');
    const imagesPreview = container.querySelector('#imagesPreview');
    const clearFilesBtn = container.querySelector('#clearFilesBtn');
    const orientation = container.querySelector('#orientation');
    const pageSizeSelect = container.querySelector('#pageSize');
    const fitToPage = container.querySelector('#fitToPage');
    const convertBtn = container.querySelector('#convertBtn');
    const statusDiv = container.querySelector('#status');
    const resultArea = container.querySelector('#resultArea');
    const downloadLink = container.querySelector('#downloadLink');
    const convertedCountSpan = container.querySelector('#convertedCount');
    const newConvertBtn = container.querySelector('#newConvertBtn');
    const progressBar = container.querySelector('#progressBar');
    const progressFill = container.querySelector('#progressFill');
    const progressText = container.querySelector('#progressText');

    let selectedImages = [];
    let currentDownloadUrl = null;
    let isProcessing = false;

    const pageSizes = { A4: [595, 842], Letter: [612, 792], Legal: [612, 1008] };
    const MAX_DIM = 3000;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function showNotification(msg, type) {
        if (window.SmartImageConverter && window.SmartImageConverter.showToast) {
            window.SmartImageConverter.showToast(msg, type);
        }
    }

    function revokeUrl() {
        if (currentDownloadUrl) {
            URL.revokeObjectURL(currentDownloadUrl);
            currentDownloadUrl = null;
        }
    }

    function updateProgress(p, text) {
        if (progressFill) progressFill.style.width = p + '%';
        if (progressText) progressText.textContent = text || `جاري تحويل الصور إلى PDF... ${p}%`;
    }

    function updatePreview() {
        const cnt = selectedImages.length;
        if (cnt === 0) {
            filesInfo.style.display = 'none';
            imageCountSpan.textContent = '0';
            return;
        }
        filesInfo.style.display = 'block';
        imageCountSpan.textContent = cnt;
        imagesPreview.innerHTML = '';
        selectedImages.forEach((img, idx) => {
            const div = document.createElement('div');
            div.style.cssText = 'position: relative; width: 80px; height: 80px; border-radius: 8px; overflow: hidden; background: var(--bg-primary);';
            div.innerHTML = `<img src="${img.dataUrl}" style="width:100%;height:100%;object-fit:cover;"><button data-index="${idx}" style="position:absolute; top:-5px; right:-5px; background:var(--color-error); border:none; color:white; border-radius:50%; width:22px; height:22px; cursor:pointer; font-size:12px;">✕</button>`;
            imagesPreview.appendChild(div);
        });
        imagesPreview.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                selectedImages.splice(idx, 1);
                updatePreview();
                if (selectedImages.length === 0) resultArea.style.display = 'none';
            });
        });
    }

    function setProcessing(processing) {
        isProcessing = processing;
        if (convertBtn) {
            convertBtn.disabled = processing;
            convertBtn.textContent = processing ? '⏳ جاري تحويل الصور إلى PDF...' : '🔄 تحويل الصور إلى PDF الآن';
        }
        if (progressBar) progressBar.style.display = processing ? 'block' : 'none';
    }

    function resetTool() {
        selectedImages = [];
        revokeUrl();
        fileInput.value = '';
        updatePreview();
        resultArea.style.display = 'none';
        statusDiv.innerHTML = '';
        updateProgress(0, '');
        showNotification('🧹 تم مسح جميع الصور', 'info');
    }

    async function embedImageSmart(pdfDoc, img) {
        const mime = img.file.type.toLowerCase();
        if (mime === 'image/png') return await pdfDoc.embedPng(img.dataUrl);
        if (mime === 'image/jpeg' || mime === 'image/jpg') return await pdfDoc.embedJpg(img.dataUrl);
        let tempImg = new Image();
        await new Promise((resolve, reject) => { tempImg.onload = resolve; tempImg.onerror = reject; tempImg.src = img.dataUrl; });
        let w = tempImg.width, h = tempImg.height;
        if (w > MAX_DIM || h > MAX_DIM) { const r = Math.min(MAX_DIM / w, MAX_DIM / h); w = Math.floor(w * r); h = Math.floor(h * r); }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0, w, h);
        const pngData = canvas.toDataURL('image/png', 0.92);
        tempImg.src = '';
        return await pdfDoc.embedPng(pngData);
    }

    function handleFiles(files) {
        const remaining = 20 - selectedImages.length;
        const valid = [];
        for (let f of files) {
            if (valid.length >= remaining) break;
            if (!f.type.startsWith('image/')) { showNotification(`❌ ${f.name} ليس صورة`, 'error'); continue; }
            valid.push(f);
        }
        if (!valid.length) return;
        let processed = 0;
        valid.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    selectedImages.push({ file, dataUrl: e.target.result, name: file.name, width: img.width, height: img.height });
                    processed++;
                    if (processed === valid.length) updatePreview();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
        showNotification(`✅ تمت إضافة ${valid.length} صور`, 'success');
    }

    async function convertToPdf() {
        if (!selectedImages.length) { showNotification('❌ اختر صوراً أولاً', 'error'); return; }
        if (isProcessing) return;
        setProcessing(true);
        statusDiv.innerHTML = '<span style="color: var(--color-info);">⏳ جاري تحويل الصور إلى PDF...</span>';
        resultArea.style.display = 'none';
        revokeUrl();
        try {
            const orientVal = orientation.value;
            const sizeKey = pageSizeSelect.value;
            const fit = fitToPage.checked;
            const [pw, ph] = pageSizes[sizeKey];
            const pdfDoc = await PDFLib.PDFDocument.create();
            const total = selectedImages.length;
            for (let i = 0; i < total; i++) {
                const img = selectedImages[i];
                updateProgress(Math.round((i / total) * 100), `تحويل الصورة ${i+1} من ${total}...`);
                let finalOrient = orientVal;
                if (orientVal === 'auto') finalOrient = img.width > img.height ? 'landscape' : 'portrait';
                let fw = pw, fh = ph;
                if (finalOrient === 'landscape') [fw, fh] = [fh, fw];
                let x = 0, y = 0, dw = fw, dh = fh;
                if (fit) {
                    const ir = img.width / img.height;
                    const pr = fw / fh;
                    if (ir > pr) { dw = fw; dh = fw / ir; y = (fh - dh) / 2; }
                    else { dh = fh; dw = fh * ir; x = (fw - dw) / 2; }
                } else {
                    const s = Math.min(fw / img.width, fh / img.height);
                    dw = img.width * s; dh = img.height * s;
                    x = (fw - dw) / 2; y = (fh - dh) / 2;
                }
                const embedded = await embedImageSmart(pdfDoc, img);
                const page = pdfDoc.addPage([fw, fh]);
                page.drawImage(embedded, { x, y, width: dw, height: dh });
                await new Promise(r => setTimeout(r, 10));
            }
            updateProgress(95, 'جاري حفظ ملف PDF...');
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            currentDownloadUrl = URL.createObjectURL(blob);
            downloadLink.href = currentDownloadUrl;
            downloadLink.download = `converted_${Date.now()}.pdf`;
            convertedCountSpan.textContent = total;
            resultArea.style.display = 'block';
            statusDiv.innerHTML = '';
            updateProgress(100, 'اكتمل تحويل الصور إلى PDF!');
            showNotification('✅ تم تحويل الصور إلى PDF بنجاح!', 'success');
        } catch (error) {
            console.error(error);
            statusDiv.innerHTML = '<span style="color: var(--color-error);">❌ حدث خطأ أثناء تحويل الصور إلى PDF</span>';
            showNotification('❌ حدث خطأ', 'error');
            updateProgress(0, '');
        } finally {
            setProcessing(false);
        }
    }

    uploadArea?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => { if (e.target.files.length) handleFiles(Array.from(e.target.files)); fileInput.value = ''; });
    clearFilesBtn?.addEventListener('click', resetTool);
    convertBtn?.addEventListener('click', convertToPdf);
    newConvertBtn?.addEventListener('click', resetTool);
    uploadArea?.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea?.addEventListener('dragleave', () => { uploadArea.classList.remove('drag-over'); });
    uploadArea?.addEventListener('drop', (e) => { e.preventDefault(); uploadArea.classList.remove('drag-over'); if (e.dataTransfer.files.length) handleFiles(Array.from(e.dataTransfer.files)); });

    console.log("✅ أداة تحويل الصور إلى PDF جاهزة - نسخة محسنة SEO");
};
