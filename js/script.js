document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Hambúrguer Responsivo
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link (apenas em mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) { // Media query de CSS
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // 2. Animação de Scroll para elementos (Intersection Observer)
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // A callback será executada quando 20% do elemento estiver visível
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Opcional: para que a animação ocorra apenas uma vez
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animateOnScrollElements.forEach(el => observer.observe(el));


    // 3. Botão "Voltar ao Topo"
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Filtro da Galeria
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;

                // Remove 'active' de todos os botões e adiciona ao clicado
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                galleryItems.forEach(item => {
                    const category = item.dataset.category;

                    if (filter === 'all' || filter === category) {
                        item.style.display = 'block'; // Mostra o item
                        setTimeout(() => item.style.opacity = '1', 50); // Pequeno atraso para animação de fade
                    } else {
                        item.style.opacity = '0'; // Esconde com fade
                        setTimeout(() => item.style.display = 'none', 500); // Esconde totalmente após o fade
                    }
                });
            });
        });
    }

    // 5. Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Obter a altura do cabeçalho fixo para ajustar o scroll
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // 20px de padding extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Efeito Parallax simulado com JavaScript (para um controle mais preciso)
    // O CSS já faz o attachment: fixed, mas podemos adicionar mais sutileza com JS
    // Desativado por padrão, pois o CSS 'background-attachment: fixed' é suficiente para um efeito simples.
    // Se quiser um efeito mais complexo com velocidade diferente, você pode reativar e ajustar.

    /*
    window.addEventListener('scroll', () => {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const speed = 0.5; // Ajuste a velocidade do parallax

            // Move o background em relação à posição do scroll
            const yPos = (scrollPosition - sectionTop) * speed;
            section.style.backgroundPositionY = `${yPos}px`;
        });
    });
    */
});
