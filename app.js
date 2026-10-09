document.querySelector('#roi-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const assets = Number(document.querySelector('#assets').value);
  const cost = Number(document.querySelector('#cost').value);
  const hours = Number(document.querySelector('#hours').value);
  const language = window.TechnoLoadWebsiteI18n?.language() || 'es';
  const savings = (assets * cost * hours).toLocaleString(language === 'es' ? 'es-PE' : 'en-US');
  document.querySelector('#roi-result').textContent = language === 'es'
      ? `Ahorro potencial estimado: S/ ${savings} por mes.`
      : `Estimated potential savings: S/ ${savings} per month.`;
});

const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mainNav?.classList.toggle('is-open', !isOpen);
});
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  mainNav.classList.remove('is-open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
