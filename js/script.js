document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONFIGURACIÓN DE SWIPER
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1.2,
        spaceBetween: 50,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        speed: 2000,
        breakpoints: {
            1024: {
                slidesPerView: 2.2,
                spaceBetween: 80,
            }
        }
    });

    // 2. CONFIGURACIÓN DEL MENÚ DESPLEGABLE
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        // Limpieza del botón principal
        menuBtn.replaceWith(menuBtn.cloneNode(true));
        const newMenuBtn = document.getElementById('menu-btn');

        // Evento para abrir/cerrar el menú principal
        newMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Al cerrar el menú principal, también limpiamos submenús
            if (!navLinks.classList.contains('active')) {
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
            }
        });

        // Lógica para los Submenús (Nosotros / Servicios)
        const dropdownLinks = document.querySelectorAll('.dropdown > a');
        dropdownLinks.forEach(dropLink => {
            dropLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation(); // Evita que el clic cierre el menú principal
                    
                    const parent = dropLink.parentElement;

                    // Toggle: Si ya está abierto lo cierra, si no, cierra otros y abre este
                    if (parent.classList.contains('open')) {
                        parent.classList.remove('open');
                    } else {
                        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
                        parent.classList.add('open');
                    }
                }
            });
        });

        // Cerrar el menú al hacer clic en un destino final
        const finalDestinations = document.querySelectorAll('#nav-links a:not(.dropdown > a)');
        finalDestinations.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
            });
        });

        // Cerrar si se hace clic en cualquier parte fuera del menú
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !newMenuBtn.contains(e.target)) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
                }
            }
        });
    }

    // 3. OBSERVADOR DE ANIMACIONES (Intersection Observer)
    const revealOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('activo');
            }
        });
    }, revealOptions);

    const selector = '.revelar, .entrar-izquierda, .entrar-derecha';
    document.querySelectorAll(selector).forEach((el) => {
        revealObserver.observe(el);
    });

    // 4. CONTROL DE VIDEO HERO
    const videoHero = document.querySelector('.hero-video');
    if (videoHero) {
        videoHero.play().catch(() => {
            console.log("Autoplay bloqueado por el navegador.");
        });

        videoHero.addEventListener('pause', () => {
            videoHero.play();
        });
    }
});