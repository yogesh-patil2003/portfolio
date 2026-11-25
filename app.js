/* ==========================================================================
   YOGESH ANIL PATIL — PORTFOLIO INTERACTIVITY
   Includes: 3D Physics Lanyard ID Badge, Recruiter View Modal, Theme Toggle,
             Interactive SQL/DAX Workbench, Project Filter & Case Study Dialog
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Toast Utility
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // 3. Theme Switcher (Obsidian Dark <-> Ivory Light)
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('yp-theme');

  const sunSVG = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  const moonSVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeIcon.innerHTML = moonSVG;
    } else {
      root.removeAttribute('data-theme');
      themeIcon.innerHTML = sunSVG;
    }
    localStorage.setItem('yp-theme', theme);
  }

  applyTheme(savedTheme || 'dark');

  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    showToast(next === 'light' ? 'Switched to Ivory Editorial theme' : 'Switched to Obsidian Analytics theme');
  });

  // 4. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // 5. Interactive 3D Hanging Lanyard ID Card (Drag Swing + Hover Tilt + Click Flip)
  const rig = document.getElementById('lanyardRig');
  const card3d = document.getElementById('idCard3D');

  if (rig && card3d) {
    let isDragging = false;
    let moved = false;
    let startX = 0;
    let startY = 0;

    rig.addEventListener('pointerdown', (e) => {
      isDragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      rig.classList.add('dragging');
      rig.setPointerCapture(e.pointerId);
    });

    rig.addEventListener('pointermove', (e) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.hypot(dx, dy) > 6) moved = true;
        const clampedX = Math.max(-75, Math.min(75, dx * 0.55));
        const clampedY = Math.max(-35, Math.min(55, dy * 0.45));
        const swingDeg = Math.max(-18, Math.min(18, -dx * 0.14));
        rig.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) rotateZ(${swingDeg}deg)`;
      } else {
        const rect = rig.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = relX * 16;
        const rotX = -relY * 12;
        rig.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
    });

    const releaseRig = () => {
      if (!isDragging) return;
      isDragging = false;
      rig.classList.remove('dragging');
      rig.style.transform = 'translate3d(0, 0, 0) rotateZ(0deg)';
      if (!moved) {
        card3d.classList.toggle('flipped');
      }
    };

    rig.addEventListener('pointerup', releaseRig);
    rig.addEventListener('pointercancel', releaseRig);
    rig.addEventListener('pointerleave', () => {
      if (!isDragging) {
        rig.style.transform = 'rotateX(0deg) rotateY(0deg)';
      }
    });
  }

  // 6. Interactive SQL / DAX Workbench Tabs & Execution
  const tTabs = document.querySelectorAll('.t-tab');
  const tPanels = document.querySelectorAll('.telemetry-panel');
  const runQueryBtn = document.getElementById('runQueryBtn');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const outputStatusText = document.getElementById('outputStatusText');
  const outputLatency = document.getElementById('outputLatency');
  const outputTable = document.getElementById('outputTable');

  const queryOutputs = {
    sql: {
      status: 'MySQL View Executed · 5 Regions Ranked by Operating Margin',
      latency: '42ms · 200 OK',
      headers: ['Region', 'Revenue', 'Profit', 'Margin %', 'Rank'],
      rows: [
        ['Australia', '$9,061,000.58', '$3,892,100.12', '42.95%', '1'],
        ['Southwest', '$5,640,200.30', '$2,310,500.40', '40.96%', '2'],
        ['Northwest', '$3,620,100.20', '$1,480,200.10', '40.89%', '3'],
        ['United Kingdom', '$3,390,800.75', '$1,390,400.25', '41.01%', '4'],
        ['Germany', '$2,890,300.60', '$1,190,100.20', '41.18%', '5']
      ]
    },
    dax: {
      status: 'Power BI DAX Calculated · 134,590 Bookings Filtered',
      latency: '28ms · PARITY VERIFIED',
      headers: ['DAX Measure', 'Evaluated Metric', 'Operational Benchmark', 'Status'],
      rows: [
        ['Realized Revenue', '₹1,712,593,000', '₹1.70B+ Baseline', '100.7% Target Achieved'],
        ['Cancellation Leakage %', '24.83%', '< 25.0% Risk Limit', 'Margin Protected'],
        ['Average Daily Rate (ADR)', '₹12,700', '₹12,500 Benchmark', '+1.6% Yield Gain'],
        ['Average Occupancy', '57.87%', '55.0% Industry Avg', '+2.87% Above Norm']
      ]
    }
  };

  let currentWorkbenchTab = 'sql';

  function renderOutputTable(type) {
    const data = queryOutputs[type] || queryOutputs.sql;
    if (!outputTable) return;
    outputTable.innerHTML = `
      <thead>
        <tr>${data.headers.map((h) => `<th>${h}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${data.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}
      </tbody>
    `;
    if (outputStatusText) outputStatusText.textContent = data.status;
    if (outputLatency) outputLatency.textContent = data.latency;
  }

  tTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      currentWorkbenchTab = target;
      tTabs.forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
      tPanels.forEach((p) => {
        p.classList.toggle('active', p.id === `panel-${target}`);
      });
      renderOutputTable(target);
    });
  });

  if (runQueryBtn) {
    runQueryBtn.addEventListener('click', () => {
      runQueryBtn.disabled = true;
      const originalHTML = runQueryBtn.innerHTML;
      runQueryBtn.innerHTML = `
        <span class="pulse-dot" style="width:6px;height:6px;background:var(--gold);"></span>
        <span>Executing...</span>
      `;
      if (outputStatusText) outputStatusText.textContent = 'Executing query across Star Schema...';

      setTimeout(() => {
        renderOutputTable(currentWorkbenchTab);
        runQueryBtn.disabled = false;
        runQueryBtn.innerHTML = originalHTML;
        showToast(currentWorkbenchTab === 'sql' ? 'MySQL view compiled: 5 regions ranked' : 'Power BI DAX evaluated: 134K bookings analyzed');
      }, 420);
    });
  }

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', async () => {
      const activePanel = document.querySelector('.telemetry-panel.active pre');
      if (activePanel) {
        const code = activePanel.textContent;
        try {
          await navigator.clipboard.writeText(code);
          showToast('Query snippet copied to clipboard!');
        } catch {
          showToast('Snippet ready in editor.');
        }
      }
    });
  }

  // 7. Project Filter Pills
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle('active', b === btn));

      projectCards.forEach((card) => {
        const cats = (card.dataset.category || '').split(' ');
        const match = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // Helper: Light-dismiss for native <dialog>
  function enableBackdropDismiss(dialogEl) {
    dialogEl.addEventListener('click', (e) => {
      const rect = dialogEl.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) dialogEl.close();
    });
  }

  // 8. Recruiter View Modal
  const recruiterModal = document.getElementById('recruiterModal');
  const recruiterBtn = document.getElementById('recruiterViewBtn');
  const closeRecruiterBtn = document.getElementById('closeRecruiterModal');

  if (recruiterBtn && recruiterModal) {
    recruiterBtn.addEventListener('click', () => recruiterModal.showModal());
    closeRecruiterBtn.addEventListener('click', () => recruiterModal.close());
    enableBackdropDismiss(recruiterModal);
  }

  // 9. Native <dialog> Project Case Study Modal
  const modal = document.getElementById('caseModal');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeModalBtn = document.getElementById('closeModal');

  const caseStudies = {
    spotify: {
      category: 'PROJECT 01 · CONSUMER MEDIA BI',
      title: 'Interactive Spotify Top 50 Analytics Dashboard',
      gallery: [
        { label: 'Overview Page', src: 'assets/spotify-overview.png' },
        { label: 'Artists Tab', src: 'assets/spotify-artists.png' },
        { label: 'Songs Tab', src: 'assets/spotify-songs.png' }
      ],
      problem: 'Static Spotify Top 50 rankings highlight daily popularity but fail to explain album vs. single endurance, explicit content distribution, or seasonal release peaks across artists.',
      solution: 'Built a dark-mode, 3-page Power BI application styled after Spotify’s desktop UI with custom navigation tabs (Overview, Artists, Songs), interactive slicers, and dynamic album artwork.',
      model: '27,800 track records cleaned via Power Query ETL; DAX measures using CALCULATE, DISTINCTCOUNT, AVERAGE popularity, and Month/Quarter toggles (789 distinct songs, 342 artists).',
      impact: 'Revealed 66.9% album share vs. 32.0% singles, 59.8% non-explicit reach, Q3/Q4 release surges (Jul/Oct/Nov), and top artist leadership (Taylor Swift: 85 distinct tracks).',
      github: 'https://github.com/yogesh-patil2003/Interactive-Spotify-Analytics-Dashboard-using-Power-BI'
    },
    shodwe: {
      category: 'PROJECT 02 · HOSPITALITY REVENUE BI',
      title: 'Shodwe Hotels & Resorts — Revenue & Yield BI Suite',
      gallery: [
        { label: '01 Briefing & Schema', src: 'assets/shodwe-page1-briefing.png' },
        { label: '02 Revenue & Yield', src: 'assets/shodwe-page2-revenue.png' },
        { label: '03 Demographics & Scorecard', src: 'assets/shodwe-page3-demographics.jpg' },
        { label: '04 AI Decomposition Radar', src: 'assets/shodwe-page4-ai-radar.png' }
      ],
      problem: 'Hospitality leadership lacked unified visibility across 25 luxury properties into why room revenue underperformed capacity, which booking channels leaked margin, and where cancellations spiked.',
      solution: 'Designed a 4-page executive BI suite across Power BI & Tableau featuring Executive KPI Scorecards, Channel Drag, Weekly Revenue Trends, and Property Yield Analytics.',
      model: 'Conformed Star Schema over 134,590 transactional hotel bookings (92 operating days) joining fact_bookings & fact_aggregated_bookings with dim_hotels, dim_rooms, and dim_date.',
      impact: 'Audited ₹1.71 Billion realized revenue, 57.87% average occupancy, ₹12.70K ADR, and isolated 24.83% cancellation revenue erosion by platform.',
      github: 'https://github.com/yogesh-patil2003/Shodwe-Hotels-Hospitality-BI'
    },
    adventureworks: {
      category: 'PROJECT 03 · SQL & MULTI-TOOL BI',
      title: 'AdventureWorks Sales & Multi-Tool BI Workbench',
      gallery: [
        { label: 'Tableau Executive Dashboard', src: 'assets/adventureworks-tableau.png' },
        { label: 'Power BI Analytical Breakdown', src: 'assets/adventureworks-powerbi.png' }
      ],
      problem: 'Organizations migrating metrics across Excel, Power BI, and Tableau frequently suffer from conflicting KPI numbers when business logic lives inconsistently inside each frontend tool.',
      solution: 'Centralized business rules in a 467-line MySQL 8 analytical layer (WITH CTEs, UNION ALL, DENSE_RANK(), NULLIF safety) exposing 4 standardized executive views consumed by all three BI tools.',
      model: '60,398 transactional internet sales records validated across MySQL views, Power BI Star Schema, Tableau workbook ($29.36M Sales, $12.08M Profit, 41.15% Margin), and a 30MB Excel Power Pivot model.',
      impact: 'Eliminated metric drift across tools, delivered 100% KPI parity across territory revenue, product margins, and customer cohorts, and resolved strict ONLY_FULL_GROUP_BY aggregation edge cases.',
      github: 'https://github.com/yogesh-patil2003/AdventureWorks'
    },
    supplychain: {
      category: 'PROJECT 04 · SUPPLY CHAIN ANALYTICS',
      title: 'Sustainable Supply Chain Performance BI',
      gallery: [
        { label: 'Shipment Performance Overview', src: 'assets/supplychain-powerbi.png' }
      ],
      problem: 'Siloed procurement, production, inventory, and logistics spreadsheets prevented operations leaders from balancing carrier cost efficiency against On-Time In-Full (OTIF) reliability and defect rates.',
      solution: 'Architected a 9-table Multi-Fact Star Schema in Power BI integrating end-to-end supply chain telemetry into interactive supplier scorecards, India route maps, and lead-time trackers.',
      model: '24,612 total rows across 5 fact tables (fact_sales, fact_shipment, fact_production, fact_procurement, fact_inventory) and 4 conformed dimensions (dim_date, dim_product, dim_supplier, dim_facility).',
      impact: 'Unified shipment volume (3.59K), on-time delivery tracking (38.52% benchmark), route distance (2.89M km), and vehicle punctuality into a single drill-through executive scorecard.',
      github: 'https://github.com/yogesh-patil2003/Sustainable-Supply-Chain-Performance-Dashboard'
    },
    geoalert: {
      category: 'PROJECT 05 · B.E. CAPSTONE (COPYRIGHT FILED)',
      title: 'GeoAlert — Satellite Environmental Change Detection',
      gallery: [
        { label: 'Live Deployed Platform (Vercel)', src: 'assets/geoalert-live.png' }
      ],
      problem: 'Manual satellite imagery review is too slow to detect rapid deforestation, unauthorized construction, or ecological shifts across monitored regions.',
      solution: 'Co-developed an automated geospatial monitoring web platform ingesting Sentinel-2 imagery to compute NDVI vegetation deltas and trigger automated SMTP alerts, deployed live on Vercel.',
      model: 'FastAPI backend + React 19 frontend + Sentinel-2 STAC / Google Earth Engine pipeline. Owned technical documentation, alert workflow design, presentation architecture, and official copyright filing.',
      impact: 'Successfully shipped live capstone platform (geo-alert-ten.vercel.app) with formal IP copyright filing completed alongside B.E. Computer Engineering teammates.',
      github: 'https://github.com/yogesh-patil2003/GeoAlert',
      demo: 'https://geo-alert-ten.vercel.app/'
    }
  };

  function openCaseStudy(key) {
    const cs = caseStudies[key];
    if (!cs) return;
    modalCategory.textContent = cs.category;
    modalTitle.textContent = cs.title;

    let galleryHTML = '';
    if (cs.gallery && cs.gallery.length) {
      galleryHTML = `
        <div class="modal-gallery">
          <div class="modal-img-frame">
            <img id="modalMainImg" src="${cs.gallery[0].src}" alt="${cs.title} - ${cs.gallery[0].label}" />
          </div>
          <div class="modal-thumb-tabs">
            ${cs.gallery.map((g, i) => `
              <button type="button" class="filter-btn ${i === 0 ? 'active' : ''}" data-gallery-src="${g.src}" data-gallery-label="${g.label}">${g.label}</button>
            `).join('')}
          </div>
        </div>
      `;
    }

    modalBody.innerHTML = `
      ${galleryHTML}
      <div class="modal-grid">
        <div class="modal-box"><h4>Business Problem</h4><p>${cs.problem}</p></div>
        <div class="modal-box"><h4>Engineered Solution</h4><p>${cs.solution}</p></div>
        <div class="modal-box"><h4>Data Model &amp; Architecture</h4><p>${cs.model}</p></div>
        <div class="modal-box"><h4>Verified Impact &amp; Insights</h4><p>${cs.impact}</p></div>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:16px;">
        <a href="${cs.github}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Open GitHub Repository &rarr;</a>
        ${cs.demo ? `<a href="${cs.demo}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Open Live Demo &rarr;</a>` : ''}
      </div>
    `;

    modalBody.querySelectorAll('[data-gallery-src]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const img = document.getElementById('modalMainImg');
        if (img) {
          img.src = btn.dataset.gallerySrc;
          img.alt = `${cs.title} - ${btn.dataset.galleryLabel}`;
        }
        modalBody.querySelectorAll('[data-gallery-src]').forEach((b) => b.classList.toggle('active', b === btn));
      });
    });

    modal.showModal();
  }

  document.querySelectorAll('[data-modal]').forEach((btn) => {
    btn.addEventListener('click', () => openCaseStudy(btn.dataset.modal));
  });

  closeModalBtn.addEventListener('click', () => modal.close());
  enableBackdropDismiss(modal);

  // 9B. Certificate Lightbox Modal (reuses native <dialog>)
  const certificates = {
    nasscom: {
      issuer: 'NASSCOM FutureSkills Prime (MeitY)',
      title: 'Certificate Program in Data Analyst — Gold (83%, NSQF Level 5)',
      img: 'assets/certs/cert-nasscom.png',
      pdf: 'assets/certs/nasscom-gold.pdf',
      id: 'FSP/2026/10/10500242',
      date: '24 October 2026 · Gold Category (83/100)'
    },
    excelr: {
      issuer: 'ExcelR Solutions, Pune',
      title: 'Data Analyst — Certificate of Excellence (90% FAT Score)',
      img: 'assets/certs/cert-excelr.png',
      pdf: 'assets/certs/excelr-excellence.pdf',
      id: '36006/EXCELR/16072026',
      date: '16 July 2026 · Final Assessment: 54/60 (90%)'
    },
    hackerrank: {
      issuer: 'HackerRank',
      title: 'SQL (Basic) Verified Skill Certification',
      img: 'assets/certs/cert-hackerrank.png',
      pdf: 'assets/certs/hackerrank-sql.pdf',
      id: '7D8A7B52503B',
      date: '29 January 2026'
    },
    infosys: {
      issuer: 'Infosys Springboard',
      title: 'SQL Developer Professional Certification',
      img: 'assets/certs/cert-infosys.png',
      pdf: 'assets/certs/infosys-sql.pdf',
      id: 'QR Verified on Springboard',
      date: 'September 2025'
    },
    cisco: {
      issuer: 'Cisco Networking Academy & OpenEDG Python Institute',
      title: 'Python Essentials 1 & Python Essentials 2',
      img: 'assets/certs/cert-cisco.png',
      pdf: 'assets/certs/cisco-python.pdf',
      id: 'OpenEDG Verified',
      date: '21 February 2026'
    },
    mckinsey: {
      issuer: 'McKinsey.org & IBM SkillsBuild',
      title: 'McKinsey.org Forward Program & IBM Cloud Fundamentals',
      img: 'assets/certs/cert-mckinsey.png',
      pdf: 'assets/certs/mckinsey-forward.pdf',
      id: 'IBM Credly: 68154d88-c10d-4be9',
      date: 'December 2025 – January 2026'
    }
  };

  document.querySelectorAll('[data-cert]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const c = certificates[btn.dataset.cert];
      if (!c) return;
      modalCategory.textContent = c.issuer;
      modalTitle.textContent = c.title;
      modalBody.innerHTML = `
        <div class="modal-img-frame" style="background:#f4f6f9; padding:12px;">
          <img src="${c.img}" alt="${c.title}" style="max-height:62vh; width:auto; margin:0 auto; border-radius:6px;" />
        </div>
        <div class="modal-grid" style="margin-top:14px;">
          <div class="modal-box"><h4>Credential ID</h4><p>${c.id}</p></div>
          <div class="modal-box"><h4>Issued / Assessment</h4><p>${c.date}</p></div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:14px;">
          <a href="${c.pdf}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Open Official Certificate PDF &rarr;</a>
        </div>
      `;
      modal.showModal();
    });
  });

  // 10. Copy Email Buttons
  async function copyEmail() {
    const email = 'officialyogeshpatil0@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied: ' + email);
    } catch {
      window.location.href = 'mailto:' + email;
    }
  }

  document.getElementById('copyEmailBtn')?.addEventListener('click', copyEmail);
  document.getElementById('recruiterCopyEmail')?.addEventListener('click', copyEmail);

  // 11. Contact Form Mailto Composer
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const msg = document.getElementById('senderMsg').value.trim();
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Yogesh,\n\n${msg}\n\nBest regards,\n${name}\n(${email})`);
      window.location.href = `mailto:officialyogeshpatil0@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client...');
    });
  }

  // 12. Progressive Scroll Reveal & Nav Scroll-Spy
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-hidden');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.04 }
  );
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top >= window.innerHeight * 0.95) {
      el.classList.add('is-hidden');
      observer.observe(el);
    } else {
      el.classList.add('visible');
    }
  });

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navItems = Array.from(document.querySelectorAll('.nav-links a'));

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 150;
    let activeId = 'top';
    if (window.scrollY >= 160) {
      for (const sec of sections) {
        if (sec.offsetTop <= scrollPos) {
          activeId = sec.id;
        }
      }
    }
    navItems.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`);
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  // 13. Top Luminous Scroll Progress Bar & Floating Back-to-Top with SVG Progress Ring
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTop');
  const progressRingCircle = document.getElementById('progressRingCircle');
  const circumference = 2 * Math.PI * 19; // ~119.38

  if (progressRingCircle) {
    progressRingCircle.style.strokeDasharray = `${circumference}`;
    progressRingCircle.style.strokeDashoffset = `${circumference}`;
  }

  function handleScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    const percent = progress * 100;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${percent}%`;
    }

    if (progressRingCircle) {
      const offset = circumference - progress * circumference;
      progressRingCircle.style.strokeDashoffset = `${offset}`;
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollTop > 320);
    }
  }

  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 14. Ultra-Sleek Custom Ambient Cursor Follower (Fine pointer only)
  const cursorDot = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('customCursorFollower');

  if (cursorDot && cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let isVisible = false;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursorDot.style.opacity = '1';
        cursorFollower.style.opacity = '1';
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursorDot.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursorDot.style.opacity = '1';
      cursorFollower.style.opacity = '1';
    });

    function renderCursor() {
      if (isVisible) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Dynamic hover state over interactive elements
    const interactiveSelectors = 'a, button, [role="button"], input, textarea, .project-card, .cert-card, .t-tab, .filter-btn, .lanyard-rig, .metric-box, .pillar-card, .contact-item';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // 15. Dynamic Mouse Spotlight Glow & 3D Interactive Card Tilt
  const spotlightTargets = document.querySelectorAll(
    '.project-card, .pillar-card, .metric-box, .cert-card, .telemetry-card, .workflow-card, .skill-group, .contact-item, .skill-meter-wrap'
  );

  spotlightTargets.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt on project and certificate cards
      if (card.classList.contains('project-card') || card.classList.contains('cert-card') || card.classList.contains('pillar-card')) {
        const normX = (x / rect.width - 0.5) * 2;
        const normY = (y / rect.height - 0.5) * 2;
        const tiltX = -normY * 4.5;
        const tiltY = normX * 4.5;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      }
    });

    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
      if (card.classList.contains('project-card') || card.classList.contains('cert-card') || card.classList.contains('pillar-card')) {
        card.style.transform = '';
      }
    });
  });

  // 16. Animated Skills Progress Bars with Number Count-Up
  const skillWrap = document.getElementById('skillMeterWrap');
  if (skillWrap) {
    let animated = false;
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          // Animate fills
          const fills = skillWrap.querySelectorAll('.meter-fill');
          fills.forEach((fill, index) => {
            const pct = fill.dataset.percent || '0';
            setTimeout(() => {
              fill.style.width = `${pct}%`;
            }, index * 90);
          });
          // Animate count-up numbers
          const countUps = skillWrap.querySelectorAll('.count-up');
          countUps.forEach((el, index) => {
            const target = parseInt(el.dataset.target, 10) || 0;
            const duration = 1200;
            const startTime = performance.now() + index * 90;
            function updateCount(now) {
              const elapsed = Math.max(0, now - startTime);
              const progress = Math.min(1, elapsed / duration);
              // easeOutQuart
              const ease = 1 - Math.pow(1 - progress, 4);
              el.textContent = Math.round(ease * target);
              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                el.textContent = target;
              }
            }
            requestAnimationFrame(updateCount);
          });
          skillObserver.unobserve(skillWrap);
        }
      });
    }, { threshold: 0.15 });
    skillObserver.observe(skillWrap);
  }

  // 17. Timeline Scroll-Driven Progress Line & Active Milestone Indicator
  const timelineEl = document.querySelector('.timeline');
  const timelineProgressLine = document.getElementById('timelineProgressLine');
  const timelineItems = document.querySelectorAll('.timeline-item');

  function updateTimelineProgress() {
    if (!timelineEl || !timelineProgressLine) return;
    const rect = timelineEl.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = rect.height;

    // Line start when timeline enters view
    const startOffset = windowH * 0.65;
    const scrolled = startOffset - rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / totalH));
    timelineProgressLine.style.height = `${progress * 100}%`;

    // Activate individual milestone items
    timelineItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemMid = itemRect.top + itemRect.height * 0.3;
      item.classList.toggle('active-step', itemMid < windowH * 0.7);
    });
  }

  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  updateTimelineProgress();
});
