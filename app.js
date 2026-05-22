// ==========================================
// 1. ประกาศตัวแปร และ โหลดข้อมูลเริ่มต้น
// ==========================================

const defaultClinics = [
    {
        id: 1,
        name: "Aura Clinic (สาขาสุขุมวิท)",
        description: "ผู้เชี่ยวชาญการเลเซอร์และฟิลเลอร์ปรับรูปหน้าเทคนิคพิเศษจากประเทศเกาหลี",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300",
        rating: 4.9,
        reviewsCount: "2,420",
        priceRange: "฿2,500 - ฿15,900",
        category: "Skincare"
    },
    {
        id: 2,
        name: "Gangnam Plastic Surgery",
        description: "ศัลยกรรมตกแต่งตาและเสริมจมูกทรงธรรมชาติโดยศัลยแพทย์ผู้เชี่ยวชาญเฉพาะทาง",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=300",
        rating: 4.8,
        reviewsCount: "1,850",
        priceRange: "฿8,900 - ฿49,000",
        category: "Surgery"
    }
];

const defaultReviews = [
    {
        id: 1,
        username: "@Jane_Beauty",
        category: "Skincare",
        rating: 5,
        productName: "เลเซอร์ PicoSure",
        content: "หลังทำ PicoSure ที่ Aura Clinic รอยสิวดูจางลงมากค่ะ ผิวเรียบเนียนขึ้นเยอะเลย แนะนำเลยค่ะ!",
        beforeImg: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=150",
        afterImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=150"
    }
];

let clinics = JSON.parse(localStorage.getItem('unni_clinics')) || defaultClinics;
let reviews = JSON.parse(localStorage.getItem('unni_premium_reviews')) || defaultReviews;
let bookings = JSON.parse(localStorage.getItem('unni_bookings')) || [];
let savedClinics = JSON.parse(localStorage.getItem('unni_saved_clinics')) || [];

// จัดเก็บข้อมูลลง LocalStorage เพื่อป้องกันข้อมูลเป็นค่าว่าง
if (!localStorage.getItem('unni_clinics')) {
    localStorage.setItem('unni_clinics', JSON.stringify(defaultClinics));
}
if (!localStorage.getItem('unni_premium_reviews')) {
    localStorage.setItem('unni_premium_reviews', JSON.stringify(defaultReviews));
}

// ==========================================
// 2. ระบบนำทางและการสลับหน้าแท็บ (Navigation)
// ==========================================
window.goToTab = function(tabId) {
    document.querySelectorAll('.tab-view').forEach(view => view.classList.add('hidden'));
    
    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) targetView.classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('text-primary', 'font-bold');
        item.classList.add('text-secondary');
    });
    
    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.remove('text-secondary');
        activeNav.classList.add('text-primary', 'font-bold');
    }

    if (tabId === 'home') renderHomeHotDeals();
    if (tabId === 'reviews') renderReviews('all');
    if (tabId === 'clinics') renderClinicsList();
    if (tabId === 'profile') renderProfileData();
};

// ==========================================
// 3. จัดการ UI พื้นฐาน (Header & Search)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // การแสดงผลเปิด-ปิด เมนูแจ้งเตือน
    const notiBtn = document.getElementById('notiBtn');
    const notiPanel = document.getElementById('notiPanel');
    if (notiBtn && notiPanel) {
        notiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notiPanel.classList.toggle('hidden');
        });
    }

    // การแสดงผลเปิด-ปิด และค้นหาด้วยแถบค้นหา
    const searchToggle = document.getElementById('searchToggle');
    const searchBarContainer = document.getElementById('searchBarContainer');
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');

    if (searchToggle && searchBarContainer) {
        searchToggle.addEventListener('click', () => {
            searchBarContainer.classList.toggle('hidden');
            if (!searchBarContainer.classList.contains('hidden') && searchInput) {
                searchInput.focus();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();
            if (query.length > 0) {
                clearSearch.classList.remove('hidden');
            } else {
                clearSearch.classList.add('hidden');
            }
            renderClinicsList(query);
        });
    }

    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            clearSearch.classList.add('hidden');
            renderClinicsList();
        });
    }

    document.addEventListener('click', () => {
        if (notiPanel) notiPanel.classList.add('hidden');
    });

    goToTab('home');
});

