// ข้อมูลคลินิกทั้งหมดในระบบของแอป UNNI
const clinicsData = [
    {
        id: 1,
        name: "Aura Clinic (สาขาสุขุมวิท)",
        description: "ผู้เชี่ยวชาญการเลเซอร์และฟิลเลอร์ปรับรูปหน้าเทคนิคพิเศษจากประเทศเกาหลี",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200",
        rating: 4.9,
        reviewsCount: "2,420",
        priceRange: "฿2,500 - ฿15,900"
    },
    {
        id: 2,
        name: "Gangnam Plastic Surgery",
        description: "ศัลยกรรมตกแต่งตาและเสริมจมูกทรงธรรมชาติโดยศัลยแพทย์ผู้เชี่ยวชาญเฉพาะทาง",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=200",
        rating: 4.8,
        reviewsCount: "1,850",
        priceRange: "฿8,900 - ฿49,000"
    },
    {
        id: 3,
        name: "Glow Skin Center",
        description: "ศูนย์ทรีตเมนต์บำรุงผิว ปรับสีผิวให้กระจ่างใสอย่างเร่งด่วนสไตล์ Glass Skin",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=200",
        rating: 4.7,
        reviewsCount: "950",
        priceRange: "฿1,500 - ฿8,500"
    }
];

// ข้อมูลรีวิวจำลองแบบพรีเมียม
const initialReviews = [
    {
        id: 1,
        username: "@sarah_glows",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timeAgo: "2 ชม. ที่แล้ว",
        category: "Skincare",
        beforeImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
        afterImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
        beforeLabel: "Before ทำทรีตเมนต์",
        afterLabel: "After 2 Weeks",
        content: "ประทับใจโปรแกรมเลเซอร์หน้าใส PicoSure มากค่ะ รอยแดงสิวและรอยฝ้ากระจางลงอย่างเห็นได้ชัดหลังจากมาทำเลเซอร์ PicoSure ที่ Aura Clinic ติดต่อกัน 2 สัปดาห์ หน้าเงาใสและฟูขึ้นมาก ๆ ค่ะ แนะนำเลยสำหรับใครที่อยากได้ผิวฉ่ำเงาใสสไตล์เกาหลีจริงๆ",
        productName: "เลเซอร์ผิว PicoSure",
        likes: 245,
        liked: false,
        comments: [
            { id: 101, username: "@jennie_c", text: "เห็นผลดีมากค่ะ ต้องรีบหาดีลไปจองทำบ้างแล้ว" }
        ]
    },
    {
        id: 2,
        username: "@cream_princess",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timeAgo: "1 วันที่แล้ว",
        category: "Surgery",
        beforeImage: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600",
        afterImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
        beforeLabel: "Before",
        afterLabel: "After 1 Month",
        content: "ตัดสินใจทำตาสองชั้นเทคนิคพิเศษที่ Gangnam Plastic Surgery ไม่ผิดหวังเลยค่ะ ตาดูโตและหวานฉ่ำขึ้นแบบเป็นธรรมชาติ แผลผ่าตัดแห้งไวมาก ปลื้มสุด ๆ เลยค่ะ เพื่อนทักไม่หยุด!",
        productName: "ตาสองชั้นเทคนิคเกาหลี",
        likes: 312,
        liked: false,
        comments: [
            { id: 102, username: "@bobby_boy", text: "แผลหายเร็วและสวยขึ้นมากเลยค่ะ" }
        ]
    }
];

// ดึงข้อมูลหรือตั้งค่าจากเบราว์เซอร์
let reviews = JSON.parse(localStorage.getItem('unni_premium_reviews')) || initialReviews;
let bookmarks = JSON.parse(localStorage.getItem('unni_bookmarks')) || [];
let bookings = JSON.parse(localStorage.getItem('unni_bookings')) || [];
let currentFilter = 'all';
let searchQuery = '';

