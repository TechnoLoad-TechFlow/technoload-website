document.querySelector('#roi-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const assets = Number(document.querySelector('#assets').value);
  const cost = Number(document.querySelector('#cost').value);
  const hours = Number(document.querySelector('#hours').value);
  document.querySelector('#roi-result').textContent = `Estimated potential savings: S/ ${(assets * cost * hours).toLocaleString('en-US')} per month.`;
});
