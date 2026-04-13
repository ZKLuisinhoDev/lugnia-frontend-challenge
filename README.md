# Sumaq. | Prueba Técnica - Frontend React Developer

[![Vercel Deployment](https://img.shields.io/badge/Vercel-View_Live-black?logo=vercel&style=flat-square)](https://lugnia-frontend-challenge.vercel.app/)
[![React Version](https://img.shields.io/badge/React-19-61dafb?logo=react&style=flat-square)](https://react.dev/)
[![React Doctor Score](https://img.shields.io/badge/React_Doctor-100/100-success?style=flat-square)](https://www.react.doctor/)

**Sumaq.** es una plataforma de comercio electrónico conceptual diseñada para demostrar la capacidad de construcción de interfaces modernas, gestión de estado compleja y optimización de rendimiento. El nombre "Sumaq" (del quechua: *hermoso/bueno*) refleja el compromiso con la calidad y el origen artesanal que la marca representa.

---

## 🔗 Enlace de Producción
La aplicación se encuentra desplegada y operativa en la siguiente URL:  
👉 **[https://lugnia-frontend-challenge.vercel.app/](https://lugnia-frontend-challenge.vercel.app/)**

---

## 🚀 Stack Tecnológico Seleccionado

Se han seleccionado herramientas de última generación para garantizar la escalabilidad y una experiencia de usuario fluida:

*   **Core**: [React 19](https://react.dev/) (Uso de las últimas APIs de concurrencia y hooks).
*   **Build Tool**: [Vite](https://vitejs.dev/) (Para un entorno de desarrollo ultrarrápido).
*   **Estilo**: [Tailwind CSS 4](https://tailwindcss.com/) (Implementación de diseño premium con cero configuración de runtime).
*   **Librería de Componentes**: [PrimeReact](https://primereact.org/) (Para componentes de UI robustos y accesibles).
*   **Gestión de Estado**: Context API (Arquitectura modular para el carrito y gestión de temas).
*   **Feedback**: [SweetAlert2](https://sweetalert2.github.io/) para micro-interacciones y confirmaciones de alta calidad.
*   **Pruebas**: Vitest + React Testing Library.

---

## 🏗️ Decisiones de Ingeniería y Arquitectura

### 1. Normalización de Datos y Capa de Mappers
Se implementó una capa de **Mappers** (`src/utils/productMappers.js`) que actúa como intermediaria entre la API pública y la aplicación. Esto asegura que:
*   Los errores de formato en los precios (decimales inconsistentes en la API original) se corrijan antes de llegar a la UI.
*   La aplicación sea independiente de cambios en la estructura del backend.

### 2. Accesibilidad (A11y) y Calidad de Código
El proyecto ha sido validado bajo auditorías estrictas, logrando una puntuación de **100/100** en `react-doctor`. Se han implementado:
*   Soporte completo para navegación por teclado en elementos interactivos.
*   Uso de `PropTypes` para garantizar la integridad de los datos entre componentes.
*   Estructura semántica de HTML5.

### 3. Persistencia y Experiencia de Usuario
*   **View Persistence**: La aplicación recuerda si el usuario se encontraba en la Landing Page o en la Tienda mediante `localStorage`.
*   **Carrito Persistente**: Selección de productos protegida contra reinicios de página.
*   **Theme Sync**: Sincronización dinámica de colores entre el sistema, Tailwind CSS y la suite de PrimeReact.

---

## 📦 Instalación y Ejecución

Para ejecutar el proyecto en un entorno local, se deben seguir los siguientes pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ZKLuisinhoDev/lugnia-frontend-challenge.git
   cd lugnia-frontend-challenge
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   # o npm install / yarn install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   pnpm run dev
   ```

4. **Ejecutar pruebas unitarias:**
   ```bash
   pnpm test
   ```

---

## 🏁 Roadmap de Futuras Mejoras
*   Integración de un flujo de Checkout transaccional real.
*   Implementación de pruebas End-to-End (E2E) con Playwright.
*   Añadir soporte Multi-lenguaje (i18n).
*   Optimización de imágenes mediante un CDN dinámico.

---

## ✉️ Contacto
Cualquier consulta o retroalimentación sobre la implementación técnica es bienvenida.  
Agradezco la oportunidad de presentar esta solución para **Lugnia**.

**[Luis Felipe Lasso Cuastumal]**  
*Fullstack Developer*
