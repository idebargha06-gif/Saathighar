// SaathiGhar — Main JavaScript
document.addEventListener('DOMContentLoaded', () => {

  // ── Header scroll effect ──
  const header = document.querySelector('.site-header');
  if (header) window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

  // ── Mobile menu ──
  const ham = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (ham) ham.addEventListener('click', () => { ham.classList.toggle('open'); mobileMenu?.classList.toggle('open'); });

  // ── Login dropdown ──
  const loginDrop = document.getElementById('loginDropdown');
  if (loginDrop) {
    loginDrop.querySelector('.login-btn').addEventListener('click', e => { e.stopPropagation(); loginDrop.classList.toggle('open'); });
    document.addEventListener('click', () => loginDrop.classList.remove('open'));
  }

  // ── SOS Modal ──
  const sosBtn = document.getElementById('sosBtn');
  const sosModal = document.getElementById('sosModal');
  if (sosBtn && sosModal) {
    sosBtn.addEventListener('click', () => sosModal.style.display = 'flex');
    sosModal.addEventListener('click', e => { if (e.target === sosModal) sosModal.style.display = 'none'; });
    sosModal.querySelector('.modal-close')?.addEventListener('click', () => sosModal.style.display = 'none');
  }

  // ── Font size toggle ──
  document.querySelectorAll('.fs-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fs-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.documentElement.style.setProperty('--font-scale', btn.dataset.scale);
    });
  });

  // ── Counter animation ──
  const counters = document.querySelectorAll('.count-val');
  if (counters.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = parseInt(el.dataset.target);
        let cur = 0; const step = Math.ceil(target / 60);
        const t = setInterval(() => { cur = Math.min(cur + step, target); el.textContent = cur.toLocaleString('en-IN'); if (cur >= target) clearInterval(t); }, 30);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  }

  // ── Testimonials auto-rotate ──
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  let tCur = 0;
  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    tCur = (n + slides.length) % slides.length;
    slides[tCur]?.classList.add('active');
    dots[tCur]?.classList.add('active');
  }
  if (slides.length) {
    showSlide(0);
    let autoT = setInterval(() => showSlide(tCur + 1), 5000);
    document.getElementById('tPrev')?.addEventListener('click', () => { clearInterval(autoT); showSlide(tCur - 1); autoT = setInterval(() => showSlide(tCur + 1), 5000); });
    document.getElementById('tNext')?.addEventListener('click', () => { clearInterval(autoT); showSlide(tCur + 1); autoT = setInterval(() => showSlide(tCur + 1), 5000); });
    dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(autoT); showSlide(i); autoT = setInterval(() => showSlide(tCur + 1), 5000); }));
  }

  // ── Reveal on scroll ──
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(r => revealObs.observe(r));

  // ── Tab switching ──
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    group.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        group.querySelector('[data-tab-panel="' + btn.dataset.tab + '"]')?.classList.add('active');
      });
    });
  });

  // ── Dashboard sidebar nav ──
  document.querySelectorAll('.sidebar-nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      document.querySelectorAll('.dash-section').forEach(s => s.style.display = 'none');
      const sec = document.getElementById('section-' + item.dataset.section);
      if (sec) sec.style.display = 'block';
    });
  });

  // ── Dashboard mobile sidebar toggle ──
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  if (sidebarToggle && sidebar) sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

  // ── Toast helper ──
  window.showToast = (msg, type = 'info') => {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML = (icons[type] || 'ℹ️') + ' <span>' + msg + '</span>';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  };

  // ── CTA buttons with toast ──
  document.querySelectorAll('[data-toast]').forEach(btn => {
    btn.addEventListener('click', () => window.showToast(btn.dataset.toast, btn.dataset.toastType || 'info'));
  });

  // ── Ashram listing filter engine ──
  const searchInput = document.getElementById('ashramSearch');
  const stateSelect = document.getElementById('stateFilter');
  const countEl = document.getElementById('ashramCount');
  const listingsEl = document.querySelector('.ashram-listings');
  const ratingBtns = document.querySelectorAll('.star-filter-btn');

  let activeMinRating = 0; // start open — no rating filter by default

  function applyAshramFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const state = (stateSelect?.value || '').trim();
    const allCards = document.querySelectorAll('.ashram-card');
    let visible = 0;
    const visibleIds = new Set();

    allCards.forEach(card => {
      const name = (card.dataset.name || card.querySelector('.ashram-name')?.textContent || '').toLowerCase();
      const city = (card.dataset.city || '').toLowerCase();
      const cardState = (card.dataset.state || '');
      const rating = parseFloat(card.dataset.rating || '5');
      const fullText = card.textContent.toLowerCase();

      const okSearch = !q || name.includes(q) || city.includes(q) || fullText.includes(q);
      const okState = !state || state === 'All States' || cardState === state;
      const okRating = activeMinRating === 0 || rating >= activeMinRating;

      const show = okSearch && okState && okRating;
      card.style.display = show ? '' : 'none';
      if (show) {
        visible++;
        visibleIds.add(card.id);
      }
    });

    if (countEl) countEl.textContent = visible;

    // Sync map pins with visible cards
    if (typeof window._sgMapUpdatePins === 'function') {
      window._sgMapUpdatePins(visibleIds);
    }
    // No-results message
    let noRes = listingsEl?.querySelector('.sg-no-results');
    if (visible === 0 && listingsEl) {
      if (!noRes) {
        noRes = document.createElement('div');
        noRes.className = 'sg-no-results';
        noRes.style.cssText = 'padding:48px;text-align:center;color:var(--text-mid);font-size:1rem;grid-column:1/-1;';
        noRes.innerHTML = '<div style="font-size:2.5rem;margin-bottom:10px;">🔍</div><strong>No ashrams match your search</strong><br><span style="font-size:0.85rem;opacity:0.65;">Try a different city or reset your filters.</span>';
        listingsEl.appendChild(noRes);
      }
    } else {
      noRes?.remove();
    }
  }

  // Wire text search
  searchInput?.addEventListener('input', applyAshramFilters);

  // Wire state dropdown
  stateSelect?.addEventListener('change', applyAshramFilters);

  // Wire star rating buttons
  ratingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ratingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // e.g. "4★+" → 4, "4.5★+" → 4.5
      activeMinRating = parseFloat(btn.textContent) || 0;
      applyAshramFilters();
    });
  });

  // Reset filters button
  document.querySelector('.reset-filters')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (stateSelect) stateSelect.value = '';
    activeMinRating = 0;
    ratingBtns.forEach(b => b.classList.remove('active'));
    applyAshramFilters();
    window.showToast('Filters reset', 'info');
  });

  // Initial sync
  applyAshramFilters();
});
