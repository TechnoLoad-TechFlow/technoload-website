// TechnoLoad Website Client Logic
const USERS_KEY = 'technoload-users';
const AUTH_KEY = 'technoload-session';

const defaultUsers = [
  { id:'U-001', name:'Flor Álvarez', email:'admin@technoload.pe', password:'admin123', role:'Fleet Administrator', company:'TechnoLoad Corp' },
  { id:'U-002', name:'Mathias Castillo', email:'mathias@technoload.pe', password:'mathias123', role:'Fleet Administrator', company:'TechnoLoad Corp' },
  { id:'U-003', name:'Marco López', email:'operaciones@technoload.pe', password:'operaciones123', role:'Operations Coordinator', company:'TransAndina Logística' },
  { id:'U-004', name:'Renzo Huamán', email:'contratista@technoload.pe', password:'contratista123', role:'Contractor', company:'Constructora del Sur' }
];

function getStoredUsers() {
  let list = JSON.parse(localStorage.getItem(USERS_KEY) || 'null');
  if (!list || !Array.isArray(list) || list.length === 0) {
    list = structuredClone(defaultUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  }
  return list;
}

function getWebAppBaseUrl() {
  const customUrl = localStorage.getItem('technoload-custom-webapp-url');
  if (customUrl) return customUrl.endsWith('/') ? customUrl : `${customUrl}/`;
  const isAzure = window.location.hostname.includes('azurewebsites.net');
  if (isAzure) {
    return 'https://technoload-webapp-u202410728-afg8gjamfue2ghf5.westus-01.azurewebsites.net/';
  }
  return '../TechFlow-Webapp/hosting/index.html';
}

function getWebAppUrl(hash = '') {
  const base = getWebAppBaseUrl();
  const cleanHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  return `${base}${cleanHash}`;
}

// Update DOM links to WebApp based on current environment
function updateWebAppLinks() {
  const base = getWebAppBaseUrl();
  document.querySelectorAll('.enter-webapp-btn').forEach(el => el.href = base);
  document.querySelectorAll('.login-link').forEach(el => el.href = getWebAppUrl('login'));
  document.querySelectorAll('.header-signup').forEach(el => el.href = getWebAppUrl('register'));
  document.querySelectorAll('.webapp-route').forEach(el => {
    const route = el.dataset.route || '';
    el.href = getWebAppUrl(route);
  });
}

updateWebAppLinks();

// ROI Calculator
document.querySelector('#roi-form')?.addEventListener('submit', (event) => {
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

// Mobile Nav Toggle
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

// Authentication Modal Logic
const authModal = document.querySelector('#auth-modal');
const modalClose = document.querySelector('#modal-close');
const tabLogin = document.querySelector('#tab-login');
const tabRegister = document.querySelector('#tab-register');
const modalAlert = document.querySelector('#modal-alert');
const loginForm = document.querySelector('#modal-login-form');
const registerForm = document.querySelector('#modal-register-form');
const switchToRegister = document.querySelector('#switch-to-register');
const switchToLogin = document.querySelector('#switch-to-login');

function setModalTab(tab = 'login') {
  if (modalAlert) {
    modalAlert.style.display = 'none';
    modalAlert.textContent = '';
  }
  if (tab === 'login') {
    tabLogin?.classList.add('active');
    tabRegister?.classList.remove('active');
    if (loginForm) loginForm.style.display = 'grid';
    if (registerForm) registerForm.style.display = 'none';
  } else {
    tabRegister?.classList.add('active');
    tabLogin?.classList.remove('active');
    if (registerForm) registerForm.style.display = 'grid';
    if (loginForm) loginForm.style.display = 'none';
  }
  document.querySelectorAll('.direct-webapp-link').forEach(el => {
    el.href = getWebAppUrl(tab);
  });
}

function showModalAlert(message, type = 'error') {
  if (!modalAlert) return;
  modalAlert.className = `modal-alert ${type}`;
  modalAlert.textContent = message;
  modalAlert.style.display = 'flex';
}

function openAuthModal(tab = 'login') {
  setModalTab(tab);
  authModal?.showModal();
}

modalClose?.addEventListener('click', () => authModal?.close());
authModal?.addEventListener('click', (e) => {
  if (e.target === authModal) authModal.close();
});

tabLogin?.addEventListener('click', () => setModalTab('login'));
tabRegister?.addEventListener('click', () => setModalTab('register'));
switchToRegister?.addEventListener('click', () => setModalTab('register'));
switchToLogin?.addEventListener('click', () => setModalTab('login'));

// Intercept Sign in & Create account clicks to open modal seamlessly
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.login-link, .header-signup, .mobile-auth');
  if (!btn) return;
  // If user ctrl-clicked or right-clicked to open in new tab, let native link work
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
  e.preventDefault();
  const isRegister = btn.classList.contains('header-signup') || btn.dataset.auth === 'register';
  openAuthModal(isRegister ? 'register' : 'login');
});

// Demo chips
document.addEventListener('click', (e) => {
  const chip = e.target.closest('.modal-demo-chip');
  if (!chip) return;
  const emailInput = document.querySelector('#m-email');
  const passInput = document.querySelector('#m-pass');
  if (emailInput && passInput) {
    emailInput.value = chip.dataset.fillEmail;
    passInput.value = chip.dataset.fillPass;
    emailInput.focus();
  }
});

// Modal Login Submit
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#m-email').value.trim().toLowerCase();
  const pass = document.querySelector('#m-pass').value;
  const users = getStoredUsers();

  const matched = users.find(u => u.email.toLowerCase() === email && u.password === pass);
  if (matched) {
    const session = { user: matched, token: 'jwt-' + Date.now(), loggedInAt: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    const targetUrl = `${getWebAppBaseUrl()}#auth=${encodeURIComponent(JSON.stringify(session))}&view=dashboard`;
    window.location.href = targetUrl;
  } else {
    const lang = window.TechnoLoadWebsiteI18n?.language() || 'es';
    showModalAlert(lang === 'es' ? 'Correo o contraseña incorrectos.' : 'Invalid email or password.');
  }
});

