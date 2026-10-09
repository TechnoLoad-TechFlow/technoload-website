document.querySelector('#roi-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const assets = Number(document.querySelector('#assets').value);
  const cost = Number(document.querySelector('#cost').value);
  const hours = Number(document.querySelector('#hours').value);
  const savings = (assets * cost * hours).toLocaleString('en-US');
  document.querySelector('#roi-result').textContent = window.TechnoLoadWebsiteI18n?.language() === 'es'
    ? `Ahorro potencial estimado: S/ ${savings} por mes.`
    : `Estimated potential savings: S/ ${savings} per month.`;
});
