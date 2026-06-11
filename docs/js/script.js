/* =========================================
   TEMA — dark (primário) / light toggle
   ========================================= */
const root = document.documentElement;

// Lê preferência salva; padrão é dark
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* =========================================
   NAVBAR — scroll effect
   ========================================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

/* =========================================
   MOBILE MENU — toggle
   ========================================= */
const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-menu');
const projectsDropdown = document.querySelector('.nav-dropdown');
const projectsToggle = document.getElementById('projects-toggle');
const projectSectionIds = ['projetos', 'cases', 'pessoais'];

const closeProjectsDropdown = () => {
  if (!projectsDropdown || !projectsToggle) return;
  projectsDropdown.classList.remove('open');
  projectsToggle.setAttribute('aria-expanded', 'false');
};

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

projectsToggle.addEventListener('click', () => {
  const isOpen = projectsDropdown.classList.toggle('open');
  projectsToggle.setAttribute('aria-expanded', isOpen);
});

projectsToggle.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProjectsDropdown();
});

// Close on nav link click
menu.querySelectorAll('.nav-link, .nav-dropdown__link').forEach(link => {
  link.addEventListener('click', () => {
    if (link === projectsToggle) return;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    closeProjectsDropdown();
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    closeProjectsDropdown();
  }
});

/* =========================================
   ACTIVE NAV LINK — highlight on scroll
   ========================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const projectLinks = document.querySelectorAll('.nav-dropdown__link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isProjectsToggle = link === projectsToggle;
        link.classList.toggle('active',
          href === `#${id}` || (isProjectsToggle && projectSectionIds.includes(id))
        );
      });
      projectLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* =========================================
   SCROLL REVEAL — IntersectionObserver
   ========================================= */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced) {
  // Just show everything immediately if user prefers reduced motion
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  // Stagger children within grid/list containers
  const staggerContainers = [
    '.sobre-cards',
    '.timeline',
    '.academic-projects',
    '.professional-projects',
    '#pessoais',
    '.skills-grid',
    '.contact-inner',
  ];

  document.querySelectorAll('.reveal').forEach(el => {
    const parentContainer = staggerContainers
      .map(sel => el.closest(sel))
      .find(Boolean);

    if (parentContainer) {
      const siblings = Array.from(parentContainer.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${idx * 75}ms`;
    }

    revealObserver.observe(el);
  });
}