// ฟังก์ชันสลับหน้าแท็บหลัก SPA
function goToTab(tabId) {
    document.querySelectorAll('.tab-view').forEach(view => view.classList.add('hidden'));
    document.getElementById(`view-${tabId}`).classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('text-primary', 'font-bold');
        btn.classList.add('text-secondary');
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) icon.style.fontVariationSettings = "'FILL' 0";
    });

    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-secondary');
        activeBtn.classList.add('text-primary', 'font-bold');
        const icon = activeBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.style.fontVariationSettings = "'FILL' 1";
    }

    // อัปเดตข้อมูลแบบเรียลไทม์ตามหมวดแท็บที่ผู้ใช้เปิดใช้งาน
    if (tabId === 'clinics') renderClinics();
    if (tabId === 'profile') {
        renderSavedClinics();
        renderBookingRecords();
    }
}

// ฟังก์ชันสลับการกรองหน้าแรกและย้ายแท็บ
function filterByCategory(catName) {
    goToTab('reviews');
    currentFilter = catName;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === catName) {
            btn.className = "filter-btn bg-primary text-on-primary font-label-md text-xs px-4 py-2 rounded-full whitespace-nowrap shadow-sm transition-all";
        } else {
            btn.className = "filter-btn bg-secondary-container text-on-surface font-label-md text-xs px-4 py-2 rounded-full whitespace-nowrap hover:bg-orange-50 transition-colors";
        }
    });
    renderReviews();
}

// ดักจับการทำงานและผูกชุดคำสั่งกับโครงสร้างเว็บเมื่อโหลดหน้าเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    renderReviews();
    renderClinics();

    const searchToggle = document.getElementById('searchToggle');
    const searchBarContainer = document.getElementById('searchBarContainer');
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    const reviewModal = document.getElementById('reviewModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const newReviewForm = document.getElementById('newReviewForm');
    const notiBtn = document.getElementById('notiBtn');
    const notiPanel = document.getElementById('notiPanel');
    const notiBadge = document.getElementById('notiBadge');

    // จัดการกระดิ่งแจ้งเตือน
    notiBtn.addEventListener('click', () => {
        notiPanel.classList.toggle('hidden');
        notiBadge.classList.add('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!notiBtn.contains(e.target) && !notiPanel.contains(e.target)) {
            notiPanel.classList.add('hidden');
        }
    });

    // ปุ่มสไลด์เขียนรีวิว
    openModalBtn.addEventListener('click', () => {
        reviewModal.classList.remove('hidden');
        setTimeout(() => {
            reviewModal.querySelector('.transform').classList.remove('scale-95');
        }, 10);
    });

    closeModalBtn.addEventListener('click', () => {
        reviewModal.querySelector('.transform').classList.add('scale-95');
        setTimeout(() => {
            reviewModal.classList.add('hidden');
        }, 150);
    });

    // ค้นหารีวิวแบบเรียลไทม์
    searchToggle.addEventListener('click', () => {
        searchBarContainer.classList.toggle('hidden');
        if (!searchBarContainer.classList.contains('hidden')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        if (searchQuery.length > 0) {
            clearSearch.classList.remove('hidden');
        } else {
            clearSearch.classList.add('hidden');
        }
        renderReviews();
    });

    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearch.classList.add('hidden');
        renderReviews();
    });

    // จัดการฟอร์มบันทึกรีวิว
    newReviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('formUsername').value;
        const category = document.getElementById('formCategory').value;
        const rating = parseFloat(document.getElementById('formRating').value);
        const productName = document.getElementById('formProductName').value;
        const content = document.getElementById('formContent').value;
        const beforeLabel = document.getElementById('formBeforeLabel').value || "Before";
        const afterLabel = document.getElementById('formAfterLabel').value || "After";

        const beforeFile = document.getElementById('formBeforeFile').files[0];
        const afterFile = document.getElementById('formAfterFile').files[0];

        const defaultBefore = "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600";
        const defaultAfter = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600";

        const newReview = {
            id: Date.now(),
            username: username.startsWith('@') ? username : '@' + username,
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
            rating: rating,
            timeAgo: "เมื่อสักครู่",
            category: category,
            beforeImage: defaultBefore,
            afterImage: defaultAfter,
            beforeLabel: beforeLabel,
            afterLabel: afterLabel,
            content: content,
            productName: productName,
            likes: 0,
            liked: false,
            comments: []
        };

        if (beforeFile && afterFile) {
            convertFileToBase64(beforeFile, (beforeBase64) => {
                newReview.beforeImage = beforeBase64;
                convertFileToBase64(afterFile, (afterBase64) => {
                    newReview.afterImage = afterBase64;
                    saveAndRenderNewReview(newReview);
                });
            });
        } else if (beforeFile) {
            convertFileToBase64(beforeFile, (beforeBase64) => {
                newReview.beforeImage = beforeBase64;
                saveAndRenderNewReview(newReview);
            });
        } else {
            saveAndRenderNewReview(newReview);
        }
    });
});

