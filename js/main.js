/* ==========================================================================
   INTERACTION LOGIC & DYNAMICS - PT MELYONI MINERAL NUSANTARA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initProjectTabs();
  initStatCounters();
  initScrollReveals();
  initContactForm();
  initLanguageSwitcher();
});

/* ==========================================================================
   NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // Transform hamburger icon to X
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 6px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
  });
  
  // Close menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/* ==========================================================================
   SCROLL SPY (Highlight Active Navigation Link)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const options = {
    root: null,
    threshold: 0.3,
    rootMargin: '-80px 0px 0px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);
  
  sections.forEach(section => {
    if (section.id) observer.observe(section);
  });
}

/* ==========================================================================
   PROJECTS TAB SWITCHER
   ========================================================================== */
function initProjectTabs() {
  const tabBtns = document.querySelectorAll('.project-tab-btn');
  const panes = document.querySelectorAll('.project-content-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Deactivate all
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => {
        p.classList.remove('active');
      });
      
      // Activate clicked
      btn.classList.add('active');
      const activePane = document.getElementById(targetTab);
      
      // Delay display trigger slightly for transition animation
      activePane.classList.add('active');
    });
  });
}

/* ==========================================================================
   DYNAMIC STATISTICS COUNTERS (ESG & HERO)
   ========================================================================== */
function initStatCounters() {
  const stats = document.querySelectorAll('.count-up');
  
  const animateStats = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // ~60fps
    
    const updateCount = () => {
      count += increment;
      if (count < target) {
        element.textContent = Math.floor(count) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target + suffix;
      }
    };
    
    updateCount();
  };
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats(entry.target);
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);
  
  stats.forEach(stat => {
    statsObserver.observe(stat);
  });
}

/* ==========================================================================
   PROGRESSIVE ENHANCEMENT SCROLL REVEALS (Fallback for Firefox/Safari)
   ========================================================================== */
function initScrollReveals() {
  // If native scroll-driven animations NOT supported, use IntersectionObserver fallback
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const reveals = document.querySelectorAll('.reveal-scroll');
    
    reveals.forEach(el => {
      el.classList.add('js-reveal');
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // only reveal once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px'
    });
    
    reveals.forEach(el => {
      revealObserver.observe(el);
    });
  }
}

/* ==========================================================================
   CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();
    
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    feedback.className = 'form-feedback';
    feedback.style.display = 'none';
    
    if (!name || !email || !subject || !message) {
      feedback.textContent = activeLang === 'id' 
        ? 'Harap lengkapi semua kolom formulir.' 
        : 'Please fill in all fields.';
      feedback.classList.add('error');
      return;
    }
    
    if (!emailRegex.test(email)) {
      feedback.textContent = activeLang === 'id' 
        ? 'Harap masukkan alamat email yang valid.' 
        : 'Please enter a valid email address.';
      feedback.classList.add('error');
      return;
    }
    
    // Simulate API request
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = activeLang === 'id' ? 'Mengirim...' : 'Sending...';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      feedback.textContent = activeLang === 'id' 
        ? 'Terima kasih! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.' 
        : 'Thank you! Your message has been sent successfully. Our team will contact you shortly.';
      feedback.classList.add('success');
      form.reset();
    }, 1500);
  });
}

/* ==========================================================================
   BILINGUAL LANGUAGE SWITCHER (ID / EN)
   ========================================================================== */
let activeLang = 'id';

