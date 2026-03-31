document.addEventListener('DOMContentLoaded', () => {
  // Hace que el click en los enlaces del menú baje suavemente a la sección correspondiente
  const navLinks = document.querySelectorAll('nav a, .btn');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Validamos que sea un ID de sección en vez de un link a otra página
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70, // Le resto 70px para que el menú superior no tape el título de la sección
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Lógica para interceptar el formulario de contacto (por ahora solo es estático/visual)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensaje enviado correctamente (Esto es una simulación del portafolio)');
      contactForm.reset();
    });
  }

  // Función que detecta por dónde vamos scrolleando para pintar en azul la opción activa del menú
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });

    const activeLink = document.querySelector('nav ul li a.active');
    if (activeLink) activeLink.classList.remove('active');

    const nextLink = document.querySelector(`nav ul li a[href="#${current}"]`);
    if (nextLink) {
      nextLink.classList.add('active');
    }
  });

  // --- Funcionalidad para ampliar y visualizar fotos al hacer click ---
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imgFull');
  const captionText = document.getElementById('caption');
  const projectImages = document.querySelectorAll('.project-img img');

  projectImages.forEach(img => {
    // Cambio el cursor por defecto a una lupita para indicar que se puede agrandar
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
      document.body.style.overflow = 'hidden'; // Aquí bloqueo el deslizamiento de la página de fondo para que no moleste
    });
  });

  // Evento para el botón de la esquina (X) que cierra la vista ampliada
  const closeBtn = document.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
      document.body.style.overflow = 'auto';
    };
  }

  // También permito que la foto se cierre si la persona hace click directamente en el área oscura
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = 'auto';
    }
  });
});
