const menuButton = document.querySelector('.menu');
const nav = document.querySelector('nav');
if (menuButton && nav) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('mobile-open');
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* Gallery lightbox */
const galleryImgs = Array.from(document.querySelectorAll('.gallery-img'));
let lbIndex = -1;

function openLightbox(index){
  lbIndex = index;
  const src = galleryImgs[index].src;
  const alt = galleryImgs[index].alt || '';
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button class="close" aria-label="Sluit">✕</button>
    <button class="nav-btn prev" aria-label="Vorige">◀</button>
    <img src="${src}" alt="${alt}">
    <button class="nav-btn next" aria-label="Volgende">▶</button>
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.close');
  const prevBtn = overlay.querySelector('.prev');
  const nextBtn = overlay.querySelector('.next');

  function closeLB(){
    window.removeEventListener('keydown', onKey);
    overlay.remove();
  }
  function showPrev(){
    lbIndex = (lbIndex - 1 + galleryImgs.length) % galleryImgs.length;
    img.src = galleryImgs[lbIndex].src;
    img.alt = galleryImgs[lbIndex].alt || '';
  }
  function showNext(){
    lbIndex = (lbIndex + 1) % galleryImgs.length;
    img.src = galleryImgs[lbIndex].src;
    img.alt = galleryImgs[lbIndex].alt || '';
  }
  function onKey(e){
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  }

  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeLB(); });
  closeBtn.addEventListener('click', closeLB);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
  window.addEventListener('keydown', onKey);
}

galleryImgs.forEach((imgEl, i) => {
  imgEl.style.cursor = 'zoom-in';
  imgEl.addEventListener('click', () => openLightbox(i));
});

/* Contact form fallback: compose mailto with form data */
const contactForm = document.querySelector('#contact-form');
if (contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    if (!name || !email || !message) {
      alert('Vul alle velden in.');
      return;
    }
    const to = 'info.beaudeco@gmail.com';
    const subject = encodeURIComponent('Offerte aanvraag via website');
    const body = encodeURIComponent(`Naam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
