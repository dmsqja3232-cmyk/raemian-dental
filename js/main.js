// 모든 이벤트는 DOM 로드 완료 후 등록
document.addEventListener('DOMContentLoaded', () => {

  /* ===== 네비게이션: 스크롤 시 .scrolled 클래스 추가 ===== */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ===== 햄버거 메뉴 토글 ===== */
  const navToggle = document.querySelector('.nav-toggle');
  navToggle?.addEventListener('click', () => {
    nav?.classList.toggle('nav-open');
  });

  // 메뉴 링크 클릭 시 모바일 메뉴 닫기
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav?.classList.remove('nav-open');
    });
  });

  /* ===== 예약 폼 제출 처리 ===== */
  const form = document.getElementById('reservationForm');
  const formSuccess = document.getElementById('form-success');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // 필수 항목 유효성 검사: 이름, 연락처
    const name = form.querySelector('[name="name"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();

    if (!name) {
      alert('이름을 입력해 주세요.');
      return;
    }
    if (!phone) {
      alert('연락처를 입력해 주세요.');
      return;
    }

    // 폼 숨기고 완료 메시지 표시
    form.style.display = 'none';
    if (formSuccess) {
      formSuccess.style.display = 'block';
    }
  });

  /* ===== 갤러리 자동 스크롤 + 화살표 ===== */
  const galleryScroll = document.querySelector('.gallery-scroll');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');

  if (galleryScroll) {
    const CARD_W = 436; // 카드 420px + gap 16px
    let isPaused = false;
    let halfWidth = 0;

    // 아이템 무한 루프용 복제
    const origItems = [...galleryScroll.children];
    origItems.forEach(item => galleryScroll.appendChild(item.cloneNode(true)));

    // 이미지 로딩 완료 후 halfWidth 계산 (이전에는 0이었던 버그 수정)
    window.addEventListener('load', () => {
      halfWidth = galleryScroll.scrollWidth / 2;
    });

    // 자동 스크롤 (1px씩 매 14ms)
    function tick() {
      if (isPaused || halfWidth === 0) return;
      galleryScroll.scrollLeft += 1;
      if (galleryScroll.scrollLeft >= halfWidth) {
        galleryScroll.scrollLeft -= halfWidth;
      }
    }
    setInterval(tick, 14);

    // 호버 시 일시정지
    galleryScroll.addEventListener('mouseenter', () => { isPaused = true; });
    galleryScroll.addEventListener('mouseleave', () => { isPaused = false; });

    // 화살표 클릭: 자동 스크롤 잠깐 멈추고 이동
    function arrowScroll(dir) {
      isPaused = true;
      galleryScroll.scrollLeft += dir * CARD_W;
      if (galleryScroll.scrollLeft >= halfWidth) galleryScroll.scrollLeft -= halfWidth;
      if (galleryScroll.scrollLeft < 0) galleryScroll.scrollLeft += halfWidth;
      setTimeout(() => { isPaused = false; }, 500);
    }
    nextBtn?.addEventListener('click', () => arrowScroll(1));
    prevBtn?.addEventListener('click', () => arrowScroll(-1));
  }

  /* ===== 갤러리 라이트박스 ===== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');

  // 갤러리 이미지 클릭 → 라이트박스 열기
  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // 스크롤 잠금
    });
  });

  // 라이트박스 클릭 → 닫기
  lightbox?.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 복원
  });

});
