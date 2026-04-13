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

## 🧠 Decisiones Técnicas y Solución de Problemas

### 1. El Desafío de los Precios (Mock API Fix)
La API de prueba enviaba precios de productos costosos formateados como decimales (ej: `1.999` en lugar de `1999`). 
- **Solución**: Se implementó una capa de normalización en el servicio de API que detecta estas anomalías y las escala correctamente, evitando que una TV de lujo se mostrara a $2.00.

### 2. Sincronización de Temas Mixtos
Sincronizar el modo oscuro entre **Tailwind 4** y los archivos CSS estáticos de **PrimeReact** suele generar un destello blanco (flicker) al recargar.
- **Solución**: Se inyectó un script bloqueante en el `head` de `index.html` que detecta el tema antes de que React se monte, garantizando una carga visual coherente.

### 3. Accesibilidad y SEO
Se utilizaron etiquetas semánticas y se aseguraron los contrastes de color, logrando un puntaje de **100/100 en React-Doctor**.
