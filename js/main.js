/**
 * SL 건축디자인 (SL Architecture & Design) - Interactive Script
 * Features: Portfolio Filter, Estimate Calculator, Modal, Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initPortfolioFilter();
  initEstimateCalculator();
  initModal();
  initContactForm();
});

/* Header Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('header.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Portfolio Filtering & Interactivity */
const portfolioData = [
  {
    id: 'public-1',
    category: 'public',
    categoryName: '공공시설물',
    title: '스마트 버스 쉘터 & 공공 경관 조형물',
    desc: '도시 경관 디자인 및 내후성 갈바/LED 공공 시설물 제작 시공',
    image: 'images/public_1.png',
    area: '시설물 규모 (길이 18m 버스 쉘터)',
    period: '소요기간: 18일',
    location: '세종특별자치시 보람동',
    details: '지자체 도시경관 가이드라인을 완벽히 준수하고 친환경 태양광 모듈 및 안내 LED 디스플레이를 내장한 스마트 공공시설물 시공 프로젝트입니다.'
  },
  {
    id: 'signage-1',
    category: 'signage',
    categoryName: '옥외광고물',
    title: '메리디안 센터 옥외 LED 특수 채널 간판',
    desc: '대형 아키텍처 석재 파사드 및 입체 파사드 조명 채널 광고 시공',
    image: 'images/signage_1.png',
    area: '건물 외벽 전체 파사드 (45m x 12m)',
    period: '소요기간: 14일',
    location: '서울 강남구 테헤란로',
    details: '고휘도 LED 모듈과 내후성이 우수한 스테인리스 아노다이징 프레임을 적용하여 주야간 시인성을 극대화한 대형 옥외광고물 프로젝트입니다.'
  },
  {
    id: 'paint-1',
    category: 'paint',
    categoryName: '도장 공사',
    title: '모던 갤러리 하우스 건축 특수 외벽 도장',
    desc: '친환경 세라믹 페인팅 및 발수/특수 코팅 마감 시공',
    image: 'images/paint_1.png',
    area: '외벽 도장 면적 380평',
    period: '소요기간: 8일',
    location: '경기 성남시 판교동',
    details: '자연 친화적 텍스처 도장 공법을 적용하여 열화 방지 및 곰팡이/방수 성능을 동시에 확보한 내구성 최고 레벨의 수성 아크릴 페인팅 공사입니다.'
  },
  {
    id: 'interior-1',
    category: 'interior',
    categoryName: '실내건축인테리어',
    title: '루미에르 메디컬 파크 VIP 라운지 & 로비',
    desc: '하이엔드 무드 조명과 프리미엄 대리석/우드 마감 실내 건축',
    image: 'images/interior_1.png',
    area: '실내 면적 85평',
    period: '소요기간: 25일',
    location: '서울 서초구 반포동',
    details: '골드 아노다이징 펜던트 조명과 차분한 월넛 목재 라인, 음향 흡음 시스템을 조합하여 최고급 호스피탈리티 분위기를 구현한 인테리어 시공 사례입니다.'
  },
  {
    id: 'signage-2',
    category: 'signage',
    categoryName: '옥외광고물',
    title: 'SL 타워 지주형 안내 광고 타워 & 루프탑 간판',
    desc: '지주형 갈바 특수 도장 및 네온 튜브 채널 조합 간판',
    image: 'images/hero_bg.png',
    area: '높이 15m 지주 광고물',
    period: '소요기간: 10일',
    location: '인천 송도국제도시',
    details: '강풍 안전 검토 인허가를 완료하고 내진 설계 및 LED 듀얼 센서를 적용한 프라이머리 랜드마크 옥외광고물입니다.'
  },
  {
    id: 'interior-2',
    category: 'interior',
    categoryName: '실내건축인테리어',
    title: '프리미엄 테크 기업 커뮤니티 오피스',
    desc: '오픈 플랜 스마트 오피스 및 글래스 파티션 인테리어',
    image: 'images/interior_1.png',
    area: '실내 면적 140평',
    period: '소요기간: 30일',
    location: '서울 마포구 상암동',
    details: '직원 복지와 업무 효율성을 극대화하기 위한 가변형 미팅룸, 펠트 흡음 루버 천장, 라인 조명을 융합한 현대적 오피스 인테리어입니다.'
  },
  {
    id: 'paint-2',
    category: 'paint',
    categoryName: '도장 공사',
    title: '상업 빌딩 주차장 에폭시 & 외벽 그래픽 도장',
    desc: '고경도 에폭시 라이닝 코팅 및 빈티지 특수 도장 마감',
    image: 'images/paint_1.png',
    area: '바닥/벽체 도장 520평',
    period: '소요기간: 12일',
    location: '경기 용인시 수지구',
    details: '주차장 바닥 논슬립 미끄럼 방지 에폭시와 건물 내부 방수/에폭시 마감으로 청결함과 내구성을 극대화했습니다.'
  }
];