const translations = {
  id: {
    // Nav
    'nav-home': 'Beranda',
    'nav-about': 'Tentang Kami',
    'nav-projects': 'Proyek Eksplorasi',
    'nav-esg': 'Keberlanjutan (ESG)',
    'nav-tech': 'Geoteknologi',
    'nav-contact': 'Kontak',
    
    // Hero
    'hero-tag': 'Eksplorasi Emas Berkelanjutan',
    'hero-title': 'Menyingkap Potensi, Memberdayakan Negeri.',
    'hero-desc': 'PT Melyoni Mineral Nusantara memimpin eksplorasi emas presisi tinggi di Kalimantan Timur dan Sulawesi Utara dengan komitmen tata kelola lingkungan (ESG) yang bertanggung jawab.',
    'hero-btn-explore': 'Jelajahi Proyek',
    'hero-btn-contact': 'Hubungi Kami',
    'hero-stat-1-lbl': 'Konsesi Aktif',
    'hero-stat-2-lbl': 'Sumber Daya Tereka',
    'hero-stat-3-lbl': 'Nir-Kecelakaan Kerja',
    
    // About
    'about-tag': 'Mengenal Melyoni',
    'about-title': 'Kredibilitas Sains dan Komitmen Ekologis',
    'about-desc': 'Didirikan sebagai pionir eksplorasi mineral berharga di Indonesia, kami memadukan data geologi tingkat lanjut dengan standar operasional ramah lingkungan untuk menciptakan nilai investasi jangka panjang yang aman dan berdampak nyata bagi kesejahteraan masyarakat sekitar.',
    'val-1-title': 'Sains Presisi',
    'val-1-desc': 'Menggunakan pemodelan 3D dan metode non-invasif untuk meminimalisasi kerusakan permukaan.',
    'val-2-title': 'Nir-Kecelakaan Kerja',
    'val-2-desc': 'Keselamatan karyawan dan kontraktor adalah prioritas tertinggi tanpa kompromi.',
    'val-3-title': 'Tata Kelola Hijau',
    'val-3-desc': 'Reklamasi bertahap dan pemulihan biodiversitas lokal sejak fase eksplorasi awal.',
    'val-4-title': 'Kemitraan Sosial',
    'val-4-desc': 'Pemberdayaan ekonomi dan infrastruktur masyarakat di sekitar wilayah operasional.',
    
    // Projects
    'projects-tag': 'Eksplorasi Lapangan',
    'projects-title': 'Dua Wilayah Konsesi Utama Emas Indonesia',
    'projects-desc': 'Proyek eksplorasi kami berada di jalur busur vulkanik Sunda-Banda dan sistem epithermal Kalimantan, dikenal sebagai wilayah dengan endapan emas kualitas tinggi.',
    'proj-btn-details': 'Unduh Profil Teknis (PDF)',
    
    // Project Kaltim
    'proj-kaltim-title': 'Proyek Eksplorasi Kalimantan Timur',
    'proj-kaltim-desc': 'Wilayah konsesi dengan fokus pada cadangan emas epithermal tipe low-sulfidation dan deposit alluvial kaya mineral. Berada di kawasan pedalaman Kaltim dengan prospek struktur geologi yang sangat menjanjikan.',
    'kaltim-stage': 'Eksplorasi Lanjut (Bor Fase 2)',
    'kaltim-area': '12,500 Hektar',
    'kaltim-geology': 'Epithermal Low-Sulfidation',
    'kaltim-methods': 'LiDAR & Pemetaan Geokimia',
    
    // Project Manado
    'proj-manado-title': 'Proyek Eksplorasi Manado',
    'proj-manado-desc': 'Mengincar struktur emas-perak epithermal tipe high-sulfidation di sepanjang sabuk vulkanik Sulawesi Utara. Eksplorasi difokuskan pada pemetaan zona alterasi dan pengeboran inti untuk mendefinisikan geometri bijih emas.',
    'manado-stage': 'Pengeboran Inti Prospektif',
    'manado-area': '8,200 Hektar',
    'manado-geology': 'High-Grade Epithermal Gold-Silver',
    'manado-methods': 'Geofisika IP & Drilling Core',
    
    // ESG
    'esg-tag': 'Prinsip Ekologis & Sosial',
    'esg-title': 'Lebih dari Sekadar Menambang Emas',
    'esg-desc': 'Kami percaya bahwa keberhasilan ekonomi harus sejalan dengan pemulihan alam dan peningkatan taraf hidup masyarakat lokal. ESG diintegrasikan langsung dalam setiap langkah survei lapangan kami.',
    'esg-item-1-title': 'Rehabilitasi Hutan & Lahan',
    'esg-item-1-desc': 'Melakukan reboisasi vegetasi lokal pada setiap lubang bor eksplorasi segera setelah data selesai diambil.',
    'esg-item-2-title': 'Pemberdayaan Tenaga Kerja Lokal',
    'esg-item-2-desc': 'Lebih dari 90% personil non-teknis di lapangan direkrut dari masyarakat lingkar tambang dan dibekali sertifikasi keselamatan.',
    'esg-item-3-title': 'Efisiensi & Bebas Merkuri',
    'esg-item-3-desc': 'Penggunaan teknologi pemisahan ramah lingkungan tanpa penggunaan merkuri atau bahan kimia berbahaya di fasilitas pengujian awal.',
    'esg-counter-1-lbl': 'Pekerja Lokal',
    'esg-counter-2-lbl': 'Hektar Reboisasi',
    'esg-counter-3-lbl': 'Zero Fatalities',
    
    // Technology
    'tech-tag': 'Metode & Inovasi',
    'tech-title': 'Eksplorasi Berbasis Teknologi Modern',
    'tech-desc': 'Kami memanfaatkan kemajuan ilmiah terbaru untuk mendeteksi deposit mineral secara efektif tanpa mengganggu integritas ekosistem.',
    't1-title': 'Pemetaan Udara LiDAR',
    't1-desc': 'Pemindaian sensor laser untuk menghasilkan model topografi 3D beresolusi tinggi, menembus vegetasi lebat untuk membaca garis sesar geologi.',
    't2-title': 'Geofisika Ground Magnetic',
    't2-desc': 'Mengukur variasi magnet bumi secara presisi untuk memetakan formasi batuan pembawa emas di bawah permukaan tanah.',
    't3-title': 'Analisis Spektrometri Portabel',
    't3-desc': 'Identifikasi langsung kandungan elemen mineral di lapangan menggunakan sinar X-Ray (XRF) untuk keputusan pengeboran yang lebih cepat.',
    
    // Contact
    'contact-tag': 'Hubungi Kami',
    'contact-title': 'Kemitraan dan Informasi Investasi',
    'contact-desc': 'Jika Anda adalah calon mitra investasi, regulator, atau masyarakat setempat yang memerlukan informasi teknis maupun operasional, silakan hubungi tim humas kami.',
    'c-phone-lbl': 'Hubungi Kami',
    'c-email-lbl': 'Kirim Email',
    'c-address-lbl': 'Kantor Pusat',
    'c-address-val': 'Treasury Tower Lt. 42, Senayan, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
    'form-name-lbl': 'Nama Lengkap',
    'form-email-lbl': 'Alamat Email',
    'form-subject-lbl': 'Subjek / Perihal',
    'form-msg-lbl': 'Pesan Anda',
    'form-btn': 'Kirim Pesan',
    
    // Footer
    'footer-brand-desc': 'PT Melyoni Mineral Nusantara adalah perusahaan eksplorasi emas Indonesia yang berdedikasi pada keunggulan ilmiah, pengelolaan lingkungan, dan kemakmuran sosial.',
    'footer-links-explore': 'Jelajahi',
    'footer-links-legal': 'Hukum & Legalitas'
  },
  en: {
    // Nav
    'nav-home': 'Home',
    'nav-about': 'About Us',
    'nav-projects': 'Exploration Projects',
    'nav-esg': 'Sustainability (ESG)',
    'nav-tech': 'Geotechnology',
    'nav-contact': 'Contact',
    
    // Hero
    'hero-tag': 'Sustainable Gold Exploration',
    'hero-title': 'Unearthing Wealth, Empowering the Nation.',
    'hero-desc': 'PT Melyoni Mineral Nusantara leads high-precision gold exploration in East Kalimantan and North Sulawesi, committed to responsible environmental, social, and governance (ESG) standards.',
    'hero-btn-explore': 'Explore Projects',
    'hero-btn-contact': 'Contact Us',
    'hero-stat-1-lbl': 'Active Concessions',
    'hero-stat-2-lbl': 'Inferred Resources',
    'hero-stat-3-lbl': 'LTI-Free Hours',
    
    // About
    'about-tag': 'Discover Melyoni',
    'about-title': 'Scientific Excellence & Ecological Commitment',
    'about-desc': 'Founded as a pioneer in precious metal exploration in Indonesia, we blend advanced geological sciences with eco-friendly operational standards to create secure, long-term investment value and tangible local welfare.',
    'val-1-title': 'Precision Science',
    'val-1-desc': 'Utilizing 3D geological modeling and non-invasive methods to minimize surface footprint.',
    'val-2-title': 'Zero Harm',
    'val-2-desc': 'The safety of our employees and contractors is our absolute priority with zero compromise.',
    'val-3-title': 'Green Stewardship',
    'val-3-desc': 'Progressive reclamation and local biodiversity restoration from the initial exploration phase.',
    'val-4-title': 'Social Partnership',
    'val-4-desc': 'Empowering community economics and infrastructure around our exploration regions.',
    
    // Projects
    'projects-tag': 'Field Exploration',
    'projects-title': 'Two Major Indonesian Gold Concession Zones',
    'projects-desc': 'Our exploration projects are situated along the Sunda-Banda volcanic arc and the geological structures of Kalimantan, famed for high-grade gold deposits.',
    'proj-btn-details': 'Download Technical Profile (PDF)',
    
    // Project Kaltim
    'proj-kaltim-title': 'East Kalimantan Exploration Project',
    'proj-kaltim-desc': 'A concession zone focused on low-sulfidation epithermal gold reserves and mineral-rich alluvial deposits. Located in Kaltim\'s interior with highly promising geological structures.',
    'kaltim-stage': 'Advanced Exploration (Phase 2 Boring)',
    'kaltim-area': '12,500 Hectares',
    'kaltim-geology': 'Low-Sulfidation Epithermal',
    'kaltim-methods': 'LiDAR & Geochemical Mapping',
    
    // Project Manado
    'proj-manado-title': 'Manado Exploration Project',
    'proj-manado-desc': 'Targeting high-sulfidation epithermal gold-silver structures along North Sulawesi\'s volcanic belt. Exploration focuses on mapping alteration zones and core drilling to define ore geometries.',
    'manado-stage': 'Prospecting Core Drilling',
    'manado-area': '8,200 Hectares',
    'manado-geology': 'High-Grade Epithermal Gold-Silver',
    'manado-methods': 'IP Geophysics & Drilling Core',
    
    // ESG
    'esg-tag': 'Ecological & Social Principles',
    'esg-title': 'More Than Just Mining Gold',
    'esg-desc': 'We believe economic success must go hand-in-hand with environmental restoration and the upliftment of local communities. ESG is integrated into every step of our field operations.',
    'esg-item-1-title': 'Forest & Land Rehabilitation',
    'esg-item-1-desc': 'Replanting local vegetation on each exploration drill hole immediately after core sample retrieval.',
    'esg-item-2-title': 'Local Workforce Empowerment',
    'esg-item-2-desc': 'Over 90% of non-technical field personnel are recruited locally and provided safety certifications.',
    'esg-item-3-title': 'Clean Tech & Mercury-Free',
    'esg-item-3-desc': 'Using environment-safe physical separation methods with zero mercury or hazardous chemicals in testing.',
    'esg-counter-1-lbl': 'Local Hires',
    'esg-counter-2-lbl': 'Hectares Reclaimed',
    'esg-counter-3-lbl': 'Zero Fatalities',
    
    // Technology
    'tech-tag': 'Methods & Innovation',
    'tech-title': 'Modern Technology-Driven Exploration',
    'tech-desc': 'We harness the latest scientific advances to detect mineral deposits effectively while preserving ecological integrity.',
    't1-title': 'LiDAR Aerial Mapping',
    't1-desc': 'Laser sensor scanning to produce high-resolution 3D terrain models, penetrating dense canopy to read fault lines.',
    't2-title': 'Ground Magnetic Geophysics',
    't2-desc': 'Measuring precise Earth magnetic variations to map subsurface gold-bearing geological rock formations.',
    't3-title': 'Portable Spectrometry Analysis',
    't3-desc': 'Direct on-site identification of core minerals using X-Ray Fluorescence (XRF) for faster drilling decisions.',
    
    // Contact
    'contact-tag': 'Contact Us',
    'contact-title': 'Partnerships & Investment Inquiries',
    'contact-desc': 'If you are a potential investment partner, regulator, or local community member seeking technical or operational information, please contact our public relations team.',
    'c-phone-lbl': 'Call Us',
    'c-email-lbl': 'Email Us',
    'c-address-lbl': 'Head Office',
    'c-address-val': 'Treasury Tower 42nd Fl, Senayan, Kebayoran Baru, South Jakarta, DKI Jakarta 12190',
    'form-name-lbl': 'Full Name',
    'form-email-lbl': 'Email Address',
    'form-subject-lbl': 'Subject / Topic',
    'form-msg-lbl': 'Your Message',
    'form-btn': 'Send Message',
    
    // Footer
    'footer-brand-desc': 'PT Melyoni Mineral Nusantara is an Indonesian gold exploration company dedicated to scientific excellence, environmental stewardship, and social prosperity.',
    'footer-links-explore': 'Explore',
    'footer-links-legal': 'Legal & Compliance'
  }
};

function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang === activeLang) return;
      
      activeLang = selectedLang;
      
      // Update button active state
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Translate all elements with data-translate attribute
      document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[activeLang] && translations[activeLang][key]) {
          // If it is an input placeholder
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('placeholder', translations[activeLang][key]);
          } else {
            el.innerHTML = translations[activeLang][key];
          }
        }
      });
    });
  });
}
