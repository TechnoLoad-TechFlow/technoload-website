let language = localStorage.getItem('technoload-website-language') || 'es';
let messages = {};
const read = (key) => key.split('.').reduce((value, part) => value?.[part], messages) || key;
async function setLanguage(nextLanguage) {
  try { messages = await fetch(`i18n/${nextLanguage}.json`).then((response) => response.json()); } catch { return; }
  language = nextLanguage; localStorage.setItem('technoload-website-language', language); document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = read(element.dataset.i18n); });
  const button = document.querySelector('#language-button'); button.textContent = language === 'es' ? 'EN' : 'ES'; button.setAttribute('aria-label', language === 'es' ? 'Change language' : 'Cambiar idioma');
}
document.querySelector('#language-button').addEventListener('click', () => setLanguage(language === 'es' ? 'en' : 'es'));
document.querySelector('#roi-form').addEventListener('submit', (event) => { event.preventDefault(); const total = Number(document.querySelector('#assets').value) * Number(document.querySelector('#cost').value) * Number(document.querySelector('#hours').value); document.querySelector('#roi-result').textContent = read('roi.result').replace('{amount}', total.toLocaleString(language === 'es' ? 'es-PE' : 'en-US')); });
setLanguage(language);
