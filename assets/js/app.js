// كود بسيط للتفاعل مع الموقع
console.log('موقع محول الصور الذكي يعمل!');

// دالة حماية الصورة (تجريبية)
function protectImage() {
    const password = document.getElementById('password').value;
    const fileInput = document.getElementById('imageUpload');
    
    if (!fileInput.files[0]) {
        alert('الرجاء اختيار صورة أولاً');
        return;
    }
    
    if (!password) {
        alert('الرجاء إدخال كلمة المرور');
        return;
    }
    
    alert('جاري حماية الصورة... (هذه نسخة تجريبية)');
}

// إضافة تأثيرات عند التمرير
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = 'white';
    }
});
