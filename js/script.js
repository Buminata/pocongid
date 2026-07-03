/**
 * Pocong.id - Production JavaScript
 * Mobile-optimised: animations disabled on low-end / small screens
 */
(function () {
  'use strict';

  var CONFIG = window.POCONG_CONFIG || {};
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Treat phones (< 768px) or slow connections as "lite" mode
  var isMobile = window.innerWidth < 768;
  var isSlowConn = (navigator.connection &&
    (navigator.connection.saveData ||
      navigator.connection.effectiveType === '2g' ||
      navigator.connection.effectiveType === 'slow-2g'));
  var liteMode = isMobile || isSlowConn || prefersReducedMotion;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initSkipLink();
    initLoadingScreen();

    if (!liteMode) {
      initTypingEffect();
      initRainEffect();
      initLightningEffect();
      initParallaxHero();
      initCardTilt();
      initTicker();
    } else {
      initStaticHeroText();
      // Hide heavy decorative elements immediately on mobile
      hideElement('rain-container');
      hideElement('lightning-flash');
      // Stop ticker animation on mobile
      var track = document.querySelector('.news-ticker-track');
      if (track) track.style.animationPlayState = 'paused';
    }

    initStickyNavbar();
    initHamburgerMenu();
    initScrollAnimations();
    initBackToTop();
    initLazyLoading();
    initSearch();
    initNewsletterForm();
    initContactForm();
    initReadingProgress();
    setActiveNavLink();
    initToastContainer();
    initGoogleAnalytics();
  }

  function hideElement(id) {
    var el = document.getElementById(id);
    if (el) {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    }
  }

  /* ---------- Utilities ---------- */
  function throttle(fn, wait) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(null, arguments);
      }
    };
  }

  function showToast(message, type) {
    var container = document.getElementById('toast-container');
    if (!container) return;
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'success');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add('visible');
    });
    setTimeout(function () {
      toast.classList.remove('visible');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3500);
  }

  function initToastContainer() {
    if (document.getElementById('toast-container')) return;
    var el = document.createElement('div');
    el.id = 'toast-container';
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    document.body.appendChild(el);
    window.PocongToast = showToast;
  }

  function initSkipLink() {
    var skip = document.querySelector('.skip-link');
    if (!skip) return;
    skip.addEventListener('click', function (e) {
      var target = document.getElementById('main-content');
      if (target) {
        e.preventDefault();
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

  /* ---------- Loading Screen ---------- */
  function initLoadingScreen() {
    var loader = document.getElementById('loading-screen');
    if (!loader) return;
    document.body.classList.add('loading');
    var delay = liteMode ? 0 : 800;
    var hide = function () {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      loader.setAttribute('aria-hidden', 'true');
    };
    if (document.readyState === 'complete') {
      setTimeout(hide, delay);
    } else {
      window.addEventListener('load', function () {
        setTimeout(hide, delay);
      });
    }
  }

  /* ---------- Typing Effect ---------- */
  function initStaticHeroText() {
    var el = document.getElementById('typing-text');
    if (el) el.textContent = CONFIG.tagline || 'Cerita Horor Nusantara yang Membuat Bulu Kuduk Berdiri.';
    var cursor = document.querySelector('.typing-cursor');
    if (cursor) cursor.style.display = 'none';
  }

  function initTypingEffect() {
    var element = document.getElementById('typing-text');
    if (!element) return;
    var phrases = [
      'Cerita Horor Nusantara yang Membuat Bulu Kuduk Berdiri.',
      'Kisah Pocong dari Seluruh Penjuru Indonesia.',
      'Misteri yang Belum Terpecahkan hingga Kini.',
      'Urban Legend yang Menggerogoti Pikiran Anda.'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;
    var timer;

    function type() {
      var currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        element.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 35;
      } else {
        element.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 70;
      }
      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }
      timer = setTimeout(type, typeSpeed);
    }
    type();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearTimeout(timer);
      else if (!element.textContent) type();
    });
  }

  /* ---------- Rain Effect (desktop only) ---------- */
  function initRainEffect() {
    var container = document.getElementById('rain-container');
    if (!container) return;
    var dropCount = 50; // only called in non-lite mode (desktop)
    var frag = document.createDocumentFragment();
    for (var i = 0; i < dropCount; i++) {
      var drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      drop.style.opacity = String(Math.random() * 0.25 + 0.08);
      frag.appendChild(drop);
    }
    container.appendChild(frag);
  }

  /* ---------- Lightning (desktop only) ---------- */
  function initLightningEffect() {
    var flash = document.getElementById('lightning-flash');
    if (!flash) return;
    function trigger() {
      flash.classList.add('active');
      setTimeout(function () { flash.classList.remove('active'); }, 80);
    }
    function schedule() {
      setTimeout(function () {
        if (!document.hidden) trigger();
        schedule();
      }, Math.random() * 18000 + 12000);
    }
    schedule();
  }

  /* ---------- Sticky Navbar ---------- */
  function initStickyNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    var onScroll = throttle(function () {
      navbar.classList.toggle('scrolled', window.pageYOffset > 40);
    }, 100); // throttle more aggressively on mobile
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Hamburger Menu ---------- */
  function initHamburgerMenu() {
    var hamburger = document.querySelector('.hamburger');
    var nav = document.querySelector('.navbar-nav');
    if (!hamburger || !nav) return;

    function setOpen(open) {
      hamburger.classList.toggle('active', open);
      nav.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    }

    hamburger.addEventListener('click', function () {
      setOpen(!nav.classList.contains('active'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- Scroll Animations ---------- */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    if (!elements.length) return;
    if (liteMode) {
      // On mobile just make everything visible immediately — no staggered delays
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Back to Top ---------- */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    var toggle = throttle(function () {
      btn.classList.toggle('visible', window.pageYOffset > 400);
    }, 200);
    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: liteMode ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Parallax Hero (desktop only) ---------- */
  function initParallaxHero() {
    var heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          heroBg.style.transform = 'scale(1.1) translateY(' + (window.pageYOffset * 0.35) + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Lazy Loading ---------- */
  function initLazyLoading() {
    // Native lazy loading already handled by loading="lazy" attribute.
    // Just add loaded class for fade-in effect.
    var images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function (img) {
      img.addEventListener('load', function () { img.classList.add('loaded'); });
      if (img.complete) img.classList.add('loaded');
    });
  }

  /* ---------- Search ---------- */
  function initSearch() {
    var searchForm = document.querySelector('.search-form');
    var searchInput = searchForm && searchForm.querySelector('input[type="search"]');
    if (!searchForm || !searchInput) return;

    var searchData = [
      { title: 'Pocong Penunggu Jembatan Tua', url: 'artikel1.html', category: 'Cerita Horor' },
      { title: 'Rumah Kos Nomor 13', url: 'artikel2.html', category: 'Misteri' },
      { title: 'Pocong Tanpa Wajah di Makam Belanda', url: 'artikel3.html', category: 'Urban Legend' },
      { title: 'Tangisan Pocong dari Tengah Sawah', url: 'artikel4.html', category: 'Cerita Horor' },
      { title: 'Legenda Pocong Berlumuran Tanah Merah', url: 'artikel5.html', category: 'Urban Legend' },
      { title: 'Tentang Pocong.id', url: 'tentang.html', category: 'Tentang' },
      { title: 'Hubungi Kami', url: 'kontak.html', category: 'Kontak' }
    ];

    var resultsContainer = searchForm.querySelector('.search-results');
    if (!resultsContainer) {
      resultsContainer = document.createElement('ul');
      resultsContainer.className = 'search-results';
      resultsContainer.setAttribute('role', 'listbox');
      resultsContainer.setAttribute('aria-label', 'Hasil pencarian');
      searchForm.appendChild(resultsContainer);
    }

    function renderResults(results) {
      resultsContainer.innerHTML = '';
      if (!results.length) {
        var empty = document.createElement('li');
        empty.className = 'no-results';
        empty.textContent = 'Tidak ada hasil ditemukan';
        resultsContainer.appendChild(empty);
      } else {
        results.forEach(function (item) {
          var li = document.createElement('li');
          li.setAttribute('role', 'option');
          var a = document.createElement('a');
          a.href = item.url;
          a.textContent = item.title + ' ';
          var small = document.createElement('small');
          small.textContent = '(' + item.category + ')';
          a.appendChild(small);
          li.appendChild(a);
          resultsContainer.appendChild(li);
        });
      }
      resultsContainer.classList.add('active');
    }

    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();
      if (query.length < 2) {
        resultsContainer.classList.remove('active');
        return;
      }
      renderResults(searchData.filter(function (item) {
        return item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      }));
    });

    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var query = searchInput.value.toLowerCase().trim();
      if (!query) return;
      var match = searchData.find(function (item) {
        return item.title.toLowerCase().includes(query);
      });
      if (match) window.location.href = match.url;
      else showToast('Tidak ada artikel yang cocok.', 'error');
    });

    document.addEventListener('click', function (e) {
      if (!searchForm.contains(e.target)) resultsContainer.classList.remove('active');
    });
  }

  /* ---------- Forms ---------- */
  function initNewsletterForm() {
    document.querySelectorAll('.newsletter-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = form.querySelector('input[type="email"]');
        if (email && email.value && email.checkValidity()) {
          showToast('Terima kasih! Anda berlangganan newsletter Pocong.id.');
          email.value = '';
        }
      });
    });
  }

  function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        showToast('Mohon lengkapi semua field wajib.', 'error');
        return;
      }
      showToast('Pesan terkirim. Tim kami akan segera menghubungi Anda.');
      form.reset();
    });
  }

  /* ---------- Reading Progress ---------- */
  function initReadingProgress() {
    var bar = document.getElementById('reading-progress');
    var article = document.querySelector('.article-content');
    if (!bar || !article) return;
    var update = throttle(function () {
      var total = article.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      var scrolled = window.pageYOffset - article.offsetTop;
      var pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      bar.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
    }, liteMode ? 100 : 16);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- Card Tilt (desktop only) ---------- */
  function initCardTilt() {
    document.querySelectorAll('.article-card, .about-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'translateY(-5px) perspective(600px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 4) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Breaking News Ticker (desktop only) ---------- */
  function initTicker() {
    var ticker = document.querySelector('.news-ticker-track');
    if (!ticker) return;
    var items = ticker.children;
    if (items.length) {
      for (var i = 0; i < items.length; i++) {
        ticker.appendChild(items[i].cloneNode(true));
      }
    }
  }

  /* ---------- Active Nav ---------- */
  function setActiveNavLink() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    if (current === '') current = 'index.html';
    document.querySelectorAll('.navbar-nav a').forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === current);
    });
  }

  /* ---------- Google Analytics ---------- */
  function initGoogleAnalytics() {
    var gaId = CONFIG.analyticsId;
    if (!gaId || gaId === 'G-XXXXXXXXXX') return;
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(gaScript);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { anonymize_ip: true, cookie_flags: 'SameSite=None;Secure' });
  }
})();
