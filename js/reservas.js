document.addEventListener('DOMContentLoaded', () => {

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