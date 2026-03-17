// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Crear mensaje para WhatsApp
            const whatsappMessage = `Hola PrestaStar,\n\nMi nombre es: ${name}\nMi correo: ${email}\nMi teléfono: ${phone}\n\nMensaje:\n${message}\n\nEstoy interesado en conocer más sobre las oportunidades de negocio.`;
            
            // Codificar el mensaje
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Redirigir a WhatsApp
            window.open(`https://wa.me/5212283542044?text=${encodedMessage}`, '_blank');
            
            // Limpiar el formulario
            contactForm.reset();
            
            // Mostrar mensaje de confirmación
            alert('Tu mensaje será enviado por WhatsApp. ¡Gracias por contactarnos!');
        });
    }
});

// Animación de scroll suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});

// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con clase 'fade-in'
document.querySelectorAll('.feature-card, .gallery-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navegación activa
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Agregar estilos para enlaces activos
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        border-bottom: 2px solid white;
        padding-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);

// Contador de animación para números
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Inicializar contadores cuando se vean en pantalla
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
        }
    });
});

counters.forEach(counter => counterObserver.observe(counter));

// Validación de formulario en tiempo real
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = '#E5E7EB';
        }
    });
});

console.log('PrestaStar Irapuato - Sitio web cargado correctamente');
