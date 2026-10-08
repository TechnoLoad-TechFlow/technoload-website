# TechnoLoad Website

Landing pública de TechnoLoad. Comunica la propuesta de valor para flotas de maquinaria pesada y transporte de carga, presenta las soluciones y ofrece una calculadora de ahorro/ROI funcional.

## Funcionalidades

- CTA hacia la plataforma TechnoLoad.
- Navegación por beneficios, soluciones y calculadora ROI.
- Calculadora local de ahorro mensual estimado.
- Diseño responsive sin dependencias de compilación.

## Despliegue en Azure Static Web Apps

1. Crea un repositorio llamado `technoload-website` y sube el contenido de esta carpeta.
2. En Azure Portal, crea un recurso **Azure Static Web Apps** conectado a ese repositorio.
3. Selecciona **Custom** como preset de construcción.
4. Configura `App location` como `/`, y deja vacíos `Api location` y `Output location`.
5. Autoriza el workflow que Azure agrega al repositorio y realiza un push a `main`.

> Antes del despliegue final, reemplaza los enlaces relativos a `../technoload-webapp/index.html` por la URL pública de tu WebApp desplegada.
