// script.js - Versión Mejorada y Optimizada
document.addEventListener('DOMContentLoaded', function() {
    // ========== VARIABLES GLOBALES ==========
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentYearSpan = document.getElementById('current-year');
    const sections = document.querySelectorAll('section[id]');
    
    // ========== INICIALIZAR AÑO ACTUAL ==========
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ========== MENÚ MÓVIL ==========
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                !hamburger.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========== EFECTO SCROLL EN NAVBAR ==========
    let lastScrollTop = 0;
    
    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de sombra al hacer scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
            
            // Ocultar/mostrar navbar basado en dirección de scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down - hide navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show navbar
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Debounce para mejorar rendimiento
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

    // ========== NAVEGACIÓN SUAVE Y ACTIVA ==========
    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 150; // Offset para navbar fija
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80; // Altura del navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', debounce(setActiveNavLink, 10));

    // ========== ANIMACIONES DE ELEMENTOS ==========
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (!statNumbers.length) return;
        
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            const finalNumber = parseInt(originalText.replace('+', ''));
            let current = 0;
            const increment = finalNumber / 30; // Más suave
            const duration = 1500; // 1.5 segundos
            const interval = duration / (finalNumber / increment);
            
            stat.textContent = '0';
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    current = finalNumber;
                    clearInterval(timer);
                    stat.textContent = originalText;
                } else {
                    stat.textContent = Math.floor(current) + (originalText.includes('+') ? '+' : '');
                }
            }, interval);
        });
    }

    // ========== EFECTOS HOVER EN PROYECTOS ==========
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========== EFECTOS HOVER EN HABILIDADES ==========
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });

    // ========== EFECTO TYPING EN HERO ==========
    function initTypingEffect() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (!heroSubtitle) return;
        
        const originalText = heroSubtitle.textContent;
        const texts = [
            "Desarrollador de Software en Formación",
            "Estudiante en Campusland"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isEnd = true;
                setTimeout(typeWriter, 2000); // Pausa al completar
                return;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex++;
                if (textIndex === texts.length) textIndex = 0;
            }
            
            const speed = isDeleting ? 50 : 100;
            const timeout = isEnd ? 1200 : speed;
            
            setTimeout(typeWriter, timeout);
            
            if (isEnd) {
                isEnd = false;
                isDeleting = true;
            }
        }
        
        // Iniciar después de 1 segundo
        setTimeout(typeWriter, 1000);
    }

    // ========== SCROLL PROGRESS INDICATOR ==========
    function createScrollProgress() {
        const scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transition: width 0.1s ease-out;
            box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
        `;
        document.body.appendChild(scrollProgress);
        
        return scrollProgress;
    }
    
    const scrollProgress = createScrollProgress();
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // ========== INTERSECTION OBSERVER PARA ANIMACIONES ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase para animaciones CSS
                entry.target.classList.add('animated');
                
                // Animaciones específicas por sección
                if (entry.target.id === 'about') {
                    animateStats();
                }
                
                // Observar cada elemento dentro de la sección
                const childElements = entry.target.querySelectorAll('[data-aos]');
                childElements.forEach(el => {
                    el.classList.add('aos-animate');
                });
            }
        });
    }, observerOptions);

    // Observar todas las secciones principales
    sections.forEach(section => {
        observer.observe(section);
    });

    // ========== INICIALIZAR AOS ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true,
            easing: 'ease-in-out',
            delay: 100,
            mirror: false
        });
    }

    // ========== EVENTOS DE SCROLL ==========
    function handleScrollEvents() {
        updateScrollProgress();
        setActiveNavLink();
        
        // Efecto parallax sutil
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    // ========== PRELOADER (opcional) ==========
    function initPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s ease-out;
        `;
        
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;
        
        preloader.appendChild(spinner);
        document.body.appendChild(preloader);
        
        // Ocultar preloader cuando la página cargue
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                    initTypingEffect(); // Iniciar efecto typing después de carga
                }, 500);
            }, 500);
        });
    }

    // ========== EVENTOS DE TECLADO ==========
    document.addEventListener('keydown', function(e) {
        // Cerrar menú con ESC
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Navegación con teclado (Tab)
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ========== INICIALIZAR TODO ==========
    function init() {
        // Inicializar preloader (opcional - comenta si no lo quieres)
        // initPreloader();
        
        // Iniciar efecto typing sin preloader
        initTypingEffect();
        
        // Configurar eventos de scroll
        window.addEventListener('scroll', debounce(handleScrollEvents, 10));
        
        // Actualizar progreso inicial
        updateScrollProgress();
        setActiveNavLink();
        
        // Añadir clase de carga al body
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // Ejecutar inicialización
    init();
});

// ========== ESTILOS ADICIONALES DINÁMICOS ==========
const additionalStyles = `
    /* Animación de spin para preloader */
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Mejores estilos para navegación con teclado */
    body.keyboard-navigation a:focus,
    body.keyboard-navigation button:focus,
    body.keyboard-navigation input:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 3px;
        border-radius: 4px;
    }
    
    /* Transición suave para elementos animados */
    .animated {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    /* Efecto de aparición para elementos del hero */
    .hero-text > * {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    body.loaded .hero-text > * {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Delay para elementos del hero */
    body.loaded .hero-title {
        transition-delay: 0.2s;
    }
    
    body.loaded .hero-subtitle {
        transition-delay: 0.4s;
    }
    
    body.loaded .hero-description {
        transition-delay: 0.6s;
    }
    
    body.loaded .hero-buttons {
        transition-delay: 0.8s;
    }
    
    /* Scrollbar personalizada */
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(var(--primary-color), var(--secondary-color));
        border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(var(--secondary-color), var(--primary-color));
    }
    
    /* Smooth fade-in animation */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Pulse animation for CTA elements */
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
        }
    }
    
    .btn-primary {
        animation: pulse 2s infinite;
    }
    
    /* Responsive adjustments for animations */
    @media (max-width: 768px) {
        .btn-primary {
            animation: none;
        }
        
        .hero-text > * {
            opacity: 1;
            transform: none;
        }
    }
`;

// Añadir estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ========== UTILIDADES GLOBALES ==========
// Función para formatear números con separadores de miles
Number.prototype.format = function() {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Detectar si el dispositivo es táctil
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

// Añadir clase al body si es dispositivo táctil
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
} else {
    document.body.classList.add('no-touch-device');
}