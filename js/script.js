const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.2, 
  spaceBetween: 50,   // Aumenta este valor (ej. 40 o 50) para dar más aire
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    speed: 2000, // Aumenta la velocidad de transición para que sea más suave
  },
  breakpoints: {
    // En pantallas grandes puedes dar incluso más espacio
    1024: {
      slidesPerView: 2.2,
      spaceBetween: 80, 
    }
  }
});

// Función para activar animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('activo');
        }
    });
}, {
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
});

// Seleccionamos todos los elementos con la clase revelar y los observamos
const elementosARevelar = document.querySelectorAll('.revelar');
elementosARevelar.forEach((el) => observer.observe(el));
// Configuración del Observador para las animaciones de entrada
const observerOptions = {
    threshold: 0.15 // Se activa cuando el 15% del elemento es visible
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('activo');
        }
    });
}, observerOptions);

// Aplicar el observador a todos los elementos con la clase 'revelar'
document.querySelectorAll('.revelar').forEach((el) => revealObserver.observe(el));
document.addEventListener('DOMContentLoaded', () => {
    const videoHero = document.querySelector('.hero-video');
    
    if (videoHero) {
        // Forzamos el play por si el navegador lo pausó
        videoHero.play().catch(error => {
            console.log("El navegador bloqueó el autoplay inicialmente, reintentando...");
        });

        // Evento de seguridad: Si por alguna razón se pausa, que siga
        videoHero.addEventListener('pause', () => {
            videoHero.play();
        });
    }
});
// Activa las animaciones laterales cuando entran en el scroll
document.querySelectorAll('.entrar-izquierda, .entrar-derecha').forEach((el) => {
    revealObserver.observe(el);
});