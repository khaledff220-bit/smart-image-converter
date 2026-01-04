// 🚀 كود التأثيرات المتقدمة للموقع

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 محول الصور الذكي - الإصدار 2026');
    
    // 1. تأثيرات النجوم المتحركة في الخلفية
    createStars();
    
    // 2. تأثيرات الكروت عند الظهور
    initScrollAnimations();
    
    // 3. تفعيل الأسئلة الشائعة
    initFaq();
    
    // 4. تأثيرات التنقل النشطة
    updateActiveNav();
    
    // 5. تحسين تجربة رفع الملفات
    enhanceFileUpload();
});

// إنشاء النجوم المتحركة
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);
    
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // أحجام وألوان عشوائية
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.opacity = Math.random() * 0.5 + 0.2;
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
    }
}

// تأثيرات التمرير
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // مراقبة جميع الكروت والعناصر
    document.querySelectorAll('.service-card, .option-card, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

// تفعيل الأسئلة الشائعة
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // إغلاق جميع الأسئلة الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // تبديل الحالة الحالية
            item.classList.toggle('active');
        });
    });
}

// تحديث التنقل النشط
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// تحسين رفع الملفات
function enhanceFileUpload() {
    const uploadAreas = document.querySelectorAll('.upload-area, .upload-section');
    
    uploadAreas.forEach(area => {
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.style.borderColor = '#00d4ff';
            area.style.background = 'rgba(0, 212, 255, 0.1)';
            
            // تأثير التوهج
            area.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.3)';
        });
        
        area.addEventListener('dragleave', () => {
            area.style.borderColor = '';
            area.style.background = '';
            area.style.boxShadow = '';
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.style.borderColor = '#10b981';
            area.style.background = 'rgba(16, 185, 129, 0.1)';
            
            // إشعار بنجاح الرفع
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                showUploadSuccess(files.length);
            }
        });
    });
}

// عرض نجاح الرفع
function showUploadSuccess(count) {
    // إنشاء إشعار جميل
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        ">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2rem;">✅</span>
                <div>
                    <strong>تم الرفع بنجاح!</strong>
                    <div style="font-size: 0.9rem; opacity: 0.9;">
                        ${count} ملف جاهز للمعالجة
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // إخفاء الإشعار بعد 3 ثواني
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// تأثيرات الصفحة عند التحميل
window.addEventListener('load', function() {
    // إضافة كلاس التحميل للمحتوى الرئيسي
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('slide-up');
    }
    
    // تأثير النبض للأزرار الرئيسية
    const mainButtons = document.querySelectorAll('.btn');
    mainButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
});

// تحديث شريط التقدم (لصفحات المعالجة)
function updateProgress(percentage) {
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        
        // تأثير التكبير عند الاكتمال
        if (percentage === 100) {
            progressBar.style.transform = 'scaleY(1.5)';
            setTimeout(() => {
                progressBar.style.transform = 'scaleY(1)';
            }, 300);
        }
    }
}
