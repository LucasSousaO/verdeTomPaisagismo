(function(){
  // ===== Helpers =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ===== Active nav link =====
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // ===== Gallery lightbox =====
  const modal = $("#imgModal");
  const modalImg = $("#imgModalImg");
  const modalClose = $("#imgModalClose");
function isAbsoluteUrl(v){
  return /^https?:\/\//i.test(String(v || "").trim());
}

function getRepoBaseUrl(){
  return "https://lucassousao.github.io/verdeTomPaisagismo/";
}

function resolveImageSrc(input){
  const raw = String(input || "").trim();
  if (!raw) return "";

  if (isAbsoluteUrl(raw)) return raw;

  const cleaned = raw.replace(/^\.?\//, "");
  return getRepoBaseUrl() + cleaned;
}

  function openModal(src, alt){
    if(!modal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = alt || "Imagem do projeto";
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  if(modal && modalClose){
    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeModal(); });
  }

  $$(".thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      if(img) openModal(img.src, img.alt);
    });
  });

  // ===== WhatsApp form =====
  const form = $("#leadForm");
  if(form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = $("#nome")?.value?.trim();
      const whatsapp = $("#whatsapp")?.value?.trim();
      const cidade = $("#cidade")?.value?.trim();
      const servico = $("#servico")?.value?.trim();
      const imovel = $("#imovel")?.value?.trim();
      const bairro = $("#bairro")?.value?.trim();
      const tamanho = $("#tamanho")?.value?.trim();
      const msg = $("#mensagem")?.value?.trim();

      // validação simples
      if(!nome || !whatsapp || !cidade || !servico || !imovel){
        alert("Por favor, preencha Nome, WhatsApp, Cidade, Serviço e Tipo de imóvel.");
        return;
      }

      const WHATSAPP_NUMBER = "5531987415012";

      const linhas = [
        "Olá! Quero solicitar um orçamento de paisagismo.",
        "",
        `Nome: ${nome}`,
        `WhatsApp: ${whatsapp}`,
        `Cidade: ${cidade}`,
        `Serviço: ${servico}`,
        `Imóvel: ${imovel}`,
        bairro ? `Bairro: ${bairro}` : null,
        tamanho ? `Tamanho aproximado: ${tamanho}` : null,
        msg ? `Detalhes: ${msg}` : null,
        "",
        "Enviei pelo site Verde Tom."
      ].filter(Boolean);

      const texto = encodeURIComponent(linhas.join("\n"));
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
})();

/* ==================================================
   Mobile Menu (reutilizável)
   ================================================== */
(function initMobileMenu(){
  const header = document.querySelector('.site-header');
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('#mainNav');

  // Se não existir (ex: landing sem header), sai silenciosamente
  if (!header || !btn || !nav) return;

  const OPEN_CLASS = 'is-open';

  function openMenu(){
    header.classList.add(OPEN_CLASS);
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu(){
    header.classList.remove(OPEN_CLASS);
    btn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu(){
    header.classList.contains(OPEN_CLASS) ? closeMenu() : openMenu();
  }

  // Clique no botão
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Fecha ao clicar em um link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!header.classList.contains(OPEN_CLASS)) return;
    if (header.contains(e.target)) return;
    closeMenu();
  });

  // Fecha ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
})();
