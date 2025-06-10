// script8.js

// سنستخدم مكتبة jsPDF مع مكتبة html2canvas لتحويل الصورة إلى PDF
// لذلك سنحمل المكتبتين عبر CDN داخل js (في HTML لو حبيت تضيف)
// لكن طالما طلبت ملفات منفصلة فقط، سأستخدم jsPDF فقط لتحويل الصورة مباشرة.

const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const previewSection = document.getElementById('previewSection');
const buttons = document.getElementById('buttons');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');

let pdfBlobUrl = null;
let imgDataURL = null;

// لتحميل مكتبة jsPDF تلقائياً داخل هذا السكربت (لأن ملف js خارجي)
// بديل بسيط - لكن لو بتحب ممكن تحطها في html عبر CDN
function loadJsPDF(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = callback;
    document.head.appendChild(script);
}

// بعد تحميل jsPDF نفعّل الزر
function enableConvert() {
    convertBtn.disabled = false;
    convertBtn.textContent = 'تحويل إلى PDF';
}

function disableConvert() {
    convertBtn.disabled = true;
    convertBtn.textContent = '... جاري التحويل';
}

// عند اختيار صورة
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        imgDataURL = event.target.result;
        previewImage.src = imgDataURL;
        previewSection.style.display = 'block';
        buttons.style.display = 'flex';
        downloadLink.style.display = 'none';
        pdfBlobUrl = null;
        enableConvert();
    };
    reader.readAsDataURL(file);
});

// عند الضغط على زر التحويل
convertBtn.addEventListener('click', () => {
    if (!imgDataURL) return;

    disableConvert();

    // jsPDF يشتغل هنا
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    const img = new Image();
    img.src = imgDataURL;
    img.onload = () => {
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // نسبة أبعاد الصورة الأصلية
        const imgWidth = img.width;
        const imgHeight = img.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const imgPDFWidth = imgWidth * ratio;
        const imgPDFHeight = imgHeight * ratio;

        // ضع الصورة في منتصف الصفحة
        const x = (pdfWidth - imgPDFWidth) / 2;
        const y = (pdfHeight - imgPDFHeight) / 2;

        pdf.addImage(imgDataURL, 'JPEG', x, y, imgPDFWidth, imgPDFHeight);

        // توليد ملف PDF كـ blob URL للتنزيل
        const pdfBlob = pdf.output('blob');
        if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl); // تنظيف الرابط السابق إن وجد
        pdfBlobUrl = URL.createObjectURL(pdfBlob);

        downloadLink.href = pdfBlobUrl;
        downloadLink.style.display = 'inline-block';

        enableConvert();
    };
});

// تحميل jsPDF أولاً
loadJsPDF(() => {
    // ممكن تفعيل الزر لو الصورة مختارة مسبقًا
    if (imageInput.files.length > 0) {
        enableConvert();
    }
});