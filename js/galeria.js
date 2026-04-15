document.addEventListener('DOMContentLoaded', () => {

    // 1. Configuración del Observador
    const opciones = {
        threshold: 0.10, // Se activa apenas asoma el 10% del elemento
        rootMargin: "0px 0px -50px 0px" // Margen para que no se active tan al borde
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadimos la clase 'activo'
                entry.target.classList.add('activo');
                // Una vez que aparece, dejamos de observarlo para ahorrar memoria
                observer.unobserve(entry.target);
            }
        });
    }, opciones);

    // 2. Selección de todos los elementos con tus nuevas clases
    // Buscamos específicamente las clases que pusiste en el HTML
    const elementosParaAnimar = document.querySelectorAll('.revelar, .entrar-izquierda, .entrar-derecha, .card-lugar');

    elementosParaAnimar.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Navbar (Mantenemos el cambio de color al bajar)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(17, 20, 24, 0.98)";
        } else {
            navbar.style.background = "rgba(17, 20, 24, 0.95)";
        }
    });

    let lastScrollTop = 0;

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