// ==========================================
// 4. การจัดการหน้าแรกและดีลเด่น (Home View)
// ==========================================
function renderHomeHotDeals() {
    const homeContainer = document.getElementById('homeHotDealsContainer');
    if (!homeContainer) return;

    // ดึงข้อมูลล่าสุด
    clinics = JSON.parse(localStorage.getItem('unni_clinics')) || defaultClinics;
    homeContainer.innerHTML = '';

    clinics.forEach(clinic => {
        const div = document.createElement('div');
        div.className = "flex gap-3 bg-secondary-container/30 p-3 rounded-2xl border border-outline-variant hover:border-primary/50 transition-colors";
        
        // สกัดแยกตัวเลขราคาเพื่อการจอง
        const numericPrice = clinic.priceRange.replace(/[^0-9]/g, '').slice(0, 4) || '3500';

        div.innerHTML = `
            <img src="${clinic.image}" class="w-24 h-24 object-cover rounded-xl" alt="Deal">
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Recommended</span>
                    <h4 class="text-sm font-bold mt-1 line-clamp-1">${clinic.name}</h4>
                    <p class="text-xs text-secondary line-clamp-1">${clinic.description}</p>
                </div>
                <div class="flex justify-between items-end">
                    <div class="flex items-center gap-1.5">
                        <span class="text-sm font-bold text-primary">${clinic.priceRange.split(' - ')[0]}</span>
                    </div>
                    <button onclick="openBookingModal('${clinic.name}', '${clinic.name}', '${numericPrice}')" class="text-xs bg-primary text-white font-bold px-3 py-1.5 rounded-xl hover:bg-primary-hover transition-colors">จองคิว</button>
                </div>
            </div>
        `;
        homeContainer.appendChild(div);
    });
}

