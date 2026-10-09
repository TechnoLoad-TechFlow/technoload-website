(() => {
  const es = {
    'Features':'Funciones', 'Solutions':'Soluciones', 'Memberships':'Membresías', 'Sign in':'Ingresar', 'Create account':'Crear cuenta',
    'SAAS FOR FIELD OPERATIONS':'SAAS PARA OPERACIONES DE CAMPO', 'Control your fleet before downtime stops your operation.':'Controla tu flota antes de que una parada detenga tu operación.',
    'Centralize machinery, vehicles, hour meters, preventive maintenance, rentals and dispatches in one platform built for teams that cannot stop.':'Centraliza maquinaria, vehículos, horómetros, mantenimiento preventivo, alquileres y despachos en una plataforma para equipos que no pueden detenerse.',
    'Enter the platform':'Entrar a la plataforma', 'Explore memberships':'Explorar membresías', 'Operations dashboard':'Panel operativo', 'Updated now':'Actualizado ahora',
    'assets available':'activos disponibles', 'services on route':'servicios en ruta', 'alerts pending':'alertas pendientes', 'Operational availability':'Disponibilidad operativa',
    'EVERYTHING UNDER CONTROL':'TODO BAJO CONTROL', 'Your operation, connected end to end.':'Tu operación conectada de inicio a fin.',
    'Meter-based maintenance':'Mantenimiento por horómetro', 'Anticipate preventive service and reduce unplanned downtime.':'Anticipa servicios preventivos y reduce paradas no planificadas.',
    'Conflict-free rentals':'Alquileres sin conflictos', 'Approve rental requests with a clear view of availability.':'Aprueba solicitudes de alquiler con una visión clara de la disponibilidad.',
    'Traceable operations':'Operaciones trazables', 'Record working hours, services and activity for every unit.':'Registra horas de trabajo, servicios y actividad por cada unidad.',
    'BUILT FOR YOUR OPERATION':'HECHO PARA TU OPERACIÓN', 'Two workflows, one source of truth.':'Dos flujos de trabajo, una sola fuente de información.',
    'Fleet administration':'Administración de flota', 'Asset and hour-meter control':'Control de activos y horómetros', 'Maintenance orders and alerts':'Órdenes y alertas de mantenimiento',
    'Availability for rental or operations':'Disponibilidad para alquiler u operaciones', 'Manage fleet →':'Gestionar flota →',
    'Load logistics':'Logística de carga', 'Unit assignments':'Asignación de unidades', 'Routes and scheduled dispatches':'Rutas y despachos programados',
    'Service tracking':'Seguimiento de servicios', 'View operations →':'Ver operaciones →', 'MEMBERSHIPS':'MEMBRESÍAS',
    'A plan that fits every operation.':'Un plan que se adapta a cada operación.', 'Choose a demo membership. You can view and change the active plan from the web application at any time.':'Elige una membresía demo. Puedes ver y cambiar el plan activo desde la aplicación web en cualquier momento.',
    'Starter':'Inicial', 'For small fleets getting started with digital control.':'Para flotas pequeñas que inician su control digital.', 'Up to 10 assets':'Hasta 10 activos', 'Fleet inventory':'Inventario de flota',
    'Maintenance calendar':'Calendario de mantenimiento', 'Choose Starter':'Elegir Inicial', 'MOST POPULAR':'MÁS POPULAR', 'Professional':'Profesional',
    'For growing operations that need full visibility.':'Para operaciones en crecimiento que requieren visibilidad total.', 'Up to 50 assets':'Hasta 50 activos', 'Rentals and dispatches':'Alquileres y despachos',
    'Operational reports':'Reportes operativos', 'Choose Professional':'Elegir Profesional', 'Enterprise':'Empresarial', 'Custom':'Personalizado',
    'For large organizations and multi-site operations.':'Para organizaciones grandes y operaciones en múltiples sedes.', 'Unlimited assets':'Activos ilimitados', 'Priority support':'Soporte prioritario',
    'Custom integrations':'Integraciones personalizadas', 'Talk to sales':'Hablar con ventas', 'ROI CALCULATOR':'CALCULADORA ROI',
    'Estimate the impact of preventing downtime.':'Estima el impacto de prevenir tiempos de inactividad.', 'Use your own values to create an indicative monthly savings projection.':'Usa tus valores para crear una proyección mensual de ahorro referencial.',
    'Assets in your fleet':'Activos en tu flota', 'Estimated cost per downtime hour (S/)':'Costo estimado por hora detenida (S/)',
    'Avoidable hours per asset / month':'Horas evitables por activo / mes', 'Calculate savings':'Calcular ahorro', 'Enter your values to calculate.':'Ingresa tus valores para calcular.',
    'Smart fleet management':'Gestión inteligente de flotas', 'Change language':'Cambiar idioma'
  };
  let language = localStorage.getItem('technoload-website-language') || 'es';
  const preserve = (text, value) => text.replace(text.trim(), value);
  function translate() {
    document.documentElement.lang = language;
    const switcher = document.querySelector('#language-switch');
    switcher.textContent = language === 'es' ? 'EN' : 'ES';
    switcher.setAttribute('aria-label', language === 'es' ? 'Cambiar idioma' : 'Change language');
    document.title = language === 'es' ? 'TechnoLoad | Gestión inteligente de flotas' : 'TechnoLoad | Smart fleet management';
    document.querySelector('nav[aria-label]').setAttribute('aria-label', language === 'es' ? 'Navegación principal' : 'Primary navigation');
    const menu = document.querySelector('#menu-toggle');
    if (menu) menu.setAttribute('aria-label', language === 'es' ? 'Abrir menú' : 'Open menu');
    if (language !== 'es') return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => { const key = node.nodeValue.trim(); if (es[key]) node.nodeValue = preserve(node.nodeValue, es[key]); });
  }
  document.addEventListener('DOMContentLoaded', () => {
    translate();
    document.querySelector('#language-switch').addEventListener('click', () => {
      language = language === 'en' ? 'es' : 'en';
      localStorage.setItem('technoload-website-language', language);
      location.reload();
    });
  });
  window.TechnoLoadWebsiteI18n = { language: () => language };
})();