// Modal Register Submit
registerForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#m-reg-name').value.trim();
  const email = document.querySelector('#m-reg-email').value.trim().toLowerCase();
  const company = document.querySelector('#m-reg-company').value.trim();
  const role = document.querySelector('#m-reg-role').value;
  const pass = document.querySelector('#m-reg-pass').value;
  const passConfirm = document.querySelector('#m-reg-pass-confirm').value;
  const lang = window.TechnoLoadWebsiteI18n?.language() || 'es';

  if (!name || !email || !pass) {
    showModalAlert(lang === 'es' ? 'Por favor completa todos los campos.' : 'Please fill in all fields.');
    return;
  }
  if (pass.length < 6) {
    showModalAlert(lang === 'es' ? 'La contraseña debe tener al menos 6 caracteres.' : 'Password must be at least 6 characters.');
    return;
  }
  if (pass !== passConfirm) {
    showModalAlert(lang === 'es' ? 'Las contraseñas no coinciden.' : 'Passwords do not match.');
    return;
  }
  const users = getStoredUsers();
  if (users.some(u => u.email.toLowerCase() === email)) {
    showModalAlert(lang === 'es' ? 'Este correo ya se encuentra registrado.' : 'This email is already registered.');
    return;
  }

  const newUser = {
    id: `U-${Date.now().toString().slice(-4)}`,
    name,
    email,
    password: pass,
    role,
    company: company || 'TechnoLoad'
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const session = { user: newUser, token: 'jwt-' + Date.now(), loggedInAt: Date.now() };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  const targetUrl = `${getWebAppBaseUrl()}#auth=${encodeURIComponent(JSON.stringify(session))}&view=dashboard`;
  window.location.href = targetUrl;
});
