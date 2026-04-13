# Sumaq. • Origen y Calidad 🏔️✨

![Sumaq Banner](public/images/hero.png)

**Sumaq.** es una plataforma de e-commerce de alto rendimiento construida con **React 19** y **Vite**. Esta aplicación no es solo un catálogo, sino una propuesta estética y técnica que busca redefinir la experiencia de compra digital con un toque humano y cultural.

Hecho con ❤️ en **Pasto, Colombia**.

---

## 🏔️ El Concepto: ¿Por qué "Sumaq"?

**Sumaq** es una palabra de nuestra lengua ancestral, el **Quechua**, que significa literalmente *hermoso, bueno, excelente o de gran valor*. 

El nombre fue elegido por tres razones fundamentales:
1. **Identidad**: Conectar la tecnología de vanguardia con nuestras raíces andinas (Pasto).
2. **Filosofía**: Reflejar el concepto de **Sumak Kawsay** (El Buen Vivir), donde la calidad y la belleza están en armonía con la función.
3. **Promesa de Marca**: Garantizar que **cada producto** en el catálogo ha sido curado bajo estándares de "Origen y Calidad".

---

## 🚀 Características Principales

### 💎 UI/UX Premium
- **Diseño Moderno**: Estética limpia con bordes redondeados (`rounded-3xl`), sombras suaves y efectos de desfoque (`backdrop-blur`).
- **Modo Oscuro Nativo**: Implementación con sincronización dinámica de temas de PrimeReact y Tailwind 4.
- **Responsive Design**: Experiencia optimizada para móviles, tablets y escritorio.

### 🛠️ Ingeniería y Performance
- **React 19 & Vite**: Aprovechando las últimas capacidades de React para un renderizado ultra eficiente.
- **Gestión de Estado**: Arquitectura basada en `Context API` para un carrito reactivo y gestión de temas global.
- **Persistencia**: Sincronización automática con `localStorage` (Carrito, Tema y Vista actual).

---

## 📄 Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **React 19** | Biblioteca principal para la UI |
| **Vite** | Build tool de alto rendimiento |
| **Tailwind CSS 4** | Estilizado atómico y moderno |
| **PrimeReact 10** | Componentes de UI robustos y accesibles |
| **Axios** | Cliente HTTP para consumo de API |
| **SweetAlert2** | Modales y notificaciones de alta calidad |
| **Lucide/PrimeIcons** | Iconografía minimalista |

---

## 📂 Estructura del Proyecto

```bash
src/
├── components/       # Componentes atómicos y modulares
├── context/          # Providers (Theme, Cart)
├── hooks/            # Hooks personalizados (useProducts, useCategories)
├── services/         # Capa de comunicación con la API
└── constants/        # Configuraciones globales
```

---

## ⚡ Instalación y Uso

Asegúrate de tener instalado **Node.js** (v18+) y **pnpm** (recomendado) o **npm**.

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd prueba-tecnica
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   pnpm dev
   ```

---

## 🧠 Decisiones Técnicas y Solución de Problemas

### 1. El Desafío de los Precios (Mock API Fix)
La API de prueba enviaba precios de productos costosos formateados como decimales (ej: `1.999` en lugar de `1999`). 
- **Solución**: Se implementó una capa de normalización en el servicio de API que detecta estas anomalías y las escala correctamente, evitando que una TV de lujo se mostrara a $2.00.

### 2. Sincronización de Temas Mixtos
Sincronizar el modo oscuro entre **Tailwind 4** y los archivos CSS estáticos de **PrimeReact** suele generar un destello blanco (flicker) al recargar.
- **Solución**: Se inyectó un script bloqueante en el `head` de `index.html` que detecta el tema antes de que React se monte, garantizando una carga visual coherente.

### 3. Accesibilidad y SEO
Se utilizaron etiquetas semánticas y se aseguraron los contrastes de color, logrando un puntaje de **100/100 en React-Doctor**.

---

## 🧪 Testing & Calidad de Código

Para asegurar la robustez de la aplicación, se ha implementado una suite de pruebas automatizadas centrada en la lógica de negocio crítica.

### Herramientas utilizadas:
- **Vitest**: Un framework de testing ultra-rápido diseñado para Vite.
- **React Testing Library**: Para pruebas de componentes centradas en el usuario.
- **JSDOM**: Un entorno de navegador simulado para Node.js.

### Cobertura de Pruebas:
Se han priorizado las pruebas unitarias para el **CartContext**, validando los siguientes escenarios:
- ✅ **Añadir productos**: Verificación de inserción correcta en el estado.
- ✅ **Manejo de Cantidades**: Lógica de incremento cuando un producto ya existe.
- ✅ **Eliminación**: Limpieza persistente de ítems del carrito.
- ✅ **Cálculo de Totales**: Verificación matemática de la suma de productos y cantidades.
- ✅ **Persistencia**: Validación de sincronización con `localStorage`.

Para ejecutar los tests en modo interactivo:
```bash
pnpm test
```

> [!NOTE]
> La aplicación mantiene un puntaje de **100/100 en React-Doctor**, cumpliendo con todas las reglas de accesibilidad, performance y mejores prácticas de React 19.

---

## 🚀 Mejoras Futuras y ¿Qué nos falta?

Para llevar esta aplicación al siguiente nivel de producción, se plantean las siguientes mejoras:

### ✅ Lo que logramos (Mejoras ya implementadas)
- **Modo Oscuro Persistente**: No solo un toggle, sino una sincronización completa con el sistema y localStorage.
- **Normalización de Datos**: Corrección proactiva de errores en la API de origen.
- **Arquitectura Escalable**: Separación clara de responsabilidades (Servicios, Hooks, Context, UI).
- **SEO & Accesibilidad**: Uso de HTML semántico y cumplimiento de estándares web.

### ⏳ Lo que nos falta (Roadmap Pro)
1. **Testing de Integración**: Añadir pruebas con Playwright o Cypress para el flujo completo de compra (e2e).
2. **Sistema de Routing**: Implementar `react-router-dom` para manejar URLs dinámicas para detalles de productos (ej: `/product/123`).
3. **Estado Global con Redux/Zustand**: Para una aplicación mucho más grande, migrar de Context a una librería de estado más robusta.
4. **Backend Real**: Sustituir la Mock API por un backend con Node.js/Python para manejo real de transacciones.
5. **Animaciones Avanzadas**: Implementar `Framer Motion` para transiciones de página y gestos táctiles.

---

## ✉️ Contacto
Cualquier duda o feedback sobre la implementación, no dudes en contactarme.
¡Gracias por explorar **Sumaq.**!

