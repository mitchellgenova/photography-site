document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealTargets = document.querySelectorAll(
      '.gallery-card, .portfolio h2, .services h2, .about h2, .contact h2'
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  const galleryImages = Array.from(document.querySelectorAll('.gallery-card-trigger img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  let lastFocused = null;

  function showImage(index) {
    currentIndex = index;
    const img = galleryImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    const caption = img.closest('figure').querySelector('figcaption');
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) {
      lastFocused.focus();
    }
  }

  galleryImages.forEach((img, index) => {
    img.closest('.gallery-card-trigger').addEventListener('click', (event) => {
      lastFocused = event.currentTarget;
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', () => showImage((currentIndex + 1) % galleryImages.length));
  lightboxPrev.addEventListener('click', () => showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) {
      return;
    }
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowRight') {
      showImage((currentIndex + 1) % galleryImages.length);
    } else if (event.key === 'ArrowLeft') {
      showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  });
});