// ฟังก์ชันสำหรับแปลงภาพถ่ายที่ผู้ใช้อัปโหลดให้อยู่ในรูป Base64 เพื่อเซฟลง LocalStorage
function convertFileToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

function saveAndRenderNewReview(newReview) {
    reviews.unshift(newReview);
    localStorage.setItem('unni_premium_reviews', JSON.stringify(reviews));
    renderReviews();
    document.getElementById('newReviewForm').reset();
    document.getElementById('closeModalBtn').click();
}

// เรนเดอร์การ์ดรีวิวพร้อมระบบลากเลื่อนเปรียบเทียบภาพสไลเดอร์ Before/After
function renderReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;
    reviewsContainer.innerHTML = '';
    
    const filteredReviews = reviews.filter(review => {
        const matchesFilter = currentFilter === 'all' || review.category.toLowerCase() === currentFilter.toLowerCase();
        const matchesSearch = searchQuery === '' || 
            review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.username.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filteredReviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="text-center py-12 text-secondary">
                <span class="material-symbols-outlined text-4xl mb-2">search_off</span>
                <p class="text-sm">ไม่พบข้อมูลรีวิวความงามที่คุณค้นหา</p>
            </div>
        `;
        return;
    }

    filteredReviews.forEach(review => {
        const isLiked = review.liked;
        const card = document.createElement('article');
        card.className = "bg-white rounded-3xl overflow-hidden flex flex-col border border-outline-variant shadow-sm transition-all";
        
        card.innerHTML = `
            <div class="p-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <img alt="${review.username}" class="w-9 h-9 rounded-full object-cover border border-zinc-100" src="${review.avatar}"/>
                    <div>
                        <h3 class="text-xs font-bold text-on-surface">${review.username}</h3>
                        <div class="flex text-amber-500">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                </div>
                <span class="text-secondary text-[11px]">${review.timeAgo}</span>
            </div>
            
            <div class="relative w-full h-[280px] overflow-hidden select-none bg-zinc-100" id="slider-container-${review.id}">
                <img alt="After" class="absolute inset-0 w-full h-full object-cover pointer-events-none" src="${review.afterImage}"/>
                <div class="absolute bottom-2 right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded font-bold backdrop-blur-sm z-10">${review.afterLabel}</div>

                <div class="absolute inset-0 w-[50%] h-full overflow-hidden pointer-events-none" id="before-wrapper-${review.id}">
                    <img alt="Before" class="absolute inset-0 w-full h-full object-cover max-w-none" id="before-img-${review.id}" src="${review.beforeImage}"/>
                </div>
                <div class="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-bold backdrop-blur-sm z-10">${review.beforeLabel}</div>

                <div class="absolute top-0 bottom-0 left-[50%] w-1 bg-white cursor-ew-resize z-20" id="slider-bar-${review.id}">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-primary flex items-center justify-center">
                        <span class="material-symbols-outlined text-primary text-sm font-bold">unfold_more</span>
                    </div>
                </div>
            </div>
            
            <div class="p-4 flex flex-col gap-2">
                <p class="text-sm text-on-surface-variant leading-relaxed">
                    ${review.content}
                </p>
                <div class="flex items-center gap-1.5 mt-1">
                    <span class="bg-primary-container text-primary font-bold text-[11px] px-2.5 py-1 rounded-lg inline-flex items-center gap-0.5">
                        <span class="material-symbols-outlined text-[12px]">local_mall</span>
                        ${review.productName}
                    </span>
                    <span class="bg-secondary-container text-secondary text-[10px] px-2.5 py-1 rounded-lg font-semibold">
                        ${review.category}
                    </span>
                </div>
            </div>
            
            <div class="p-4 pt-0 flex flex-col border-t border-outline-variant/60 mt-1">
                <div class="flex items-center justify-between pt-3">
                    <div class="flex gap-4 text-secondary">
                        <button onclick="toggleLike(${review.id})" class="flex items-center gap-1 hover:text-primary transition-colors ${isLiked ? 'text-primary' : ''}">
                            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' ${isLiked ? 1 : 0};">favorite</span>
                            <span class="text-xs font-bold">${review.likes}</span>
                        </button>
                        <button onclick="toggleComments(${review.id})" class="flex items-center gap-1 hover:text-primary transition-colors">
                            <span class="material-symbols-outlined text-[20px]">chat_bubble</span>
                            <span class="text-xs font-bold">${review.comments.length}</span>
                        </button>
                    </div>
                    <button onclick="openChat('${review.productName}')" class="text-xs text-primary font-bold bg-primary-container/60 hover:bg-primary hover:text-white px-3.5 py-2 rounded-xl transition-all">
                        ปรึกษาผลลัพธ์
                    </button>
                </div>

                <div id="commentBox-${review.id}" class="hidden mt-3 pt-3 border-t border-dashed border-outline-variant">
                    <div class="flex flex-col gap-1.5 max-h-40 overflow-y-auto mb-3" id="commentsList-${review.id}">
                        ${review.comments.map(c => `
                            <div class="bg-secondary-container/40 p-2 rounded-xl text-xs">
                                <strong class="text-primary">${c.username}</strong>: <span class="text-on-surface-variant">${c.text}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="flex gap-2">
                        <input type="text" id="commentInput-${review.id}" placeholder="แสดงความคิดเห็นที่นี่..." class="w-full text-xs rounded-xl border-zinc-200 focus:ring-primary focus:border-primary">
                        <button onclick="addComment(${review.id})" class="bg-primary text-white text-xs px-3.5 py-2 rounded-xl font-bold hover:bg-primary-hover">ส่ง</button>
                    </div>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(card);
        initSlider(review.id);
    });
}

// ตัวดักจับเมาส์/สัมผัส เลื่อนสไลเดอร์รูดภาพ Before/After
function initSlider(id) {
    const container = document.getElementById(`slider-container-${id}`);
    const wrapper = document.getElementById(`before-wrapper-${id}`);
    const beforeImg = document.getElementById(`before-img-${id}`);
    const bar = document.getElementById(`slider-bar-${id}`);

    if (!container || !wrapper || !beforeImg || !bar) return;

    beforeImg.style.width = container.offsetWidth + "px";
    
    window.addEventListener('resize', () => {
        beforeImg.style.width = container.offsetWidth + "px";
    });

    function moveSlider(clientX) {
        const rect = container.getBoundingClientRect();
        const position = clientX - rect.left;
        let percentage = (position / rect.width) * 100;

        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        wrapper.style.width = percentage + "%";
        bar.style.left = percentage + "%";
    }

    let active = false;

    bar.addEventListener('mousedown', () => { active = true; });
    container.addEventListener('mouseup', () => { active = false; });
    container.addEventListener('mouseleave', () => { active = false; });
    
    container.addEventListener('mousemove', (e) => {
        if (!active) return;
        moveSlider(e.clientX);
    });

    bar.addEventListener('touchstart', () => { active = true; });
    container.addEventListener('touchend', () => { active = false; });
    container.addEventListener('touchmove', (e) => {
        if (!active) return;
        moveSlider(e.touches[0].clientX);
    });
}

// ตรรกะเรนเดอร์รายชื่อคลินิกในหน้าหาคลินิก
function renderClinics() {
    const clinicsContainer = document.getElementById('clinicsListContainer');
    if (!clinicsContainer) return;
    clinicsContainer.innerHTML = '';

    clinicsData.forEach(clinic => {
        const isBookmarked = bookmarks.includes(clinic.id);
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl border border-outline-variant p-4 flex flex-col gap-3 shadow-sm";
        card.innerHTML = `
            <div class="flex gap-3">
                <img src="${clinic.image}" class="w-16 h-16 rounded-xl object-cover" alt="Clinic">
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-sm">${clinic.name}</h4>
                        <button onclick="toggleBookmark(${clinic.id})" class="text-secondary hover:text-primary transition-colors">
                            <span class="material-symbols-outlined text-md" style="font-variation-settings: 'FILL' ${isBookmarked ? 1 : 0};">bookmark</span>
                        </button>
                    </div>
                    <p class="text-xs text-secondary mt-0.5">${clinic.description}</p>
                    <div class="flex items-center gap-1 mt-1 text-xs font-semibold text-amber-500">
                        <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                        <span>${clinic.rating}</span>
                        <span class="text-secondary font-normal">(${clinic.reviewsCount} รีวิว)</span>
                    </div>
                </div>
            </div>
            <div class="border-t border-dashed border-outline-variant pt-3 flex justify-between items-center">
                <div>
                    <span class="text-[10px] text-secondary block">ราคาเริ่มต้น</span>
                    <span class="text-xs font-bold text-primary">${clinic.priceRange}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="openChat('${clinic.name}')" class="bg-secondary-container text-on-surface text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1 hover:bg-orange-50 transition-all">
                        <span class="material-symbols-outlined text-[14px]">chat</span> แชตปรึกษา
                    </button>
                </div>
            </div>
        `;
        clinicsContainer.appendChild(card);
    });
}

// บันทึก Bookmark คลินิก
function toggleBookmark(id) {
    if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter(bId => bId !== id);
    } else {
        bookmarks.push(id);
    }
    localStorage.setItem('unni_bookmarks', JSON.stringify(bookmarks));
    renderClinics();
}

// อัปเดตคลินิกที่ถูกบันทึกในหน้าโปรไฟล์
function renderSavedClinics() {
    const savedContainer = document.getElementById('savedClinicsContainer');
    if (!savedContainer) return;
    savedContainer.innerHTML = '';

    const savedList = clinicsData.filter(c => bookmarks.includes(c.id));

    if (savedList.length === 0) {
        savedContainer.innerHTML = `
            <div class="p-4 bg-zinc-50 border border-dashed border-outline-variant rounded-2xl text-center text-xs text-secondary">
                ยังไม่มีคลินิกที่บันทึกเก็บไว้
            </div>
        `;
        return;
    }

    savedList.forEach(clinic => {
        const div = document.createElement('div');
        div.className = "flex justify-between items-center bg-zinc-50 p-3 rounded-2xl border border-outline-variant text-xs";
        div.innerHTML = `
            <div class="flex items-center gap-2">
                <img src="${clinic.image}" class="w-8 h-8 rounded-lg object-cover">
                <div>
                    <h5 class="font-bold">${clinic.name}</h5>
                    <p class="text-[10px] text-secondary">${clinic.priceRange}</p>
                </div>
            </div>
            <button onclick="toggleBookmark(${clinic.id}); renderSavedClinics();" class="text-primary hover:underline">ลบ</button>
        `;
        savedContainer.appendChild(div);
    });
}

// จัดการการถูกใจและการส่งคอมเมนต์
function toggleLike(id) {
    const review = reviews.find(r => r.id === id);
    if (review) {
        if (review.liked) {
            review.likes--;
            review.liked = false;
        } else {
            review.likes++;
            review.liked = true;
        }
        localStorage.setItem('unni_premium_reviews', JSON.stringify(reviews));
        renderReviews();
    }
}

function toggleComments(id) {
    const commentBox = document.getElementById(`commentBox-${id}`);
    if (commentBox) commentBox.classList.toggle('hidden');
}

function addComment(id) {
    const input = document.getElementById(`commentInput-${id}`);
    const commentText = input.value.trim();
    if (commentText === '') return;

    const review = reviews.find(r => r.id === id);
    if (review) {
        review.comments.push({
            id: Date.now(),
            username: "@Glow_Girl",
            text: commentText
        });
        input.value = '';
        localStorage.setItem('unni_premium_reviews', JSON.stringify(reviews));
        renderReviews();
        document.getElementById(`commentBox-${id}`).classList.remove('hidden');
    }
}

// เรนเดอร์ดาวคะแนนดาวรีวิว
function generateStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += `<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>`;
        } else {
            starsHTML += `<span class="material-symbols-outlined text-[16px]">star</span>`;
        }
    }
    return starsHTML;
}

// ================= CHATBOT SYSTEM =================
function openChat(name) {
    document.getElementById('chatClinicTitle').textContent = `แชตด่วนกับ ${name}`;
    document.getElementById('chatModal').classList.remove('hidden');
    
    const log = document.getElementById('chatLog');
    log.innerHTML = `
        <div class="bg-zinc-100 rounded-xl p-2.5 max-w-[85%] self-start">
            สวัสดีค่ะ ยินดีต้อนรับเข้าสู่ช่องทางติดต่อกับด่วนกับคลินิก "${name}" นะคะ มีคำถามเรื่องการรักษาตัวไหนพิมพ์ปรึกษาได้ทันทีค่ะ
        </div>
    `;
}

function openGenericChat() {
    document.getElementById('chatClinicTitle').textContent = "ปรึกษาผู้เชี่ยวชาญ UNNI 24ชม.";
    document.getElementById('chatModal').classList.remove('hidden');
}

function closeChat() {
    document.getElementById('chatModal').classList.add('hidden');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (text === '') return;

    const log = document.getElementById('chatLog');
    
    const userMsg = document.createElement('div');
    userMsg.className = "bg-primary text-white rounded-xl p-2.5 max-w-[85%] self-end mt-2";
    userMsg.textContent = text;
    log.appendChild(userMsg);
    input.value = '';
    log.scrollTop = log.scrollHeight;

    setTimeout(() => {
        let replyText = "แอดมินได้รับคำถามแล้วค่ะ ขอประสานงานคุณหมอเจ้าของเคสติดต่อกลับด่วนภายใน 5 นาทีนี้นะคะ";
        
        if (text.includes("ทำตา") || text.includes("สองชั้น") || text.includes("ตาสองชั้น")) {
            replyText = "สำหรับโปรแกรมตาสองชั้นเทคนิคเกาหลี แผลผ่าตัดเล็กมาก บวมน้อย สนใจจองโปรโมชั่นราคาพิเศษสัปดาห์นี้ไหมคะ?";
        } else if (text.includes("จมูก") || text.includes("เสริมจมูก")) {
            replyText = "การเสริมจมูกทรงฮิตของเกาหลี ปลายละมุนธรรมชาติ แนะนำจองคิวเข้ามาให้แพทย์ประเมินโครงสร้างหน้าก่อนได้ฟรีนะคะ";
        } else if (text.includes("ฟิลเลอร์") || text.includes("ราคา")) {
            replyText = "ฟิลเลอร์ Neuramis แท้ผ่าน อ.ย. นำเข้าจากเกาหลี ราคาพิเศษสำหรับผู้ใช้แอป UNNI เพียง cc ละ 4,500 บาทเท่านั้นค่ะ (ปกติ 8,000 บาท)";
        }

        const botMsg = document.createElement('div');
        botMsg.className = "bg-zinc-100 rounded-xl p-2.5 max-w-[85%] self-start mt-2";
        botMsg.textContent = replyText;
        log.appendChild(botMsg);
        log.scrollTop = log.scrollHeight;
    }, 800);
}

// ================= BOOKING SYSTEM =================
function openBookingModal(dealName, clinicName, price) {
    document.getElementById('bookDealName').value = dealName;
    document.getElementById('bookClinicName').value = clinicName;
    document.getElementById('bookPrice').value = price;

    document.getElementById('bookTitleDisplay').textContent = dealName;
    document.getElementById('bookClinicDisplay').textContent = clinicName;
    document.getElementById('bookPriceDisplay').textContent = `฿${price}`;

    document.getElementById('paymentSimulation').classList.add('hidden');
    document.getElementById('paySimBtn').textContent = "ดำเนินการชำระเงินและออกคิว";
    document.getElementById('bookingModal').classList.remove('hidden');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
}

function simPayment() {
    const paymentSim = document.getElementById('paymentSimulation');
    const payBtn = document.getElementById('paySimBtn');
    const dateInput = document.getElementById('bookDate').value;

    if (!dateInput) {
        alert("กรุณาระบุวันที่คุณต้องการจองรักษาตัวก่อนค่ะ");
        return;
    }

    if (paymentSim.classList.contains('hidden')) {
        paymentSim.classList.remove('hidden');
        payBtn.textContent = "สแกนสำเร็จ - ยืนยันจองคิวนัดรักษา";
    } else {
        const newBooking = {
            id: Date.now(),
            dealName: document.getElementById('bookDealName').value,
            clinicName: document.getElementById('bookClinicName').value,
            price: document.getElementById('bookPrice').value,
            date: document.getElementById('bookDate').value,
            doctor: document.getElementById('bookDoctor').value
        };

        bookings.unshift(newBooking);
        localStorage.setItem('unni_bookings', JSON.stringify(bookings));
        
        alert("จองคิวสำเร็จแล้ว! รายการจองจะไปแสดงอยู่ที่หน้า 'โปรไฟล์ส่วนตัว' ทันทีค่ะ");
        closeBookingModal();
        goToTab('profile');
    }
}

function renderBookingRecords() {
    const container = document.getElementById('bookingRecordsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="p-4 bg-zinc-50 border border-dashed border-outline-variant rounded-2xl text-center text-xs text-secondary">
                ยังไม่มีการนัดจองแพ็กเกจรักษาในระบบ
            </div>
        `;
        return;
    }

    bookings.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-xs flex flex-col gap-1.5 shadow-sm";
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <strong class="text-sm text-emerald-800">${book.dealName}</strong>
                <span class="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">ยืนยันคิวแล้ว</span>
            </div>
            <p class="text-secondary font-medium">คลินิก: ${book.clinicName}</p>
            <div class="text-on-surface flex flex-col gap-0.5 mt-1">
                <div>วันที่นัดหมาย: <span class="font-bold text-zinc-700">${book.date}</span></div>
                <div>แพทย์ผู้ดูแล: <span class="font-bold text-zinc-700">${book.doctor}</span></div>
                <div class="text-xs font-bold text-primary mt-1">ชำระแล้ว: ฿${book.price}</div>
            </div>
            <button onclick="cancelBooking(${book.id})" class="text-right text-[11px] text-rose-500 hover:underline mt-1">ยกเลิกการนัด</button>
        `;
        container.appendChild(card);
    });
}

function cancelBooking(id) {
    if (confirm("คุณต้องการยกเลิกนัดหมายความงามนี้ใช่หรือไม่?")) {
        bookings = bookings.filter(b => b.id !== id);
        localStorage.setItem('unni_bookings', JSON.stringify(bookings));
        renderBookingRecords();
    }
}

// ผูกฟังก์ชันเหล่านี้เข้ากับ Window Object เพื่อให้สามารถเรียกใช้ผ่าน onclick ใน HTML ได้ทันที
window.goToTab = goToTab;
window.filterByCategory = filterByCategory;
window.toggleBookmark = toggleBookmark;
window.renderSavedClinics = renderSavedClinics;
window.toggleLike = toggleLike;
window.toggleComments = toggleComments;
window.addComment = addComment;
window.openChat = openChat;
window.openGenericChat = openGenericChat;
window.closeChat = closeChat;
window.sendChatMessage = sendChatMessage;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeModalBtn;
window.simPayment = simPayment;
window.cancelBooking = cancelBooking;