// ==========================================
// 5. การจัดการหน้ารีวิวและกลุ่มผู้ใช้งาน (Reviews Tab)
// ==========================================
function renderReviews(filterCategory = 'all') {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;

    reviews = JSON.parse(localStorage.getItem('unni_premium_reviews')) || defaultReviews;
    reviewsContainer.innerHTML = '';
    
    const filteredReviews = filterCategory === 'all' 
        ? reviews 
        : reviews.filter(r => r.category === filterCategory);

    if (filteredReviews.length === 0) {
        reviewsContainer.innerHTML = `<div class="text-center py-8 text-secondary text-sm">ยังไม่มีรีวิวในหมวดหมู่นี้</div>`;
        return;
    }

    filteredReviews.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white p-4 rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-3";
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <span class="font-bold text-sm text-on-surface">${item.username}</span>
                    <span class="text-xs bg-orange-50 text-primary px-2.5 py-0.5 rounded-full ml-2 font-semibold">${item.category}</span>
                </div>
                <div class="text-amber-500 text-xs">★ ${'★'.repeat(item.rating)}</div>
            </div>
            <div>
                <strong class="text-xs text-secondary block mb-1">ผลลัพธ์จากโปรแกรม: ${item.productName}</strong>
                <p class="text-sm text-on-surface-variant leading-relaxed">${item.content}</p>
            </div>
            ${item.beforeImg || item.afterImg ? `
            <div class="grid grid-cols-2 gap-2 mt-2">
                ${item.beforeImg ? `
                <div class="relative rounded-lg overflow-hidden border">
                    <img src="${item.beforeImg}" class="w-full h-24 object-cover">
                    <div class="absolute bottom-1 left-1 bg-black/60 text-[9px] text-white px-1.5 py-0.5 rounded">Before</div>
                </div>` : ''}
                ${item.afterImg ? `
                <div class="relative rounded-lg overflow-hidden border">
                    <img src="${item.afterImg}" class="w-full h-24 object-cover">
                    <div class="absolute bottom-1 left-1 bg-primary text-[9px] text-white px-1.5 py-0.5 rounded">After ✨</div>
                </div>` : ''}
            </div>` : ''}
        `;
        reviewsContainer.appendChild(card);
    });
}

// ผูกตัวสลับหมวดหมู่
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.className = "filter-btn bg-secondary-container text-on-surface text-xs px-4 py-2 rounded-full whitespace-nowrap hover:bg-orange-50 transition-colors";
        });
        this.className = "filter-btn bg-primary text-white font-bold text-xs px-4 py-2 rounded-full whitespace-nowrap shadow-sm transition-all";
        renderReviews(this.getAttribute('data-filter'));
    });
});

const reviewModal = document.getElementById('reviewModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

if (openModalBtn) openModalBtn.addEventListener('click', () => reviewModal.classList.remove('hidden'));
if (closeModalBtn) closeModalBtn.addEventListener('click', () => reviewModal.classList.add('hidden'));

document.getElementById('newReviewForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('formUsername').value;
    const category = document.getElementById('formCategory').value;
    const rating = parseInt(document.getElementById('formRating').value);
    const productName = document.getElementById('formProductName').value;
    const content = document.getElementById('formContent').value;

    const beforeFile = document.getElementById('formBeforeFile').files[0];
    const afterFile = document.getElementById('formAfterFile').files[0];

    const toBase64 = file => new Promise((resolve, reject) => {
        if (!file) resolve(null);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    try {
        const beforeImg = beforeFile ? await toBase64(beforeFile) : "";
        const afterImg = afterFile ? await toBase64(afterFile) : "";

        const newReview = {
            id: Date.now(),
            username,
            category,
            rating,
            productName,
            content,
            beforeImg,
            afterImg
        };

        reviews = JSON.parse(localStorage.getItem('unni_premium_reviews')) || defaultReviews;
        reviews.unshift(newReview);
        localStorage.setItem('unni_premium_reviews', JSON.stringify(reviews));

        alert("ส่งรีวิวสำเร็จแล้ว ข้อมูลจะอัปเดตไปที่ระบบหลักรวมถึงแผงควบคุมของแอดมินทันทีค่ะ");
        reviewModal.classList.add('hidden');
        this.reset();
        renderReviews('all');
    } catch (err) {
        console.error("เกิดข้อผิดพลาดรูปภาพ:", err);
    }
});

// ==========================================
// 6. การจัดการหน้ารายการคลินิก (Clinics Tab)
// ==========================================
function renderClinicsList(searchQuery = '') {
    const clinicsListContainer = document.getElementById('clinicsListContainer');
    if (!clinicsListContainer) return;

    clinicsListContainer.innerHTML = '';
    clinics = JSON.parse(localStorage.getItem('unni_clinics')) || defaultClinics;
    savedClinics = JSON.parse(localStorage.getItem('unni_saved_clinics')) || [];

    const filtered = clinics.filter(c => 
        c.name.toLowerCase().includes(searchQuery) || 
        c.description.toLowerCase().includes(searchQuery)
    );

    if (filtered.length === 0) {
        clinicsListContainer.innerHTML = `<p class="text-center text-sm py-10 text-secondary">ไม่พบคลินิกหรือดีลตามคำค้นหาของคุณ</p>`;
        return;
    }

    filtered.forEach(clinic => {
        const isSaved = savedClinics.some(sc => sc.id === clinic.id);
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-sm hover:border-primary/50 transition-all flex flex-col";
        card.innerHTML = `
            <img src="${clinic.image}" class="w-full h-44 object-cover" alt="${clinic.name}">
            <div class="p-4 flex-1 flex flex-col justify-between gap-2">
                <div>
                    <div class="flex justify-between items-start gap-2">
                        <h4 class="font-bold text-sm text-on-surface line-clamp-1">${clinic.name}</h4>
                        <button onclick="toggleSaveClinic(${clinic.id})" class="text-secondary hover:text-primary active:scale-90 transition-all">
                            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' ${isSaved ? 1 : 0};">bookmark</span>
                        </button>
                    </div>
                    <p class="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">${clinic.description}</p>
                </div>
                <div class="flex justify-between items-center mt-2 pt-2 border-t border-outline-variant/60">
                    <div>
                        <span class="text-[10px] text-secondary block">เรตติ้งผู้ใช้ (${clinic.reviewsCount || 1} รีวิว)</span>
                        <span class="text-xs font-bold text-amber-500">★ ${clinic.rating}</span>
                    </div>
                    <div class="text-right">
                        <span class="text-[10px] text-secondary block">ช่วงราคาแพ็กเกจ</span>
                        <span class="text-xs font-bold text-primary">${clinic.priceRange}</span>
                    </div>
                </div>
            </div>
        `;
        clinicsListContainer.appendChild(card);
    });
}

window.filterByCategory = function(category) {
    goToTab('clinics');
    const input = document.getElementById('searchInput');
    if (input) {
        input.value = category;
        renderClinicsList(category.toLowerCase());
    }
};

window.toggleSaveClinic = function(id) {
    clinics = JSON.parse(localStorage.getItem('unni_clinics')) || defaultClinics;
    savedClinics = JSON.parse(localStorage.getItem('unni_saved_clinics')) || [];

    const target = clinics.find(c => c.id === id);
    if (!target) return;

    const existsIndex = savedClinics.findIndex(sc => sc.id === id);
    if (existsIndex > -1) {
        savedClinics.splice(existsIndex, 1);
        alert("ลบคลินิกออกจากรายการบันทึกแล้วค่ะ");
    } else {
        savedClinics.push(target);
        alert("บันทึกคลินิกนี้ลงในรายการโปรดแล้วค่ะ ✨");
    }

    localStorage.setItem('unni_saved_clinics', JSON.stringify(savedClinics));
    renderClinicsList();
};

// ==========================================
// 7. หน้าต่างจองคิวแพทย์และดีลเด่น (Booking Modal)
// ==========================================
const bookingModal = document.getElementById('bookingModal');

window.openBookingModal = function(dealName, clinicName, price) {
    if (!bookingModal) return;
    document.getElementById('bookDealName').value = dealName;
    document.getElementById('bookClinicName').value = clinicName;
    document.getElementById('bookPrice').value = price;

    document.getElementById('bookTitleDisplay').textContent = dealName;
    document.getElementById('bookClinicDisplay').textContent = clinicName;
    document.getElementById('bookPriceDisplay').textContent = `฿${parseFloat(price).toLocaleString()}`;
    
    document.getElementById('paymentSimulation').classList.add('hidden');
    document.getElementById('paySimBtn').textContent = "ตรวจสอบรายละเอียดและสแกนคิวอาร์";

    bookingModal.classList.remove('hidden');
};

window.closeBookingModal = function() {
    bookingModal.classList.add('hidden');
};

window.simPayment = function() {
    const payBtn = document.getElementById('paySimBtn');
    const paymentArea = document.getElementById('paymentSimulation');
    const dateInput = document.getElementById('bookDate').value;
    const doctor = document.getElementById('bookDoctor').value;

    if (!dateInput) {
        alert("กรุณาระบุวันที่คุณต้องการเข้ารับบริการรักษาก่อนค่ะ");
        return;
    }

    if (paymentArea.classList.contains('hidden')) {
        paymentArea.classList.remove('hidden');
        payBtn.textContent = "ฉันสแกนจำลองเรียบร้อยแล้ว (กดเพื่อออกคิวรักษา)";
    } else {
        const dealName = document.getElementById('bookDealName').value;
        const clinicName = document.getElementById('bookClinicName').value;
        const price = document.getElementById('bookPrice').value;

        const newBooking = {
            id: Date.now(),
            dealName,
            clinicName,
            price,
            date: dateInput,
            doctor
        };

        bookings = JSON.parse(localStorage.getItem('unni_bookings')) || [];
        bookings.push(newBooking);
        localStorage.setItem('unni_bookings', JSON.stringify(bookings));

        alert(`การยืนยันชำระคิวรักษาสำเร็จ!\nคุณได้รับคิวจองรักษาในระบบประวัติการจองเรียบร้อยค่ะ`);
        closeBookingModal();
        goToTab('profile');
    }
};

// ==========================================
// 8. จัดการข้อมูลโปรไฟล์ (Profile Tab)
// ==========================================
function renderProfileData() {
    savedClinics = JSON.parse(localStorage.getItem('unni_saved_clinics')) || [];
    bookings = JSON.parse(localStorage.getItem('unni_bookings')) || [];

    const savedContainer = document.getElementById('savedClinicsContainer');
    const bookingContainer = document.getElementById('bookingRecordsContainer');

    if (savedContainer) {
        savedContainer.innerHTML = '';
        if (savedClinics.length === 0) {
            savedContainer.innerHTML = `<p class="text-xs text-secondary text-center py-4 bg-zinc-50 rounded-2xl">ยังไม่มีคลินิกที่เซฟบันทึกไว้</p>`;
        } else {
            savedClinics.forEach(clinic => {
                const item = document.createElement('div');
                item.className = "flex justify-between items-center bg-zinc-50 p-3 rounded-2xl border text-xs";
                item.innerHTML = `
                    <div>
                        <strong class="block text-on-surface font-semibold">${clinic.name}</strong>
                        <span class="text-[10px] text-secondary">คะแนนบริการ: ★ ${clinic.rating}</span>
                    </div>
                    <button onclick="toggleSaveClinic(${clinic.id}); renderProfileData();" class="text-rose-500 font-bold hover:underline">ลบออก</button>
                `;
                savedContainer.appendChild(item);
            });
        }
    }

    if (bookingContainer) {
        bookingContainer.innerHTML = '';
        if (bookings.length === 0) {
            bookingContainer.innerHTML = `<p class="text-xs text-secondary text-center py-4 bg-zinc-50 rounded-2xl">ยังไม่มีรายการนัดรักษาที่เกิดขึ้น</p>`;
        } else {
            bookings.forEach(book => {
                const item = document.createElement('div');
                item.className = "bg-primary-container p-4 rounded-2xl border border-orange-100 flex flex-col gap-1 text-xs";
                item.innerHTML = `
                    <div class="flex justify-between font-bold">
                        <span class="text-primary">${book.dealName}</span>
                        <span class="text-emerald-600">ชำระสำเร็จแล้ว</span>
                    </div>
                    <p class="text-secondary text-[10px]">คลินิก: ${book.clinicName}</p>
                    <div class="flex justify-between items-center mt-1 pt-1 border-t border-orange-200/50 text-[10px] text-on-surface-variant">
                        <span>วันที่นัดหมาย: ${book.date}</span>
                        <span class="font-bold">ดูแลโดย: ${book.doctor}</span>
                    </div>
                `;
                bookingContainer.appendChild(item);
            });
        }
    }
}

// ==========================================
// 9. ระบบปรึกษาแชตบอตจำลอง (Consultation Chatbot)
// ==========================================
const chatModal = document.getElementById('chatModal');
const chatLog = document.getElementById('chatLog');
const chatInput = document.getElementById('chatInput');

window.openGenericChat = function() {
    if (chatModal) chatModal.classList.remove('hidden');
};

window.closeChat = function() {
    if (chatModal) chatModal.classList.add('hidden');
};

window.sendChatMessage = function() {
    const text = chatInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = "bg-orange-500 text-white rounded-xl p-2.5 max-w-[85%] self-end my-1";
    userMsg.textContent = text;
    chatLog.appendChild(userMsg);
    
    chatInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = "bg-zinc-100 rounded-xl p-2.5 max-w-[85%] self-start my-1";
        
        let response = "ขอบคุณสำหรับข้อความค่ะ เจ้าหน้าที่ผู้เชี่ยวชาญคลินิกกำลังสแตนบายกำลังเข้ามาร่วมตอบแชตของคุณนะคะ เพื่อความสะดวก คุณสามารถกดจองคิวรักษาด่วนเพื่อรับโปรพิเศษผ่านทางหน้าแรกได้เลยค่ะ!";
        
        if (text.includes("จมูก") || text.includes("ศัลยกรรม")) {
            response = "สำหรับศัลยกรรมจมูกและรูปหน้า ตอนนี้มีดีลเด่นที่ Gangnam Plastic Surgery เริ่มต้นเพียง ฿8,900 ค่ะ แพทย์ผู้เชี่ยวชาญจากเกาหลีดูแลโดยตรงเลยสนใจปรึกษาเรื่องทรงจมูกส่วนไหนเพิ่มไหมคะ?";
        } else if (text.includes("ผิว") || text.includes("เลเซอร์") || text.includes("pico") || text.includes("Pico")) {
            response = "งานผิวสวยใสที่กำลังฮิตที่สุดคือ PicoSure ของ Aura Clinic ค่ะ ช่วยกระชับรูขุมขนและลบรอยดำได้เยี่ยม ตอนนี้จัดโปรจำกัดเวลาเพียง ฿2,900 เท่านั้น จองผ่านแอปได้คิวลัดพิเศษด้วยนะคะ!";
        } else if (text.includes("ราคา") || text.includes("ดีล")) {
            response = "ดีลพิเศษแอป UNNI ของเราเริ่มต้นที่ ฿2,500 สแกนดูคลินิกราคาพิเศษทั้งหมดได้ในหน้าต่าง 'คลินิก' บริเวณแถบเมนูด้านล่างเลยค่ะ!";
        }

        botMsg.textContent = response;
        chatLog.appendChild(botMsg);