function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolioGrid');
  if (!portfolioGrid) return;

  renderPortfolioItems(portfolioData);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;
      if (filterValue === 'all') {
        renderPortfolioItems(portfolioData);
      } else {
        const filtered = portfolioData.filter(item => item.category === filterValue);
        renderPortfolioItems(filtered);
      }
    });
  });
}

function renderPortfolioItems(items) {
  const portfolioGrid = document.getElementById('portfolioGrid');
  if (!portfolioGrid) return;

  portfolioGrid.innerHTML = items.map(item => `
    <div class="portfolio-card" onclick="openProjectModal('${item.id}')">
      <div class="portfolio-thumb">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <span class="portfolio-category-badge">${item.categoryName}</span>
      </div>
      <div class="portfolio-info">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <div class="portfolio-meta">
          <span><i class="ri-map-pin-line"></i> ${item.location}</span>
          <span><i class="ri-ruler-line"></i> ${item.area}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* Interactive Estimate & Cost Calculator */
function initEstimateCalculator() {
  const categoryCards = document.querySelectorAll('.estimate-options .option-card');
  const sizeInput = document.getElementById('estimateAreaInput');
  const sizeValueDisplay = document.getElementById('areaValueDisplay');
  const priceDisplay = document.getElementById('calculatedPriceDisplay');
  
  if (!sizeInput || !priceDisplay) return;

  let selectedCategory = 'signage';
  let baseRates = {
    signage: { min: 250, max: 450, unit: '개소/파사드 기준' },
    public: { min: 180, max: 380, unit: '동/개소 (도시 경관 기준)' },
    paint: { min: 4, max: 7, unit: '평당 (특수 코팅 포함)' },
    interior: { min: 120, max: 220, unit: '평당 (디자인 마감 포함)' },
    total: { min: 180, max: 320, unit: '종합 공사 평당' }
  };

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedCategory = card.dataset.category;
      updateCalculation();
    });
  });

  sizeInput.addEventListener('input', () => {
    if (sizeValueDisplay) {
      sizeValueDisplay.textContent = `${sizeInput.value} 평 / 규모`;
    }
    updateCalculation();
  });

  function updateCalculation() {
    const area = parseInt(sizeInput.value) || 30;
    const rate = baseRates[selectedCategory];
    
    let minPrice, maxPrice;

    if (selectedCategory === 'signage') {
      minPrice = rate.min + Math.floor(area * 3.5);
      maxPrice = rate.max + Math.floor(area * 7.5);
    } else {
      minPrice = area * rate.min;
      maxPrice = area * rate.max;
    }

    priceDisplay.innerHTML = `약 <span>${minPrice.toLocaleString()}만 원</span> ~ <span>${maxPrice.toLocaleString()}만 원</span>`;
  }

  updateCalculation();
}

/* Modal Functions */
function initModal() {
  const modalBackdrop = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
}

function openProjectModal(projectId) {
  const item = portfolioData.find(p => p.id === projectId);
  if (!item) return;

  const modalBackdrop = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBodyContent');

  if (modalBackdrop && modalBody) {
    modalBody.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="section-badge" style="margin-bottom: 12px;">${item.categoryName} 시공 사례</span>
        <h2 style="font-size: 2rem; color: #fff; margin-bottom: 16px;">${item.title}</h2>
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 380px; object-fit: cover; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.1);" />
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: rgba(10,13,20,0.6); padding: 20px; border-radius: 8px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.05);">
          <div><strong style="color: #cba358; display: block; font-size: 0.85rem;">시공 규모</strong> <span style="color: #fff; font-size: 0.95rem;">${item.area}</span></div>
          <div><strong style="color: #cba358; display: block; font-size: 0.85rem;">시공 기간</strong> <span style="color: #fff; font-size: 0.95rem;">${item.period}</span></div>
          <div><strong style="color: #cba358; display: block; font-size: 0.85rem;">현장 위치</strong> <span style="color: #fff; font-size: 0.95rem;">${item.location}</span></div>
        </div>
        <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 10px;">시공 핵심 특징</h4>
        <p style="color: #9ca3af; font-size: 1rem; line-height: 1.7;">${item.details}</p>
      </div>
      <div style="text-align: right;">
        <button class="btn-primary" onclick="closeModal(); document.getElementById('estimateSection').scrollIntoView({behavior: 'smooth'});">
          이와 같은 시공 견적 문의하기
        </button>
      </div>
    `;
    modalBackdrop.classList.add('active');
  }
}

function closeModal() {
  const modalBackdrop = document.getElementById('projectModal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
  }
}

/* Contact Form */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('SL 건축디자인 상담 신청이 정상 접수되었습니다.\n담당 실장이 빠르게 안내 연락드리겠습니다.');
    form.reset();
  });
}
