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
    let autoTimer = null;
    let isPaused = false;

    // 아이템 무한 루프용 복제
    const origItems = [...galleryScroll.children];
    origItems.forEach(item => galleryScroll.appendChild(item.cloneNode(true)));
    const halfWidth = galleryScroll.scrollWidth / 2;

    // 자동 스크롤 (1px씩 매 14ms)
    function tick() {
      if (isPaused) return;
      galleryScroll.scrollLeft += 1;
      // 복제본 끝에 도달하면 처음으로 점프 (무한 루프)
      if (galleryScroll.scrollLeft >= halfWidth) {
        galleryScroll.scrollLeft -= halfWidth;
      }
    }
    autoTimer = setInterval(tick, 14);

    // 호버 시 일시정지
    galleryScroll.addEventListener('mouseenter', () => { isPaused = true; });
    galleryScroll.addEventListener('mouseleave', () => { isPaused = false; });

    // 화살표 클릭
    nextBtn?.addEventListener('click', () => {
      galleryScroll.scrollLeft += CARD_W;
      if (galleryScroll.scrollLeft >= halfWidth) galleryScroll.scrollLeft -= halfWidth;
    });
    prevBtn?.addEventListener('click', () => {
      galleryScroll.scrollLeft -= CARD_W;
      if (galleryScroll.scrollLeft < 0) galleryScroll.scrollLeft += halfWidth;
    });
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
