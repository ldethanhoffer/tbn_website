import { siteConfig } from './siteConfig.js';
async function loadTemplateText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load template: ${url}`);
  return res.text();
}

function buildMailto({ email, subject, body }) {
  const cleanEmail = String(email || '').trim();
  if (!cleanEmail) return '';

  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);

  const qs = params.toString();
  return qs ? `mailto:${cleanEmail}?${qs}` : `mailto:${cleanEmail}`;
}

function getSupportGroupPagePaths() {
  const nav = siteConfig.supportGroups?.nav || [];
  return nav.map((item) => {
    const href = String(item.href || '');
    const base = href.includes('/') ? href.split('/').pop() : href;
    return base || href;
  });
}

function markActiveNav() {
  document.querySelectorAll('nav > a, .nav-dropdown-menu a, .nav-dropdown-toggle').forEach((el) => {
    el.classList.remove('active');
  });

  const current = (window.location.pathname || '').replace(/\/$/, '');
  const navLinks = document.querySelectorAll('nav a[href]');

  navLinks.forEach((a) => {
    const href = a.getAttribute('href') || '';
    let hrefPath = href.startsWith('/') ? href.slice(1) : href;
    const hashIdx = hrefPath.indexOf('#');
    const pathPart = hashIdx >= 0 ? hrefPath.slice(0, hashIdx) : hrefPath;
    const hashPart = hashIdx >= 0 ? hrefPath.slice(hashIdx) : '';

    // Hash-only links (single-page navigation).
    if (!pathPart && hashPart) {
      if (window.location.hash === hashPart) a.classList.add('active');
      return;
    }

    if (current === '' && (pathPart === 'index.html' || pathPart === '')) {
      a.classList.add('active');
      return;
    }
    if (!pathPart || !current.endsWith(pathPart)) return;
    if (hashPart) {
      if (window.location.hash === hashPart) a.classList.add('active');
    } else {
      a.classList.add('active');
    }
  });

  const supportGroupPagePaths = getSupportGroupPagePaths();
  const onSupportGroupPage =
    supportGroupPagePaths.some((p) => current.endsWith(p)) || supportGroupPagePaths.includes(window.location.hash || '');
  document.querySelectorAll('[data-nav-dropdown="support-groups"] .nav-dropdown-toggle').forEach((btn) => {
    if (onSupportGroupPage) {
      btn.classList.add('active');
    }
  });
}

function initNavSupportGroupsDropdown() {
  document.querySelectorAll('[data-nav-dropdown="support-groups"]').forEach((wrap) => {
    const btn = wrap.querySelector('.nav-dropdown-toggle');
    const menu = wrap.querySelector('.nav-dropdown-menu');
    if (!btn || !menu) return;

    const closeAndRestoreNav = () => {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      markActiveNav();
    };

    const open = () => {
      document.querySelectorAll('nav > a').forEach((a) => a.classList.remove('active'));
      btn.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu.hidden) open();
      else closeAndRestoreNav();
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        btn.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
      });
    });
  });

  document.addEventListener('click', () => {
    let hadOpen = false;
    document.querySelectorAll('[data-nav-dropdown="support-groups"] .nav-dropdown-menu').forEach((menu) => {
      if (!menu.hidden) hadOpen = true;
      const wrap = menu.closest('[data-nav-dropdown="support-groups"]');
      const btn = wrap?.querySelector('.nav-dropdown-toggle');
      menu.hidden = true;
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    if (hadOpen) markActiveNav();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    let hadOpen = false;
    document.querySelectorAll('[data-nav-dropdown="support-groups"]').forEach((wrap) => {
      const b = wrap.querySelector('.nav-dropdown-toggle');
      const m = wrap.querySelector('.nav-dropdown-menu');
      if (m && !m.hidden) {
        hadOpen = true;
        m.hidden = true;
        if (b) {
          b.setAttribute('aria-expanded', 'false');
          b.focus();
        }
      }
    });
    if (hadOpen) markActiveNav();
  });
}

/** Populate Support Groups dropdown from `siteConfig.supportGroups.nav` */
function initSupportGroupsNav() {
  const items = siteConfig.supportGroups?.nav;
  if (!items?.length) return;

  document.querySelectorAll('[data-support-groups-nav]').forEach((ul) => {
    ul.replaceChildren();
    items.forEach(({ href, label }) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'none');
      const a = document.createElement('a');
      a.setAttribute('role', 'menuitem');
      a.href = href;
      a.textContent = label;
      li.appendChild(a);
      ul.appendChild(li);
    });
  });
}

function fillSupportGroupFromConfig({ root, key, setDocumentTitle }) {
  const sg = siteConfig.supportGroups;
  const page = key && sg?.pages?.[key];
  if (!page || !sg || !root) return;

  const brand = siteConfig.brandName || 'TBN';

  if (setDocumentTitle) {
    const titleEl = document.querySelector('title[data-brand-title]');
    if (titleEl) titleEl.textContent = page.pageTitle;
  }

  const citeName = sg.quote?.citeName || '';
  const qBlock = root.querySelector('[data-sg="quote-block"]');
  if (qBlock && citeName) qBlock.setAttribute('cite', citeName);

  const quoteTextEl = root.querySelector('[data-sg="quote-text"]');
  if (quoteTextEl && sg.quote?.text) quoteTextEl.textContent = `\u201c${sg.quote.text}\u201d`;

  const quoteAttrEl = root.querySelector('[data-sg="quote-attribution"]');
  if (quoteAttrEl && citeName) quoteAttrEl.textContent = `\u2014 ${citeName}`;

  const introHeading = root.querySelector('[data-sg="intro-heading"]');
  if (introHeading && sg.sharedIntro?.headingTemplate) {
    introHeading.textContent = sg.sharedIntro.headingTemplate.replace(/\{brand\}/g, brand);
  }

  const introP = root.querySelector('[data-sg="intro-paragraph"]');
  if (introP && sg.sharedIntro?.paragraph) introP.textContent = sg.sharedIntro.paragraph;

  const meetingRoot = root.querySelector('[data-sg="meeting-root"]');
  if (meetingRoot) meetingRoot.id = page.previewPanelId;

  const meetingTitle = root.querySelector('[data-sg="meeting-heading"]');
  if (meetingTitle) meetingTitle.textContent = page.meeting.title;

  const meetingHost = root.querySelector('[data-sg="meeting-paragraphs"]');
  if (meetingHost && Array.isArray(page.meeting.paragraphs)) {
    meetingHost.replaceChildren();
    page.meeting.paragraphs.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      meetingHost.appendChild(p);
    });
  }

  const wteColumn = root.querySelector('[data-sg="what-to-expect-column"]');
  const wteHeading = root.querySelector('[data-sg="what-to-expect-heading"]');
  if (wteHeading) {
    wteHeading.id = page.whatToExpectHeadingId;
    wteHeading.textContent = sg.whatToExpectHeading || 'What to expect';
  }
  if (wteColumn) wteColumn.setAttribute('aria-labelledby', page.whatToExpectHeadingId);

  const wteP = root.querySelector('[data-sg="what-to-expect-paragraph"]');
  if (wteP) wteP.textContent = page.whatToExpect;

  const cardArticle = root.querySelector('[data-sg="card-article"]');
  if (cardArticle) cardArticle.id = page.card.anchorId;

  const cardH = root.querySelector('[data-sg="card-heading"]');
  if (cardH) cardH.textContent = page.card.heading;

  const cardSched = root.querySelector('[data-sg="card-schedule"]');
  if (cardSched) cardSched.textContent = page.card.scheduleLine;

  const cardLink = root.querySelector('[data-sg="card-address-link"]');
  if (cardLink && sg.venue) {
    cardLink.href = sg.venue.mapsUrl;
    cardLink.target = '_blank';
    cardLink.rel = 'noopener noreferrer';
    cardLink.replaceChildren();
    const icon = document.createElement('span');
    icon.className = 'address-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '📍';
    cardLink.appendChild(icon);
    cardLink.appendChild(document.createTextNode(` ${sg.venue.line}`));
  }
}

/** Fill support group subpages (`body[data-support-group]`) from config */
function initSupportGroupPageFromConfig() {
  const key = document.body?.dataset?.supportGroup;
  if (!key) return;
  fillSupportGroupFromConfig({ root: document, key, setDocumentTitle: true });
}

/** Fill inline support group sections (`[data-support-group-section]`) from config */
function initSupportGroupSectionsFromConfig() {
  document.querySelectorAll('[data-support-group-section]').forEach((section) => {
    const key = section.getAttribute('data-support-group-section') || '';
    fillSupportGroupFromConfig({ root: section, key, setDocumentTitle: false });
  });
}

/** Fill `index.html` hero, CTA, and highlight cards from `siteConfig.home` */
function initHomeFromConfig() {
  const home = siteConfig.home;
  if (!home) return;

  document.querySelectorAll('[data-hero-title]').forEach((el) => {
    if (home.heroTitle != null) el.textContent = home.heroTitle;
  });

  document.querySelectorAll('[data-home-events-cta]').forEach((el) => {
    if (home.eventsCta?.href) el.setAttribute('href', home.eventsCta.href);
    if (home.eventsCta?.label != null) el.textContent = home.eventsCta.label;
  });

  document.querySelectorAll('[data-home-highlights]').forEach((section) => {
    const cards = home.highlightCards;
    if (!Array.isArray(cards) || !cards.length) return;
    section.replaceChildren();
    cards.forEach(({ title, body }) => {
      const article = document.createElement('article');
      article.className = 'card';
      const h2 = document.createElement('h2');
      h2.textContent = title;
      const p = document.createElement('p');
      p.textContent = body;
      article.appendChild(h2);
      article.appendChild(p);
      section.appendChild(article);
    });
  });
}

function initBranding() {
  const brandName = siteConfig.brandName || 'Brand';
  document.querySelectorAll('[data-brand]').forEach((el) => {
    el.textContent = brandName;
  });

  document.querySelectorAll('[data-brand-title]').forEach((el) => {
    const page = String(el.textContent || '').trim();
    el.textContent = page ? `${brandName} - ${page}` : brandName;
  });
}

function initFooterYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}

function initContactLink() {
  const { email, subject, body } = siteConfig.contact || {};
  const href = buildMailto({ email, subject, body });

  document.querySelectorAll('[data-contact-link]').forEach((a) => {
    a.setAttribute('href', href || '#');
    if (!href) a.setAttribute('aria-disabled', 'true');
  });

  const note = document.getElementById('contact-placeholder-note');
  if (note) note.hidden = Boolean(href) && !String(email || '').includes('example.com');
}

async function init() {
  // Shared layout injection: mount once into placeholder nodes.
  const headerUrl = new URL('./layout/header.html', import.meta.url);
  const footerUrl = new URL('./layout/footer.html', import.meta.url);

  let headerHtml = '';
  let footerHtml = '';
  try {
    [headerHtml, footerHtml] = await Promise.all([loadTemplateText(headerUrl), loadTemplateText(footerUrl)]);
  } catch (e) {
    // Fail safe: keep placeholders empty so the rest of JS still runs.
    console.error(e);
  }

  document
    .querySelectorAll('[data-layout="header"]')
    .forEach((el) => (el.innerHTML = headerHtml));
  document
    .querySelectorAll('[data-layout="footer"]')
    .forEach((el) => (el.innerHTML = footerHtml));

  initSupportGroupsNav();
  initSupportGroupPageFromConfig();
  initSupportGroupSectionsFromConfig();
  initHomeFromConfig();
  initBranding();
  initFooterYear();
  initContactLink();
  initNavSupportGroupsDropdown();
  markActiveNav();
}

init();
