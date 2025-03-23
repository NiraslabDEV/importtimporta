// Aguardar que o DOM seja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Variáveis
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.querySelector("body");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const header = document.querySelector("header");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".produto-card");
  const appleLogo = document.querySelector(".apple-logo");

  // Toggle de tema claro/escuro
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("light-theme");
    body.classList.toggle("dark-theme");

    // Alternar ícones
    const sunIcon = themeToggle.querySelector(".fa-sun");
    const moonIcon = themeToggle.querySelector(".fa-moon");

    sunIcon.classList.toggle("active");
    moonIcon.classList.toggle("active");

    // Salvar preferência no localStorage
    const currentTheme = body.classList.contains("light-theme")
      ? "light"
      : "dark";
    localStorage.setItem("theme", currentTheme);
  });

  // Verificar tema salvo
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
    themeToggle.querySelector(".fa-sun").classList.add("active");
    themeToggle.querySelector(".fa-moon").classList.remove("active");
  }

  // Menu mobile
  mobileMenuToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // Impedir que o clique propague para o documento
    navLinks.classList.toggle("active");
    mobileMenuToggle.querySelector("i").classList.toggle("fa-bars");
    mobileMenuToggle.querySelector("i").classList.toggle("fa-times");
  });

  // Impedir que cliques dentro do menu fechem o menu
  navLinks.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Fechar menu ao clicar em qualquer lugar fora do menu
  document.addEventListener("click", function () {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      if (mobileMenuToggle.querySelector("i").classList.contains("fa-times")) {
        mobileMenuToggle.querySelector("i").classList.remove("fa-times");
        mobileMenuToggle.querySelector("i").classList.add("fa-bars");
      }
    }
  });

  // Fechar menu ao clicar em um link
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navLinks.classList.remove("active");
      mobileMenuToggle.querySelector("i").classList.add("fa-bars");
      mobileMenuToggle.querySelector("i").classList.remove("fa-times");
    });
  });

  // Header com estilo ao rolar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Efeito de paralaxe para o logo Apple
    if (appleLogo) {
      const scrollPosition = window.scrollY;
      // Cálculo mais suave da opacidade e escala para o logo
      const opacity = Math.max(0, 1 - scrollPosition / 700);
      const scale = Math.max(0.7, 1 - scrollPosition / 1500);

      // Aplicar os estilos com uma transição suave
      appleLogo.style.opacity = opacity;
      appleLogo.style.transform = `scale(${scale})`;

      // Ajustar o filtro para intensificar o brilho quando próximo ao topo
      const glowIntensity = Math.max(0, 1 - scrollPosition / 500);
      appleLogo.style.filter = `drop-shadow(0 0 ${
        30 * glowIntensity
      }px rgba(0, 195, 255, ${0.8 * glowIntensity})) 
                                drop-shadow(0 0 ${
                                  60 * glowIntensity
                                }px rgba(181, 55, 242, ${
        0.6 * glowIntensity
      }))`;
    }

    // Atualizar links ativos com base na seção visível
    const sections = document.querySelectorAll("section");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 300) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");
      }
    });

    // Adicionar animação para elementos que entram na viewport
    const animateElements = document.querySelectorAll(".animate-on-scroll");

    animateElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add("visible");
      }
    });

    // Animar elementos específicos da seção "Sobre"
    const sobreSection = document.getElementById("sobre");
    if (sobreSection) {
      const sobreBoundingRect = sobreSection.getBoundingClientRect();
      if (
        sobreBoundingRect.top < window.innerHeight - 100 &&
        sobreBoundingRect.bottom > 0
      ) {
        sobreSection.classList.add("animated");
      }
    }
  });

  // Filtro de produtos
  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remover classe active de todos os botões
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Adicionar classe active ao botão clicado
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        productCards.forEach((card) => {
          if (filterValue === "todos") {
            card.style.display = "block";
          } else {
            if (card.getAttribute("data-category") === filterValue) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          }
        });
      });
    });
  }

  // Efeito de parallax
  const parallaxElements = document.querySelectorAll(".parallax-bg");
  window.addEventListener("scroll", function () {
    parallaxElements.forEach((element) => {
      const scrollPosition = window.scrollY;
      const speed = element.getAttribute("data-speed") || 0.5;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });

  // Animação de entrada para os elementos quando visíveis
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".servico-card, .produto-card, .valor-card, .sobre-features, .manifesto-text, .manifesto-video"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate-in");
      }
    });
  };

  // Adicionar classe para animação CSS
  const elementsToAnimate = document.querySelectorAll(
    ".servico-card, .produto-card, .valor-card, .sobre-features, .manifesto-text, .manifesto-video"
  );
  elementsToAnimate.forEach((element) => {
    element.classList.add("animate-element");
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Executar uma vez para verificar elementos já visíveis

  // Vídeo do Pinterest - autoplay sem controles
  function setupPinterestVideo() {
    // Seleciona o iframe do Pinterest e o overlay
    const pinterestIframe = document.querySelector(".pinterest-video-autoplay");
    const videoOverlay = document.querySelector(".video-overlay");

    if (pinterestIframe) {
      // Configura o overlay para iniciar o vídeo mas bloquear outras interações
      if (videoOverlay) {
        videoOverlay.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          // Tenta clicar no botão de play do Pinterest quando o usuário clica no overlay
          try {
            const iframeContent =
              pinterestIframe.contentWindow || pinterestIframe.contentDocument;
            if (iframeContent) {
              const playButtons = iframeContent.document.querySelectorAll(
                ".PinMedia__player button, .PinPlayButton"
              );
              playButtons.forEach((button) => button.click());
            }
          } catch (error) {
            console.log("Não foi possível interagir com o conteúdo do iframe");
          }

          return false;
        });
      }

      // Função para tentar iniciar o vídeo automaticamente
      function autoplayVideo() {
        try {
          // Tenta acessar o conteúdo do iframe e iniciar o vídeo
          const iframeContent =
            pinterestIframe.contentWindow || pinterestIframe.contentDocument;

          if (iframeContent) {
            // Seleciona todos os elementos de vídeo e botões dentro do iframe
            const videoElements =
              iframeContent.document.querySelectorAll("video");
            const playButtons = iframeContent.document.querySelectorAll(
              ".PinMedia__player button, .PinPlayButton"
            );
            const downloadButtons = iframeContent.document.querySelectorAll(
              ".PinMedia__downloadButton"
            );
            const pinActionButtons =
              iframeContent.document.querySelectorAll(".Pin__actions");

            // Inicia todos os vídeos
            videoElements.forEach((video) => {
              video.autoplay = true;
              video.controls = false;
              video.loop = true;
              video.muted = true; // Necessário para autoplay em alguns navegadores
              video
                .play()
                .catch((e) => console.log("Autoplay bloqueado pelo navegador"));

              // Adiciona evento para tentar iniciar a reprodução quando o usuário interage com a página
              document.addEventListener(
                "click",
                function () {
                  video.play().catch((e) => {});
                },
                { once: true }
              );
            });

            // Adiciona estilos para esconder elementos de UI do Pinterest
            const style = iframeContent.document.createElement("style");
            style.textContent = `
              .PinMedia__player button, 
              .PinPlayButton, 
              .PinMedia__downloadButton,
              .Pin__actions,
              .Pin__safeSearchOverlay,
              .Pin__bottomWrapper,
              .Pin__topWrapper {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
              }
              
              body {
                overflow: hidden !important;
              }
              
              video {
                object-fit: cover !important;
              }
            `;
            iframeContent.document.head.appendChild(style);

            // Tenta clicar em todos os botões de play
            playButtons.forEach((button) => {
              setTimeout(() => button.click(), 300);
              button.style.display = "none";
            });

            // Esconde botões de download e outras ações
            downloadButtons.forEach(
              (button) => (button.style.display = "none")
            );
            pinActionButtons.forEach(
              (button) => (button.style.display = "none")
            );
          }
        } catch (error) {
          console.log(
            "Não foi possível acessar o conteúdo do iframe devido a restrições de segurança"
          );
        }
      }

      // Tenta iniciar o vídeo após o carregamento do iframe
      pinterestIframe.addEventListener("load", autoplayVideo);

      // Também tenta quando a janela é carregada completamente
      window.addEventListener("load", autoplayVideo);

      // Tenta múltiplas vezes com intervalos diferentes
      let attempts = 0;
      const maxAttempts = 8;
      const interval = setInterval(() => {
        autoplayVideo();
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 1500);
    }
  }

  // Executa a configuração do vídeo
  setupPinterestVideo();
});

