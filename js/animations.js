// [data-animate] 요소가 뷰포트에 진입하면 .visible 클래스를 추가해 페이드인 효과 적용

(function () {
  // IntersectionObserver: 요소가 화면의 15% 이상 보일 때 감지
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // 한 번 보이면 재감지 불필요하므로 해제
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // 페이지 내 모든 [data-animate] 요소에 감지 등록
  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
})();
