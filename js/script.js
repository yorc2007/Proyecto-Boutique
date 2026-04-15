document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONFIGURACIÓN DE SWIPER (Sin cambios)
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1.2,
        spaceBetween: 50,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        speed: 2000,
        breakpoints: { 1024: { slidesPerView: 2.2, spaceBetween: 80 } }
    });

    // 3. OBSERVADOR DE ANIMACIONES (Sin cambios)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('activo');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.revelar, .entrar-izquierda, .entrar-derecha').forEach((el) => {
        revealObserver.observe(el);
    });

    // 4. CONTROL DE VIDEO (Optimizado)
    const videoHero = document.querySelector('.hero-video');
    if (videoHero) {
        const playVideo = () => videoHero.play().catch(() => {});
        playVideo();
        videoHero.addEventListener('pause', playVideo);
    }

    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Si bajamos, ocultamos el header
        navbar.classList.add('navbar-hidden');
    } else {
        // Si subimos, mostramos el header
        navbar.classList.remove('navbar-hidden');
    }
    
    // Actualizamos la posición para la siguiente comparación
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    }, { passive: true });  
    
});