// Adicionar estilos para animação de entrada
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    .animate-element {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
`
);

// Adicionar classe 'animate-on-scroll' a elementos que devem animar ao rolar
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM completamente carregado e analisado");

  // Inicializar funcionalidades existentes
  if (typeof initThemeToggle === "function") {
    console.log("Inicializando toggle de tema");
    initThemeToggle();
  }
  if (typeof initMobileMenu === "function") {
    console.log("Inicializando menu mobile");
    initMobileMenu();
  }
  if (typeof initScrollEvents === "function") {
    console.log("Inicializando eventos de scroll");
    initScrollEvents();
  }
  if (typeof initProductFilter === "function") {
    console.log("Inicializando filtros de produtos");
    initProductFilter();
  }
  if (typeof initParallaxEffect === "function") {
    console.log("Inicializando efeito parallax");
    initParallaxEffect();
  }
  if (typeof initScrollAnimation === "function") {
    console.log("Inicializando animações de scroll");
    initScrollAnimation();
  }

  // Inicializar novas funcionalidades da seção de serviços
  console.log("Preparando para inicializar funcionalidades de serviços");
  initServicesTabsAndCards();
  enhanceServiceCards();
  console.log("Inicialização concluída");

  // Adicionar animação à seção sobre
  const sobreImage = document.querySelector(".sobre-image");
  const sobreFeatures = document.querySelectorAll(".feature");
  const sobreTextParagraphs = document.querySelectorAll(".sobre-text p");

  if (sobreImage) sobreImage.classList.add("animate-on-scroll");

  sobreFeatures.forEach((feature) => {
    feature.classList.add("animate-on-scroll");
  });

  sobreTextParagraphs.forEach((paragraph) => {
    paragraph.classList.add("animate-on-scroll");
  });

  // Adicionar estilo CSS para animações
  const style = document.createElement("style");
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .sobre.animated .image-frame {
      animation-play-state: running;
    }
    
    @media (prefers-reduced-motion) {
      .animate-on-scroll {
        transition: none;
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  document.head.appendChild(style);

  // Criar partículas para a seção Sobre
  const particlesContainer = document.querySelector(".particles-container");
  if (particlesContainer) {
    createParticles(particlesContainer, 25);
  }
});

// Adicionar interatividade aos cartões de serviço
function enhanceServiceCards() {
  const servicoCards = document.querySelectorAll(".servico-card");

  console.log(
    "Melhorando interatividade para",
    servicoCards.length,
    "cartões de serviço"
  );

  servicoCards.forEach((card) => {
    // Adicionar efeito de profundidade ao movimento do mouse
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Aplicar transformação de perspectiva
      card.style.transform = `perspective(1000px) rotateY(${
        x * 5
      }deg) rotateX(${y * -5}deg) scale3d(1.02, 1.02, 1.02)`;

      // Ajustar sombra baseado na posição
      card.style.boxShadow = `0 15px 35px rgba(0,0,0,0.3), 
                              ${x * 20}px ${y * 20}px 30px rgba(0,0,0,0.15)`;

      // Efeito de luz de destaque
      const cardBg = card.querySelector(".card-bg");
      if (cardBg) {
        cardBg.style.background = `radial-gradient(circle at ${
          (x + 0.5) * 100
        }% ${(y + 0.5) * 100}%, 
                                   rgba(var(--accent-rgb), 0.15), 
                                   rgba(var(--accent-rgb), 0.05) 40%, 
                                   transparent 60%)`;
      }
    });

    // Resetar efeitos quando o mouse sair
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";

      const cardBg = card.querySelector(".card-bg");
      if (cardBg) {
        cardBg.style.background = "";
      }
    });

    // Adicionar classe para animação ao clicar
    card.addEventListener("click", function () {
      this.classList.add("pulse-effect");
      setTimeout(() => {
        this.classList.remove("pulse-effect");
      }, 300);
    });
  });
}

// Função para criar partículas
function createParticles(container, count) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");

    // Tamanho aleatório entre 2px e 12px
    const size = Math.random() * 10 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Posição inicial aleatória na base da tela
    const posX = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.bottom = `0`;

    // Offset X aleatório para movimento
    const offsetX = (Math.random() - 0.5) * 40;
    particle.style.setProperty("--offset-x", `${offsetX}%`);

    // Posição X final aleatória
    const finalX = offsetX + (Math.random() - 0.5) * 30;
    particle.style.setProperty("--final-x", `${finalX}%`);

    // Escala aleatória
    const scale = Math.random() * 0.6 + 0.2;
    particle.style.setProperty("--scale", scale.toString());

    // Opacidade aleatória
    const opacity = Math.random() * 0.5 + 0.1;
    particle.style.setProperty("--opacity", opacity.toString());

    // Duração aleatória para cada partícula
    const duration = Math.random() * 15 + 15;
    particle.style.setProperty("--duration", `${duration}s`);

    // Atraso aleatório para cada partícula
    const delay = Math.random() * 20;
    particle.style.setProperty("--delay", `${delay}s`);

    container.appendChild(particle);
  }
}

// Função para reinicializar a funcionalidade das abas de serviços
function reinitServicesTabsAndCards() {
  console.log("Reinicializando funcionalidade de serviços");

  // Remover todos os event listeners anteriores clonando e substituindo os elementos
  const tabButtons = document.querySelectorAll(".tab-button");
  const servicoCards = document.querySelectorAll(".servico-card");

  console.log("Reconfigurando botões e cartões");

  // Remover todos os event listeners clonando os elementos
  tabButtons.forEach((button) => {
    const clone = button.cloneNode(true);
    button.parentNode.replaceChild(clone, button);
  });

  // Inicializar novamente a funcionalidade com os novos elementos clonados
  initServicesTabsAndCards();

  // Adicionar as funcionalidades de interatividade aos cartões
  enhanceServiceCards();
}

// Serviços Tab Functionality
function initServicesTabsAndCards() {
  console.log("Inicializando tabs e cards de serviços");
  const tabButtons = document.querySelectorAll(".tab-button");
  const servicoCards = document.querySelectorAll(".servico-card");

  console.log("Botões de tabs encontrados:", tabButtons.length);
  console.log("Cards de serviço encontrados:", servicoCards.length);

  // Definir o primeiro cartão como ativo por padrão
  if (servicoCards.length > 0) {
    servicoCards[0].classList.add("active");
  }

  tabButtons.forEach((button, index) => {
    console.log(
      `Configurando botão ${index} para o serviço: ${button.getAttribute(
        "data-service"
      )}`
    );

    button.addEventListener("click", function (e) {
      e.preventDefault(); // Prevenir comportamento padrão
      e.stopPropagation(); // Parar propagação do evento

      console.log(`Clique no botão: ${this.getAttribute("data-service")}`);

      // Remover a classe ativa de todos os botões e adicionar ao clicado
      tabButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Obter o serviço correspondente ao botão
      const targetService = this.getAttribute("data-service");
      console.log(`Serviço alvo: ${targetService}`);

      // Remover a classe ativa de todos os cartões
      servicoCards.forEach((card) => {
        card.classList.remove("active");

        // Verificar se o cartão corresponde ao serviço alvo
        if (card.getAttribute("data-service") === targetService) {
          console.log(`Ativando card para: ${targetService}`);
          // Adicionar classe com atraso para animação
          setTimeout(() => {
            card.classList.add("active");
          }, 50);
        }
      });

      return false; // Retornar falso para garantir que o evento não se propague
    });
  });
}

// Adicionar listener para o evento de redimensionamento da janela
window.addEventListener("resize", function () {
  // Reinicializar a funcionalidade após o redimensionamento
  if (window.innerWidth <= 768) {
    // Apenas para dispositivos móveis
    reinitServicesTabsAndCards();
  }
});

// Adicionar tratamento especial para toque em dispositivos móveis
document.addEventListener("DOMContentLoaded", function () {
  // Detectar se é um dispositivo móvel
  const isMobile =
    window.innerWidth <= 768 ||
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone|iPad|iPod/i);

  if (isMobile) {
    console.log(
      "Dispositivo móvel detectado - aplicando tratamento especial para toque"
    );

    // Adicionar listeners de toque para as abas
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((button) => {
      button.addEventListener(
        "touchstart",
        function (e) {
          e.preventDefault();
          console.log(
            "Toque detectado no botão:",
            this.getAttribute("data-service")
          );
          this.click(); // Acionar o evento de clique
        },
        { passive: false }
      );
    });
  }
});
